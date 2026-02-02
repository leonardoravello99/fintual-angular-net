import { Component, OnInit } from '@angular/core';
import { FondosService } from 'src/app/services/fondos.service';
import { VariacionFinal } from 'src/app/models/variacion-final.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-variaciones',
  templateUrl: './variaciones.component.html',
  styleUrls: ['./variaciones.component.css']
})
export class VariacionesComponent implements OnInit {
variaciones: VariacionFinal[] = [];

fechaInicio: string = '2023-01-01';
fechaFin: string = '2023-12-31';

fondos = [
  { id: 15077, nombre: 'Very Conservative Streep' },
  { id: 186, nombre: 'Risky Norris' },
  { id: 188, nombre: 'Conservative Clooney' },
  { id: 187, nombre: 'Moderate Pit'}
];

fondoSeleccionado: number = 15077;


constructor(private fondosService: FondosService){}

ngOnInit(): void {
    this.cargarDatos();
}

cargarDatos(){
  this.fondosService.getVariaciones(
    this.fondoSeleccionado,
    this.fechaInicio,
    this.fechaFin
  ).subscribe({
    next: data => {
  console.log('DATA RECIBIDA', data);
  this.variaciones = data;
  this.crearGrafico(this.variaciones);
},

    error: err => console.error('ERROR API',err)
  });
}

chart: any;

filtrar() {
  this.fondosService.getVariaciones(
    this.fondoSeleccionado,
    this.fechaInicio,
    this.fechaFin
  ).subscribe({
    next: data => {
      this.variaciones = data;
      this.crearGrafico(this.variaciones);
    },
    error: err => console.error(err)
  });
}

crearGrafico(data: VariacionFinal[]){
  const labels = data.map(v=>`${v.mes}/${v.anio}`);
  const valores = data.map(v=> v.variacionPorcentaje);

  if(this.chart){
    this.chart.destroy();
  }

  this.chart = new Chart('graficoVariacion',{
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Variacion mensual (%)',
        data: valores,
        borderColor:  '#1976d2',
        backgroundColor: 'rgba(25,118,210,0.15)',
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: '#1976d2'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend:{
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.parsed.y}%`
          }
        }
      },
      scales:{
        y:{
          ticks:{
            callback: (value)=> value + '%'
          },
          title:{
            display: true,
            text: 'Variacion (%)'
          }
        },
        x: {
          title:{
            display: true,
            text: 'Mes / Anio'
          }
        }
      }
    }
  });
}
}
