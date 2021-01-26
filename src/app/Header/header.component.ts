import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataBase } from "../shared/dataStorage.service";
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
   
  })
export class HeaderComponent implements OnInit,OnDestroy{
  collapsed = true;
  isAuthenticated=false;
  userSub:Subscription;

  ngOnInit(){
    this.userSub=this.authService.user.subscribe(user=>{
        this.isAuthenticated=!!user;
        console.log(!user);
        console.log(!!user)
    })
  }
  constructor(private storage:DataBase,private authService:AuthService){}
  onSaveData(){
         this.storage.saveData();
  }
  onFetchData(){
    this.storage.setRecipes().subscribe();
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }

}