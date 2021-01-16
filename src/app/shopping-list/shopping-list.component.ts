import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import {Ingredients} from '../shared/ingredients.model'
import { ShoppingService } from './shopping-llist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients :Ingredients[];
 private igChangeSub:Subscription;

  onIngredientAdded(ingredient:Ingredients){
     this.ingredients.push(ingredient);
  }
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
   this.ingredients=this.shoppingService.getIngredients();
  this.igChangeSub=this.shoppingService.ingredientsAdded.subscribe((ingredients:Ingredients[])=>{
      this.ingredients=ingredients;
      
    })
  }
  onEditItem(index:number){
            this.shoppingService.startEdited.next(index);
  }


  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

}
