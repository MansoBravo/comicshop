import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../interfaces/interface';
import { filter, map, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { __values } from 'tslib';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public productForm = new FormGroup({
    _id: new FormControl(''),
    titulo: new FormControl('', { nonNullable: true }),
    editorial: new FormControl(''),
    genero: new FormControl(''),
    descripcion: new FormControl(''),
    cantidad: new FormControl(1),
    precio: new FormControl(0),
    ISBN: new FormControl(''),
    portada: new FormControl(''),
  });

  constructor (
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private http: HttpClient,
  ) {}

  get currentProduct(): Product {
    const product = this.productForm.value as Product;
    return product;
  }

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ( {id} ) => this.productsService.getProductById( id ))
      ).subscribe( product => {
        console.log(product);
        if ( !product ) return this.router.navigateByUrl('/dashboard');

        this.productForm.reset( product );
        return;
      });

  }

  onSubmit():void{
    if (this.productForm.invalid ) return;

    if ( this.currentProduct._id ) {
      this.productsService.updateProduct( this.currentProduct )
        .subscribe( product => {
          this.showSankbar(`${ product.titulo } update!`)
        });
        return;
    };

    this.productsService.addProduct( this.currentProduct )
      .subscribe( product => {
        this.router.navigate(['/dashboard/edit', product._id])
        this.showSankbar(`${ product.titulo } created!`)
      })
  }

  onDeleteProduct() {
    if ( !this.currentProduct._id ) throw Error('Product id is requerid');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.productForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result ),
      switchMap( ( () => this.productsService.deleteProductById( this.currentProduct._id ))),
      filter( (wasDeleted: boolean) => wasDeleted )
    )
    .subscribe( () => {
      this.router.navigate(['/dashboard']);
    });
  }

  showSankbar( message: string ):void{
    this.snackbar.open( message, 'done',{
      duration: 2500,
    });
  }

  onFileSelected(event: any) {

    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      const joi = reader.result?.toString();
      me.productForm.get("portada")?.setValue(joi!);
      console.log(JSON.stringify(joi!));

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

}

