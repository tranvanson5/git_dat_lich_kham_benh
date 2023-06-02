package com.c1se16.otp.request;

import com.c1se16.otp.constant.OtpType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
public class ConfirmOtpRequest {

    @NotBlank
    private String otp;

    @NotNull
    private OtpType type;

    @NotNull
    private String parent;
}