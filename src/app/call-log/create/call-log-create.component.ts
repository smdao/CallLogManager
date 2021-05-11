import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import { CalllogService } from '../../services/calllog.service';
import { MessageBoxComponent as MessageBoxComponent } from '../message-box.component';
import { ICallLog } from '../models/calllog.interface';
import { CallLogModel } from '../models/calllog.model';

@Component({
  selector: 'app-call-log-create',
  templateUrl: './call-log-create.component.html',
  styleUrls: ['./call-log-create.component.css']
})

export class CallLogCreateComponent implements OnInit {

  @Output() onCancel = new EventEmitter<number>();

  get isFormValid(): boolean {
    if (this.callLog.user === null || this.callLog.user.trim().length === 0) return false;
    if (this.callLog.title === null || this.callLog.title.trim().length === 0) return false;
    if (this.callLog.problem === null || this.callLog.problem.trim().length === 0) return false;
    if (this.callLog.solution === null || this.callLog.solution.trim().length === 0) return false;
    if (this.callLog.status === null || this.callLog.status.trim().length === 0) return false;
    return true;
  }

  emptyCallLog: ICallLog = new CallLogModel();
  callLog: ICallLog = new CallLogModel();

  /**
   * 
   */
  constructor(private msgBox: MatSnackBar,
    private callLogService: CalllogService) {

  }

  /**
   * 
   */
  ngOnInit(): void {
  }

  /**
   * 
   */
  save() {

    this.callLog.occuredAt = new Date();
    this.callLogService.create(this.callLog);
    Object.assign(this.callLog, this.emptyCallLog);

    this.msgBox.openFromComponent(MessageBoxComponent, { duration: 5000, verticalPosition: 'top' });
  }

  /**
   * 
   */
  saveAndClose() {

    this.save();
    this.cancel();

  }

  /**
   * 
   */
  clear() {
    Object.assign(this.callLog, this.emptyCallLog);
  }

  /**
   * 
   */
  cancel() {
    this.onCancel.emit(0);
  }

}
