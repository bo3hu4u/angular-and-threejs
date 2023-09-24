import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from "../hero.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private heroService: HeroService,
                private location: Location) {
    }

    ngOnInit(): void {
        this.isOnPage = "detail" === this.route.snapshot.url[0].path;
        if (this.isOnPage) {
            this.getHero();
        }
    }

    isOnPage?: boolean
    @Input() selHero?: Hero
    @Output() concatHeroDetailsEvent = new EventEmitter<string>();

    goBack(): void {
        this.location.back();
    }

    getHero(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.heroService.getHero(id)
            .subscribe(hero => this.selHero = hero);
    }

    save(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.selHero) {
            this.heroService.updateHero(this.selHero)
                .subscribe(() => this.goBack());
        }

    }

    concatHeroDetails(selHero1: Hero) {
        const heroInfo = `${selHero1.id}_${selHero1.name}_${selHero1.alive ? "alive" : "dead"} `;
        alert("child component hero info: " + heroInfo);
        this.concatHeroDetailsEvent.emit(heroInfo)
    }
}
