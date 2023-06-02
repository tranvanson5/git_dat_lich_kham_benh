import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemModel } from '../../models/product.model';
import { OtpService } from 'src/app/base/core/services/otp.service';
import { SpinnerService } from 'src/app/base/core/services/spinner.service';
import { ConfirmOtpComponent } from 'src/app/base/core/components/confirm-otp/confirm-otp.component';
import { OtpType } from 'src/app/base/core/models/otp.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styles: [`
        td {
            min-width: 100px;
            border: 3px solid #f8f9fc !important;
            padding: 10px;
            font-size: 13px;
        }

        img {
            transition: all .5s;

            &:hover {
                transform: scale(2);
                transform-origin: 20px 10px;
            }
        }
    `]
})
export class ProductDetailComponent {


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ItemModel,
        private matDialogRef: MatDialogRef<ProductDetailComponent>,
        private otpService: OtpService,
        private spinnerService: SpinnerService,
        private matDialog: MatDialog,
        private toastrService: ToastrService,
    ) {}

    useItem(): void {
        this.spinnerService.isLoading(true);
        this.otpService.useItem(this.data.itemId)
            .subscribe(res => {
                this.spinnerService.isLoading(false);
                this.matDialog.open(ConfirmOtpComponent, {
                    width: '500px',
                    data: {
                        type: OtpType.PRODUCT,
                        parent: this.data.itemId
                    }
                }).afterClosed().subscribe(res => {
                    if (res) {
                        this.toastrService.success('Xác nhận thành công.');
                    }
                    this.doClose();
                })
            })
    }

    doClose(): void {
        this.matDialogRef.close(null);
    }
}