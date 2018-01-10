"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var book_component_1 = require("./book/book.component");
exports.router = [
    { path: '', redirectTo: 'book', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'book', component: book_component_1.BookComponent },
];
exports.routes = router_1.RouterModule.forRoot(exports.router);
//# sourceMappingURL=app.router.js.map