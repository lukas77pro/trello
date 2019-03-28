import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../../model/board';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BoardService } from '../../service/board.service';
import { FormControl, Validators } from '@angular/forms';
import { CardListService } from '../../service/cardlist.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CardList } from 'src/model/card-list';
import { Card } from 'src/model/card';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board$: Observable<Board>;
  cardListName = new FormControl('', Validators.required);

  constructor(private boardService: BoardService,
              private cardListService: CardListService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.board$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.boardService.get(params.get('id')))
    );
  }

  createCardList(board: Board): void {
    if (this.cardListName.valid) {
      this.cardListService
        .create(this.cardListName.value, board.id)
        .subscribe(cardList => board.cardLists.push(cardList));
    }
  }

  onCardDropped(event: CdkDragDrop<Card[]>) {
    console.log(event);
  }

  onCardListDropped(event: CdkDragDrop<CardList[]>) {
    console.log(event);
  }

  getConnectedList(board: Board): any[] {
    return board.cardLists.map(cardList => cardList.name);
  }
}
