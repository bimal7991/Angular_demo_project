import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@ViewChild('nameInput') nameInputRef:ElementRef

@ViewChild('amountInput') amountInputRef:ElementRef

@Output() ingredientAdded=new EventEmitter<Ingredients>();
 onAdded(){
      let ingname=this.nameInputRef.nativeElement.value;
      let ingamount=this.amountInputRef.nativeElement.value;
      const newIngredient=new Ingredients(ingname,ingamount);  

      this.ingredientAdded.emit(newIngredient);
 }

  constructor() { }

  ngOnInit(): void {
  }

}
