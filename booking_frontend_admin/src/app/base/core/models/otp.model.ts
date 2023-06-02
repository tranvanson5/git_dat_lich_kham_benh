export interface ConfirmOtp {
    otp: string;
    parent: string;
    type: OtpType;
}

export enum OtpType {
    ACCOUNT, PRODUCT
}