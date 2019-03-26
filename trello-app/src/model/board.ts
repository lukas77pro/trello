import { CardList } from './card-list';

export interface Board {
    id?: string;
    name: string;
    cardLists: CardList[];
    order: number;
    userId: string;
}
