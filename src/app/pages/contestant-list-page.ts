import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contestant } from '../model/contestant';
import { Lottery } from '../model/lottery';
import { Winner } from '../model/winner';
import { ContestantService } from '../service/contestant.service';
import { LotteryService } from '../service/lottery.service';

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

    constructor(public lotteryService: LotteryService, public contestantsService: ContestantService) {}

    // IMPLEMENTING CLASSES MUST CALL THIS.
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
            // loadContestants() will in turn emit this classes contestantsChanged... Sorry for the mess.
        });
    }

    ngOnDestroy(): void {
        this.onLotteryChanged?.unsubscribe();
        this.onContestChanged?.unsubscribe();
    }

    public listManipulation = {
        deleteByIdx: (idx: number) => {
            let removedId = this.rowData.splice(idx, 1)[0];
            if (removedId !== undefined) this.contestantsService.deleteContestant(removedId.data!.id).subscribe();
        },
        deleteById: (id: number) => {
            let idx = this.rowData.find((c) => c.data!.id == id)?.index;
            return idx !== undefined ? this.listManipulation.deleteByIdx(idx) : undefined;
        },
        getSelected: (): RowData[] => {
            return this.rowData.filter((r) => r.selected);
        },
        deleteSelected: () => {
            this.rowData = this.rowData
                .map((c) => {
                    if (c.selected) {
                        this.contestantsService.deleteContestant(c.data!.id).subscribe();
                        return undefined;
                    } else return c;
                })
                .filter((c) => c !== undefined) as RowData[];
        },
        addNew: (cont: Contestant) => {
            this.contestantsService
                .addContestant(cont)
                .subscribe((_) => this.contestantsService.getContestants().subscribe((resp) => this.loadContestants(resp)));
        },
        update: (cont: Contestant) => {
            // this.contestantService.updateContestant(row?.data!).subscribe((r) => (row!.data = r));
            this.contestantsService
                .updateContestant(cont)
                .subscribe((_) => this.contestantsService.getContestants().subscribe((resp) => this.loadContestants(resp)));
        },
    };

    protected populateRowData(data: any): void {
        this.rowData = [];

        if (data === undefined || data.length < 1) return;

        let dataSample = data[0] as any;

        // Check if type is Contestant, winner or sanitized Contestant
        if (dataSample.sanitize === true || dataSample.employeeId !== undefined)
            (data as Contestant[]).forEach((c, _) => {
                this.rowData.push({ data: c, render: true });
            });
        else {
            (data as Winner[]).forEach((w, _) => {
                let cont = this.winnerToContestant(w);
                if (cont !== undefined) {
                    this.rowData.push({ data: cont, render: true, winner: w });
                }
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
    winner?: Winner;
}

export enum ClickableElements {
    remove,
    edit,
    expand,
    checkbox,
    body,
    addNew,
    acceptNew,
    acceptEdit,
    abort,
    selectAll,
    selectNone,
    removeSelected,
    artItemPicker,
}
