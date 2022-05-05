import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Contestant } from '../model/contestant';
import { ContestantService } from './contestant.service';

describe('ContestantService', () => {
  let service: ContestantService;
  let listPreSpec: Array<any> | undefined;
  let listPostSpec: Array<any> | undefined;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ContestantService);
    listPreSpec = undefined;
    listPostSpec = undefined;
    listPreSpec = await lastValueFrom(service.getContestants());
  });

  afterEach(() => {
    setSpecProperty('pre', listPreSpec);
    setSpecProperty('post', listPostSpec);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load an array of Contestants', async () => {
    expect(listPreSpec).toBeDefined();
    expect(listPreSpec!.length).toBeGreaterThanOrEqual(0);
  });

  it('should delete the last item of contestants', async () => {
    expect(listPreSpec).toBeDefined();
    if (listPreSpec!.length == 0) return;
    await lastValueFrom(
      service.deleteContestant(listPreSpec![listPreSpec!.length - 1].id)
    );
    listPostSpec = await lastValueFrom(service.getContestants());
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
    await lastValueFrom(service.deleteContestant(rItemFromGetAll.id));
    listPostSpec = await lastValueFrom(service.getContestants());

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

  it('should delete all contestants', async () => {
    // if ( listPreSpec!.length == 0 )
    //   listPreSpec = await addNItems(10);
    listPostSpec = listPreSpec!.slice();

    while (listPostSpec!.length > 0) {
      let lastItem = listPostSpec![listPostSpec!.length - 1];
      await lastValueFrom(service.deleteContestant(lastItem.id));
      listPostSpec = await lastValueFrom(service.getContestants());
    }
    expect(listPostSpec!.length).toBe(0); // Yah we would prob never get here if it ever were to fail...
  });

  it('should add an contestant', async () => {
    await lastValueFrom(service.addContestant(getRndmItem()));
    listPostSpec = await lastValueFrom(service.getContestants());
    expect(listPostSpec.length).toBe(listPreSpec!.length + 1);
  });

  it('should add 10 contestants', async () => {
    listPostSpec = await addNItems(10);
    expect(listPostSpec.length).toBe(listPreSpec!.length + 10);
  });

  it('should get the item with a specified randomly selected existing id', async () => {
    if (listPreSpec!.length == 0) listPreSpec = await addNItems(10);
    let rItemFromGetAll =
      listPreSpec![Math.floor(Math.random() * listPreSpec!.length)];
    console.log(`Requesting item with id: ${rItemFromGetAll.id}`);
    let rItemFromGetById = await lastValueFrom(
      service.getContestant(rItemFromGetAll.id)
    );

    expect(rItemFromGetAll).toEqual(rItemFromGetById);
  });

  async function addNItems(newItemsLen: number): Promise<Contestant[]> {
    for (let i = 0; i < newItemsLen; i++) {
      await lastValueFrom(service.addContestant(getRndmItem()));
    }
    return await lastValueFrom(service.getContestants());
  }

  function getRndmItem(): Contestant {
    var randItem = new Contestant();
    randItem.employeeId = '000-5412-2139348';
    randItem.name = 'randName';
    randItem.email = 'randEmail@example.com';
    randItem.teleNumber = '999-5412-213';
    return randItem;
  }
});
