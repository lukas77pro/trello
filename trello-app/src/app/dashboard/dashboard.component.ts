import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Board } from '../../model/board';
import { BoardService } from '../../service/board.service';
import { EventService } from '../../event/event.service';
import { BoardCreatedEvent, BoardDeletedEvent } from '../../event/events';
import { CdkDragDrop } from '@angular/cdk/drag-drop/typings/drag-events';
import { CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  boardName = new FormControl('');
  boards: Board[];

  constructor(private boardService: BoardService, private eventService: EventService) {
    // boardService.getAll().subscribe(boards => this.boards = boards);
    this.boards = [
      { id: '1', name: 'board1', cardLists: [], order: 0},
      { id: '2', name: 'board2', cardLists: [], order: 1},
      { id: '3', name: 'board3', cardLists: [], order: 2},
      { id: '4', name: 'board4', cardLists: [], order: 3}
    ];
  }

  createBoard() {
    this.boardService.create(this.boardName.value).subscribe(board => {
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

  boardDropped(event: CdkDragDrop<Board[]>) {
    console.log(event);
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }
}
