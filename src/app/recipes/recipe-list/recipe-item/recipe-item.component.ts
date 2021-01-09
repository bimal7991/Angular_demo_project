import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../recipe-service';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor(private recipeService:RecipeService) { }
   
  @Input() recipe:Recipe;
 

  onSelected(){
         this.recipeService.recipeSelected.emit(this.recipe);
  }  

  ngOnInit(): void {
  }

}
