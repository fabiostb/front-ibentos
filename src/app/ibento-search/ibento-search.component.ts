import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Ibento } from '../ibento';
import { IbentoService } from '../ibento.service';

@Component({
  selector: 'app-ibento-search',
  templateUrl: './ibento-search.component.html',
  styleUrls: [ './ibento-search.component.css' ]
})
export class IbentoSearchComponent implements OnInit {
  ibentos$!: Observable<Ibento[]>;
  private searchTerms = new Subject<string>();

  constructor(private ibentoService: IbentoService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.ibentos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.ibentoService.searchIbentos(term)),
    );
  }
}
