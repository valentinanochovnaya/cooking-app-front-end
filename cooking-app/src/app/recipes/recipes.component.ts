import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "../services/recipe-service/recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
