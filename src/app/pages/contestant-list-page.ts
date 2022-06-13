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
    protected contestants!: Contestant[];

    private onLotteryChanged?: Subscription;
    private onContestChanged?: Subscription;

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
        this.contestantsService.getContestants().subscribe((contestants) => {
            this.contestants = contestants;
            this.loadContestants(contestants);
        });

        this.onLotteryChanged = this.lotteryService.lotteryChanged.subscribe((lottery) => {
            this.currLottery = lottery;
            this.loadContestants(this.contestants);
        });

        this.onContestChanged = this.contestantsService.contestantsChanged.subscribe((contestants) => {
            this.contestants = contestants;
            this.loadContestants(contestants);
        });
    }

    ngOnDestroy(): void {
        this.onLotteryChanged?.unsubscribe();
        this.onContestChanged?.unsubscribe();
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
            this.contestantsService
                .addContestant(cont)
                .subscribe((_) => this.contestantsService.getContestants().subscribe((resp) => this.loadContestants(resp)));
        },
    };

    protected populateRowData(data: any): void {
        this.rowData = [];

        if (data.length < 1) return;

        let dataSample = data[0] as any;

        // Check if type is Contestant, winner or sanitized Contestant
        if (dataSample.sanitize === true || dataSample.employeeId !== undefined)
            (data as Contestant[]).forEach((c, _) => {
                this.rowData.push({ data: c, render: false });
            });
        else {
            (data as Winner[]).forEach((w, _) => {
                let newItem = new ArtItem();
                let cont = this.winnerToContestant(w);
                if (cont !== undefined) {
                    if (w.lotteryItemId != null)
                        this.artItemApiService.getArtItem(w.lotteryItemId).subscribe((resp) => {
                            newItem = resp;
                            this.rowData.push({ data: cont, render: false, placement: w.placement, winner: w, artItem: newItem });
                            this.contestantsChange.emit(this.rowData);
                        });
                    else this.rowData.push({ data: cont, render: false, placement: w.placement, winner: w, artItem: newItem });
                }
                this.contestantsChange.emit(this.rowData);
            });
        }

        this.contestantsChange.emit(this.rowData);
    }

    private winnerToContestant(winner: Winner) {
        return this.contestants.find((contestant) => contestant.id == winner.contestantId);
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
