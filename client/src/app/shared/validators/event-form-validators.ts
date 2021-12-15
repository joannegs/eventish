import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const dateAndTimeEventValidator: ValidatorFn = (eventForm: AbstractControl) => {
    let startsAtDate = eventForm.get('initialDate')?.value;
    let startsAtHour = eventForm.get('initialHour')?.value;
    let endsAtHour = eventForm.get('finalHour')?.value;

    let startsAt = moment(`${startsAtDate?.day}-${startsAtDate?.month}-${startsAtDate?.year} 
                  ${startsAtHour?.hour}:${startsAtHour?.minute}`, "DD-MM-YYYY hh:mm");

    if (startsAt.isBefore(moment())) {
        eventForm.get('initialDate')?.setErrors({ pastDateError: true });
        return { pastDateError: true }

    } else if (eventForm.get('finalDateInputDisplay')?.value === false) {
        let endsAt = moment(`${startsAtDate?.day}-${startsAtDate?.month}-${startsAtDate?.year}
                    ${endsAtHour?.hour}:${endsAtHour?.minute}`, "DD-MM-YYYY hh:mm");

        if (startsAt.isAfter(endsAt)) {
            eventForm.get('finalHour')?.setErrors({ finalHourBeforeInitial: true });
            return { finalHourBeforeInitial: true };
        }
    } else {
        let endsAtDate = eventForm.get('finalDate')?.value;

        if(!endsAtDate) eventForm.get('finalDate')?.setErrors({ required: true });

        let endsAt = moment(`${endsAtDate?.day}-${endsAtDate?.month}-${endsAtDate?.year}
                  ${endsAtHour?.hour}:${endsAtHour?.minute}`, "DD-MM-YYYY hh:mm");

        if (endsAt.isBefore(startsAt)) {
            eventForm.get('finalDate')?.setErrors({ finalDateBeforeInitial: true });
            return { finalDateBeforeInitial: true };
        }
    }

    return null;
}


