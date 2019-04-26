import { Card } from './card';

export interface CardList {
    id: string;
    title: string;
    cards: Card[];
    order: number;
}
