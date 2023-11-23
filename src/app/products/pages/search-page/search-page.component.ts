import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '../../interfaces/interface';
import { ProductsService } from '../../services/products.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'comic-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public products: Product[] = [];
  public selectedProduct?: Product;

  constructor(
    private productsService: ProductsService,
    private router: Router
    ){}

  searchProduct() {
    const value: string = this.searchInput.value || '';

    this.productsService.getSuggestions( value )
      .subscribe( products => this.products = products );
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedProduct = undefined;
      return;
    }

    const product: Product = event.option.value;
    console.log(product._id);
    // this.searchInput.setValue( product.titulo );
    this.searchInput.setValue( '' );
    this.router.navigate(['/tienda/comic/', product._id]);
    return;
    // this.selectedProduct = product;

  }
}
