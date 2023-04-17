import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-grafica-granulometria',
  templateUrl: './grafica-granulometria.component.html',
  styleUrls: ['./grafica-granulometria.component.scss']
})
export class GraficaGranulometriaComponent implements AfterViewInit {

  vY = [100, 100, 99.23, 98.54, 98.04, 95.17, 90.58, 72.60, 34.52]
  vX = [50.80, 25.40, 19, 12.70, 9.53, 4.75, 2, 0.425, 0.075]

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
          data: this.vX.map((x, i) => ({
            x: x,
            y: this.vY[i],
          })),
          type: 'line',
          label: 'Datos',
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
          tension: 0.5,
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
          type:'linear',
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
          //base: 10,
          min:0.01,
          max:100,
          //type: 'category',
         // labels: ['0.01', '0.1', '10', '100'],
          ticks: {
            //values: [0.01, 0.1, 10, 100],
            display: true,
            //callback: (value, index, values) => {
              //return value.toLocaleString();
            //},
            callback: function (value, index, values) {
          // lista de valores personalizados
          const customValues = [0.01, 0.1, 10, 100];
          
          // devuelve el valor personalizado correspondiente o el valor original si no hay un valor personalizado para este valor
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
 // type MyChartType = 'line' | 'bar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'scatter' | 'logarithmic';
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

}
