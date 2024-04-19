import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invertHexColor',
  standalone: true,
})
export class InvertHexColorPipe implements PipeTransform {
  transform(hexColor: string) {
    hexColor = hexColor.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => {
        return r + r + g + g + b + b;
      }
    );

    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)!;

    const r = parseInt(rgb[1], 16);
    const g = parseInt(rgb[2], 16);
    const b = parseInt(rgb[3], 16);

    const invertedR = 255 - r;
    const invertedG = 255 - g;
    const invertedB = 255 - b;

    const inverted =
      '#' +
      ((1 << 24) + (invertedR << 16) + (invertedG << 8) + invertedB)
        .toString(16)
        .slice(1);

    return inverted;
  }
}
