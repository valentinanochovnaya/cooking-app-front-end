import { Injectable } from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Pear', 5),
    new Ingredient('Tomatoes', 3)
  ]

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients[id];
  }

  addIngredient(item: Ingredient) {
    this.ingredients.push(item);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredient(id: number, name: string, amount: number) {
    const ingredient = this.ingredients[id];
    ingredient.name = name;
    ingredient.amount = amount;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
