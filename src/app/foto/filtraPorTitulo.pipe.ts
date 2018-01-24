import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'filtraPorTitulo'
})

export class FiltraPorTituloPipe implements PipeTransform {
    transform(fotos, valorBusca) {
        console.log(fotos)
            //Temos a lista de fotos e o valor a buscar...
            const listaAtualizada = fotos.filter(function(foto){  //passa por todos os itens
                if(foto.titulo) {
                    return foto.titulo.toUpperCase().includes(valorBusca.toUpperCase())  //retorna true ou false
                } else {
                    return false
                }
            })
            return listaAtualizada
    }
}