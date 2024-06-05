
import { HttpClient } from "@angular/common/http";
import { User } from "../Models/user.model";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    userLogged: User | null = null;

    constructor(private http: HttpClient) { }

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
            return response as User;

        }))
    }


    public logout(): void {
        this.userLogged = null;
    }
}
