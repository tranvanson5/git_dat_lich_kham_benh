package com.c1se16.otp;

import com.c1se16.core.utils.RandomUtil;
import com.c1se16.email.EmailDTO;
import com.c1se16.email.EmailService;
import com.c1se16.email.constant.EmailTemplate;
import com.c1se16.otp.constant.OtpStatus;
import com.c1se16.otp.constant.OtpType;
import com.c1se16.otp.request.*;
import com.c1se16.token.TokenRepository;
import com.c1se16.user.User;
import com.c1se16.user.UserRepository;
import com.c1se16.user.item.Item;
import com.c1se16.user.item.ItemRepository;
import jakarta.mail.IllegalWriteException;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpConfig otpConfig;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    private final ItemRepository itemRepository;
    private final OtpRepository otpRepository;

    public void forgotPassword(ForgotPasswordRequest request) throws MessagingException {
        User user = this.getUserByUsernameAndEmail(request.getUsername(), request.getEmail());
        String otp = this.sendOtp(OtpType.ACCOUNT, user.getUsername());
        EmailDTO emailDTO = EmailDTO.builder()
                .to(new String[] {user.getEmail()})
                .template(EmailTemplate.FORGOT_PASSWORD)
                .data(Map.of("header", user.getFullName(), "otp", otp))
                .build();
        this.emailService.asyncSend(emailDTO);
        this.userRepository.save(user);
    }

    @Transactional
    public void confirmOtp(ConfirmOtpRequest request) {
        Otp otp = this.otpRepository.findByTypeAndParentAndNotStatus(request.getType(), request.getParent(), List.of(OtpStatus.DONE))
                .orElseThrow();
        this.confirmOtp(request, otp);
    }

    public void confirmOtp(ConfirmOtpRequest request, Otp otp) {
        if (new Date().after(otp.getExpire())) {
            throw new IllegalArgumentException("OTP hết hạn");
        }
        if (!this.passwordEncoder.matches(request.getOtp(), otp.getValue())) {
            throw new IllegalArgumentException("OTP không chính xác");
        }
        otp.setStatus(OtpStatus.DONE);
        this.otpRepository.save(otp);

        if (OtpType.PRODUCT.equals(request.getType())) {
            Item item = this.itemRepository.findById(request.getParent()).orElseThrow();
            if (item.getQuantity() == 1) {
                this.itemRepository.delete(item);
                return;
            }
            item.setQuantity(item.getQuantity() - 1);
            this.itemRepository.save(item);
        }
    }

    @Transactional
    public void changePasswordWithOtp(ChangePasswordOtpRequest request) {
        Otp otp = this.otpRepository.findByTypeAndParent(request.getType(), request.getParent())
                .stream()
                .filter(o -> this.passwordEncoder.matches(request.getOtp(), o.getValue()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("OTP không chính xác"));
        this.confirmOtp(request, otp);
        User user = this.userRepository.findByUsername(request.getParent()).orElseThrow();
        user.setPassword(this.passwordEncoder.encode(request.getNewPassword()));
        this.userRepository.save(user);
        this.tokenRepository.deleteByUserId(user.getId());
    }

    private User getUserByUsernameAndEmail(String username, String email) {
        User user = this.userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy username: " + username));
        if (!email.equals(user.getEmail())) {
            throw new IllegalArgumentException("Không tim thấy email: " + email);
        }
        return user;
    }

    @Transactional
    public void useItem(UseItemRequest request) throws MessagingException {
        Item item = this.itemRepository.findDetailItemById(request.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy: " + request.getItemId()));
        String otp = this.sendOtp(OtpType.PRODUCT, item.getId());
        Map<String, Object> data = Map.of("header", item.getOwner().getFullName(), "otp", otp, "productCode", item.getProduct().getCode(), "productName", item.getProduct().getName());
        EmailDTO emailDTO = EmailDTO.builder()
                .to(new String[] {item.getOwner().getEmail()})
                .template(EmailTemplate.USE_ITEM)
                .data(data)
                .build();
        this.emailService.asyncSend(emailDTO);
        this.itemRepository.save(item);
    }

    public String sendOtp(OtpType type, Object parent) {
        Otp otp = this.otpRepository.findByTypeAndParentAndNotStatus(type, parent.toString(), List.of(OtpStatus.DONE))
                .orElse(new Otp());
        String rawOtp = RandomUtil.randomNumberWithLength(this.otpConfig.getLength());
        otp.setExpire(new Date(System.currentTimeMillis() + this.otpConfig.getExpireTime()));
        otp.setValue(this.passwordEncoder.encode(rawOtp));
        otp.setParent(parent.toString());
        otp.setType(type);
        otp.setStatus(OtpStatus.PROCESSING);
        this.otpRepository.save(otp);
        return rawOtp;
    }
}