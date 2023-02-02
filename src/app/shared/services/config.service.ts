import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public static empSave = new Subject<boolean>();
  public static sendToEmpComp = new Subject();
  public static sidefilterChanged = new EventEmitter<any>();
}
