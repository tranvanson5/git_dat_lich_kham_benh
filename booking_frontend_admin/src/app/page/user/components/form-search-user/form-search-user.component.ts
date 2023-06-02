import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { STATUS } from "src/app/base/_helpers/constant";
import { UserModel } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'app-form-search-user',
    templateUrl: './form-search-user.component.html',
    styleUrls: ['./form-search-user.component.scss']
})
export class FormSearchUserComponent implements OnInit {

    @Output() search: EventEmitter<UserModel> = new EventEmitter();

    public formGroup: UntypedFormGroup;
    public _status: StatusModel[] = STATUS;
    public authorities$: Observable<any>

    constructor(
        private fb: UntypedFormBuilder,
        private userService: UserService,
    ) {}

    public ngOnInit(): void {
        this.authorities$ = this.userService.getListAuthority();
        this.initForm();
        this.submit();
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            username: [null],
            status: [null],
            authority: [null],
        });
    }

    public submit(): void {
        this.search.emit(this.formGroup.value);
    }
}