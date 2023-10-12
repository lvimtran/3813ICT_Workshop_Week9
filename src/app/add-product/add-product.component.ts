import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {
  newProduct: Product = {name: '', description: '', price: 0};

  constructor(private productService: ProductService) {}

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(
      () => {
        console.log('Product added successfully!');
        // Handle success
      },
      error => console.error('Error adding product: ', error)
    );
  }
}
