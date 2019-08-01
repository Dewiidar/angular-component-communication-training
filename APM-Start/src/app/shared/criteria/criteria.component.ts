import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
    selector: 'pm-criteria',
    templateUrl: './criteria.component.html',
    styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit {

    listFilter: string;

    @ViewChild('filterElement') filterElementRef: ElementRef;
    @ViewChild(NgModel) inputElement: NgModel;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        if (this.filterElementRef) {
            this.filterElementRef.nativeElement.focus()
        }
    }

}
