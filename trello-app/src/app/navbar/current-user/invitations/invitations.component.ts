import { Component, Inject } from '@angular/core';
import { Team } from 'src/model/team';
import { TeamService } from 'src/service/team.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateTeamComponent } from '../../../team/create-team/create-team.component';
import { EventService } from 'src/event/event.service';
import { UserJoinedTeam } from 'src/event/events';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent {

  constructor(private teamService: TeamService,
              private authService: AuthService,
              private eventService: EventService,
              private dialogRef: MatDialogRef<CreateTeamComponent>,
              @Inject(MAT_DIALOG_DATA) public invitations: Team[]) {
  }

  accept(invitation: Team) {
    this.teamService.acceptInvitation(invitation.id).subscribe(() => {
      this.eventService.push(new UserJoinedTeam(invitation));
      this.removeInvitation(invitation);
    });
  }

  reject(invitation: Team) {
    this.teamService
      .rejectInvitation(invitation.id)
      .subscribe(() => {
        this.removeInvitation(invitation);
      });
  }

  private removeInvitation(team: Team) {
    if (this.invitations.splice(this.invitations.map(invitation => invitation.id).indexOf(team.id), 1)) {
      
    }

  }
}
