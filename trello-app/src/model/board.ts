import { CardList } from './card-list';

export interface Board {
    id?: string;
    title: string;
    cardLists: CardList[];
    order: number;
    userId: string;
}
