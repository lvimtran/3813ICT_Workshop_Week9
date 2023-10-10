import { Component } from '@angular/core';
import { ProductdataService } from '../productdata.service';
import { Products } from '../products';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  animations:[
    trigger('iderrorState',[
      state('show',style({
        opacity:1,
        display:'block'
      })),
      state('hide',style({
        opacity:0,
        display:'none'
      })),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('400ms ease-in'))
    ]),
    trigger('noticeState',[
      state('show',style({
        opacity:1,
        display:'block'
      })),
      state('hide',style({
        opacity:0,
        display:'none'
      })),
      transition("show => hide", animate('1000ms ease-out')),
      transition('hide => show', animate('400ms ease-in')),
    ])
  ]
})
export class AddProductComponent {
  productname:string=""
  productdesc:string=""
  productprice:string=""
  productunits:string=""
  productobjid:string=""
  newprod: Products = new Products;
  newProductMessage=""
  iderrormsg:string = "This id already exists & New ID is required."
  iderrormsg2:string = ""
  iderrorshow: boolean= false;
  noticeshow:boolean=false;
  productid!: null;
  constructor(private proddata: ProductdataService){}

  ngOnInit(){}

  get stateName(){
    return this.iderrorshow ? 'show' : 'hide';
  }
  get noticeName() {
    return this.noticeshow ? 'show' : 'hide';
  }
  addnewProduct(event: { preventDefault: () => void; }){
    event.preventDefault();
    if(this.productid == null) {
      this.iderrorshow = !this.iderrorshow;
    }else{
      this.newprod = new Products("",this.productid, this.productname,this.productdesc,this.productprice,this.productunits )
      this.proddata.add(this.newprod).subscribe((data)=>{
        console.log(data);
        this.noticeshow = true;
        if(data.err == null){
          this.newProductMessage =data.num + "new product (" +this.productname + ") was added"
        } else{
          this.newProductMessage = data.err;
        }
        this.productid = null;
        this.productname = "";
        this.productdesc = "";
        this.productprice = "";
        this.productprice = null;
        this.productunits = null;
      });
    }
  }

checkvalidid(event){
  this.noticeshow = false
    this.proddata.checkvalidid(event).subscribe((data)=>{
      if(data.success == 0){
        this.iderrormsg2 = "Something above" + data.topnum;
        this.iderrorshow = !this.iderrorshow;
      } else {
        this.iderrorshow = false;
        this.iderrormsg2 = null;
      }
    })
  }
}
 