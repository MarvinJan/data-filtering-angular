import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  usersUrl = "../../assets/users.json";

  getUsersData(): Observable<any> {
    return this.http.get(this.usersUrl);
  }

  constructor(private http: HttpClient) {}
}
