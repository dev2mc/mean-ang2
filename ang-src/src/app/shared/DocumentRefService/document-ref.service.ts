import {Injectable} from '@angular/core';

@Injectable()
export class DocumentRefService {
  _document(): any {
    return document;
  }

  get nativeDocument(): any {
    return this._document();
  }
}
