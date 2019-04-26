import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../../model/board';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BoardService } from '../../service/board.service';
import { FormControl, Validators } from '@angular/forms';
import { CardListService } from '../../service/cardlist.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardList } from 'src/model/card-list';
import { Card } from 'src/model/card';
import { CardService } from 'src/service/card.service';
import { MatDialog } from '@angular/material';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board$: Observable<Board>;
  cardListTitle = new FormControl('');
  cardTitle = new FormControl('');

  constructor(private boardService: BoardService,
              private cardListService: CardListService,
              private cardService: CardService,
              private activatedRoute: ActivatedRoute,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.board$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.boardService.get(params.get('id')))
    );
  }

  createCardList(board: Board): void {
    if (this.cardListTitle.valid) {
      this.cardListService
        .create(this.cardListTitle.value, board.id)
        .subscribe(cardList => {
          board.cardLists.push(cardList);
          this.cardListTitle.setValue('');
        });
    }
  }

  createCard(board: Board, cardList: CardList) {
    this.cardService
      .create(this.cardTitle.value, board.id, cardList.id)
      .subscribe(card => {
        cardList.cards.push(card);
        this.cardTitle.setValue('');
      });
  }

  onCardListDropped(board: Board, event: CdkDragDrop<CardList[]>) {
    moveItemInArray(board.cardLists, event.previousIndex, event.currentIndex);
    this.cardListService.move(event.previousIndex, event.currentIndex, board.id).subscribe();
  }

  onCardDropped(board: Board, event: CdkDragDrop<Card[]>) {
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    this.cardService.move(event.previousContainer.id, event.previousIndex, event.container.id, event.currentIndex, board.id).subscribe();
  }

  getConnectedList(board: Board): any[] {
    return board.cardLists.map(cardList => cardList.id);
  }

  openCardDialog(boardId: string, cardListId: string, card: Card) {
    this.matDialog.open(CardComponent, {
      width: '640px',
      data: {
        boardId: boardId,
        cardListId: cardListId,
        card: card
      }
    });
  }
}

export interface CardData {
  boardId: string;
  cardListId: string;
  card: Card;
}
