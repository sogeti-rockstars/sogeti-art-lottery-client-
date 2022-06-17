import { Lottery } from './lottery';

export class ArtItem {
    id?: number;
    lotteryId!: number;
    itemName: string = '';
    artistName: string = '';
    size: string = '';
    frameDescription: string = '';
    itemValue: string = '';
    technique: string = '';
    lottery!: Lottery;
    available!: boolean;
}
