import { Component, OnInit } from '@angular/core';
import { Ingredient, Recipie } from './recipie';
import { formatNumber } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss']
})
export class DetailsPage implements OnInit {
  // recipie = mozarella;
  recipie: any;
  feeds: number;
  oldFeeds: number;
  imgUrl: Observable<string>;
  // feeds = this.recipie.yield.amount;
  // oldFeeds = this.feeds;
  id: string;
  private itemDoc: AngularFirestoreDocument<Recipie>;
  item: Observable<Recipie>;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
  ) {

  }


  async ngOnInit(): Promise<void> {
    console.log('oninit');

    this.id = this.route.snapshot.paramMap.get('id');
    this.itemDoc = this.afs.doc<Recipie>('recipies/' + this.id);
    this.item = this.itemDoc.valueChanges();
    this.recipie = this.item;
  }

  displayIngredient(ingr: Ingredient): string {
    const amount = ingr.amount ? formatNumber(ingr.amount, 'de', '1.0-3') : '';
    return [amount, ingr.unit, ingr.name].filter(Boolean).join(' ');
  }

  diplayInstructions(inst: string[]): string {
    return inst.join('<br>');
  }

  onYieldChange(newAmount) {
    console.log(newAmount, this.feeds, this.oldFeeds);
    if (newAmount) {
      const ratio = newAmount / this.oldFeeds;

      for (const step of this.recipie.steps) {
        for (const ingredient of step.ingredients || []) {
          if (ingredient.amount) {
            ingredient.amount *= ratio;
          }
        }
      }

      this.oldFeeds = newAmount;
    }
  }

  edit() {
    console.log('edit');
    this.router.navigate(['tabs', 'edit', this.id]);
  }

}
