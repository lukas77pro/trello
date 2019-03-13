import { Component } from '@angular/core';
import { BoardService } from 'src/service/board.service';
import { FormControl } from '@angular/forms';
import { Board } from 'src/model/board';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  boardName = new FormControl('');
  boards: Board[];

  constructor(private boardService: BoardService) {
    boardService.getAll().pipe(take(1)).subscribe(boards => this.boards = boards);
  }

  createBoard() {
    this.boardService.create(this.boardName.value).pipe(take(1))
      .subscribe(board => this.boards.push(board));
  }

  deleteBoard(id: string) {
    this.boardService.delete(id).pipe(take(1))
      .subscribe(() => this.boards = this.boards.filter(board => board.id !== id));
  }
}
