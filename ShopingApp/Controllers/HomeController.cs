using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopingApp.Models;

namespace ShopingApp.Controllers
{
    public class HomeController : Controller
    {
        ShopingContext db = new ShopingContext();
        public ActionResult Index()
        {
            var list = db.Products
                           .OrderByDescending(x => x.ProductRank)
                           .Take(10)
                           .ToList();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}