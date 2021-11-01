import {Ibento} from './ibento';

export class IbentoList {

  constructor(public ibento: Ibento | undefined,
              public minutesBeforeStart: number | undefined) {
  }
}
