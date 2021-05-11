import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { ICallLog } from '../call-log/models/calllog.interface';
import { CallLogModel } from '../call-log/models/calllog.model';

const callLogStorageName = 'calllogdata';

@Injectable({
  providedIn: 'root'
})

export class CalllogService {

  CALLLOGDATA: ICallLog[] = [];
  CHARTLABELS: Label[] = [];
  CHARTDATA: ChartDataSets[] = [
    { data: [], label: 'Open' },
    { data: [], label: 'Closed' }
  ];


  dataSource: MatTableDataSource<ICallLog>;
  
  /**
   * 
   */
  constructor() {

    const calllogdata = localStorage.getItem(callLogStorageName);
    if (calllogdata !== null) this.CALLLOGDATA = JSON.parse(calllogdata);
    else this.CALLLOGDATA = [];
    
    this.dataSource = new MatTableDataSource<ICallLog>(this.CALLLOGDATA);

   }

  /**
   * 
   */
   loadChart() {

    const data = this.CALLLOGDATA;
    if (data.length === 0) return;

    const callLog = data.reduce((a, b) => {
      const d1 = a.occuredAt !== null ? a.occuredAt : new Date();
      const d2 = b.occuredAt !== null ? b.occuredAt : new Date();
      return d1 > d2 ? a : b;
    });

    const currentDate = callLog.occuredAt !== null ? new Date(callLog.occuredAt.toString()) : new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    this.CHARTLABELS = [];
    this.CHARTDATA[0].data = [];
    this.CHARTDATA[1].data = [];

    for(let dayIndex = 1; dayIndex <= currentDay; dayIndex++) {
    
      const dateStr = `${currentMonth}/${dayIndex}/${currentYear}`;
      this.CHARTLABELS.push(dateStr);

      const openCallLogs = data.filter(x => {
        const occuredAt = x.occuredAt !== null ? new Date(x.occuredAt.toString()) : new Date();
        return occuredAt.getDate() === dayIndex && x.status === 'Open';
      });

      this.CHARTDATA[0].data.push(openCallLogs.length);

      const closedCallLogs = data.filter(x => {
        const occuredAt = x.occuredAt !== null ? new Date(x.occuredAt.toString()) : new Date();
        return occuredAt.getDate() === dayIndex && x.status === 'Closed';
      });

      this.CHARTDATA[1].data.push(closedCallLogs.length);

    }


  }

  /**
   * 
   */
  clearChart() {

    this.CHARTLABELS = [];
    this.CHARTDATA[0].data = [];
    this.CHARTDATA[1].data = [];


  }   
   /**
    * 
    */
   clearStorate() {
     localStorage.removeItem(callLogStorageName);
     this.CALLLOGDATA = [];
     this.dataSource = new MatTableDataSource<ICallLog>(this.CALLLOGDATA);
  }

  /**
   * 
   * @param callLog 
   */
  create(callLog: ICallLog) {

    let newCallLog: ICallLog = new CallLogModel();
    Object.assign(newCallLog, callLog);
    this.CALLLOGDATA.push(newCallLog);
    this.dataSource = new MatTableDataSource<ICallLog>(this.CALLLOGDATA);
    localStorage.setItem(callLogStorageName, JSON.stringify(this.CALLLOGDATA));
  }

  /**
   * 
   * @param searchText 
   */
  search(searchText: string, isOnlyOpen: boolean) {

    let result = this.CALLLOGDATA.filter(x => (x.title != null && x.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      || (x.user != null && x.user.toLowerCase().indexOf(searchText.toLowerCase()) >= 0));
    if (isOnlyOpen) {
      result = result.filter(x => x.status === "Open");
    }
    this.dataSource = new MatTableDataSource<ICallLog>(result);

  }
}
