import { Component} from '@angular/core';
import { Team } from 'src/model/team';
import { TeamService } from 'src/service/team.service';
import { MatDialog } from '@angular/material';
import { CreateTeamComponent } from '../team/create-team/create-team.component';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TeamComponent } from '../team/team.component';
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

  openTeamDialog(teamId: string, teams: Team[]) {
    this.matDialog.open(TeamComponent, {
      width: '480px',
      data: teamId
    }).afterClosed().pipe(
      filter(result => result)
    ).subscribe(() => teams.splice(teams.map(team => team.id).indexOf(teamId), 1));
  }
}
