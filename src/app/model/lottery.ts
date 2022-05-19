import { ArtItem } from './art-item';
import { Contestant } from './contestant';
import { Winner } from './winner';

export class Lottery {
    id!: number;
    date!: Date;
    title: string = '';
    contestants: Contestant[] = [];
    winners: Winner[] = [];
    lotteryItems: ArtItem[] = [];
}
