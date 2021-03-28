import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Highcharts = Highcharts;

  chartOptions = null;
  chartOptions2 = null;
  chartOptions3 = null;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Ganancias por día'
      },
      series: [{
          name: 'Carro',
          data: this.dataExample()
        },{
          name: 'Camioneta',
          data: [430, 230, 1120, 890, 490, 330, 1632, 1200]
        },{
          name: 'Plataforma',
          data: [600, 670, 302, 420, 1200, 1400, 892, 342]
        },{
          name: 'Camión',
          data: [null, null, null, 902, 932, 403, 893, 1430]
        },{
          name: 'Remolque',
          data: [300, 359, 934, 320, 490, 422, 492, 899]
        }]
    }

    this.chartOptions2 = {
      chart: {
        type: 'bar'
      },
      title: {
          text: 'Servicios prestados por vehículos'
      },
      xAxis: {
          categories: ['Carro', 'Camioneta', 'Plataforma', 'Camión', 'Remolque'],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          labels: {
              overflow: 'justify'
          }
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Finalizados',
          data: [98, 32, 35, 12, 4]
      }, {
          name: 'Cancelados',
          data: [22, 8, 12, 4, 1]
      }, {
          name: 'En proceso',
          data: [12, 12, 3, 3, 2]
      }]
    }

    this.chartOptions3 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
          text: 'Vehículos usados'
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
      },
      series: [{
          name: 'Vehiculos',
          colorByPoint: true,
          data: [{
              name: 'Carro',
              y: 61.41,
              sliced: true,
              selected: true
          }, {
              name: 'Camioneta',
              y: 11.84
          }, {
              name: 'Plataforma',
              y: 10.85
          }, {
              name: 'Camión',
              y: 4.67
          }, {
              name: 'Remolque',
              y: 11.23
          }]
      }]
    }
  }

  dataExample(){
    let data = [1322, 2122, 1500, 2190, 932, 982, 1623, 940]
    return data
  }

}
