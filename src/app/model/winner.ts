import { ArtItem } from './art-item';

export class Winner {
    id!: number;
    placement!: number;
    contestantId!: number;
    lotteryId!: number;
    lotteryItem?: ArtItem;
}
