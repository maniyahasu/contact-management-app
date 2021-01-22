import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  editProductFormGroup: FormGroup;
  submitted: boolean = false;
  formAction: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder) { }

  product: Product;
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params: Params) => {
        let pId = this.activatedRoute.snapshot.params['id'];
        this.formAction = this.activatedRoute.snapshot.data.mode;
        // console.log("Mode", this.formAction);
        this.productService.getProductById(pId).subscribe(product => {
          this.product = product;
        }, error => {}, () => {
          if(this.formAction === 'edit') {
            // console.log("success called");
            this.createEditProductForm(this.product);
          }
        });
    });

    
  }

  backToProductList(): void {
    this.router.navigate(['/product'], { relativeTo: this.activatedRoute});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createEditProductForm(currentProduct: Product): FormGroup {
    return this.editProductFormGroup = this.fb.group({
      id: new FormControl(currentProduct.id),
      title: new FormControl(currentProduct.title),
      category: new FormControl(currentProduct.category),
      description: new FormControl(currentProduct.description),
      image: new FormControl(currentProduct.image),
      price: new FormControl(currentProduct.price)
    });
  }

  get f(): {[s: string]: AbstractControl} {
    return this.editProductFormGroup.controls;
  }

  updateProduct() {
    this.productService.updateProduct({...this.editProductFormGroup.value}).subscribe(res => {
      this.router.navigate(['/product']);
    });
  }

}
