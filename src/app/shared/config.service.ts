import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ConfigService{
    public static empSave = new Subject<boolean>();
}