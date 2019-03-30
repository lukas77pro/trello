import { Card } from './card';

export interface CardList {
    title: string;
    cards: Card[];
    order: number;
}
