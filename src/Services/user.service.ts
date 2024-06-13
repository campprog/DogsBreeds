import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { User } from "../Models/user.model";
import { Injectable } from "@angular/core";
@Injectable()
export class UserServices {

    constructor(private http: HttpClient) { }
    allUsers(): Observable<User[]> {
        return this.http.get(`http://localhost:3000/users`).pipe(map((response: any) => {
            return response.map((u: any) => new User(u))
        }))
    }

    addLike(user: User): Observable<User> {
        return this.http.patch<User>(`http://localhost:3000/users/${user.id}`, {
            likes: user.likes
        })
    }

    getOneUser(user: User): Observable<User> {
        return this.http.get(`http://localhost:3000/users/${user.id}`).pipe(map((response: any) => {
            return new User(response)
        }))
    }

    changePassword(user: User): Observable<User> {
        return this.http.patch<User>(`http://localhost:3000/users/${user.id}`, {
            password: user.password
        })

    }

}