import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert.service';
import { Product } from 'src/app/model/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productList: Product[] = [];
  productCategory: string[];
  isDataLoading: boolean;
  isFilteredProductList: boolean = false;

  subscriptions = Array<Subscription>();

  constructor(
      private productService: ProductService, 
      private activeRoute: ActivatedRoute,
      private router: Router,
      private alertService: AlertService) { }

  ngOnInit(): void {
    this.isDataLoading = true;
    if(this.productService.productList === undefined || this.productService.productList?.length == 0) {
      this.subscriptions.push(
        this.productService.getProductList().subscribe((products: Product[]) => {
          this.productList = products;
          // Generating array of distinct value of product category
          // this.productCategory = products.map(p => p.category).filter((el, i, self) => i == self.indexOf(el));
          this.getProductCategoryList(products);
          this.isDataLoading = false;
        }));
    }
    else {
      this.productList = this.productService.productList;
      this.getProductCategoryList(this.productList);
      this.isDataLoading = false;
    }

    // Subscribing product list filter observable to get filtered product list
    this.subscriptions.push(
      this.productService.productList$.subscribe(data => {
        this.productList = data;
        console.log("Subscription called inside product list component");
      })
    );
  }

  filterProductList(selectedValue: string) {
    this.productService.filterProductListByCategory(selectedValue);
    this.isFilteredProductList = true;
  }

  clearProductFilter() {
    this.productService.clearProductListFilter();
    this.isFilteredProductList = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  deleteProduct(id: number, event: Event) {
    this.productService.deleteProduct(id);
    this.alertService.warning('Product deleted successfully!');
    event.stopPropagation();
  }

  getProductCategoryList(products: Product[]) {
    this.productCategory = products.map(p => p.category).filter((el, i, self) => i == self.indexOf(el));
  }
}
