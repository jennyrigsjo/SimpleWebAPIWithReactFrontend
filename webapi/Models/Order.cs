namespace webapi.Models
{
    public class Order
    {
        public long OrderNumber {  get; set; }
        public string OrderDate { get; set; } = string.Empty;
        public Customer? Customer { get; set; }
    }
}
