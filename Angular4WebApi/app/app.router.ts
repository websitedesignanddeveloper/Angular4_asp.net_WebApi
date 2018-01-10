import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';

export const router: Routes = [
	{ path: '', redirectTo: 'book', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
	{ path: 'book', component: BookComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
