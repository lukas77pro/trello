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
import { Observable } from 'rxjs';
import { TeamComponent } from '../team/team.component';
import { User } from 'src/model/user';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  teams$: Observable<Team[]>;

  constructor(private userService: UserService,
              private teamService: TeamService,
              private matDialog: MatDialog) {
    this.teams$ = this.teamService.getAll();
  }

  openCreateTeamDialog(teams: Team[]) {
    this.matDialog.open(CreateTeamComponent).afterClosed().pipe(
        filter(team => team)
      ).subscribe((team: Team) => teams.push(team));
  }

  openTeamDialog(team: Team) {
    this.matDialog.open(TeamComponent, {
      width: '480px',
      data: team
    });
  }
}
