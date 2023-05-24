using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using System.Xml;
using System.Globalization;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private IWebHostEnvironment _env;

    public OrdersController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpGet]
    public List<Order> GetOrders()
    {
        var orderNodes = GetOrdersFromXml();

        List<Order> orders = new List<Order>();

        if (orderNodes != null)
        {
            foreach (XmlNode orderNode in orderNodes) 
            {
                orders.Add(new Order
                {
                    OrderNumber = long.Parse(orderNode["OrderNumber"].InnerText),
                    OrderDate = orderNode["OrderDate"].InnerText,
                    Customer = new Customer
                    {
                        CustomerNumber = long.Parse(orderNode["Customer"]["CustomerNumber"].InnerText),
                        CustomerName = orderNode["Customer"]["CustomerName"].InnerText,
                    },
                });
            }

        }

        return orders;
    }


    [HttpGet("{orderNumber}")]
    public ActionResult<OrderDetails> GetOrderDetails(string orderNumber)
    {
        var orderNodes = GetOrdersFromXml();

        if (orderNodes != null)
        {
            foreach (XmlNode orderNode in orderNodes)
            {
                if (orderNode["OrderNumber"].InnerText == orderNumber)
                {
                    List<OrderLine> items = new List<OrderLine>();

                    foreach (XmlNode orderLineNode in orderNode["OrderLines"].ChildNodes)
                    {
                        items.Add(new OrderLine
                        {
                            OrderLineNumber = long.Parse(orderLineNode["OrderLineNumber"].InnerText),
                            ProductNumber = orderLineNode["ProductNumber"].InnerText,
                            Quantity = int.Parse(orderLineNode["Quantity"].InnerText),
                            Name = orderLineNode["Name"].InnerText,
                            Description = orderLineNode["Description"].InnerText,
                            Price = decimal.Parse(orderLineNode["Price"].InnerText, CultureInfo.InvariantCulture), //allow use of full stop as decimal separator
                            ProductGroup = orderLineNode["ProductGroup"].InnerText,
                        });
                    }

                    OrderDetails orderDetails = new OrderDetails()
                    {
                        OrderNumber = long.Parse(orderNode["OrderNumber"].InnerText),
                        OrderDate = orderNode["OrderDate"].InnerText,
                        Customer = new Customer
                        {
                            CustomerNumber = long.Parse(orderNode["Customer"]["CustomerNumber"].InnerText),
                            CustomerName = orderNode["Customer"]["CustomerName"].InnerText,
                        },
                        OrderLines = items,

                    };

                    return orderDetails;
                }
            }

        }

        return NotFound();
    }


    private XmlNodeList GetOrdersFromXml()
    {
        XmlDocument doc = new XmlDocument();
        doc.Load(string.Concat(_env.WebRootPath, "/orders.xml"));
        XmlNodeList? orders = doc.SelectNodes("/Root/Orders/Order");

        return orders;
    }

}
