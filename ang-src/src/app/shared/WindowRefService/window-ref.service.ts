import {Injectable} from '@angular/core';

@Injectable()
export class WindowRefService {
  _window(): any {
    return window;
  }

  get nativeWindow(): any {
    return this._window();
  }
}
