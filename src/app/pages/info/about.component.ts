import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssociationInfoService } from 'src/app/service/association-info.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
    title = { text: '', editing: false };
    body = { text: '', editing: false };
    constructor(public authService: AuthService, public infoService: AssociationInfoService) {}

    ngOnDestroy(): void {
        this.infoService.unsubscribe(this);
    }

    ngOnInit(): void {
        this.infoService.subscribe(this, (cache) => {
            this.title.text = cache.getField('aboutUsTitle');
            this.body.text = cache.getField('aboutUsBody');
        });
    }
}
