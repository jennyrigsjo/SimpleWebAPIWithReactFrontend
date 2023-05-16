namespace webapi.Models
{
    public class OrderLine
    {
        public long OrderLineNumber { get; set; }
        public string ProductNumber { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ProductGroup { get; set; } = string.Empty;
    }
}
