import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Ibento} from '../ibento-service/ibento';
import {IbentoService} from '../ibento-service/ibento.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IbentoList} from '../ibento-service/ibento-list';

@Component({
  selector: 'app-ibento-list',
  templateUrl: './ibento-dashboard.component.html',
  styleUrls: ['./ibento-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class IbentoDashboardComponent implements OnInit {

  list: IbentoList[] = [];
  isWaiting = false;
  isEmpty = false;

  columnsToDisplay = ['name', 'startDate', 'endDate', 'minutesBeforeStart', 'action'];
  expandedElement: Ibento | undefined;

  constructor(private ibentoService: IbentoService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.refreshList();
  }

  openSnackBar(message: string, action: string | undefined) {
    this.snackBar.open(message, action, {duration: 3000});
  }

  refreshList() {
    this.isWaiting = true;
    this.ibentoService.getIbentos().subscribe(list => {
      this.list = list;
      this.isWaiting = false;
      this.isEmpty = this.list.length === 0;
    });
  }

  delete(ibento: Ibento): void {
    this.isWaiting = true;
    this.ibentoService.deleteIbento(ibento.id!).subscribe(() => {
      this.refreshList();
      this.openSnackBar('Événement supprimé', ibento.name);
      this.isWaiting = false;
    });
  }

  hasIbentos() {
    return isNotNullOrUndefined(this.list) && this.list.length > 0;
  }

  formatMinutes(minutes: number) {
    if (isNotNullOrUndefined(minutes) && minutes > 0) {
      // tslint:disable-next-line:no-bitwise
      return `${minutes / 60 ^ 0}h` + minutes % 60;
    }
    return '----';
  }
}
