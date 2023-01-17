import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  verTabla: boolean = false;
  capitales: Country[] = [];

  constructor(private paisService: PaisService) {

  }

  buscar( termino: string ) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(this.termino).subscribe({
      next: (capitales) => {
        console.log(capitales);
        this.capitales = capitales;
        this.verTabla = true;
      },
      error: (err) => {
        this.hayError = true;
        this.capitales = [];
        console.log(err);
      },
    });
  }

  sugerencias( termino: string ){
    this.hayError = false;
    // TODO: crear sugerencias
  }
}
