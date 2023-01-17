import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  // la ! sirve para decir a typescript que algo es como le digamos y que quite los errores
  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
    ) {}

  ngOnInit(): void {

    // Primera forma de hacerlo
    /* this.activatedRoute.params
      .subscribe( ({id}) => {
        console.log(id);
        this.paisService.getPaisPorAlpha( id )
          .subscribe( pais => {
            console.log(pais);
          })
      }) */

    // Una más resumida
    this.activatedRoute.params
      .pipe(
        switchMap( ( { id }) => this.paisService.getPaisPorAlpha( id ) ),
        // El tap imprime en consola lo que responda es como si dicieramos resp => consoloe.log(resp)
        tap( console.log )
      )
      .subscribe( pais => this.pais = pais );
  }
}
