package com.c1se16.otp;

import com.c1se16.otp.request.*;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody @Validated ForgotPasswordRequest request) throws MessagingException {
        this.otpService.forgotPassword(request);
    }

    @PostMapping("/confirm-otp")
    public void confirmOtp(@RequestBody @Validated ConfirmOtpRequest request) {
        this.otpService.confirmOtp(request);
    }

    @PostMapping("/change-password")
    public void changePasswordOtp(@RequestBody @Validated ChangePasswordOtpRequest request) {
        this.otpService.changePasswordWithOtp(request);
    }

    @PostMapping(value = "/use-item")
    public void useItem(@RequestBody @Validated UseItemRequest request) throws MessagingException {
        this.otpService.useItem(request);
    }
}