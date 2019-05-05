import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Card } from 'src/model/card';
import { FormBuilder, FormControl } from '@angular/forms';
import { CardService } from 'src/service/card.service';
import { CommentService } from 'src/service/comment.service';
import { User } from 'src/model/user';
import { CardData } from '../board/board.component';
import { Comment } from 'src/model/comment';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  description = new FormControl('')
  comment = new FormControl('')

  commentsVisible = false;
  descriptionEdition = false;

  constructor(private cardService: CardService,
              private commentService: CommentService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: CardData) {
  }

  editDescription() {
    this.description.setValue(this.data.card.description);
    this.descriptionEdition = true;
  }

  saveDescription() {
    const card = { ...this.data.card, description: this.description.value } as Card;
    this.cardService
      .update(this.data.boardId, this.data.cardListId, card.id, card)
      .subscribe(() => {
        this.data.card = card;
        this.cancelDescriptionEditing();
      });
  }

  cancelDescriptionEditing() {
    this.descriptionEdition = false;
  }

  cancelComment() {
    this.comment.setValue('')
  }

  addComment() {
    this.commentService
      .create(this.data.boardId, this.data.cardListId, this.data.card.id, this.comment.value)
      .subscribe(comment => {
        this.data.card.comments.push(comment)
        if (!this.commentsVisible) {
          this.toggleComments();
        }
        this.cancelComment();
      });
  }

  toggleComments() {
    this.commentsVisible = !this.commentsVisible;
  }

  getCommentDate(comment: Comment) {
    return `[${new Date(comment.creationDate).toLocaleString()}] `;
  }

  getAuthor(comment: Comment): User {
    return comment.author.id === this.authService.user.id ? this.authService.user : comment.author;
  }
}
