import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html'
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      data => this.products = data,
      error => console.error('Error fetching products: ', error)
    );
  }

  editProduct(product: Product): void {
    // Edit Product logic here
    const updatedProduct: Product = {
      ...product,
      name: prompt('Edit name:', product.name) || product.name,
      description: prompt('Edit description:', product.description) || product.description,
      price: Number(prompt('Edit price:', product.price.toString())) || product.price
    };
    this.productService.updateProduct(updatedProduct).subscribe(
      () => this.fetchProducts(),
      error => console.error('Error updating product: ', error)
    );
  }

  removeProduct(productId?: string): void {
    if (!productId) {
      console.error('Product ID is undefined. Cannot delete product.');
      return;
    }
  
    this.productService.removeProduct(productId).subscribe(
      () => this.fetchProducts(),
      error => console.error('Error deleting product: ', error)
    );
  }
  
}
