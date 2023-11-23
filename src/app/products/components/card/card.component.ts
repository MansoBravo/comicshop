import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'products-product-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  public url:string ='';
  constructor( private router: Router ) {
    this.url = router.url;
  }

  @Input()
  public product!: Product;

  ngOnInit(): void {
    if ( !this.product ) throw Error('Product property is required');
  }

  edit(id:string){
    this.router.navigate(['/dashboard/edit/', id]);
    return;
  }

  view(id:string){
    this.router.navigate(['/tienda/comic/', id]);
    return;
  }

}
