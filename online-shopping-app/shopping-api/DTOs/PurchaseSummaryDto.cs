namespace shopping_api.DTOs
{
    public class PurchaseSummaryDto
    {
        public decimal SubTotal { get; set; }

        public decimal Discount { get; set; }

        public decimal GrandTotal { get; set; }
    }
}