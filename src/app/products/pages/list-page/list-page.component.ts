import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces/interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent {
  public products: Product[] = [];

  private productsService = inject( ProductsService );

  //constructor( private productsService: ProductsService ) {}

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe( products => this.products = products );
  }


}
