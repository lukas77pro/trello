import { Component, OnDestroy, OnInit} from '@angular/core';
import { Team } from 'src/model/team';
import { TeamService } from 'src/service/team.service';
import { MatDialog } from '@angular/material';
import { CreateTeamComponent } from '../team/create-team/create-team.component';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TeamComponent } from '../team/team.component';
import { UserService } from 'src/service/user.service';
import { Subscriber } from 'src/event/subscriber';
import { Events, EventType, UserJoinedTeam } from 'src/event/events';
import { EventService } from 'src/event/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements Subscriber, OnInit, OnDestroy {
  teams: Team[]

  constructor(private userService: UserService,
              private teamService: TeamService,
              private matDialog: MatDialog,
              private eventService: EventService) {
    this.teamService.getAll().subscribe(teams => this.teams = teams);
  }


  ngOnInit(): void {
    this.eventService.subscribe(this, EventType.UserJoinedTeam, EventType.UserLeavedTeam);
  }

  ngOnDestroy(): void {
    this.eventService.unsubscribe(this);
  }

  openCreateTeamDialog(teams: Team[]) {
    this.matDialog.open(CreateTeamComponent).afterClosed().pipe(
        filter(team => team)
      ).subscribe((team: Team) => teams.push(team));
  }

  openTeamDialog(teamId: string, teams: Team[]) {
    this.matDialog.open(TeamComponent, {
      width: '600px',
      data: teamId
    }).afterClosed().pipe(
      filter(result => result)
    ).subscribe(() => teams.splice(teams.map(team => team.id).indexOf(teamId), 1));
  }
  
  onEventReceived(event: Events): void {
    if (event instanceof UserJoinedTeam) {
      console.log(event.payload);
      this.teams.push(event.payload);
    }
  }
}
