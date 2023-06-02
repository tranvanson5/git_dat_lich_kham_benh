import { Injectable, inject } from '@angular/core';
import { BookingBackend } from './booking.service';
import { JwtRequest, JwtResponse } from '../models/jwt.model';
import { Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { decode } from 'js-base64';
import { AccountService } from 'src/app/module/account/services/account.service';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private bookingBackend = inject(BookingBackend);
    private router = inject(Router);
    private accountService = inject(AccountService);

    public get authenticated(): boolean {
        const jwtResponse = this.accountService.getCurrentUser();
        return !!jwtResponse;
    }

    public login(request: JwtRequest): Observable<JwtResponse> {
        return this.bookingBackend.post<JwtResponse>('/auth/login', request)
    }

    public logout(): Observable<void> {
        const jwtResponse = this.accountService.getCurrentUser();
        if (!jwtResponse) return of();
        window.localStorage.removeItem('secret');
        return this.bookingBackend.post<void>('/auth/logout', {
            bearerToken: jwtResponse.jwt
        })
            .pipe(
                tap(res => {
                    window.localStorage.removeItem('secret');
                    this.router.navigate(['auth', 'login']);
                })
            );
    }

}