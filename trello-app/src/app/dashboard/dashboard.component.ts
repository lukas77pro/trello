import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Board } from '../../model/board';
import { BoardService } from '../../service/board.service';
import { EventService } from '../../event/event.service';
import { BoardCreatedEvent, BoardDeletedEvent } from '../../event/events';
import { CdkDragDrop } from '@angular/cdk/drag-drop/typings/drag-events';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Team } from 'src/model/team';
import { TeamService } from 'src/service/team.service';
import { MatDialog } from '@angular/material';
import { CreateTeamComponent } from '../team/create-team/create-team.component';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  boardTitle = new FormControl('');
  teams: Team[];
  boards: Board[];

  constructor(private boardService: BoardService,
              private teamService: TeamService,
              private eventService: EventService,
              private matDialog: MatDialog) {
    boardService.getAll().subscribe(boards => this.boards = boards);
    teamService.getAll().subscribe(teams => this.teams = teams);
  }

  createBoard() {
    this.boardService.create(this.boardTitle.value).subscribe(board => {
      this.boards.push(board);
      this.boardTitle.setValue('');
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

  openCreateTeamDialog() {
    this.matDialog.open(CreateTeamComponent).afterClosed().pipe(
        filter(team => team)
      ).subscribe((team: Team) => this.teams.push(team));
  }
}
