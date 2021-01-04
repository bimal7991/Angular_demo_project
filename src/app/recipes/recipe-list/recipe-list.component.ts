import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Recipe} from '../recipes.model'
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
       
        @Output() recipeWasSelected=new EventEmitter<Recipe>();
       recipes: Recipe[]=[
         new Recipe('A test Recipe','A small Description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Bx0u8nhD3HgfJtVhL6GQ4L9w-5qr3NWkGw&usqp=CAU')
       ];


  onRecipeSelected(recipe:Recipe){
        this.recipeWasSelected.emit(recipe);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
