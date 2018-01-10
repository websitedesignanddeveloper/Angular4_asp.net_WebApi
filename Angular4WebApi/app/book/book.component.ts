import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataTableModule, SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';//PrimeNg
import { Book } from '../model/book';
import { BookService } from '../service/dataService';
//For Reactive Forms Validation
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../service/ValidationService';

@Component({
    selector: 'app-book',
    templateUrl: './app/book/book.component.html',
    styleUrls: [
        "../../node_modules/primeng/resources/primeng.min.css",
        "../../node_modules/primeng/resources/themes/omega/theme.css",
    ],
    encapsulation: ViewEncapsulation.None,
	providers: [BookService]
})
export class BookComponent implements OnInit {

	public books: Book[];
    public products_error: Boolean = false;
	public book = new Book();
    public isAdd: Boolean = false;
    public isEdit: Boolean = false;

    public isLoadingData: Boolean = false;

    addBookFG: FormGroup;
    editBookFG: FormGroup;

    addSuccess: boolean;
    editSuccess; boolean;

    displayAddDialog: boolean = false;
    displayEditDialog: boolean = false;

	constructor(private http: Http, private addBookService: BookService, private fb: FormBuilder) {
    }

    ngOnInit() {
		this.addBookFG = this.fb.group({
            'name': [null, [Validators.required]],
			'category': [null, [Validators.required]],
			'author': [null, [Validators.required]],
            'price': [null, Validators.required]
        });

		this.editBookFG = this.fb.group({
            'name': [null, [Validators.required]],
			'category': [null, [Validators.required]],
			'author': [null, [Validators.required]],
            'price': [null, Validators.required]
        });

        this.isAdd = true;
        this.isEdit = false;

        //Get Product List on Page Load
        this.getAllData();
    }

	public getAllData() {
        this.isLoadingData = true;

		this.addBookService.getAllBooks()
            .subscribe(
            data => {
                this.books = data;
            },
            error => {
                console.log(error),
                    this.isLoadingData = false;
            },
            () => {
                this.isLoadingData = false;
            });
    }
	editBook(_book: Book) {
        //Show edit dialog
        this.displayEditDialog = true;

        this.isEdit = true;
        this.isAdd = false;

		this.book = { Id: _book.Id, Name: _book.Name, Category: _book.Category, Author: _book.Author, Price: _book.Price };
    }
    updateBook(book) {
		this.addBookService.updateBook(book).subscribe(
            data => {
				// refresh the list
				this.getAllData();
                this.editSuccess = true;
                this.displayEditDialog = false;//Hide edit dialog after save

				this.book = new Book();
                this.isEdit = false;
                this.isAdd = true;
                return true;
            },
            error => {
                console.error("Error saving Product!");
                this.editSuccess = false;
                alert(error);
            }
        );
    }
	deleteBook(_book: Book) {
		if (confirm("Are you sure you want to delete product named '" + _book.Name + "'?")) {
			this.addBookService.deleteBook(_book).subscribe(
                data => {
                    // refresh the list
					this.getAllData();
                    return true;
                },
                error => {
                    this.isLoadingData = false;
                    console.error("Error deleting Product!");
                    alert(error);
                },
                () => {
                    this.isLoadingData = false;
                }
            );
        }
    }
    clearData(): void {
		this.book = new Book();
        this.isEdit = false;
        this.isAdd = true;

        this.displayAddDialog = false;
        this.displayEditDialog = false;
    }
	addBook(book: Book) {

        this.isAdd = true;
        this.isEdit = false;

		this.addBookService.addBook(book).subscribe(
            data => {
				// refresh the list
				this.getAllData();
                this.addSuccess = true;
                this.displayAddDialog = false;//Hide add dialog after save

				this.book = new Book();
                return true;
            },
            error => {
                console.error("Error saving Product!");
                this.addSuccess = false;
                alert(error);
            }
        );
    }
    addBookDialog() {
        this.displayAddDialog = true;
    }
}
