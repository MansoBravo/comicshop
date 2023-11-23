import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/interface';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit {

  public product?: Product;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.productsService.getProductById( id )),
      )
      .subscribe( product => {

        if ( !product ) return this.router.navigate([ '/products/list' ]);

        this.product = product;
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('product/list')
  }

}

