import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/internal/Observable';
import { AppComponent } from '../app.component';
import { ArtItem } from '../model/art-item';

import { ArtItemService } from './art-item.service';

describe('ArtItemService', () => {
  let service: ArtItemService;
  let artItems: ArtItem[];

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

  it('should load an array of ArtItems', (done: DoneFn) => {
    loadItems(() => {
      expect(artItems.length).toBeGreaterThanOrEqual(0);
      expect(artItems).toBeDefined();
      done();
    });
  });

  it('delete the last item of artItems', (done: DoneFn) => {
    loadItems(() => {
      var oldLength = artItems.length;
      var newLength = oldLength == 0 ? 0 : oldLength - 1;

      deleteLastItem(() => {
        expect(artItems.length).toBe(newLength);
        done();
      });
    });
  });

  it('delete all artItems', (done: DoneFn) => {
    loadItems(() => {
      deleteAllItems(() => {
        loadItems(() => {
          expect(artItems.length).toBe(0);
          done();
        });
      });
    });
  });

  it('add an artItem', (done: DoneFn) => {
    loadItems(() => {
      var oldLength = artItems.length;
      var newLength = oldLength + 1;

      addAnItem(() => {
        loadItems(() => {
          expect(artItems.length).toBe(newLength);
          done();
        });
      });
    });
  });

  // it('add 10 artItem', (done: DoneFn) => {
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
  // });

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

  function addAnItem(onAddFinished: Function): void {
    var randItem = new ArtItem();
    randItem.artistName = 'addAnItemArtistName';
    randItem.frameDescription = 'addAnItemRandDescription';
    randItem.itemName = 'addAnItemRandName';
    randItem.lotteryId = 999;
    randItem.size = 'addAnItem99x99cm';
    randItem.technique = 'addAnItemRandTechnique';
    randItem.value = 'addAnItem999kr';

    service.addArtItem(randItem).subscribe({
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
});

function onDeleteComplete(): void {}
