import { Component, OnInit } from '@angular/core';

import { Ibento } from '../ibento';
import { IbentoService } from '../ibento.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'app-ibento-detail',
  templateUrl: './ibento-detail.component.html',
  styleUrls: ['./ibento-detail.component.css']
})
export class IbentoDetailComponent implements OnInit {

  ibento = new Ibento();
  isWaiting = false;
  paramId = this.route.snapshot.paramMap.get('id');

  constructor(private ibentoService: IbentoService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.fillForm();
  }

  openSnackBar(message: string, action: string | undefined) {
    this.snackBar.open(message, action, {duration: 3000});
  }

  save(): void {
    if (this.isEditing()) {
      this.update();
    } else {
      this.add();
    }
  }

  add(): void {
    this.ibentoService.addIbento(this.ibento)
      .subscribe(() => this.navigateToDashboard('Créé'));
  }

  update(): void {
    this.ibentoService.updateIbento(this.ibento)
      .subscribe(() => this.navigateToDashboard('Modifié'));
  }

  isEditing(): boolean {
    return isNotNullOrUndefined(this.paramId);
  }

  private navigateToDashboard(actionPerformed: string) {
    this.openSnackBar('Événement ' + actionPerformed, this.ibento.name);
    this.router.navigate(['/dashboard'], {}).then(() => {});
  }

  private fillForm() {
    if (this.isEditing()) {
      this.isWaiting = true;
      this.ibentoService.getIbento(this.paramId!)
        .subscribe(ibento => {
          this.ibento = ibento;
          this.isWaiting = false;
        });
    }
  }
}
