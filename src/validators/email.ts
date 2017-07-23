import { FormControl } from '@angular/forms';

export class EmailValidator {

  static isValid(control: FormControl){
    const re = /^\S+@[a-zA-Z_.]+?\.[a-zA-Z]{2,3}$/.test(control.value);

//  Testing validators
//  /^\w+@[a-zA-Z_.]+?\.[a-zA-Z]{2,3}$/.test(control.value);
//  ^\S+@\S+[\.][0-9a-z]+$
    if (re){
      return null;
    }

    return {
      "invalidEmail": true
    };

  }
}
