import "./PurchaseSummary.css";

function PurchaseSummary({ summary }) {
  return (
    <div className="summary-card">
      <h2>Purchase Summary</h2>

      <hr />

      <div className="summary-row">
        <span>Subtotal</span>

        <span>₹ {summary.subTotal}</span>
      </div>

      <div className="summary-row">
        <span>Discount</span>

        <span>₹ {summary.discount}</span>
      </div>

      <hr />

      <div className="summary-total">
        <span>Grand Total</span>

        <span>₹ {summary.grandTotal}</span>
      </div>
    </div>
  );
}

export default PurchaseSummary;
