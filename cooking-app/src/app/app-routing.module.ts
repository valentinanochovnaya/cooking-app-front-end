import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {ShoppingListComponent} from "./shopping/shopping-list/shopping-list.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeDetailsComponent} from "./recipes/recipe-details/recipe-details.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch:'full' },
  { path: 'recipes', component: RecipesComponent, children: [
      { path: 'add', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ] },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
