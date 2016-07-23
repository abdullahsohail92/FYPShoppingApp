using System;

namespace ShopingApp.Models
{
    public class Activity
    {
        public int ID { get; set; }
       
        public string Name { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Desscription { get; set; }
        public int AssignedBy { get; set; }
        public Nullable<int> AssignedTo { get; set; }
        public int? Type  { get; set; }
        public int? order_number { get; set; }
        
    }
}
