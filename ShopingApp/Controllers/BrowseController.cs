using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopingApp.Models;

namespace ShopingApp.Controllers
{
    public class BrowseController : Controller
    {
        // GET: Browse
        ShopingContext db = new ShopingContext();
        
        
        public ActionResult Index()
        {
            

            var list = db.Products
                            .OrderByDescending(x => x.ProductRank)
                            .Take(6)
                            .ToList();


            return View(list);
        }

        public ActionResult TopCategories()
        {
            var list = db.Categories
                .Where(x => x.Products.Any())
                .OrderByDescending(x => x.CategoryRank)
                //.Take(2)
                .ToList();

            foreach (var category in list)
            {
                category.Products = db.Products
                                    .Where(x => x.CategoryId == category.Id)
                                    .OrderByDescending(x => x.ProductRank)
                                    .Take(2)
                                    .ToList();


            }

            return PartialView(list);
        }

        public ActionResult Search(string name)
        {
            System.Threading.Thread.Sleep(1500);

            var result = db.Products
            .Where(x => x.ProductName.Contains(name)
            || x.Category.CategoryName.Contains(name)).ToList();

            return PartialView(result);



        }
        public ActionResult shugal()
        {
            return View();
        }

        public ActionResult ByCategory(int? id)
        {
            System.Threading.Thread.Sleep(1500);
            var list = db.Products.Where(x => x.CategoryId == id).ToList();

            return PartialView(list);
            //return View(list);
        }

        public ActionResult Feature(int? id)
        {
            var list = db.Features.Where(x => x.ProductId == id).ToList();
            return View(list);
        }
        public ActionResult Categories()
        {
            var list = db.Categories.ToList();
            return PartialView(list);
        }




        public int CartCountProduct()
        {
            Cart cart = Cart.GetCartObject(Session);

            return cart.Count;
        }

        public ActionResult AddToCart(int id)
        {
            Cart cart = Cart.GetCartObject(Session);

            Product product = db.Products.Find(id);
            if (product != null)
            {
                cart.AddProduct(product);
            }

            ViewBag.ProductId = id;
            return View();
        }

        public ActionResult RemoveProduct(int id)
        {
            Cart cart = Cart.GetCartObject(Session);

            OrderDetail od = cart.OrderDetails.SingleOrDefault(x => x.ProductId == id);
            if (od != null)
            {
                cart.OrderDetails.Remove(od);
            }

            return RedirectToAction("ShowCartItems");
        }

        public ActionResult ShowCartItems()
        {
            Cart cart = Cart.GetCartObject(Session);

            return View(cart);
        }

        [Authorize]
        public ActionResult Checkout()
        {
            Cart cart = Cart.GetCartObject(Session);

            // Order and OrderDetails insert/add into database
            Order order = new Order();
            order.Amount = cart.Amount;
            order.OrderDate = DateTime.Now;
            order.UserName = User.Identity.Name;
            order.OrderDetails = cart.OrderDetails;

            db.Orders.Add(order);
            db.SaveChanges();

            cart.OrderDetails.Clear();


            ViewBag.Message = "Order has been placed";

            return View();
        }


        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}