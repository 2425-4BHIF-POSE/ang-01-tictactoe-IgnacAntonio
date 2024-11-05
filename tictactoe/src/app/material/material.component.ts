import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {
  SIZE = 3;
  board: string[][] = [];
  counter = 0;
  message = "";
  currentPlayer: string = 'X';
  winner: string | null = null;

  gridTemplateColumns = "";
  constructor() {
    this.initBoard();
    this.gridTemplateColumns = `repeat(${this.SIZE}, auto)`;
    this.loadMessage();
  }

  initBoard(): void {
    for (let i = 0; i < this.SIZE; i++) {
      const row = [];
      for (let j = 0; j < this.SIZE; j++) {
        row.push("");
      }
      this.board.push(row);
    }
  }

  handleCellClick(rowIndex: number, colIndex: number) {
    if (!this.board[rowIndex][colIndex] && !this.winner) {
      this.board[rowIndex][colIndex] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  saveMessage(message: string): void {
    localStorage.setItem("tictactoeMessage", this.message);
  }

  checkWinner(): boolean {
    for (let i = 0; i < this.SIZE; i++) {
      if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2] && this.board[i][0] !== "") {
        return true;
      }
      if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i] && this.board[0][i] !== "") {
        return true;
      }
    }
    if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== "") {
      return true;
    }
    if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== "") {
      return true;
    }
    return false;
  }

  getSymbol() {
    return this.counter % 2 == 0 ? "X" : "O";
  }

  checkDraw() {
    return this.counter == this.SIZE * this.SIZE;
  }

  loadMessage(): void {
    const saveMessage = localStorage.getItem("tictactoeMessage");
    if (saveMessage) {
      this.message = saveMessage;
    }
  }

  resetGame(): void {
    localStorage.removeItem("tictactoeMessage");
    window.location.reload();
  }
}
