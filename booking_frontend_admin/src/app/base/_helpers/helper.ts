import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from "@angular/forms";

export function recursive(f: UntypedFormGroup | UntypedFormArray) {
    for (const i in f.controls) {
        if (typeof f.controls[i].value === 'string') {
            if (Boolean(f.controls[i].value)) {
                f.controls[i].value = f.controls[i].value.trim();
            }
        }

        if (f.controls[i] instanceof UntypedFormControl) {
            f.controls[i].markAsDirty();
            f.controls[i].updateValueAndValidity();
        } else {
            recursive(f.controls[i]);
        }
    }
};