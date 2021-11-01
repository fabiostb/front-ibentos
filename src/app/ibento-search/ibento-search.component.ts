import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {Ibento} from '../ibento-service/ibento';
import {IbentoService} from '../ibento-service/ibento.service';

@Component({
  selector: 'app-ibento-search',
  templateUrl: './ibento-search.component.html',
  styleUrls: ['./ibento-search.component.css']
})
export class IbentoSearchComponent implements OnInit {
  ibentos$!: Observable<Ibento[]>;
  private searchTerms = new Subject<string>();

  constructor(private ibentoService: IbentoService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.ibentos$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.ibentoService.searchIbentos(term)),
    );
  }
}
