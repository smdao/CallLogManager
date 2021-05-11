import { Component, OnInit, ViewChild } from '@angular/core';
import { CalllogService } from '../services/calllog.service';
import { CallLogCreateComponent } from './create/call-log-create.component';

@Component({
  selector: 'app-call-log',
  templateUrl: './call-log.component.html',
  styleUrls: ['./call-log.component.css'],  
})
export class CallLogComponent implements OnInit {

  selectedIndex: number = 0;

  /**
   * 
   */
  constructor(private callLogService: CalllogService) { 
  }

  /**
   * 
   */
  ngOnInit(): void {
  }

  /**
   * 
   * @param val 
   */
  cancelCreate(val: number) {
    this.selectedIndex = val;
    this.callLogService.loadChart();
  }

}
