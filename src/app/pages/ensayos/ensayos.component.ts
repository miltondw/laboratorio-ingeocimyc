import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {LaboratorioService} from '@app/services/laboratorio.service'
@Component({
  selector: 'app-ensayos',
  templateUrl: './ensayos.component.html',
  styleUrls: ['./ensayos.component.scss']
})
export class EnsayosComponent implements OnInit  {
constructor(
  private route: ActivatedRoute,
  private laboratorioService:LaboratorioService
  ){}

ngOnInit(): void {
  this.route.paramMap
  .subscribe((paramsRoute) => this.laboratorioService.setQueryId(paramsRoute.get('id')));
  this.route.queryParamMap
  .subscribe(params =>this.laboratorioService.setQueryProbe(Number(params.get('probe'))));
}

}
