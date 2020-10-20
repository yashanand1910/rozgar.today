export enum Collection {
  Countries = 'countries',
  Cities = 'cities',
  Plans = 'plans',
  Users = 'users'
}

export interface Reference<T> {
  collection: Collection;
  id?: string;
  ids?: string[];
}

export type CollectionItem<T> = T & { id: string };
