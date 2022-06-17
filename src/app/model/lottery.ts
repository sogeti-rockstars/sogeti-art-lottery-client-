import { ArtItem } from './art-item';
import { Winner } from './winner';

export class Lottery {
    id!: number;
    title: string = '';
    winners: Winner[] = [];
    lotteryItems: ArtItem[] = [];
}
