import { Card } from './card';

export interface CardList {
    name: string;
    cards: Card[];
    order: number;
}
