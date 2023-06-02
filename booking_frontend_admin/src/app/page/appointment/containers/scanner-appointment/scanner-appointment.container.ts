import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QRScannerComponent } from 'src/app/base/core/components/scanner/qr-scanner.component';
import { SpinnerService } from 'src/app/base/core/services/spinner.service';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentDetailComponent } from '../../components/appointment-detail/appointment-detail.component';

@Component({
    selector: 'app-scanner-appointment',
    templateUrl: './scanner-appointment.container.html',
    styles: [`
        :host ::ng-deep zxing-scanner {
            display: flex;
            justify-content: center;
        }
    `]
})
export class ScannerAppointmentContainer {
    
    @ViewChild('scanner')
    public qrScanner: QRScannerComponent;

    constructor(
        private matDialog: MatDialog,
        private spinnerService: SpinnerService,
        private appointmentService: AppointmentService
    ) {}
    

    public scanSuccess(result: string): void {
        this.spinnerService.isLoading(true);
        this.appointmentService.getById(result)
            .subscribe(res => {
                this.spinnerService.isLoading(false);
                this.matDialog.open(AppointmentDetailComponent, {
                    width: '500px',
                    data: res
                })
                .afterClosed()
                .subscribe(res => {
                    this.qrScanner.restartCam();
                })
            })
    }

}