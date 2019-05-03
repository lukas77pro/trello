import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent {
  @Input() user: User;
  @Input() you?: boolean;

  constructor() {
  }
}
