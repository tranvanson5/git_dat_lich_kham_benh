import { NgIf } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { QRCodeModule, QRCodeComponent as QRCode } from 'angularx-qrcode';

@Component({
    selector: 'app-qrcode',
    templateUrl: './qrcode.component.html',
    styleUrls: ['./qrcode.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        QRCodeModule
    ]
})
export class QRCodeComponent {

    @Input()
    public data: string;

    @Input()
    public title: string;

    @Input()
    public allowDownload: boolean = true;

    public fileNameDownload: string = 'filename.png';

    private readonly modal = inject(NgbActiveModal);

    public close(): void {
        this.modal.dismiss();
    }

    public download(qrCode: QRCode): void {
        const link = document.createElement('a');
        link.download = this.fileNameDownload;
        const url = qrCode.qrcElement.nativeElement.querySelector("canvas").toDataURL();
        link.href = url;
        link.click();
    }
}