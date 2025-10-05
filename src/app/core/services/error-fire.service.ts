import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ErrorFireModel } from '../models/Shared/ErrorFireModel';

@Injectable()
export class ErrorFireService {

  IsShowing = new Subject<boolean>();
  MSG = new Subject<string>();
  Error = new Subject<ErrorFireModel>();
  ErrorModel!: ErrorFireModel;
  constructor(private translate: TranslateService) {

  }
  show() {
    this.IsShowing.next(true);
  }
  showM(msg: string) {
    this.MSG.next(msg);
    this.IsShowing.next(true);
    setTimeout(() => {
      this.MSG.next('');
      this.IsShowing.next(false);
    }, 3500);
  }
  showOM(err: any) {
    const EID = err;
    this.FillErrorDetails(EID);

    this.MSG.next(this.ErrorModel.ErrorID.toString() + ' - ' + this.ErrorModel.ErrorDescription);
    this.IsShowing.next(true);
    setTimeout(() => {
      this.MSG.next('');
      this.IsShowing.next(false);
    }, 3500);

  }
  showErrM(err: any) {
    const EID = err['error']['StatusCode'];
    this.FillErrorDetails(EID);
    this.Error.next(this.ErrorModel);
  }
  showErrMDirect(EID: any) {
    this.FillErrorDetails(EID);
    this.Error.next(this.ErrorModel);
  }
  showErrMDirectArray(errorsarray: { error: { Error: any; Errors: any; }; }) {
    const EID = errorsarray.error.Error ?? errorsarray.error.Errors;

    this.FillErrorDetails(EID[0]);
    this.Error.next(this.ErrorModel);
  }

  private FillErrorDetails(ErrID: string) {
    this.ErrorModel = new ErrorFireModel();
    this.ErrorModel.ErrorID = Number.parseInt(ErrID);

    if (this.ErrorModel.ErrorID < 20000) {

      this.translate.get('ERROR.' + this.ErrorModel.ErrorID.toString() + '.ErrorDescription').subscribe((res: string) => {
        this.ErrorModel.ErrorDescription = res;
      });
      this.translate.get('ERROR.' + this.ErrorModel.ErrorID.toString() + '.ErrorNotice').subscribe((res: string) => {
        this.ErrorModel.ErrorNotice = res;
      });
    } else {

      this.translate.get('Fleet.ERROR.' + this.ErrorModel.ErrorID.toString() + '.ErrorDescription').subscribe((res: string) => {
        this.ErrorModel.ErrorDescription = res;
      });
      this.translate.get('Fleet.ERROR.' + this.ErrorModel.ErrorID.toString() + '.ErrorNotice').subscribe((res: string) => {
        this.ErrorModel.ErrorNotice = res;
      });
    }
  }
}
