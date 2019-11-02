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

  private checkRows(boardState) {
    for (let i = 0; i < boardState.length; i++) {
      if (
        boardState[i][0] === boardState[i][1] &&
        boardState[i][0] === boardState[i][2] &&
        boardState[i][0] !== null
      ) {
        return boardState[i][0];
      }
    }

    return null;
  }

  private checkColumns(boardState) {
    // first, transpose the 2d array
    const arr = boardState[0].map((col, i) => boardState.map(row => row[i]));
    for (let i = 0; i < boardState.length; i++) {
      if (
        arr[i][0] === arr[i][1] &&
        arr[i][0] === arr[i][2] &&
        arr[i][0] !== null
      ) {
        return arr[i][0];
      }
    }

    return null;
  }

  private checkDiagonals(boardState) {
    const majorDiagonalValues = [];
    const minorDiagonalValues = [];
    for (let i = 0; i < boardState.length; i++) {
      majorDiagonalValues.push(boardState[i][i]);
      minorDiagonalValues.push(boardState[i][boardState.length - i - 1]);
    }

    if (
      majorDiagonalValues[0] === majorDiagonalValues[1] &&
      majorDiagonalValues[0] === majorDiagonalValues[2] &&
      majorDiagonalValues[0] !== null
    ) {
      return majorDiagonalValues[0];
    } else if (
      minorDiagonalValues[0] === minorDiagonalValues[1] &&
      minorDiagonalValues[0] === minorDiagonalValues[2] &&
      minorDiagonalValues[0] !== null
    ) {
      return minorDiagonalValues[0];
    }

    return null;
  }

  getGameState(boardState) {
    let winner;

    winner =
      this.checkRows(boardState) ||
      this.checkColumns(boardState) ||
      this.checkDiagonals(boardState);

    if (winner) {
      return winner;
    }

    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < boardState[i].length; j++) {
        if (boardState[i][j] === null) {
          return "in progress";
        }
      }
    }

    return "draw";
  }
}
