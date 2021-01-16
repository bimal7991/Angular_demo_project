

import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingService } from '../shopping-list/shopping-llist.service';
import {Recipe} from './recipes.model'

@Injectable()
export class RecipeService{
  recipeChanged=new Subject<Recipe[]>();
  
   private recipes: Recipe[]=[
        new Recipe('A test Recipe',
        'A small Description',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Bx0u8nhD3HgfJtVhL6GQ4L9w-5qr3NWkGw&usqp=CAU',
        [ new Ingredients('Meat ' ,1),
        new Ingredients('Frech ',3)
      ]),
        new Recipe('A Frech toast','A small Description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Bx0u8nhD3HgfJtVhL6GQ4L9w-5qr3NWkGw&usqp=CAU',
        [
          new Ingredients('Meat ' ,3),
           new Ingredients('Frech ',3)
        ]),
        new Recipe('A Smosa','Delicious samosa with chatney','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7QCcOwqOwMPbBpgcUhc6KJ8Zjv0YAjJNL7w&usqp=CAU',
        [
          new Ingredients('Meat ' ,3),
           new Ingredients('Frech ',3)
        ])
      ];
      
constructor(private shopService:ShoppingService){}

    getRecipes(){
        return this.recipes.slice();
    } 
    getRecipe(id:number){
     return this.recipes[id];
  } 
  addIngredientToShop(ingredients:Ingredients[]){
      this.shopService.addIngredient(ingredients);
  }
  addRecipe(recipe:Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice())
  }
   editRecipe(id:number,recipe:Recipe){
         this.recipes[id]=recipe;
         this.recipeChanged.next(this.recipes.slice())
   }
   deleteRecipes(index:number){
     this.recipes.splice(index,1);
     this.recipeChanged.next(this.recipes.slice())
   }

}