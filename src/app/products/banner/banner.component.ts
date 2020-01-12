import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

    images:string[] = [
        "/assets/images/banner/impactblue.jpg",
        "/assets/images/banner/kobayashi.jpg",
        "/assets/images/banner/inertia_drift.jpg",
        "/assets/images/banner/thorkell.jpg",
    ];

    bottomImage = 0;
    topImage = 1;
    showTop = false;
    interval = 3000;

    constructor() { }

    ngOnInit() {

        setInterval( () => { this.nextImage(); }, this.interval );

    }

    nextImage() {

        if (!this.showTop)
            this.topImage += 2;
        else
            this.bottomImage += 2;

        this.showTop = !this.showTop;

    }

    getTopImage() {
        return this.images[this.topImage % this.images.length];
    }

    getBottomImage() {
        return this.images[this.bottomImage % this.images.length];
    }

}
