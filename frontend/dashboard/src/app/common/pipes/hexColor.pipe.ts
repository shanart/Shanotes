import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'hex_color'
})
export class HexColorPipe implements PipeTransform {
    transform(color: string) {
        return `#${color}`;
    }
}
