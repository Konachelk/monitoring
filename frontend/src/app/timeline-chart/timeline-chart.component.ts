import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements OnInit {
  @Input()  lineChartData;
  @Input() lineChartLabels;

  // @ts-ignore
  public lineChartOptions: (ChartOptions & { annotation }) = {
    scales: {
      xAxes: [{
        ticks: {
          display: false
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'SOG'
        }
      }]
    },
    tooltips: {
      mode: 'x-axis'
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

}
