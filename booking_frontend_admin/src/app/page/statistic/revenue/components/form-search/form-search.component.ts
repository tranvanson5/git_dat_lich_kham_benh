import { UntypedFormBuilder } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-form-search-statistic',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class FormSearchStatistic implements OnInit {

    @Output() statistic: EventEmitter<{}> = new EventEmitter();
    formGroup: UntypedFormGroup;
    now: Date = new Date();

    constructor(
        private fb: UntypedFormBuilder,
    ) {}

    public ngOnInit(): void {
        this.formGroup = this.fb.group({
            year: [this.now.getFullYear()],
        })
        this.statistic.emit(this.formGroup.get('year').value);
    }
}