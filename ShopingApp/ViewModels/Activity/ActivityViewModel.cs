using System.Collections.Generic;
using System.Web.Mvc;


namespace ShopingApp.Models
{
    public class ActivityViewModel
    {
        public ActivityViewModel()
        {
            Activity = new ShopingApp.Models.Activity();
        }
        public ShopingApp.Models.Activity Activity { get; set; }
        public List<ShopingApp.Models.Activity> Activitys { get; set; }
       
    }
}