import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter;

  // Se activa onDebounce cuando se deja de escribir
  @Output() onDebounce: EventEmitter<string> = new EventEmitter;

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit(){
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe( valor => {
      this.onDebounce.emit(valor);
    })
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  // Llamando desde el input
  /* teclaPresioanda( event: any ){
    const valor = event.target.value;
    console.log(valor);
    console.log(this.termino);
  } */

  // Desde debouncer
  teclaPresioanda(){
    this.debouncer.next(this.termino);
  }

}
