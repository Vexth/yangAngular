import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * 用来充当事件总线的Service
 */
@Injectable()
export class EventNameService {
  public eventName:Subject<string> = new Subject<string>();

  constructor() { }

}