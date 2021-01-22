import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, flush, TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Product } from '../model/product.model';

const URL = 'https://fakestoreapi.com/products';


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => httpMock.verify() );

  // Demo example of how we can write test case using done method
  // it("should return product list - done", done => {
  //   let products: Product[] = [
  //     { id: 1, title: 'title', price: 10, image: 'image url', category: 'category', description: 'description'}
  //   ];
  //   service.getProductList().subscribe(data => {
  //     expect(data).toBe(products);
  //     done();
  //   });
  //   httpMock.expectOne(URL).flush(products);
  // });

  it("should return product list", async(() => {
    let products: Product[] = [
      { id: 1, title: 'title', price: 10, image: 'image url', category: 'category', description: 'description'}
    ];
    service.getProductList().subscribe(data => {
      expect(data).toBe(products);
    });
    httpMock.expectOne(URL).flush(products);
  }));

  it("should return specific product by id", async(() => {
    let product: Product = 
    { id: 1, title: 'title', price: 10, image: 'image url', category: 'category', description: 'description'};
    service.getProductById(1).subscribe(data => {
      expect(data).toBe(product);
    });
    httpMock.expectOne(`${URL}/1`).flush(product);
  }));

  it('should filter product list by category', async(() => {
    let products: Product[] = [
      { id: 1, title: 'title', price: 10, image: 'image url', category: 'category', description: 'description'}
    ];
    service.productList = products;
    let spy = spyOn(service, 'filterProductListByCategory').and.returnValue();
    service.filterProductListByCategory('category');
    expect(spy).toHaveBeenCalled();
  }));
});
