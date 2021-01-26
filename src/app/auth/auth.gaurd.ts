import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import {  Observable } from "rxjs";
import { AuthService } from "./auth.service";

import {map, take, tap} from "rxjs/operators"
import { Injectable } from "@angular/core";



@Injectable({providedIn:'root'})
export class AuthGaurd implements CanActivate{

    constructor(private authService:AuthService,private router:Router){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
        return this.authService.user.pipe(take(1),  map(user=>{
            const isauth=!!user;
            if(isauth){
                return true
            }
            return this.router.createUrlTree(['/auth'])

        })
        // ,tap(isUser=>{
        //     if(!isUser)
        //    this.router.navigate(['/auth'])
        // })
        )
      }
} 