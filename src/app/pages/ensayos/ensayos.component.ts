import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-ensayos',
  templateUrl: './ensayos.component.html',
  styleUrls: ['./ensayos.component.scss']
})
export class EnsayosComponent implements OnInit  {
  projectId: string | null = ""
constructor(
  private route: ActivatedRoute,
){}
ngOnInit(): void {
  this.route.paramMap.subscribe((paramsRoute) => this.projectId = paramsRoute.get('id'))
  console.log(this.projectId)
}
}
