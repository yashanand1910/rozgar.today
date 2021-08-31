// List of collections supported/available in Firestore
// noinspection JSUnusedGlobalSymbols
// noinspection JSUnusedGlobalSymbols

export const enum Collection {
  Countries = 'countries',
  Cities = 'cities',
  Plans = 'plans',
  Users = 'users'
}

// Reference to a Firestore document
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Reference<T> {
  collection: Collection;
  id: string;
}

export type CollectionItem<T> = T & { id: string };
