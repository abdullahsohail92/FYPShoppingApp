using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ShopingApp.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public int CategoryRank { get; set; }
        public virtual  List<Product> Products { get; set; }
    }

    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int ProductPrice { get; set; }
        public string ProductImageUrl { get; set; }
        public int ProductRank { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }

        public List<Feature> Features { get; set; }
    }

    public class Feature
    {
        public int Id { get; set; }
        public string FeatureName { get; set; }
        public string FeatureDetail { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }

    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int Amount { get; set; }
        public string UserName { get; set; }

        public List<OrderDetail> OrderDetails { get; set; }
    }

    public class OrderDetail
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int UnitPrice { get; set; }
        public int Quantity { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }

    public class ShopingContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Activity> Activities { get; set; }
        
    }
}