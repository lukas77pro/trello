import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Board } from '../../model/board';
import { BoardService } from '../../service/board.service';
import { EventService } from '../../event/event.service';
import { BoardCreatedEvent, BoardDeletedEvent } from '../../event/events';
import { CdkDragDrop } from '@angular/cdk/drag-drop/typings/drag-events';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  boardTitle = new FormControl('');
  boards: Board[];

  constructor(private boardService: BoardService, private eventService: EventService) {
    boardService.getAll().subscribe(boards => this.boards = boards);
  }

  createBoard() {
    this.boardService.create(this.boardTitle.value).subscribe(board => {
      this.boards.push(board);
      this.eventService.push(new BoardCreatedEvent(board));
    });
  }

  deleteBoard(id: string) {
    this.boardService.delete(id).subscribe(() => {
      this.boards = this.boards.filter(board => board.id !== id);
      this.eventService.push(new BoardDeletedEvent(id));
    });
  }

  onBoardDropped(event: CdkDragDrop<Board[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.move(event.previousIndex, event.currentIndex).subscribe();
  }
}
