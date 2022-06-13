import { ArtItem } from './art-item';
import { Winner } from './winner';

export class Lottery {
    id!: number;
    date!: Date;
    title: string = '';
    winners: Winner[] = [];
    lotteryItems: ArtItem[] = [];
}
