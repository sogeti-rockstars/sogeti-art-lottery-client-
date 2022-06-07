import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contestant } from '../model/contestant';
import { Lottery } from '../model/lottery';
import { Winner } from '../model/winner';
import { WinnerApiService } from '../service/api/winner-api.service';
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

    private loadContestantsSubscription?: Subscription;

    constructor(public lotteryService: LotteryService, public contestantsService: ContestantService, public winnerService: WinnerApiService) {}

    protected abstract loadContestants(contestants: Contestant[]): void;

    ngOnInit(): void {
        if (this.lotteryService.currLotteryId !== undefined)
            this.lotteryService.getLottery(this.lotteryService.currLotteryId).subscribe((lottery) => {
                this.currLottery = lottery;
                // this.loadContestants(lottery);
            });

        this.loadContestantsSubscription = this.lotteryService.lotteryChanged.subscribe((lottery) => {
            this.currLottery = lottery;
            // this.loadContestants(lottery);
        });
        this.contestantsService.getContestants().subscribe((contestants) => this.loadContestants(contestants));
        this.loadContestantsSubscription = this.contestantsService.contestantsChanged.subscribe((contestant) => this.loadContestants(contestant));
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
            this.rowData.forEach((element) => {
                if (element.selected) {
                    if (element.data?.id != undefined)
                        this.contestantsService.deleteContestant(element.data?.id).subscribe((resp) => {
                            this.rowData = this.rowData.filter((c) => !c.selected);
                            this.contestantsChange.emit(this.rowData);
                        });
                }
            });
        },
        addNew: (cont: Contestant) => {
            console.log('HERE');
            this.contestantsService
                .addContestant(cont)
                .subscribe((resp) => this.contestantsService.getContestants().subscribe((resp) => this.loadContestants(resp)));
            // TODO: fix backend
            // this.lotteryService.addContestantToLottery(this.currLottery.id, cont).subscribe((resp) => {
            //     this.populateRowData([resp.contestants, resp.winners]);
            //     console.log(resp);
            // });
        },
    };

    protected populateRowData(data: any): void {
        this.rowData = [];

        if (data.length < 1) return;
        // Check if type is Contestant or [Winner[]|Contestant[]]
        else if ((data[0] as any).employeeId !== undefined) (data as Contestant[]).forEach((c, i) => this.rowData.push({ data: c, render: false }));
        else {
            let [winners, conts] = data as [Winner[], Contestant[]];
            winners.forEach((w, i) => {
                let cont = conts.find((c) => c.id == w.contestantId);
                if (cont !== undefined) this.rowData.push({ data: cont, render: false });
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
