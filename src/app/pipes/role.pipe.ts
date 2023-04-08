import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'role'
})
export class RolePipe implements PipeTransform {

    transform(value: any, ...args: unknown[]): any {
        if (value == "admin") {
            return "مسير";
        }
        else if (value == "operator") {
            return "مشغل";
        }
        else if (value == "user") {
            return "مستخدم";
        }
    }
}