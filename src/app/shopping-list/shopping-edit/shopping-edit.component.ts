import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingService } from '../shopping-llist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
// @ViewChild('nameInput') nameInputRef:ElementRef

// @ViewChild('amountInput') amountInputRef:ElementRef

 @ViewChild('f') sForm:NgForm;
editIngredient:Ingredients;
editMode=false;
editIndex:number;
subscription:Subscription;
 onAdded(form:NgForm){
        const value=form.value;
     
      const newIngredient=new Ingredients(value.name,value.amount);  
      if(this.editMode){
        this.shoppingService.onUpdate(this.editIndex,newIngredient)
      }
      else{
      this.shoppingService.onIngredientAdded(newIngredient);
      }
      this.editMode=false;
      this.sForm.reset()
      
 }
 onClear(){
  this.editMode=false;
  this.sForm.reset()
 }
 onDelete(){
   this.onClear();
   this.shoppingService.onDeeleteIngredient(this.editIndex);
 }

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
           this.subscription=this.shoppingService.startEdited.subscribe((index:number)=>{
                  this.editIndex=index;
                  this.editMode=true;
                  this.editIngredient=this.shoppingService.getIngredient(index);
                   this.sForm.setValue({
                     name:this.editIngredient.name,
                     amount:this.editIngredient.amount
                   })
           })
  }
  ngOnDestroy(){
      this.subscription.unsubscribe();
  }

}
