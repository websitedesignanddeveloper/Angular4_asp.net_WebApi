import { IBooks } from '../interface/iBooks';

export class Book implements IBooks {
    Id: number;
    Name: string;
	Category: string;
	Author: string;
    Price: number;
}