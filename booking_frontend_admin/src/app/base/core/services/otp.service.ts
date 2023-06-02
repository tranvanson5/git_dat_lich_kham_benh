import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmOtp } from '../models/otp.model';

@Injectable({
    providedIn: 'root'
})
export class OtpService {

    constructor(
        private http: HttpClient
    ) {}

    public useItem(itemId: string): Observable<void> {
        return this.http.post<void>(`${environment.API_GATEWAY_USER}/otp/use-item`, {
            itemId: itemId
        })
    }

    public confirmUseItem(confirmOtp: ConfirmOtp): Observable<void> {
        return this.http.post<void>(`${environment.API_GATEWAY_USER}/otp/confirm-otp`, confirmOtp)
    }
}