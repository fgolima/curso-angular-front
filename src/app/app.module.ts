import 'rxjs/add/operator/map'  //lib do angular que ajuda a trabalhar com o map do service
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
// import { FotoComponent } from './foto/foto.component'; -- nao modulo
import { FotoModule } from './foto/foto.module';
import { CardModule } from './card/card.module';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { roteamento } from './roteamento'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FotoService } from './services/foto.service'

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ListagemComponent
    // ,FotoComponent  -- nao modulo
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FotoModule,
    CardModule,
    roteamento,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ FotoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
