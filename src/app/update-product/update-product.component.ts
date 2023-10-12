import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html'
})
export class UpdateProductComponent implements OnInit {
  product: Product = {name: '', description: '', price: 0};
  productId: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Initialize product ID and product information.
    // This might come from a route parameter or some user action.
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product).subscribe(
      () => console.log('Product updated successfully!'),
      error => console.error('Error updating product: ', error)
    );
  }
}
