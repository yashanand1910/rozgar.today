import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CollectionItem, Reference } from '@core/models';
import { Observable } from 'rxjs';
import { firestore } from 'firebase/app';

@Pipe({
  name: 'collectionReference'
})
export class ReferencePipe implements PipeTransform {
  static pathFromReference(reference: Reference): string {
    return `${reference.collection}/${reference.id}`;
  }

  constructor(private afs: AngularFirestore) {}

  transform(
    reference: Reference,
    fieldPath?: string[],
    operator?: firestore.WhereFilterOp,
    value?: any
  ): Observable<CollectionItem<any>[]> {
    if (fieldPath) {
      return this.afs
        .collection<CollectionItem<any>>(reference.collection, (ref) =>
          ref.where(new firestore.FieldPath(...fieldPath), operator, value)
        )
        .valueChanges({ idField: 'id' });
    } else {
      return this.afs.collection<CollectionItem<any>>(reference.collection).valueChanges({ idField: 'id' });
    }
  }
}
