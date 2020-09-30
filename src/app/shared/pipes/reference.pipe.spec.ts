import { ReferencePipe } from './reference.pipe';
import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';

describe('ReferencePipe', () => {
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)]
    });

    afs = TestBed.inject(AngularFirestore);
  });

  it('create an instance', () => {
    const pipe = new ReferencePipe(afs);
    expect(pipe).toBeTruthy();
  });
});
