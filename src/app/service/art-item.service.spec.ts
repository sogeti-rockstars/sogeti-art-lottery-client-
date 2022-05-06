import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AppComponent } from '../app.component';
import { ArtItem } from '../model/art-item';
import { ArtItemService } from './art-item.service';

describe('ArtItemService', () => {
  let service: ArtItemService;
  let listPreSpec: ArtItem[] | undefined;
  let listPostSpec: ArtItem[] | undefined;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ArtItemService);
    listPreSpec = undefined;
    listPostSpec = undefined;
    listPreSpec = await lastValueFrom(service.getArtItems());
  });

  afterEach(() => {
    setSpecProperty('pre', listPreSpec);
    setSpecProperty('post', listPostSpec);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load an array of ArtItems', async () => {
    expect(listPreSpec).toBeDefined();
    expect(listPreSpec!.length).toBeGreaterThanOrEqual(0);
  });

  it('should delete the last item of artItems', async () => {
    expect(listPreSpec).toBeDefined();
    if (listPreSpec!.length == 0) return;
    await lastValueFrom(
      service.deleteArtItem(listPreSpec![listPreSpec!.length - 1].id)
    );
    listPostSpec = await lastValueFrom(service.getArtItems());
    expect(listPreSpec!.length).toBe(listPostSpec!.length + 1);
    expect(listPreSpec![listPreSpec!.length - 2]).toEqual(
      listPostSpec![listPostSpec!.length - 1]
    ); // Next to last should be same as last
  });

  it('should delete the item with a specified randomly selected existing id', async () => {
    if (listPreSpec!.length == 0) listPreSpec = await addNItems(10);
    let rItemFromGetAll =
      listPreSpec![Math.floor(Math.random() * listPreSpec!.length)];
    console.log(`Deleting item with id: ${rItemFromGetAll.id}`);
    await lastValueFrom(service.deleteArtItem(rItemFromGetAll.id));
    listPostSpec = await lastValueFrom(service.getArtItems());

    var listDeletedReinserted = listPostSpec!
      .concat([rItemFromGetAll])
      .sort((a, b) => {
        return a.id - b.id;
      });
    expect(listPreSpec!.length).toBe(listPostSpec!.length + 1);
    expect(listDeletedReinserted).toEqual(
      listPreSpec!.sort((a, b) => {
        return a.id - b.id;
      })
    );
  });

  it('should delete all artItems', async () => {
    // if ( listPreSpec!.length == 0 )
    //   listPreSpec = await addNItems(10);
    listPostSpec = listPreSpec!.slice();

    while (listPostSpec!.length > 0) {
      let lastItem = listPostSpec![listPostSpec!.length - 1];
      await lastValueFrom(service.deleteArtItem(lastItem.id));
      listPostSpec = await lastValueFrom(service.getArtItems());
    }
    expect(listPostSpec!.length).toBe(0); // Yah we would prob never get here if it ever were to fail...
  });

  it('should add an artItem', async () => {
    await lastValueFrom(service.addArtItem(getRndmItem()));
    listPostSpec = await lastValueFrom(service.getArtItems());
    expect(listPostSpec.length).toBe(listPreSpec!.length + 1);
  });

  it('should add 10 artItems', async () => {
    listPostSpec = await addNItems(10);
    expect(listPostSpec.length).toBe(listPreSpec!.length + 10);
  });

  it('should get the item with a specified randomly selected existing id', async () => {
    if (listPreSpec!.length == 0) listPreSpec = await addNItems(10);
    let rItemFromGetAll =
      listPreSpec![Math.floor(Math.random() * listPreSpec!.length)];
    console.log(`Requesting item with id: ${rItemFromGetAll.id}`);
    let rItemFromGetById = await lastValueFrom(
      service.getArtItem(rItemFromGetAll.id)
    );

    expect(rItemFromGetAll).toEqual(rItemFromGetById);
  });

  it('should get an image from an item with a specified randomly selected existing id', async () => {
    if (listPreSpec!.length == 0) listPreSpec = await addNItems(10);
    let rItemFromGetAll =
      listPreSpec![Math.floor(Math.random() * listPreSpec!.length)];
    console.log(`Requesting image from item with id: ${rItemFromGetAll.id}`);

    let image: Blob;
    try {
      image = await firstValueFrom(service.getArtItemImage(rItemFromGetAll.id));
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        expect(e).toBeInstanceOf(HttpErrorResponse);
        expect(e.status).toBe(404); // We choose id:s randomly, sometimes the items might not have a photo.
      } else {
        console.log(e);
        fail();
      }
      return;
    }

    expect(image!.type).toBe('image/jpeg');
  });

  async function addNItems(newItemsLen: number): Promise<ArtItem[]> {
    for (let i = 0; i < newItemsLen; i++) {
      await lastValueFrom(service.addArtItem(getRndmItem()));
    }
    return await lastValueFrom(service.getArtItems());
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
});
