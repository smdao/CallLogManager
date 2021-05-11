import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { CalllogService } from '../../services/calllog.service';
import { ICallLog } from '../models/calllog.interface';
import { CallLogModel } from '../models/calllog.model';

@Component({
  selector: 'app-call-log-search',
  templateUrl: './call-log-search.component.html',
  styleUrls: ['./call-log-search.component.css']
})

export class CallLogSearchComponent implements OnInit {

  displayedColumns: string[] = ['occuredAt', 'user', 'title', 'status'];

  searchText: string = '';
  isOnlyOpen: boolean = false;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  /**
   * 
   * @param callLogService 
   */
  constructor(public callLogService: CalllogService) { 
  }

  /**
   * 
   */
  ngOnInit(): void {
    this.callLogService.loadChart();
  }

  /**
   * 
   * @param param0 
   */
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  /**
   * 
   * @param param0 
   */
  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



  /**
   * 
   * @param e 
   */
  searchChange(e: any) {
    this.callLogService.search(this.searchText, this.isOnlyOpen);
  }

  /**
   * 
   */
  clearLocalStorage() {
    this.callLogService.clearStorate();
    this.callLogService.clearChart();
  }

  /**
   * 
   */
  generateMockData() {

    this.clearLocalStorage();
    
    const statuses = ['Open', 'Closed'];

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    console.log(currentDay, currentMonth, currentYear);

    for(let dayIndex = 1; dayIndex <= currentDay; dayIndex++) {

      const maxCallCount = Math.floor(Math.random() * 10) + 10;

      for(let callIndex = 0; callIndex < maxCallCount; callIndex++) {

        const statusId = Math.floor(Math.random() * 2);

        const callLog: ICallLog = {
          occuredAt: new Date(`${currentMonth}/${dayIndex}/${currentYear}`),
          user: 'John',
          title: 'TEST',
          status: statuses[statusId],
          problem: '',
          solution: ''
        };

        this.callLogService.create(callLog);

      }

    }

    this.callLogService.loadChart();

    
  }

}
