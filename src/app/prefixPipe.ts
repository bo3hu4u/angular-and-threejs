import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'default_pref', pure: false})
export class DefaultPrefixPipe implements PipeTransform {

    transform(value: string): string {
        return "default_prefix_" + value;
    }

}