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

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  pattern = new FormControl('');
  users: User[] = [];

  constructor(private teamService: TeamService,
              private userService: UserService,
              private authService: AuthService,
              private dialogRef: MatDialogRef<CreateTeamComponent>,
              @Inject(MAT_DIALOG_DATA) public team: Team) {
  }

  ngOnInit(): void {
    this.pattern.valueChanges.pipe(
      debounceTime(300),
      map(pattern => pattern.trim()),
      filter(pattern => pattern.length > 0),
      switchMap(pattern => this.userService.search(pattern))
    ).subscribe(users => this.users = users.filter(user => !(this.team.creator.id === user.id ||
      this.team.invitedUsers.find(invitedUser => invitedUser.id === user.id) ||
      this.team.members.find(member => member.id === user.id)
    )));
  }

  optionSelected(option) {
    this.pattern.setValue('');
    console.log(option);
  }

  you(): boolean {
    return this.team.creator.id === this.authService.user.id;
  }
}
