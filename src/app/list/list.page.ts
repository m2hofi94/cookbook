import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Recipie } from '../details/recipie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  private itemsCollection: AngularFirestoreCollection<Recipie>;
  recipies: Observable<Recipie[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Recipie>('recipies');
    this.recipies = this.itemsCollection.valueChanges({ idField: 'id' });
    console.log(this.recipies);
  }
  click(id: string) {
    console.log(this.recipies);

    console.log(id);
  }
}
