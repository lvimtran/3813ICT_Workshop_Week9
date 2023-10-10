import { Component, OnInit } from '@angular/core';
import { ProductdataService } from '../productdata.service';
import { Products } from '../products';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit{
  products: Products[] = [];
  proddata: any;
  ngOnInit(): void {
    this.proddata.getlist().subscribe((data: Products[]) => {
      this.products = data
    })
  }
 
  deleteproduct(id: any){
    if(confirm("Are you sure you want to delete this item")){
      this.proddata.deleteitem(id).subscribe((data: Products[])=>{
        this.products = data
      })
    }
  }
  
}
