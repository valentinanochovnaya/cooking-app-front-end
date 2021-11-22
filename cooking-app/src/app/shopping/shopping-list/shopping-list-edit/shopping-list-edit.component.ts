import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Ingredient} from "../../../shared/ingredient.model";
import {ShoppingService} from "../../../services/shopping-service/shopping.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {NotificationService} from "../../../services/notification-service/notification-service.service";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  form: FormGroup;
  private subscription: Subscription;
  editMode = false;
  editedItemId: number;
  editedItem: Ingredient;
  ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    })

    this.subscription = this.shoppingService.startedEditing
      .subscribe(
        (id: number) => {
          this.editMode = true;
          this.editedItemId = id;
          this.editedItem = this.shoppingService.getIngredient(id);
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onItemAdded() {
    const name = this.form.get('name')?.value;
    const amount = this.form.get('amount')?.value
    const ingredient = new Ingredient(name, amount);
    this.shoppingService.addIngredient(ingredient);
    this.notifyService.onSuccess('Ingredient is successfully added!')
  }

  updateItem() {
    const name = this.form.get('name')?.value;
    const amount = this.form.get('amount')?.value
    this.shoppingService.editIngredient(this.editedItemId, name, amount);
    this.notifyService.onSuccess('Ingredient is successfully edited!')
  }

  deleteItem() {
    this.shoppingService.deleteIngredient(this.editedItemId);
    this.notifyService.onSuccess('Ingredient is successfully deleted!')
    this.editMode = false;
    this.clearForm();
  }

  clearForm() {
    this.editMode = false;
    this.form.reset();
  }
}
