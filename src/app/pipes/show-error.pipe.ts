import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showError'
})
export class ShowErrorPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(value){
      const errors = Object.keys(value);
      if(errors.includes('maxlength')) {
        return 'Max Length is '+ value['maxlength'].requiredLength
      }
      else if(errors.includes('required')) {
          return 'This field is required'
        }
        else if(errors.includes('minlength')) {
          return 'Min Length is '+ value['minlength'].requiredLength
        }
        else if(errors.includes('email')) {
            return 'Email is invalid'
          }
          else if(errors.includes('matching')) {
            return 'Password and Confirm Password are not the same'
          }
    }
    return null;
  }

}
