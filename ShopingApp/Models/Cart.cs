using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShopingApp.Models;

namespace ShopingApp.Models
{
    public class Cart
    {

        public static Cart GetCartObject(HttpSessionStateBase session)
        {
            Cart cart = null;
            if (session["cart"] == null)
            {
                cart = new Cart();
                session.Add("cart", cart);
            }
            else
            {
                cart = session["cart"] as Cart;
            }
            return cart;
        }

        public Cart()
        {
            OrderDetails = new List<OrderDetail>();
        }

        // Total Product Return
        public int Count
        {
            get
            {
                return OrderDetails.Sum(x => x.Quantity);
            }
        }

       

        // Total Amount
        public int Amount
        {
            get
            {
                var amt = OrderDetails.Sum(x => x.Quantity * x.UnitPrice);
                return amt;
            }
        }

        public void AddProduct(Product product)
        {
            var findProduct = OrderDetails
                .SingleOrDefault(x => x.ProductId == product.Id);

            if (findProduct == null)
            {
                // Not found then add
                OrderDetail od = new OrderDetail();
                od.ProductId = product.Id;
                od.UnitPrice = product.ProductPrice;
                od.Quantity = 1;
                od.Product = product;

                OrderDetails.Add(od);
            }
            else
            {
                findProduct.Quantity = findProduct.Quantity + 1;
                // Add, Increment Qty
            }

        }

        // Collection of Products / Quantity
        public List<OrderDetail> OrderDetails { get; set; }
    }
}