import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css'],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  verTabla: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {

  }

  buscar( termino: string ) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        console.log(paises);
        this.paises = paises;
        this.verTabla = true;
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
        console.log(err);
      },
    });
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
    .subscribe({
      next: (paises) => {
        this.paisesSugeridos = paises.splice(0,5)
      },
      error: (err) => {
        this.paisesSugeridos = []
        console.log(err);
      }
    });
  }

  buscarSugerido(termino: string){
    this.buscar( termino );
  }
}
