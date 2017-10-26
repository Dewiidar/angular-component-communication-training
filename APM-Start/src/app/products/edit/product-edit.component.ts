import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    @ViewChild(NgForm) editForm: NgForm;
    pageTitle: string = 'Product Edit';
    errorMessage: string;
    product: IProduct;

    get isDirty(): boolean {
        return this.editForm.dirty;
    }

    constructor(private productService: ProductService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                const id = +params['id'];
                this.getProduct(id);
            }
        );
    }

    getProduct(id: number): void {
        this.productService.getProduct(id)
            .subscribe(
                product => this.onProductRetrieved(product),
                error => this.errorMessage = <any>error
            );
    }

    onProductRetrieved(product: IProduct): void {
        // Reset back to pristine
        this.editForm.reset();

        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    cancel(): void {
        // Reset back to pristine
        this.editForm.reset();
        // Navigate back to the product list
        this.router.navigate(['/products']);
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (this.editForm.valid) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(): void {
        // Reset back to pristine
        this.editForm.reset(this.editForm.value);
        // Navigate back to the product list
        this.router.navigate(['/products']);
    }
}
