import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppComponent } from '../app.component';
import { ArtItem } from '../model/art-item';

import { ArtItemService } from './art-item.service';

describe('ArtItemService', () => {
  let service: ArtItemService;
  let artItems: ArtItem[];
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ArtItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load an array of ArtItems', async () => {
    var list = await lastValueFrom(service.getArtItems());
    expect(list.length).toBeGreaterThanOrEqual(0);
    expect(list).toBeDefined();
  });

  it('delete the last item of artItems', async () => {
    var preList = await lastValueFrom(service.getArtItems());
    if (preList.length == 0) return;
    await lastValueFrom(service.deleteArtItem(preList[preList.length - 1].id));
    var postList = await lastValueFrom(service.getArtItems());
    expect(preList.length).toBe(postList.length + 1);
    console.log('del last item done');
    console.log({ pre: preList, post: postList });
  });

  it('delete all artItems', async () => {
    await addNItems(10);
    var currList = await lastValueFrom(service.getArtItems());
    while (currList.length > 0) {
      await lastValueFrom(
        service.deleteArtItem(currList[currList.length - 1].id)
      );
      currList = await lastValueFrom(service.getArtItems());
    }
    expect(currList.length).toBe(0); // Yah we would prob never get here if it ever were to fail...
  });

  it('add an artItem', async () => {
    var oldList = await lastValueFrom(service.getArtItems());
    await lastValueFrom(service.addArtItem(getRndmItem()));
    var newList = await lastValueFrom(service.getArtItems());
    expect(newList.length).toBe(oldList.length + 1);
    console.log({ pre: oldList, post: newList });
  });

  it('add 10 artItems', async () => {
    var itemsLists = await addNItems(10);
    expect(itemsLists.post.length).toBe(itemsLists.pre.length + 10);
  });

  type ItemList = {
    pre: ArtItem[];
    post: ArtItem[];
  };

  async function addNItems(newItemsLen: number): Promise<ItemList> {
    var oldList = await lastValueFrom(service.getArtItems());
    for (let i = 0; i < newItemsLen; i++) {
      await lastValueFrom(service.addArtItem(getRndmItem()));
    }
    var newList = await lastValueFrom(service.getArtItems());
    console.log(`old: ${oldList.length}, new: ${newList.length}`);
    return { pre: oldList, post: newList };
  }

  //   loadItems(() => {
  //     deleteAllItems(() => {
  //       loadItems(() => {
  //         expect(artItems.length).toBe(0);
  //
  //         for (let i = 0; i < 10; i++) {
  //           loadItems(() => {
  //             var oldLength = artItems.length;
  //             var newLength = oldLength + 1;
  //
  //             addAnItem(() => {
  //               loadItems(() => {
  //                 expect(artItems.length).toBe(newLength);
  //               });
  //             });
  //           });
  //         }
  //
  //         loadItems(() => {
  //           expect(artItems.length).toBe(10);
  //         });
  //         done();
  //       });
  //     });
  //   });

  function loadItems(onLoadingFinished: Function): void {
    service.getArtItems().subscribe({
      complete: () => {
        console.log('loadItems complete:');
        onLoadingFinished();
      },
      error: (error: HttpErrorResponse) => {
        console.log('loadItems HttpErrorResponse:');
        console.log(error.message);
      },
      next: (resp: ArtItem[]) => {
        artItems = resp;
      },
    });
  }

  function getRndmItem(): ArtItem {
    var randItem = new ArtItem();
    randItem.artistName = 'addAnItemArtistName';
    randItem.frameDescription = 'addAnItemRandDescription';
    randItem.itemName = 'addAnItemRandName';
    randItem.lotteryId = 999;
    randItem.size = 'addAnItem99x99cm';
    randItem.technique = 'addAnItemRandTechnique';
    randItem.value = 'addAnItem999kr';
    return randItem;
  }

  function addAnItem(onAddFinished: Function): void {
    service.addArtItem(getRndmItem()).subscribe({
      complete: () => {
        console.log('deleteItem complete:');
        onAddFinished();
      },
      error: (error: HttpErrorResponse) => {
        console.log('deleteItem HttpErrorResponse:');
        console.log(error.message);
      },
      next: (resp: any) => {
        console.log('deleteItem Resp:');
        console.log(resp);
      },
    });
  }

  function deleteLastItem(onComplete: Function): void {
    if (artItems.length == 0) {
      loadItems(onComplete);
      return;
    }

    service.deleteArtItem(artItems[artItems.length - 1].id).subscribe({
      complete: () => {
        console.log('deleteItem complete:');
        onComplete();
      },
      error: (error: HttpErrorResponse) => {
        console.log('deleteItem HttpErrorResponse:');
        console.log(error.message);
      },
      next: (resp: any) => {
        console.log('deleteItem Resp:');
        console.log(resp);
      },
    });
  }

  function deleteAllItems(callback: Function): void {
    loadItems(() => {
      deleteLastItem(() => {
        if (artItems.length == 0) {
          callback();
        } else {
          deleteAllItems(callback);
        }
      });
    });
  }

  var obsCompleted: boolean = true;
  function awaitObservable(obs: Observable<any>): void {
    obsCompleted = false;
    obs.subscribe({
      complete: () => {
        console.log('awaitObservable complete.');
        obsCompleted = true;
      },
      error: (error: any) => {
        console.log('awaitObservable error:');
        console.log(error);
      },
      next: (resp: any) => {
        console.log('deleteItem Resp:');
        console.log(resp);
      },
    });

    // while (!obsCompleted) {
    //   delay(10);
    //   setTimeout(10, 10);
    // }
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});
