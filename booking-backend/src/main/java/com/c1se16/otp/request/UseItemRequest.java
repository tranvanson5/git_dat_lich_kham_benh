package com.c1se16.otp.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UseItemRequest {

    @NotBlank

    private String itemId;
}
