import { Component, Inject, OnInit } from '@angular/core';
import { TeamService } from 'src/service/team.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateTeamComponent } from './create-team/create-team.component';
import { Team } from 'src/model/team';
import { FormControl } from '@angular/forms';
import { debounceTime, map, switchMap, filter } from 'rxjs/operators';
import { UserService } from 'src/service/user.service';
import { User } from 'src/model/user';
import { AuthService } from 'src/service/auth.service';
import { Observable } from 'rxjs';
import { AppNotification } from 'src/model/app-notification';
import { NotificationService } from 'src/service/notification.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team$: Observable<Team>;
  pattern = new FormControl('');
  users: User[] = [];

  constructor(private teamService: TeamService,
              private userService: UserService,
              private authService: AuthService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<CreateTeamComponent>,
              @Inject(MAT_DIALOG_DATA) public teamId: string) {
    this.team$ = this.teamService.get(teamId);
  }

  ngOnInit(): void {
    this.pattern.valueChanges.pipe(
      debounceTime(300),
      map(pattern => pattern.trim()),
      filter(pattern => pattern.length > 0),
      switchMap(pattern => this.userService.search(pattern))
    ).subscribe(users => this.users = users);
  }

  userSelected(user: User, team: Team) {
    this.pattern.setValue('');
    this.teamService
      .addInvitation(team.id, user.id)
      .subscribe(() => team.invitedUsers.push(user));
      this.createNotification(this.authService.user.id, "NewInvitation", "to team");
      console.log("Add invitation notification");
  }

createNotification(userid: string, type: string, boardid: string) {
  var notification: AppNotification = {id: "", authorid: userid, type: type, description: boardid};
  this.notificationService.create(notification).subscribe();
}

  cancelInvitation(user: User, team: Team) {
    this.teamService
      .removeInvitation(team.id, user.id)
      .subscribe(() => team.invitedUsers = team.invitedUsers.filter(invitedUser => invitedUser.id !== user.id));
  }

  leaveTeam(team: Team) {
    this.teamService
      .leave(team.id)
      .subscribe(() => this.dialogRef.close(true));
  }

  removeMember(user: User, team: Team) {
    this.teamService
      .removeMember(team.id, user.id)
      .subscribe(() => team.members = team.members.filter(member => member.id !== user.id));
  }

  filterUsers(users: User[], team: Team) {
    return users.filter(user => !(
      team.creator.id === user.id ||
      team.members.map(member => member.id).includes(user.id) ||
      team.invitedUsers.map(invitedUser => invitedUser.id).includes(user.id)
    ));
  }

  your(team: Team): boolean {
    return this.authService.user.id === team.creator.id;
  }

  you(user: User): boolean {
    return this.authService.user.id === user.id;
  }

  deleteTeam(team: Team) {
    this.teamService.delete(team.id).subscribe(() => this.dialogRef.close(true));
  }
}
