import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model";



export class ShoppingService{

   ingredientsAdded=new EventEmitter<Ingredients[]>();

    ingredients :Ingredients[]=[

        new Ingredients('Apples',10),
        new Ingredients('Mango',5)
      ];
      getIngredients(){
          return this.ingredients.slice();
      }
      onIngredientAdded(ingredient:Ingredients){
         this.ingredients.push(ingredient);
         this.ingredientsAdded.emit(this.ingredients.slice());
      }
      
      addIngredient(ingredients:Ingredients[]){
        //   for(let ingredient of ingredients){
        //       this.onIngredientAdded(ingredient);
        //   }
            this.ingredients.push(...ingredients);
            this.ingredientsAdded.emit(this.ingredients.slice());

      }
      
}