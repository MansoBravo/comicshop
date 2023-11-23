import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Product } from '../../interfaces/interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-product-page',
  templateUrl: './view-product-page.component.html',
  styles: [
  ]
})
export class ViewProductPageComponent implements OnInit {

  public urlTienda = "https://www.todostuslibros.com/isbn/";

  public productForm = new FormGroup({
    id: new FormControl(0),
    titulo: new FormControl('', { nonNullable: true }),
    editorial: new FormControl(''),
    genero: new FormControl(''),
    descripcion: new FormControl(''),
    cantidad: new FormControl(1),
    precio: new FormControl(0),
    ISBN: new FormControl(''),
    portada: new FormControl(''),
  });

  get currentProduct(): Product {
    const product = this.productForm.value as Product;
    return product;
  }

  irTienda(isbn:string){
    console.log(this.urlTienda + isbn);
    //this.router.navigateByUrl(this.urlTienda + isbn);
    window.open( this.urlTienda + isbn );
  }

  constructor(
    //public product: ProductsService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    if ( !this.router.url.includes('comic') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ( {id} ) => this.productsService.getProductById( id ))
      ).subscribe( product => {
        console.log(product);
        if ( !product ) return this.router.navigateByUrl('/list');

        this.productForm.reset( product );
        return;
      });
  }



}
