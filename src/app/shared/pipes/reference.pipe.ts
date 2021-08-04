import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CollectionItem, Reference } from '@core/models';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import firebase from 'firebase/app';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import FieldPath = firebase.firestore.FieldPath;

@Pipe({
  name: 'reference'
})
export class ReferencePipe implements PipeTransform {
  static pathFromReference(reference: Reference<any>): string {
    return `${reference.collection}/${reference.id}`;
  }

  constructor(private afs: AngularFirestore) {}

  transform<T>(
    reference: Reference<T>,
    type: 'Collection' | 'Item',
    fieldPath?: string[],
    operator?: WhereFilterOp,
    value?: any
  ): Observable<CollectionItem<T>[]> {
    switch (type) {
      case 'Collection':
        if (fieldPath) {
          if (!value) return of([]);
          return this.afs
            .collection<CollectionItem<T>>(reference.collection, (ref) =>
              ref.where(new FieldPath(...fieldPath), operator, value)
            )
            .valueChanges({ idField: 'id' })
            .pipe(first());
        } else {
          return this.afs
            .collection<CollectionItem<T>>(reference.collection)
            .valueChanges({ idField: 'id' })
            .pipe(first());
        }
      // TODO case for type 'Item'
    }
  }
}
