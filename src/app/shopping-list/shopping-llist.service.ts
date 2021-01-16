import { EventEmitter } from "@angular/core";

import { Ingredients } from "../shared/ingredients.model";

import {Subject} from "rxjs"

export class ShoppingService{

   ingredientsAdded=new Subject<Ingredients[]>();

   startEdited=new Subject<number>();

    ingredients :Ingredients[]=[

        new Ingredients('Apples',10),
        new Ingredients('Mango',5)
      ];
      getIngredients(){
          return this.ingredients.slice();
      }
      onIngredientAdded(ingredient:Ingredients){
         this.ingredients.push(ingredient);
         this.ingredientsAdded.next(this.ingredients.slice());
      }

      getIngredient(index){
        return this.ingredients[index];
      }
      
      addIngredient(ingredients:Ingredients[]){
        //   for(let ingredient of ingredients){
        //       this.onIngredientAdded(ingredient);
        //   }
            this.ingredients.push(...ingredients);
            this.ingredientsAdded.next(this.ingredients.slice());

      }
      onUpdate(index:number,newIngredient:Ingredients){
        this.ingredients[index]=newIngredient;
        this.ingredientsAdded.next(this.ingredients.slice())
      }
      onDeeleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsAdded.next(this.ingredients.slice())
      }
}