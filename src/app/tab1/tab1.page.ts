import { Component } from '@angular/core';
import {Ingredient, Recipie, mozarella} from './recipie';
import { formatNumber } from '@angular/common';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  recipie = mozarella;
  feeds = this.recipie.yield.amount;
  oldFeeds = this.feeds;

  constructor() {

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

}
