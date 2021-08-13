// List of collections supported/available in Firestore
export const enum Collection {
  Countries = 'countries',
  Cities = 'cities',
  Plans = 'plans',
  Users = 'users'
}

// Reference to a Firestore document
export interface Reference<T> {
  collection: Collection;
  id?: string;
}

export type CollectionItem<T> = T & { id: string };
