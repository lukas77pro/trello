import { Checklist } from './checklist';
import { Comment } from './comment';

export interface Card {
    id: string;
    title: string;
    description: string;
    order: number;
    checklist: Checklist[];
    comments: Comment[];
}
