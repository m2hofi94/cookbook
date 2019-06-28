import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Recipie } from '../details/recipie';
import { IonFab, IonContent } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-create',
  templateUrl: 'create.page.html',
  styleUrls: ['create.page.scss']
})
export class CreatePage {
  @ViewChild('file') fileInput: ElementRef;
  @ViewChild(IonContent) content: IonContent;

  infoHidden = false;
  stepsHidden = false;

  recipieForm = this.fb.group({
    name: '',
    steps: this.fb.array([
      this.fb.control('')
    ]),
    keywords: [],
    description: '',
    prepTime: '',
    cookTime: '',
    calories: null,
    difficulty: '',
    image: '',
    yield: this.fb.group({
      amount: null,
      type: 'Portionen'
    })
  });

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
  }

  submit() {
    const recipie = this.preprocess();
    const recipieCollection = this.afs.collection<Recipie>('recipies');

    recipieCollection.add(recipie);
    console.log(recipie);
  }
  private preprocess(): Recipie {
    const recipie = JSON.parse(JSON.stringify(this.formValue));
    if (recipie.keywords) {
      recipie.keywords = recipie.keywords.map((v: any) => v.display);
    }
    if (!recipie.yield.amount) {
      delete recipie.yield;
    }
    if (recipie.steps && recipie.steps.length > 0) {
      recipie.steps = recipie.steps.map((v: string) => ({instructions: [v]}));
    }
    return recipie;
  }

  newStepRow() {
    this.steps.push(this.fb.control(''));
    setTimeout(() => {
      this.content.scrollToBottom(100);
    }, 1);

  }

  get steps() {
    return this.recipieForm.get('steps') as FormArray;
  }
  imageClick() {
    this.fileInput.nativeElement.click();
  }

  private createForm(model: Recipie): FormGroup {
    return this.fb.group(model);
  }

  private updateForm(model: Partial<Recipie>): void {
    this.recipieForm.patchValue(model);
  }

  get formValue() {
    return this.recipieForm.value as Recipie;
  }
}
