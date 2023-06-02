package com.c1se16.otp.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ConfirmUseItemRequest extends UseItemRequest {

    @NotBlank
    private String otp;
}
