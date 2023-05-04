import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldListGeneratorService {

  constructor() { }

  public getAllPublicFields(instance: any): string[] {

    const fields: string[] = [];

    function collectFields(obj: any): void {
      if (obj === null || obj === Object.prototype) {
        return;
      }

      const props = Object.getOwnPropertyNames(obj);

      for (const prop of props) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        if (
          descriptor &&
          !fields.includes(prop) &&
          typeof descriptor.value !== 'function'
        ) {
          fields.push(prop);
        }
      }

      collectFields(Object.getPrototypeOf(obj));
    }

    collectFields(instance.constructor.prototype);

    return fields;

  }

}
