import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe-service";
import { Recipe } from "../recipes/recipes.model";

import {exhaustMap, map, take, tap} from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataBase{


    recipe:Recipe[];
   constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){

   }

   saveData(){
      this.recipe=this.recipeService.getRecipes();
       this.http.put<Recipe[]>('https://recipe-book-ec6e4-default-rtdb.firebaseio.com/recipe.json',this.recipe).
      
       subscribe(response=>{
           console.log(response);
       })

   }
   setRecipes(){


        return this.http.get<Recipe[]>('https://recipe-book-ec6e4-default-rtdb.firebaseio.com/recipe.json').pipe(map(recipes=>{
        return recipes.map(recipe=>{
            return{
                ...recipe,
                ingredients:recipe.ingredients?recipe.ingredients:[]
            }
        })
    }),tap(response=>{
        return this.recipeService.setRecipes(response);
       }))
   }
        
    
    

}