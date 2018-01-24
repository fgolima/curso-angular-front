import { NgModule } from '@angular/core';
import { FotoComponent } from './foto.component';
import { FiltraPorTituloPipe } from './filtraPorTitulo.pipe';
import { makeDecorator } from '@angular/core/src/util/decorators';

@NgModule({
    declarations: [ FotoComponent, FiltraPorTituloPipe ],
    exports: [ FotoComponent, FiltraPorTituloPipe ]
})

export class FotoModule {}