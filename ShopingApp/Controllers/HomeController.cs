using System.Web.Mvc;
using ShopingApp.Models;

namespace ShopingApp.Controllers
{
    public class HomeController : Controller
    {
        ShopingContext db = new ShopingContext();
        public ActionResult Index()
        {
            //var list = db.Products
            //               .OrderByDescending(x => x.ProductRank)
            //               .Take(1)
            //               .ToList();
            //return View(list);
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