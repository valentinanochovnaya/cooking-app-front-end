import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../services/recipe-service/recipe.service";
import {NotificationService} from "../../services/notification-service/notification-service.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  form: FormGroup;
  get controls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let imgPath = '';
    let ingredients = new FormArray([]);
    if(this.editMode) {
      const recipe =  this.recipeService.getRecipe(this.id);
      recipeName = recipe.title;
      recipeDescription = recipe.description;
      imgPath = recipe.imagePath;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients ) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    this.form = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      imgPath: new FormControl(imgPath, [Validators.required]),
      ingredients: ingredients
    });

  }

  onFieldForIngredientAdd() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('',[Validators.required, Validators.min(1)])
      })
    )
  }


  onSubmit() {
    const title = this.form.get('name')?.value;
    const description = this.form.get('description')?.value;
    const imgPath = this.form.get('imgPath')?.value;
    const ingredientsFromForm = (<FormArray>this.form.get('ingredients')).value
    const ingredients = [...ingredientsFromForm];
    if (!this.editMode) {
      this.recipeService.addRecipe(title, description, imgPath, ingredients);
    }
    else {
      let id = this.id;
      this.recipeService.editRecipe(id, title, description, imgPath, ingredients);
    }
    this.router.navigate(['recipes']);
  }

  cancel() {
    this.router.navigate(['recipes', this.id]);
  }

  removeIngredient(id: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(id);
  }

  onSuccess(message: string) {
    this.notifyService.onSuccess(message);
  }
}
