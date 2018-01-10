import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Book } from '../model/book';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

    constructor(private http: Http) {}

    public getAllBooks() {
        return this.http.get('/api/Book/GetBooks').map((res: Response) => <Book[]>res.json())
    }

    addBook(book) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(book);
        return this.http.post('/api/Book/', body, options).map((res: Response) => res.json());
    }

    updateBook(book) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(book);
        return this.http.put('/api/Book/' + book.Id, body, options).map((res: Response) => res.json());
    }

    deleteBook(book) {
        return this.http.delete('/api/Book/' + book.Id);
    }
}
