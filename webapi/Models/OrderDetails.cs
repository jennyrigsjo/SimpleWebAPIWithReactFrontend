namespace webapi.Models
{
    public class OrderDetails : Order
    {
        public List<OrderLine>? OrderLines { get; set; }
    }
}
