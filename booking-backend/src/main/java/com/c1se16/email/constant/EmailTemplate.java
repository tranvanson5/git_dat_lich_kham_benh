package com.c1se16.email.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum EmailTemplate {
    FORGOT_PASSWORD("forgot-password", "[NO-REPLY] Lấy Lại Mật Khẩu."),
    USE_ITEM("use-item", "[NO-REPLY] Sử Dụng Dịch Vụ.");
    private final String value;
    private final String title;

    public String getValue() {
        String prefix = "email";
        return String.format("%s/%s", prefix, this.value);
    }
}
