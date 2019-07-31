import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';

import {IProduct} from './product';
import {ProductService} from './product.service';
import {NgModel} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    listFilter: string;

    @ViewChild('filterElement') filterElementRef: ElementRef;
    @ViewChild(NgModel) inputElement: NgModel;

    private _sub: Subscription;

    private _filterInput: NgModel;

    get filterInput(): NgModel {
        return this._filterInput;
    }

    @ViewChild(NgModel)
    set filterInput(value: NgModel) {
        this._filterInput = value;

        if (this.inputElement && !this._sub) {
            this._sub = this.inputElement.valueChanges.subscribe(
                () => this.performFilter(this.listFilter)
            );
        }
    }

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        // this.inputElement.valueChanges.subscribe(
        //     () => this.performFilter(this.listFilter)
        // );
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
}
