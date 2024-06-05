import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { User } from "../Models/user.model";
import { Injectable } from "@angular/core";
@Injectable()
export class UserServices {
    //aqui faz as request da api para ir buscar os likes e meter na pagina dos likes do user


    constructor(private http: HttpClient) { }
    public allUsers(): Observable<User[]> {
        return this.http.get(`http://localhost:3000/users`).pipe(map((response: any) => {
            return response.map((u: any) => new User(u))
        }))
    }
}