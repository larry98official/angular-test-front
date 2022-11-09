import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})

export class UserPipe implements PipeTransform {

  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

}
