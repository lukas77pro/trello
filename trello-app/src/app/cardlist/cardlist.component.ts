import { Component, OnInit, Input } from '@angular/core';
import { CardList } from '../../model/card-list';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss']
})
export class CardlistComponent implements OnInit {
  @Input() cardList: CardList;

  constructor() { }

  ngOnInit() {
  }

}
