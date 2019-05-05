import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/model/user';
import { AuthService } from 'src/service/auth.service';
import { ImageService } from 'src/service/image.service';
import { TeamService } from 'src/service/team.service';
import { Team } from 'src/model/team';
import { MatSnackBar, MatDialog } from '@angular/material';
import { InvitationsComponent } from 'src/app/navbar/current-user/invitations/invitations.component';
import { CacheService } from 'src/service/cache.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {
  invitations: Team[] = [];
  @Input() user: User;

  constructor(private authService: AuthService,
              private imageService: ImageService,
              private cacheService: CacheService,
              private teamService: TeamService,
              private snackBar: MatSnackBar,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.teamService.getInvitations().subscribe(invitations => this.invitations = invitations);
  }

  logout(): void {
    this.authService.logout();
  }

  openInvitationsDialog(): void {
    if (this.invitations.length) {
      this.matDialog.open(InvitationsComponent, {
        width: '600px',
        data: this.invitations
      });
    } else {
      this.snackBar.open('Nie masz żadnych zaproszeń', null, {
        duration: 1000
      });
    }
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.imageService.upload(file).subscribe(imageId => {
      this.cacheService.removeAll(this.user.imageId);
      this.authService.updateUserImage(imageId);
    });
  }
}

