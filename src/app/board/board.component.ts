import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  squares!: any[];
  xIsNext!: boolean;
  winner!: string | null;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? "X": "O";
  }

  makeMove(idx: number){
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner(): string | null {
    const winningLines = [
      [0, 1, 2],
      [0, 3, 6],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for(let i = 0; i < winningLines.length; i++) {
      const [a,b,c] = winningLines[i];
      if(
        this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]
      ) return this.squares[a];
    }

    return null;
  }
}
