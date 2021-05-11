import { ICallLog } from './calllog.interface';

export class CallLogModel implements ICallLog {

  /**
   * 
   * @param occuredAt 
   * @param user 
   * @param title 
   * @param problem 
   * @param solution 
   * @param status 
   */
  constructor(public occuredAt: Date | null = null,
    public user: string | null = null,
    public title: string | null = null,
    public problem: string | null = null,
    public solution: string | null = null,
    public status: string | null = null) {

  }

}