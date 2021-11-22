import { Injectable } from '@angular/core';
import {Recipe} from "../../recipes/recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingService} from "../shopping-service/shopping.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Apple Cider Pancakes',
      'Adding apple cider and mulling spices is an easy way to transform plain old pancake mix. These apple cider pancakes have a pronounced flavor and lots of moisture, which makes for one special stack of flapjacks. \n' +
      '\n',
      'https://3emsiq36oenj2cmlhdjc290x-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/jason-reed-apple-cider-pancakes.jpg',
    [
      new Ingredient('Pancakes mix', 1),
      new Ingredient('Apple Cider', 1),
      new Ingredient('Ground Cinnamon', 1),
      new Ingredient('Ground Nutmeg', 1),
      new Ingredient('Brown Sugar', 1),
      new Ingredient('Vanilla Extract', 1)
    ]),
    new Recipe('Spiked Caramel Apple Cider',
      'Caramel apple ice cream topping gets a grown-up twist when it\'s combined with apple cider, rum, and warming spices. This drink comes together in the slow cooker, making it perfect for a get-together on a chilly night. ',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2016%2F12%2F7072056.jpg',
      [
        new Ingredient('Apple Cider', 1),
        new Ingredient('Caramel ice cream topping', 1),
        new Ingredient('Turbinado sugar', 1),
        new Ingredient('Kosher salt', 1),
        new Ingredient('Apple pie spice', 1),
        new Ingredient('Spice rum', 1),
        new Ingredient('Cinnamon sticks', 8)
      ]),
    new Recipe('Ashley\'s Apple Cider Doughnuts',
      'These flavorful cake doughnuts get so much moisture from apple cider that they\'re just as delicious and tender a few days later. For the best possible flavor, be sure to reduce the cider to ¼ cup and don\'t substitute in apple juice or cider concentrate.\n' +
      '\n',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1949773.jpg&w=596&h=596&c=sc&poi=face&q=85',
      [])
  ]
  constructor(private shoppingService: ShoppingService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(title: string, description: string, imgPath: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, imgPath, ingredients));
    this.recipesChanged.next(this.recipes.slice())
  }

  editRecipe(id: number, title: string, description: string, imgPath: string, ingredients: Ingredient[]) {
    let recipe = this.recipes[id];
    recipe.title = title;
    recipe.description = description;
    recipe.imagePath = imgPath;
    recipe.ingredients = [...ingredients];
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
