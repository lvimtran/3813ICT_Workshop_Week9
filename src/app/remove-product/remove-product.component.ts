import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html'
})
export class RemoveProductComponent implements OnInit {
  productId: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Initialize product ID
    // This might come from a route parameter or some user action.
  }

  removeProduct(): void {
    this.productService.removeProduct(this.productId).subscribe(
      () => console.log('Product removed successfully!'),
      error => console.error('Error removing product: ', error)
    );
  }
}
