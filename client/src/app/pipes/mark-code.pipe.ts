import { Pipe, PipeTransform } from '@angular/core';
import { MainDataService } from '../servises/main-data-.service';

@Pipe({
  name: 'markCode'
})



export class MarkCodePipe implements PipeTransform {

  constructor(
    public _mainData: MainDataService
  ) { }


  transform(value: string, inpValue: string): unknown {

    if (inpValue == '') {
      return value
    }

    const lowerCaseValue = inpValue[0].toLocaleLowerCase()
    const UpperCase = inpValue[0].toUpperCase()

    if (value.includes(lowerCaseValue) || value.includes(UpperCase)) {
      // צריך לטפל שהוא יקלוט גם אותיות גדולות בתחילת מילה 
      value = value.toLocaleLowerCase()
      value = value.replace(inpValue, `<mark class="marker" >${inpValue}</mark>`)
      return value

    } else {
      return value
    }
  }
}
