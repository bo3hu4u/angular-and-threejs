import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.uploadHeroes();
    }

    newPageForHeroDetail: boolean = false;
    heroes: Hero[] = [];

    stubHero: Hero = {
        id: 1,
        name: "Test Hero Name",
        alive: true,
        toString: (): string => {
            return `Hero (id: ${this.stubHero.id}; name: ${this.stubHero.name})`;
        }
    };

    selectedHero?: Hero;

    uploadHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    onSelect(hero1: Hero): void {
        if (this.selectedHero?.id === hero1.id) {
            this.selectedHero = undefined;
            this.messageService.add(`HeroesComponent: discard selection id=${hero1.id}`);
        } else {
            if (this.selectedHero) {
                this.messageService.add(`HeroesComponent: discard selection id=${this.selectedHero.id} on choosing another`);
            }
            this.selectedHero = hero1;
            this.messageService.add(`HeroesComponent: Selected hero id=${hero1.id}`);
        }
    }

    showPopup($event: string): void {
        alert("Parent component hero info: " + $event);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.addHero({name} as Hero)
            .subscribe(hero => {
                this.heroes.push(hero);
            });
    }

}
