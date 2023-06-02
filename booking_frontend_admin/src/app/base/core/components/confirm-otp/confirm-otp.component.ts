import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OtpService } from '../../services/otp.service';
import { SpinnerService } from '../../services/spinner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { recursive } from 'src/app/base/_helpers/helper';

@Component({
    selector: 'app-confirm-otp',
    templateUrl: './confirm-otp.component.html'
})
export class ConfirmOtpComponent implements OnInit {

    public formGroup: FormGroup;

    public get formControl() {
        return this.formGroup.controls;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private matDialogRef: MatDialogRef<ConfirmOtpComponent>,
        private otpService: OtpService,
        private spinnerService: SpinnerService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            otp: [null, [Validators.required]]
        })
    }

    confirm(): void {
        recursive(this.formGroup);
        if (this.formGroup.invalid) return;
        this.spinnerService.isLoading(true);
        this.otpService.confirmUseItem({
            ...this.formGroup.value,
            ...this.data
        }).subscribe(res => {
            this.spinnerService.isLoading(false);
            this.matDialogRef.close('SUCCESS');
        })
    }
    
    doClose(): void {
        this.matDialogRef.close(null);
    }
}