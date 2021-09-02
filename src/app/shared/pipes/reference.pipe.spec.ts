import { ReferencePipe } from './reference.pipe';
import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { environment } from '@env/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('ReferencePipe', () => {
  let firestore: Firestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideFirebaseApp(() => initializeApp(environment.firebase))]
    });

    firestore = TestBed.inject(Firestore);
  });

  it('create an instance', () => {
    const pipe = new ReferencePipe(firestore);
    expect(pipe).toBeTruthy();
  });
});
