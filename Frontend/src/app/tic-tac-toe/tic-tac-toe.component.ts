import {Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {DataService} from "../data.service";
import {ResponseData} from "../response-data-interface";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [
    MatToolbar,
    NgForOf,
    MatButton
  ],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent implements OnInit {
  responseData?: ResponseData;
  boxes: string[] = Array(9).fill(''); // Initialize 9 empty boxes
  currentPlayer: string = 'X';
  gameOver: boolean = false;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.responseData = this.dataService.getResponseData();
  }

  handleBoxClick(index: number) {
    if (!this.gameOver) {
      // Check if user is admin
      if (this.responseData?.role === 'admin' || this.boxes[index] === '') {
        if (this.boxes[index] === '') {
          this.boxes[index] = this.currentPlayer;
          this.checkWinner();
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        } else {
          // If the box is not empty, allow an admin to overwrite it
          this.boxes[index] = this.currentPlayer;
          this.checkWinner();
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        }
      }
    }
  }

  checkWinner() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (this.boxes[a] && this.boxes[a] === this.boxes[b] && this.boxes[a] === this.boxes[c]) {
        this.gameOver = true;
        alert(`${this.boxes[a]} wins!`);
        return;
      }
    }

    // Check for tie
    if (this.boxes.every(box => box !== '')) {
      this.gameOver = true;
      alert('It\'s a tie!');
    }
  }

  resetGame() {
    this.boxes = Array(9).fill(''); // Reset board
    this.currentPlayer = 'X'; // Reset current player
    this.gameOver = false; // Reset game over flag
  }

  async navigateToHomePage() {
    await this.router.navigate(['']);
  }
}
