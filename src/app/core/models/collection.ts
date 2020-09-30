export enum Collection {
  Countries = 'countries',
  Cities = 'cities',
  Plans = 'plans',
  Users = 'users'
}

export interface Reference {
  collection: Collection;
  id?: string;
  ids?: string[];
}

// TODO use better type
export type CollectionItem<T> = T & { id: string };
