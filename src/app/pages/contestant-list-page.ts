import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtItem } from '../model/art-item';
import { Contestant } from '../model/contestant';
import { Lottery } from '../model/lottery';
import { Winner } from '../model/winner';
import { ArtItemApiService } from '../service/api/art-item-api.service';
import { WinnerApiService } from '../service/api/winner-api.service';
import { ArtItemService } from '../service/art-item.service';
import { ContestantService } from '../service/contestant.service';
import { LotteryService } from '../service/lottery.service';
import { WinnerService } from '../service/winner.service';

/**
 * Base class that all pages which use the ContestantListComponent should extend.
 * This was done so that we can decide externally which list to use when displaying contestants, i.e. the "Winners" page
 * uses different business login than the "Members" page to decide which contestants to display.
 *
 * Child classes implement the loadContestants method which in turn has to emit the list through contestantsChange
 * EventEmitter. This is read by the Contestant component.
 */
@Component({ template: '' })
export abstract class ContestantListPage implements OnInit, OnDestroy {
    @Output() contestantsChange = new EventEmitter<RowData[]>(); // new EventEmitter<Contestant[] | [Winner[], Contestant[]]>();
    public rowData: RowData[] = [];

    protected currLottery!: Lottery;
    protected contestants: Contestant[] = [];

    private loadContestantsSubscription?: Subscription;
    private loadWinnerSubscription?: Subscription;

    constructor(
        public lotteryService: LotteryService,
        public contestantsService: ContestantService,
        public winnerService: WinnerApiService,
        public winnerXService: WinnerService,
        public artItemApiService: ArtItemApiService
    ) {}

    protected abstract loadContestants(contestants: Contestant[]): void;

    ngOnInit(): void {
        if (this.lotteryService.currLotteryId !== undefined)
            this.lotteryService.getLottery(this.lotteryService.currLotteryId).subscribe((lottery) => {
                this.currLottery = lottery;
            });

        this.loadContestantsSubscription = this.lotteryService.lotteryChanged.subscribe((lottery) => {
            this.currLottery = lottery;
        });

        this.contestantsService.getContestants().subscribe((contestants) => {
            this.loadContestants(contestants);
            this.contestants = contestants;
        });
        this.loadContestantsSubscription = this.contestantsService.contestantsChanged.subscribe((contestants) => {
            this.loadContestants(contestants);
            this.contestants = contestants;
        });
    }

    ngOnDestroy(): void {
        if (this.loadContestantsSubscription !== undefined) {
            this.loadContestantsSubscription.unsubscribe();
            this.loadContestantsSubscription = undefined;
        }
    }

    public readonly listManipulation = {
        deleteByIdx: (idx: number) => {
            let removedId = this.rowData.splice(idx, 1)[0];
            this.contestantsChange.emit(this.rowData);
            if (removedId !== undefined) this.contestantsService.deleteContestant(removedId.data!.id).subscribe((resp) => console.log(resp));
        },
        deleteById: (id: number) => {
            let idx = this.rowData.find((c) => c.data!.id == id)?.index;
            this.contestantsChange.emit(this.rowData);
            return idx !== undefined ? this.listManipulation.deleteByIdx(idx) : undefined;
        },
        getSelected: (): RowData[] => {
            return this.rowData.filter((r) => r.selected);
        },
        deleteSelected: () => {
            this.rowData = this.rowData
                .map((c) => {
                    if (c.selected) {
                        this.contestantsService.deleteContestant(c.data!.id).subscribe((resp) => console.log(resp));
                        return undefined;
                    } else return c;
                })
                .filter((c) => c !== undefined) as RowData[];
            this.contestantsChange.emit(this.rowData);
        },
        addNew: (cont: Contestant) => {
            console.log('HERE');
            this.contestantsService
                .addContestant(cont)
                .subscribe((resp) => this.contestantsService.getContestants().subscribe((resp) => this.loadContestants(resp)));
        },
    };

    protected populateRowData(data: any): void {
        this.rowData = [];

        if (data.length < 1) return;

        let dataSample = data[0] as any;

        // Check if type is Contestant, [Winner[], Contestant[]] or sanitized Contestant
        if (dataSample.sanitize === true || dataSample.employeeId !== undefined)
            (data as Contestant[]).forEach((c, _) => {
                this.rowData.push({ data: c, render: false });
            });
        else {
            let [winners, conts] = data as [Winner[], Contestant[]];

            winners.forEach((w, _) => {
                let newItem = new ArtItem();
                let cont = conts.find((c) => c.id == w.contestantId);
                // if (w.lotteryItemId != null)
                //     this.artItemApiService.getArtItem(w.lotteryItemId).subscribe((resp) => {
                //         console.log(resp);
                //         if (cont !== undefined) this.rowData.push({ data: cont, render: false, placement: w.placement, winnerId: w.id, artItem: resp });
                //     });
                if (w.lotteryItemId != null) {
                    this.artItemApiService.getArtItem(w.lotteryItemId).subscribe((resp) => {
                        newItem = resp;
                        if (cont !== undefined) this.rowData.push({ data: cont, render: false, placement: w.placement, winner: w, artItem: newItem });
                        this.contestantsChange.emit(this.rowData);
                    });
                    // this.loadWinnerSubscription = this.winnerXService.winnerChanged.subscribe((resp) => {
                    //     this.contestantsChange.emit(this.rowData);
                    //     console.log(this.rowData);
                    //     console.log(resp);
                    // });
                } else if (cont !== undefined) this.rowData.push({ data: cont, render: false, placement: w.placement, winner: w, artItem: newItem });
            });
        }

        this.contestantsChange.emit(this.rowData);
    }
}

export interface RowData {
    data?: Contestant;
    index?: number;
    srcElement?: ClickableElements;
    selected?: boolean;
    expanded?: boolean;
    inEditMode?: boolean;
    inModal?: boolean;
    filtered?: boolean;
    render?: boolean;
    inAddNewMode?: boolean;
    artItem?: ArtItem;
    placement?: number;
    winner?: Winner;
}

export enum ClickableElements {
    remove,
    edit,
    expand,
    checkbox,
    body,
    addNew,
    accept,
    abort,
    selectAll,
    selectNone,
    removeSelected,
}
