import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/service/team.service';
import { FormControl, Validators } from '@angular/forms';
import { Team } from 'src/model/team';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team$: Observable<Team>;
  cardListTitle = new FormControl('');
  cardTitle = new FormControl('');

  constructor(private teamService: TeamService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.team$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.teamService.get(params.get('id')))
    );
  }

}
