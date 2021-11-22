import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingService} from "../../services/shopping-service/shopping.service";
import { Subscription } from "rxjs";



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  searchText = '';
  private subscription: Subscription;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditIngredient(id: number) {
    this.shoppingService.startedEditing.next(id);
  }


}
