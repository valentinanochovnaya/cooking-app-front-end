import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from "./ingredient.model";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: Ingredient[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => {
      return item.name.toLocaleLowerCase().includes(searchText);
    });
  }
}
