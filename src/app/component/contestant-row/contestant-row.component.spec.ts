import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantRowComponent } from './contestant-row.component';

describe('ContestantRowComponent', () => {
    let component: ContestantRowComponent;
    let fixture: ComponentFixture<ContestantRowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ContestantRowComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContestantRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
