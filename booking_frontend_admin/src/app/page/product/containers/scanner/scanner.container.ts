import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProductDetailComponent } from "../../components/product-detail/product-detail.component";
import { ProductService } from "../../services/product.service";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { QRScannerComponent } from "src/app/base/core/components/scanner/qr-scanner.component";

@Component({
    selector: 'app-scanner-container',
    templateUrl: './scanner.container.html',
    styles: [`
        :host ::ng-deep zxing-scanner {
            display: flex;
            justify-content: center;
        }
    `]
})
export class ScannerContainer {

    @ViewChild('scanner')
    public qrScanner: QRScannerComponent;


    constructor(
        private matDialog: MatDialog,
        private productService: ProductService,
        private spinnerService: SpinnerService,
    ) {}
    
    scanSuccess(itemId: string): void {
        this.spinnerService.isLoading(true);
        this.productService.findDetailItemById(itemId)
            .subscribe(res => {
                this.spinnerService.isLoading(false);
                console.log(res);
                this.matDialog.open(ProductDetailComponent, {
                    width: '1000px',
                    data: res
                }).afterClosed().subscribe(res => {
                    this.qrScanner.restartCam();
                })
            })
    }
}