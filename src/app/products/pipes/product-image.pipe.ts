import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/interface';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform( product: Product ): string {
    // if ( !product._id ){
    //   return 'assets/no-image.png'
    // }

    return `assets/products/${ product.titulo }.jpg`;
  }

}
