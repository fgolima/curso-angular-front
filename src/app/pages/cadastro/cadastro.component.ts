import { FotoComponent } from '../../foto/foto.component';
//import { Http, Headers } from '@angular/http'
import { Headers } from '@angular/http'
import { FotoService } from '../../services/foto.service';
import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  formCadastro : FormGroup

  //http: Http
  foto: FotoComponent
  
  //constructor(http: Http) { 
  //constructor(http: Http, fotoService: FotoService) { 
  constructor(rota: ActivatedRoute, 
    private fotoService: FotoService,
    private formBuilder: FormBuilder) { 

      //validacao do form
    this.formCadastro = this.formBuilder.group({
      titulo: ['', Validators.required],
      url: ['', Validators.required],
      descricao: ['', Validators.required]
    })

    this.foto = new FotoComponent
    //this.http = http
    this.fotoService = fotoService

    rota.params.subscribe((parametros) => {
      const idFoto = parametros.id

      if(idFoto){
        this.fotoService.pegaUm(idFoto)
            .subscribe( (foto) => {
                  this.foto = foto
            })
      }
    })
  }

  //Pegar o form do gist https://gist.github.com/omariosouto/
  salvar(event) {
    event.preventDefault()  //cancela o comportamento automatico do Angular para este caso que seria o refresh da pagina
                            //dando a oportunidade de executar algum codigo e se necessario a chamada de refresh manual
    //console.log('Essa e a foto:', this.foto)

    //como este codigo pode ser reutilizado, vamos criar um servico
    // const cabecalho = new Headers() -- passou para o service
    // cabecalho.append('content-type','application/json')

    // this.http.post('http://localhost:3000/v1/fotos', 
    //                 JSON.stringify(this.foto), 
    //                 { headers: cabecalho })
    if(this.foto._id) {
      this.fotoService
      .atualiza(this.foto)
      .subscribe((resposta) => {
        console.log(resposta)
        this.foto = new FotoComponent  //para limpar a tela de cadastro
      })
    } else {
       this.fotoService
        .cadastra(this.foto)
        .subscribe((resposta) => {
          console.log(resposta)
          this.foto = new FotoComponent  //para limpar a tela de cadastro
        })
    }
  }
}
