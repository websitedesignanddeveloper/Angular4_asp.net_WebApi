using Angular4WebApi.DBModel;
using Angular4WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Angular4WebApi.Controllers
{
    public class BookController : ApiController
    {
        private readonly BookStoreEntities _context;

        public BookController()
        {
            _context = new BookStoreEntities();
        }
        // GET api/<controller>
        [Route("api/Book/GetBooks")]
        public IEnumerable<BookJSON> GetBooks()
        {
            IQueryable<BookJSON> books = _context.Books.Select(
                    p => new BookJSON
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Category = p.Category,
						Author=p.Author,
                        Price = p.Price
                    });
            return books.OrderByDescending(x=>x.Id).ToList();
        }
        // POST api/<controller>
        public Book Post([FromBody]Book book)
        {
            if (book == null)
            {
                throw new ArgumentNullException("book");
            }

            Book newBook = new Book();

            try
            {
                newBook.Name = book.Name;
                newBook.Category = book.Category;
				newBook.Author = book.Author;
                newBook.Price = book.Price;
                _context.Books.Add(newBook);
                int rowsAffected = _context.SaveChanges();

                return rowsAffected > 0 ? book : null;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        // PUT api/<controller>/5
        public bool Put(int id, [FromBody]Book p)
        {
            p.Id = id;

            if (p == null)
            {
                throw new ArgumentNullException("p");
            }

            using (var ctx = new BookStoreEntities())
            {
                var book = _context.Books.Single(a => a.Id == p.Id);

                if (book != null)
                {
                    book.Name = p.Name;
                    book.Category = p.Category;
					book.Author=p.Author;
                    book.Price = p.Price;

                    int rowsAffected = _context.SaveChanges();

                    return rowsAffected > 0 ? true : false;
                }
                else
                {
                    return false;
                }
            }
        }
        // DELETE api/<controller>/5
        public bool Delete(int id)
        {
            using (var ctx = new BookStoreEntities())
            {
                Book book = ctx.Books.Find(id);
                ctx.Books.Remove(book);

                int rowsAffected = ctx.SaveChanges();

                return rowsAffected > 0 ? true : false;
            }
        }
    }
}