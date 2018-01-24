import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http'; virou service
import { FotoService } from '../../services/foto.service'
import { FotoComponent } from '../../foto/foto.component';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})

export class ListagemComponent {
 /*title = 'app';*/
 title = 'Caelumpic';


 /* utilizando Loop For */
 // fotos = [
 //   { url: './assets/img/pikachu.jpg', titulo: 'Pikachu' },
 //   { url: './assets/img/charizard.png', titulo: 'Charizard' }
 // ]
 //fotos: Object[] = []   Agora vem do acesso http ---- declaracao npmigual ao de baixo
 //fotos: Array<Object> = [] agora posso usar o tipo de fotocomponent
 fotos: Array<FotoComponent> = []
 
 fotoService: FotoService

 //Chamada servidor remoto
  /*constructor() {
   aqui nao estou utilizando o Angular entao deixa de ser crossbrowser entao foge da proposta
   var pegaFotos = new XMLHttpRequest()  //api browser
   pegaFotos.open('GET', 'http://localhost:3000/v1/fotos')
   pegaFotos.send()

   //Arrow Function Contexto Lexico (ou Leitura)
   pegaFotos.addEventListener('load', () => {
     console.log('A requisicao chegou !', this)
     this.fotos = JSON.parse(pegaFotos.response)  //Objeto == JSON == Texto
   })
 }*/
 //constructor(@Inject(Http) http) {  //injecao de dependencia
 //constructor(http: Http) {  //injecao de dependencia tipado - virou service
 constructor(fotoService: FotoService) {  //injecao de dependencia tipado
    //Nao sabemos qto tempo demora esta requisicao
    //http.get('http://localhost:3000/v1/fotos') virou servico
    this.fotoService = fotoService

    fotoService
      .listar()
      .subscribe( (valor) => {
          //var fotos = valor.json(); se a variavel nao for mudar utilizar const
          //const  fotos = valor.json(); este passo esta sendo entregue pelo service e passando direto no valor

          //dispara o change detection
          //this.fotos = fotos;
          this.fotos = valor;
      });
 }

 removeFoto(fotoADeletar: FotoComponent) {
    //console.log("ID -> " + fotoADeletar._id)
    
    this.fotoService
      .deletar(fotoADeletar)
      .subscribe(() => { //Remove do HTML
        const fotosAtualizadas = this.fotos.filter(function(fotoAtual){
            return fotoAtual._id != fotoADeletar._id
        })       

        this.fotos = fotosAtualizadas
      })
  }
}
