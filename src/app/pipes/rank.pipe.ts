import { Pipe, PipeTransform } from '@angular/core';

/*
 * Append ordinal to numbers 1-3
 * Usage:
 *   value
 * Example:
 *   {{ 23 | ordinal }}
 *   formats to: '23'
 * Example:
 *   {{ 2 | ordinal }}
 *   formats to: '2nd'
*/
@Pipe({name: 'rank'})
export class RankPipe implements PipeTransform {

    transform(n: number) {
       switch (n) {
           case 1: return '1st';
           case 2: return '2nd';
           case 3: return '3rd';
           default: return n;
       }
    }
}
