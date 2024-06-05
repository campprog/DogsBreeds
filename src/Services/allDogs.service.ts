import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Dog } from "../Models/dog.model";
import { Injectable } from "@angular/core";

@Injectable()
export class AllDogsService {

    constructor(private http: HttpClient) { }

    getDogs(): Observable<Dog[]> {
        return this.http.get(`http://localhost:3000/dogs`).pipe(map((response: any) => {
            return response.map((d: any) => new Dog(d))

        }))
    }



    searchDog(search: string): Observable<Dog[]> {
        return this.http.get(`http://localhost:3000/dogs?name_like=${search}`).pipe(map((response: any) => {
            return response.map((cao: any) => new Dog(cao));
        }))

    }


}