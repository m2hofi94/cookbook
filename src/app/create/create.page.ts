import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Recipie } from '../details/recipie';
import { IonContent } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: 'create.page.html',
  styleUrls: ['create.page.scss']
})
export class CreatePage implements OnInit {
  @ViewChild('file') fileInput: ElementRef;
  @ViewChild(IonContent) content: IonContent;

  infoHidden = false;
  stepsHidden = false;

  imgUrl = 'assets/no-img.png';
  imgPath: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  id: string;
  editing = false;
  private doc: AngularFirestoreDocument<Recipie>;
  recipie: Observable<Recipie>;

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

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    this.editing = !!this.id;

    if (this.editing) {
      this.initEditing();
    }
  }

  initEditing() {
    this.doc = this.afs.doc<Recipie>('recipies/' + this.id);
    this.recipie = this.doc.valueChanges();
    this.recipie.forEach((r: any) => {
      if (!r) { return; }
      this.imgUrl = r.image;
      delete r.image;
      r.steps = r.steps.map((s) => s.instructions[0]);
      this.recipieForm.patchValue(r);
    });
  }

  submit() {
    if (this.imgPath) {
      this.submitWithImage();
    } else {
      this.submitWithoutImage();
    }
  }

  private submitWithoutImage() {
    const recipie = this.preprocess();
    const newId = this.afs.createId();
    const recipieCollection = this.afs.collection<Recipie>('recipies');
    const recTask = recipieCollection.doc(newId).set(recipie);
    recTask.finally(() => this.router.navigate(['/tabs', 'details', newId]));
  }

  private submitWithImage() {
    const recipie = this.preprocess();
    const newId = this.afs.createId();
    const imgId = this.afs.createId();
    const filePath = 'recipie_imgs/' + imgId;

    const fileRef = this.storage.ref(filePath);
    const imgTask = this.storage.upload(filePath, this.imgPath);

    this.uploadPercent = imgTask.percentageChanges();

    imgTask.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.forEach((v) => {
          recipie.image = v;
          const recipieCollection = this.afs.collection<Recipie>('recipies');
          const recTask = recipieCollection.doc(newId).set(recipie);
          recTask.finally(() => this.router.navigate(['/tabs', 'details', newId]));
        });
      })
    ).subscribe();
  }

  fileSelected(event) {
    const file = event.target.files[0];
    this.imgPath = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imgUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
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
      recipie.steps = recipie.steps.map((v: string) => ({ instructions: [v] }));
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

  deleteRecipie() {
    console.log('deleting');
    
    this.doc.delete().finally(() => {
      this.router.navigate(['/tabs', 'list']);
    });
  }
}
