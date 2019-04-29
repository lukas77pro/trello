import { Component, Input } from '@angular/core';
import { Team } from 'src/model/team';
import { BoardService } from 'src/service/board.service';
import { Board } from 'src/model/board';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent {
  boards$: Observable<Board[]>;
  boardTitle = new FormControl('');
  teamId: string;

  @Input() set team(team: Team) {
    this.teamId = team ? team.id : '';
    this.boards$ = this.boardService.getAll(this.teamId);
  }

  constructor(private boardService: BoardService) {
  }

  createBoard(boards: Board[]) {
    this.boardService.create(this.boardTitle.value, this.teamId).subscribe(board => {
      boards.push(board);
      this.boardTitle.setValue('');
    });
  }

  deleteBoard(id: string, boards: Board[]) {
    console.log(id);
    this.boardService.delete(id).subscribe(() => {
      boards.splice(boards.map(board => board.id).indexOf(id), 1);
    });
  }

  onBoardDropped(event: CdkDragDrop<Board[]>, boards: Board[]) {
    moveItemInArray(boards, event.previousIndex, event.currentIndex);
    this.boardService.move(event.previousIndex, event.currentIndex).subscribe();
  }
}
