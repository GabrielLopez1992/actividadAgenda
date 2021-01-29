import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../rest-api.service';
import { Agenda } from '../agendaInterface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  datosCorrectos:boolean = true;
  textError: string = '';
  formulario: FormGroup;
  listado: any;
  listaAgendas: any= [];
  

  constructor( public createFormulario: FormBuilder,
               public servicio: RestApiService
               
               ) {
                
                this.formulario = this.createFormulario.group({
                  codigo: {value: '', disabled: true},
                  nombre: ['', Validators.required],
                  telefono: ['', Validators.required],
                  direccion: ['', Validators.required]
                });

                }

  ngOnInit(): void {

    this.onlistado();
    
  }

  crearFormulario(){
    this.formulario = this.createFormulario.group({
      codigo: [''],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
  });
  }

  registro() {
    
    const agenda = {
      age_nombre: this.formulario.value.nombre,
      age_telefono:this.formulario.value.telefono,
      age_direccion:this.formulario.value.direccion
    }

    console.log(agenda);
    if(this.formulario.value.codigo){
      this.servicio.actualizarAgenda(agenda, this.formulario.value.codigo).subscribe(res => {
        this.onlistado();
        this.crearFormulario();
        Swal.fire(
          'RH Empresa',
          'Actualizado',
          'success'
        )
       });
    }else{
      this.servicio.guardarAgenda(agenda).subscribe(res => {
        this.onlistado();
        this.crearFormulario();
        Swal.fire(
          'RH Empresa',
          'Registrado',
          'success'
        )
    });
    }
    
    
  }

  onlistado(){
      // llamar servicio
      this.servicio.getListaAgenda().subscribe(res => {
       
            console.log(res);
             this.listaAgendas = res;

      });
  }


  eliminar(item:any){
    this.servicio.eliminarAgenda(item.age_codigo).subscribe(res =>{
     this.onlistado();
     Swal.fire({
      icon: 'error',
      title: 'Rh Empresa',
      text: 'Eliminado'
    })
    })
  }

  editar(item:any){
    this.formulario = this.createFormulario.group({
      codigo: item.age_codigo,
      nombre: item.age_nombre,
      telefono: item.age_telefono,
      direccion: item.age_direccion
    });
  }


}
