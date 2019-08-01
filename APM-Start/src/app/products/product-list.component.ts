import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';

import {IProduct} from './product';
import {ProductService} from './product.service';
import {NgModel} from "@angular/forms";
import {Subscription} from "rxjs";
import {CriteriaComponent} from "../shared/criteria/criteria.component";
import {ProductParameterService} from "./product-parameter.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    includeDetail: boolean = true;

    parentListFilter: string;
    @ViewChild('filterCriteria') filterComponent: CriteriaComponent;

    get showImage(): boolean {
        return this.productParameterService.showImage;
    }

    set showImage(value: boolean) {
        this.productParameterService.showImage = value;
    }

    constructor(private productService: ProductService, private productParameterService: ProductParameterService) {
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;

                this.filterComponent.listFilter = this.productParameterService.listFilter;

                // this.performFilter(this.parentListFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        this.parentListFilter = this.filterComponent.listFilter;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }

    onValueChange(value: string): void {
        this.productParameterService.listFilter = value;
        this.performFilter(value);
    }
}
