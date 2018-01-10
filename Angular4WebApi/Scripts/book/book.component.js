"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var book_1 = require("../model/book");
var dataService_1 = require("../service/dataService");
//For Reactive Forms Validation
var forms_1 = require("@angular/forms");
var BookComponent = (function () {
    function BookComponent(http, addBookService, fb) {
        this.http = http;
        this.addBookService = addBookService;
        this.fb = fb;
        this.products_error = false;
        this.book = new book_1.Book();
        this.isAdd = false;
        this.isEdit = false;
        this.isLoadingData = false;
        this.displayAddDialog = false;
        this.displayEditDialog = false;
    }
    BookComponent.prototype.ngOnInit = function () {
        this.addBookFG = this.fb.group({
            'name': [null, [forms_1.Validators.required]],
            'category': [null, [forms_1.Validators.required]],
            'author': [null, [forms_1.Validators.required]],
            'price': [null, forms_1.Validators.required]
        });
        this.editBookFG = this.fb.group({
            'name': [null, [forms_1.Validators.required]],
            'category': [null, [forms_1.Validators.required]],
            'author': [null, [forms_1.Validators.required]],
            'price': [null, forms_1.Validators.required]
        });
        this.isAdd = true;
        this.isEdit = false;
        //Get Product List on Page Load
        this.getAllData();
    };
    BookComponent.prototype.getAllData = function () {
        var _this = this;
        this.isLoadingData = true;
        this.addBookService.getAllBooks()
            .subscribe(function (data) {
            _this.books = data;
        }, function (error) {
            console.log(error),
                _this.isLoadingData = false;
        }, function () {
            _this.isLoadingData = false;
        });
    };
    BookComponent.prototype.editBook = function (_book) {
        //Show edit dialog
        this.displayEditDialog = true;
        this.isEdit = true;
        this.isAdd = false;
        this.book = { Id: _book.Id, Name: _book.Name, Category: _book.Category, Author: _book.Author, Price: _book.Price };
    };
    BookComponent.prototype.updateBook = function (book) {
        var _this = this;
        this.addBookService.updateBook(book).subscribe(function (data) {
            // refresh the list
            _this.getAllData();
            _this.editSuccess = true;
            _this.displayEditDialog = false; //Hide edit dialog after save
            _this.book = new book_1.Book();
            _this.isEdit = false;
            _this.isAdd = true;
            return true;
        }, function (error) {
            console.error("Error saving Product!");
            _this.editSuccess = false;
            alert(error);
        });
    };
    BookComponent.prototype.deleteBook = function (_book) {
        var _this = this;
        if (confirm("Are you sure you want to delete product named '" + _book.Name + "'?")) {
            this.addBookService.deleteBook(_book).subscribe(function (data) {
                // refresh the list
                _this.getAllData();
                return true;
            }, function (error) {
                _this.isLoadingData = false;
                console.error("Error deleting Product!");
                alert(error);
            }, function () {
                _this.isLoadingData = false;
            });
        }
    };
    BookComponent.prototype.clearData = function () {
        this.book = new book_1.Book();
        this.isEdit = false;
        this.isAdd = true;
        this.displayAddDialog = false;
        this.displayEditDialog = false;
    };
    BookComponent.prototype.addBook = function (book) {
        var _this = this;
        this.isAdd = true;
        this.isEdit = false;
        this.addBookService.addBook(book).subscribe(function (data) {
            // refresh the list
            _this.getAllData();
            _this.addSuccess = true;
            _this.displayAddDialog = false; //Hide add dialog after save
            _this.book = new book_1.Book();
            return true;
        }, function (error) {
            console.error("Error saving Product!");
            _this.addSuccess = false;
            alert(error);
        });
    };
    BookComponent.prototype.addBookDialog = function () {
        this.displayAddDialog = true;
    };
    return BookComponent;
}());
BookComponent = __decorate([
    core_1.Component({
        selector: 'app-book',
        templateUrl: './app/book/book.component.html',
        styleUrls: [
            "../../node_modules/primeng/resources/primeng.min.css",
            "../../node_modules/primeng/resources/themes/omega/theme.css",
        ],
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [dataService_1.BookService]
    }),
    __metadata("design:paramtypes", [http_1.Http, dataService_1.BookService, forms_1.FormBuilder])
], BookComponent);
exports.BookComponent = BookComponent;
//# sourceMappingURL=book.component.js.map