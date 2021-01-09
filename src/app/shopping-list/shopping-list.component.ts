import { Component, OnInit } from '@angular/core';

import {Ingredients} from '../shared/ingredients.model'
import { ShoppingService } from './shopping-llist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients :Ingredients[];


  onIngredientAdded(ingredient:Ingredients){
     this.ingredients.push(ingredient);
  }
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingService.getIngredients();
    this.shoppingService.ingredientsAdded.subscribe((ingredients:Ingredients[])=>{
      this.ingredients=ingredients;
      
    })
  }

}
