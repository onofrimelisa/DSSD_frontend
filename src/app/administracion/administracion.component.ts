import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { Language, Monitoreo } from '../interfaces';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { PRIVATE_BACKEND_URL } from '../app-constants';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  loading = false
  dashboard!: Monitoreo;
  doughnutChartLabels: Label[] = []
  doughnutChartData: MultiDataSet = []
  doughnutChartType: ChartType = 'doughnut';
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  pieChartLabelsIdiomas: Label[] = [];
  pieChartDataIdiomas: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartData: ChartDataSets[] = []
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(245,40,145,0.41)', 'rgba(0,255,238,0.29)', 'rgba(255,250,179,8)', 'rgba(187,153,168,0.9)'],
    },
  ];
  barChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(245,40,145,0.41)'],
    },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDataForMonitoring()
  }

  getDataForMonitoring() {
    this.http.get(PRIVATE_BACKEND_URL + "/metricas").subscribe((result: any) => {
      this.loading = false
      this.dashboard = result
      console.log(this.dashboard)

      // DOUGHNUT CHART PAISES
      this.doughnutChartLabels = [
        this.dashboard.paisesMaxExportaciones[0].pais.name,
        this.dashboard.paisesMaxExportaciones[1].pais.name,
        this.dashboard.paisesMaxExportaciones[2].pais.name,
        this.dashboard.paisesMaxExportaciones[3].pais.name,
        this.dashboard.paisesMaxExportaciones[4].pais.name,
      ];
      this.doughnutChartData = [
        [
          this.dashboard.paisesMaxExportaciones[0].count,
          this.dashboard.paisesMaxExportaciones[1].count,
          this.dashboard.paisesMaxExportaciones[2].count,
          this.dashboard.paisesMaxExportaciones[3].count,
          this.dashboard.paisesMaxExportaciones[4].count
        ]
      ];

      // PIE CHART CONTINENTES
      this.pieChartLabels = [
        this.dashboard.continentesMaxExportaciones[0].name,
        this.dashboard.continentesMaxExportaciones[1].name,
        this.dashboard.continentesMaxExportaciones[2].name,
      ]
      this.pieChartData = [1, 1, 1];

      // CHART IDIOMAS
      const idiomas: string[] = this.dashboard.paisesMaxExportaciones.reduce((curent: string[], country, b) => {
        country.pais.languages.map((lenguaje: Language) => {
          curent.push(lenguaje.name)
        })
        return curent
      }, [])

      const idiomasSet = [...new Set(idiomas)]

      this.pieChartLabelsIdiomas = [...idiomasSet]
      this.pieChartDataIdiomas = [...Array(idiomasSet.length).fill(1)]

      // CHART STATUS MAP
      const keys = Object.keys(this.dashboard.statusMap)
      const values = Object.values(this.dashboard.statusMap)
      this.barChartLabels = [""]
      this.barChartData = [
        { data: [values[0]], label: keys[0] },
        { data: [values[1]], label: keys[1] },
        { data: [values[2]], label: keys[2] },
        { data: [values[3]], label: keys[3] }
      ]

    }, (err) => {
      console.error(err)
    })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
