using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopingApp.Models;

namespace ShopingApp.Controllers
{
    [Authorize()]
    public class AdminController : Controller
    {
        // GET: Admin
        
        ShopingContext db = new ShopingContext();
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }
       
    }
}