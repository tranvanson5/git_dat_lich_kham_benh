import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppointmentContainer } from "./appointment.container";
import { AuthGuard } from "src/app/base/core/guard/auth.guard";
import { AuthorizateGuard } from "src/app/base/core/guard/authorizate.guard";
import { ScannerAppointmentContainer } from "./containers/scanner-appointment/scanner-appointment.container";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppointmentContainer,
                canActivate: [AuthGuard, AuthorizateGuard],
            },
            {
                path: 'scanner',
                component: ScannerAppointmentContainer,
                canActivate: [AuthGuard, AuthorizateGuard],
       }
        ])
    ],
    exports: [RouterModule]
})
export class CategoryRoutingModule {}