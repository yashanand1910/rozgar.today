import { Pipe, PipeTransform } from '@angular/core';
import { Collection, Reference } from '@core/models';

@Pipe({
  name: 'createReference'
})
export class CreateReferencePipe implements PipeTransform {
  transform(id: string, collection: Collection): Reference<unknown> {
    return { collection, id };
  }
}
