import { Http, Headers, Response } from '@angular/http'
import { Injectable } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class FotoService {
    URL: string = 'http://localhost:3000'  // aqui verifica se esta online ou offline entre outras configuracoes
    http: Http
    cabecalho: Headers
   
    constructor(http: Http) { 
        this.http = http
        this.cabecalho = new Headers()
        this.cabecalho.append('content-type','application/json')
    }
 
    pegaUm(_id: String): Observable<FotoComponent> {
        return this.http.get(`${this.URL}/v1/fotos/${_id}`)
                        .map( (dados) => dados.json() ) // lib rxjs do app.module
    }

    listar(): Observable<FotoComponent[]> {
        return this.http.get(`${this.URL}/v1/fotos`) // Template String - usa crase mesmo pra ter esta acao...
                        .map( (dados) => dados.json() ) // lib rxjs do app.module
    }

    cadastra(foto: FotoComponent): Observable<Response> {
        const cabecalho = new Headers()
        cabecalho.append('content-type','application/json')
    
        return this.http.post(`${this.URL}/v1/fotos`, 
                        JSON.stringify(foto), 
                        { headers: cabecalho })
    }

    atualiza(foto: FotoComponent): Observable<Response> {
       return this.http.put(`${this.URL}/v1/fotos/${foto._id}`, 
                            JSON.stringify(foto),
                            { headers: this.cabecalho })
     
    }

    deletar(foto: FotoComponent): Observable<Response> {
         return this.http.delete(`${this.URL}/v1/fotos/${foto._id}`)
    }
}