import { Component } from '@angular/core';
import { TeamService } from 'src/service/team.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent {
  teamName = new FormControl('', Validators.required);

  constructor(private teamService: TeamService,
              private dialogRef: MatDialogRef<CreateTeamComponent>) {
  }

  addTeam() {
    this.teamService
      .create(this.teamName.value)
      .subscribe(team => this.dialogRef.close(team));
  }
}
