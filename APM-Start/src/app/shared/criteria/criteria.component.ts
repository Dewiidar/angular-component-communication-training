import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
    selector: 'pm-criteria',
    templateUrl: './criteria.component.html',
    styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit {

    @Input() displayDetail: boolean;

    @ViewChild('filterElement') filterElementRef: ElementRef;
    @ViewChild(NgModel) inputElement: NgModel;

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    private _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.valueChange.emit(value)
    }

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
