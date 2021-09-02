import { Pipe, PipeTransform } from '@angular/core';
import { collection, collectionData, FieldPath, Firestore, query, where } from '@angular/fire/firestore';
import { CollectionItem, Reference } from '@core/models';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import DocumentData = firebase.firestore.DocumentData;

@Pipe({
  name: 'reference'
})
export class ReferencePipe implements PipeTransform {
  constructor(private firestore: Firestore) {}

  transform<T>(
    reference: Reference<T>,
    type: 'Collection' | 'Item',
    fieldPath?: string[],
    operator?: WhereFilterOp,
    value?: any
  ): Observable<CollectionItem<T>[] | DocumentData[]> {
    switch (type) {
      case 'Collection':
        if (fieldPath) {
          if (!value) return of([]);

          return collectionData<CollectionItem<T> | DocumentData>(
            query(
              collection(this.firestore, reference.collection),
              where(new FieldPath(...fieldPath), operator, value)
            ),
            {
              idField: 'id'
            }
          ).pipe(first());
        } else {
          return collectionData<CollectionItem<T> | DocumentData>(collection(this.firestore, reference.collection), {
            idField: 'id'
          }).pipe(first());
        }
      // TODO case for type 'Item'
    }
  }
}
