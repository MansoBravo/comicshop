import { Product } from './../interfaces/interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ProductsService {

  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${ this.baseUrl }/products`);
  }

  getProductById( id: string ): Observable<Product|undefined> {
    return this.http.get<Product>(`${ this.baseUrl }/products/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getSuggestions( query: string ): Observable<Product[]> {
    return this.http.get<Product[]>(`${ this.baseUrl }/products?q=${ query }&_limit=6`);
  }

  addProduct( product: Product ): Observable<Product> {
    return this.http.post<Product>(`${ this.baseUrl }/products`, product);
  }

  updateProduct( product: Product ): Observable<Product> {
    if ( !product._id ) throw Error('Product id is required');
    return this.http.patch<Product>(`${ this.baseUrl }/products/${ product._id }`, product);
  }

  deleteProductById( id: string ): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/productos/${ id }`)
      .pipe(
        catchError( err => of(false) ),
        map( resp => true )
      );
  }

}
