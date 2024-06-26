import { AuthorityPipe } from './pipes/authority.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionGridComponent } from './components/cells/action-grid/action.component';
import { ButtonCreateComponent } from './components/buttons/create/button-create.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ConfirmComponent } from './components/popup-confirm/popup-confirm.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SafePipe } from './pipes/safe.pipe';
import { StatusComponent } from './components/cells/status/status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewImageDirective } from './directives/preview-image.directive';
import { ResourcePipe } from './pipes/resource.pipe';
import { QRScannerComponent } from './components/scanner/qr-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ConfirmOtpComponent } from './components/confirm-otp/confirm-otp.component';

const imports: any = [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ZXingScannerModule,
    FormsModule,
    ReactiveFormsModule
]
const declarations: any = [
    SpinnerComponent,
    PaginationComponent,
    ActionGridComponent,
    ConfirmComponent,
    ButtonCreateComponent,
    StatusComponent,
    QRScannerComponent,
    ConfirmOtpComponent,

    // pipes
    SafePipe,
    AuthorityPipe,
    ResourcePipe,

    // directives
    PreviewImageDirective,
]
const exports: any = [
    SpinnerComponent,
    PaginationComponent,
    ActionGridComponent,
    ConfirmComponent,
    ButtonCreateComponent,
    StatusComponent,
    QRScannerComponent,
    ConfirmOtpComponent,

    // pipes
    SafePipe,
    AuthorityPipe,
    ResourcePipe,

    // directives
    PreviewImageDirective,
]

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports
})
export class CoreModule {}
