namespace webapi.Models
{
    public class OrderDetails
    {
        public long OrderNumber {  get; set; }
        public string OrderDate { get; set; } = string.Empty;
        public Customer? Customer { get; set; }
        public List<OrderLine>? OrderLines { get; set; }
    }
}
