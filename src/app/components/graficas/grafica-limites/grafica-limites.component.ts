import { Component, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { calcularTendencia } from '@app/utils/tendencia';

@Component({
  selector: 'app-grafica-limites',
  templateUrl: './grafica-limites.component.html',
  styleUrls: ['./grafica-limites.component.scss']
})

export class GraficaLimitesComponent implements AfterViewInit {

  @Input()
  set SetValoresXY({ porcentajeHumedad, numeroDeGolpes }: { 
    porcentajeHumedad: number[], numeroDeGolpes: number[] }) {
    this.porcentajeHumedad = porcentajeHumedad;
    this.numeroDeGolpes = numeroDeGolpes;
    this.limiteLiquido = calcularTendencia(numeroDeGolpes,porcentajeHumedad);
    this.crearGrafica()
  }

  porcentajeHumedad:number[] = [];
  numeroDeGolpes:number[] = [];
  limiteLiquido: number = 0;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const canvas = this.chartCanvas.nativeElement;
    canvas.addEventListener('resize', () => {
      this.chart?.update();
    });
  }

  crearGrafica(){
    Chart.register(Annotation);
    this.lineChartData = {
      datasets: [
        {
          data: [
            { x: this.limiteLiquido, y: 25 },
            { x: this.limiteLiquido, y: 10 },
          ],
          type: 'line',
          label: `Tendencia=${this.limiteLiquido}`,
          backgroundColor: 'rgba(51,51,255,0.2)',
          borderColor: 'rgba(51,51,225,1)',
          borderDash: [5, 5],
          fill: false,
        },
        {
          data: this.porcentajeHumedad.map((x, i) => ({
            x: x,
            y: this.numeroDeGolpes[i],
          })),
          type: 'line',
          label: 'Golpes',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
        },
      ],
    };
    this.lineChartOptions = {
      aspectRatio: 1.5,
      responsive: true,
      maintainAspectRatio: false,
      backgroundColor: 'rgba(255, 99, 132, 1)',
      color: 'rgba(0,0,0,1)',
      elements: {
        point: {
          radius: 6,
          borderWidth: 2,
          hoverRadius: 8,
          hoverBorderWidth: 3,
        },
        line: {
          borderWidth: 3,
          tension: 0.3,
        },
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            font: {
              size: 18,
            },
          },
        },
      },
      scales: {
        y: {
          min: 10,
          max: Math.ceil(Math.max(...this.numeroDeGolpes) / 5) * 5,
          ticks: {
            stepSize: 5,
            color: 'rgba(0,0,0,1)',
            font: {
              size: 16,
            },
          },
          grid: {
            color: 'rgba(0,0,0,1)',
            lineWidth: 1,
          },
        },
        x: {
          min: this.porcentajeHumedad[0] - 1,
          max: Math.max(...this.porcentajeHumedad) + 0.2,
          ticks: {
            stepSize: 0.2,
            color: 'rgba(0,0,0,1)',
            callback: function (value) {
              return Number(value).toFixed(2);
            },
            font: {
              size: 16,
            },
          },
          grid: {
            color: 'rgba(0,0,0,1)',
            lineWidth: 1,
          },
        },
      },
    };
  }

  public lineChartData: ChartConfiguration['data'] = { datasets: [] };

  public lineChartOptions: ChartConfiguration['options'] = {};

  public lineChartType: ChartType = 'scatter';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
