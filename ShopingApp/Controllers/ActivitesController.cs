

using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using ShopingApp.Models;

namespace ShopingApp.Controllers
{
   
    public class ActivitesController : Controller
    {
        private ShopingContext db = new ShopingContext();

        //GET: Activites
        #region Public Methods
         public ActionResult Index()
         {

             ActivityViewModel lv = new ActivityViewModel();
           
                
            return View(lv);
        }
        [HttpPost]
        public ActionResult Index( Activity a)
        {
            if (a.ID > 0)
            {
                a.Status = "pending";
                a.CreatedAt = a.StartDate;
                a.UpdatedAt = a.StartDate;
                db.Entry(a).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            a.Status = "pending";
            a.CreatedAt = a.StartDate;
            a.UpdatedAt = a.StartDate;
            a.AssignedBy = 1;
            a.AssignedTo = 1;
            
            db.Activities.Add(a);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        public string JsonActivities(int m, int y, int t)
        {
            //ActivityViewModel viewModel=new ActivityViewModel();
            var act = db.Activities.Where(x => x.StartDate.Month == m && x.StartDate.Year == y && x.Type == t).ToList();

            string output = JsonConvert.SerializeObject(act);
            return output;
        }
       #endregion
    }
}