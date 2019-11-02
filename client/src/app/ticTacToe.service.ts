import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class TicTacToeService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getComputerMove(gameState: any): Observable<any> {
    return this.http.post(this.apiUrl, gameState);
  }
}
