import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px
    }
  `]
})
export class PorRegionComponent {

  regiones: string[] = [ 'EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  regionActiva: string = '';
  paises: Country[] = [];
  verTabla: boolean = false;

  constructor( private paisService: PaisService){}

  activarRegion( region: string ){

    // Si ya está cargado para que cargalo de nuevo
    if( region === this.regionActiva) { return; }

    this.regionActiva = region;

    this.paisService.buscarRegion(region).subscribe( paises => {
        console.log(paises);
        this.paises = paises;
        this.verTabla = true;
    });
  }

  getClaseCSS( region: string ): string {
    return (region === this.regionActiva)
            ? 'btn btn-primary'
            : 'btn btn-outline-primary';
  }

}
