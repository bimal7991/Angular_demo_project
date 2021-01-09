import { Component, OnInit, Output } from '@angular/core';
import { RecipeService } from './recipe-service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[RecipeService]
})
export class RecipesComponent implements OnInit {


  selectedRecipe : Recipe;
constructor(private recipeService:RecipeService){
   this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>{
     this.selectedRecipe=recipe;
   })
}

  

  ngOnInit(): void {
  }

}
