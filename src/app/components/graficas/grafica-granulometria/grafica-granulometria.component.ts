import { Component, ViewChild, AfterViewInit, ElementRef,Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-grafica-granulometria',
  templateUrl: './grafica-granulometria.component.html',
  styleUrls: ['./grafica-granulometria.component.scss']
})
export class GraficaGranulometriaComponent implements AfterViewInit {
  //Get
  @Input()
  set SetPorcentajeQuePasa(value: number[]) {
    this.porcentajeQuePasa = value;
  }
  porcentajeQuePasa:number[] = [100, 100, 99.23, 98.54, 98.04, 95.17, 90.58, 72.60, 34.52]
  tamices:number[] = [50.80, 25.40, 19, 12.70, 9.53, 4.75, 2, 0.425, 0.075]

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const canvas = this.chartCanvas.nativeElement;
    canvas.addEventListener('resize', () => {
      this.chart?.update();
    });
  }
  constructor () {

    Chart.register(Annotation);
    this.lineChartData = {
      datasets: [
        {
          data: this.tamices.map((x, i) => ({
            x: x,
            y: this.porcentajeQuePasa[i],
          })),
          type: 'line',
          label: 'Datos',
          backgroundColor: 'red',
          borderColor: 'red',
          pointBackgroundColor:'rgba(0,0,0,0.9)',
          fill: false,
        },
      ],
    };
    this.lineChartOptions = {
      aspectRatio: 1.5,
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 3,
          borderWidth: 1,
          hoverRadius: 4,
          hoverBorderWidth: 2,

        },
        line: {
          borderWidth: 2,
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
          min: 0,
          max: 100,
          type: 'linear',
          ticks: {
            stepSize: 10,
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
          reverse: true,
          type: 'logarithmic',
          min: 0.01,
          max: 100,
          ticks: {
            display: true,
            callback: function (value, index, values) {
              const customValues = [0.01, 0.1, 10, 100];
              if (customValues.indexOf(Number(value)) !== -1) {
                return value;
              } else {
                return '';
              }
            },
            font: {
              size: 16,
            },
            color: 'rgba(0,0,0,1)',
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
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

}
