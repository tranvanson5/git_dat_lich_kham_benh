import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, delay, of } from 'rxjs';

@Component({
    selector: 'app-qr-scanner',
    templateUrl: './qr-scanner.component.html',
    styles: [`
        :host ::ng-deep {
            video {
                width: 300px !important;
                height: 300px !important;
            }

        }
    `]
})
export class QRScannerComponent implements OnDestroy {

    private subscription: Subscription;
    private readonly audio = new Audio('assets/sound/beep.mp3')

    @Input()
    public offCamAfterSuccess: boolean;

    @Input()
    public autoOpenCam: boolean;

    @Input()
    public timeOpenCam: number;

    @Input()
    public isBeep: boolean;

    @Output()
    public success = new EventEmitter<string>();

    @ViewChild('scanner')
    public scanner: ZXingScannerComponent;

    public enabled: boolean = true;

    public allowedFormats = [ BarcodeFormat.QR_CODE  ];

    constructor(
        private toastrService: ToastrService
    ) {}

    public scanSuccess(event: string):void {
        this.success.emit(event);

        if (this.isBeep) {
            this.audio.play();
        }

        if (this.offCamAfterSuccess) {
            this.enabled = false;
            if (this.autoOpenCam) {
                this.subscription = of(true)
                    .pipe(delay(this.timeOpenCam ?? 1000))
                    .subscribe(res => this.restartCam())

            }
        }
    }

    public scanError(event): void {
        this.toastrService.error('Quét lỗi.')
    }

    public restartCam(): void {
        this.scanner.updateVideoInputDevices().then(res => {
            this.scanner.startScan(res[0]);
        })
        this.enabled = true;
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
