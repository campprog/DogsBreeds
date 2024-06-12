
import { HttpClient } from "@angular/common/http";
import { User } from "../Models/user.model";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    userLogged: User | null = null;

    constructor(private http: HttpClient, private route: Router) { }

    public isUserLogged(): boolean {
        if (this.userLogged != null)
            return true;
        else
            return false;
    }

    public login(username: string, password: string): Observable<boolean> {
        const url: string = `http://localhost:3000/users?username=${username}&password=${password}`;
        return this.http.get(url).pipe(
            map((response: any) => {
                response as User;
                if (response.length != 0) {
                    this.userLogged = response[0];
                    return true;
                } else {
                    return false;
                }
            })
        );
    }



    public register(user: User): Observable<User> {
        return this.http.post(`http://localhost:3000/users`, user).pipe(map((response: any) => {
            return new User(response)

        }))
    }


    public logout(): void {

        this.userLogged = null;
        this.route.navigate(['userLikes']);
        //redirecionei para o userlike e assim ativa o canActivate 

    }

    public deleteAccount(user: User): Observable<User> {
        return this.http.delete<User>(`http://localhost:3000/users/${user.id}`)

    }
}
