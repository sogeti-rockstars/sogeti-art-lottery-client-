import { Lottery } from './lottery';

export class ArtItem {
    id!: number;
    lotteryId!: number;
    itemName: string = '';
    artistName: string = '';
    size: string = '';
    frameDescription: string = '';
    value: string = '';
    technique: string = '';
    lottery!: Lottery;
}
