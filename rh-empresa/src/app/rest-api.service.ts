import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor( private http: HttpClient) { }


   guardarAgenda(agenda: any){
    console.log('test');
    
    return this.http.post(environment.url + 'agenda', agenda)
  }

  
   getAgendaPorCodigo(id: string){
    return this.http.get(environment.url + 'agenda/' + id);
  }

  
  actualizarAgenda(datosAgenda: any, id: string){
    return this.http.put(environment.url + 'agenda/' +id, datosAgenda)
  }


  eliminarAgenda(id: string){
    return this.http.delete(environment.url + 'agenda/' +id);
  }

  getListaAgenda(){
    return this.http.get(environment.url + 'agendas');
  }

}
