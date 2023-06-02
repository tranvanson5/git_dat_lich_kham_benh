export interface ConfirmOtpReq {
    otp: string;
    type: OtpType;
    parent: string;
}

export enum OtpType {
    ACCOUNT, PRODUCT
}