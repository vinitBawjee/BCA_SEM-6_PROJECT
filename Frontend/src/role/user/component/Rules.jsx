const Rules = () => {
    return (
        <>
            <div className="rules-container">
                <span className="rules-description">
                    An online product auction system typically involves the sale of goods through a bidding process, where participants place bids on products, and the highest bid at the end of the auction wins. The rules and terms for such a system are essential for ensuring fairness, transparency, and the smooth functioning of the auction process. Below are some key rules that should be considered for an online product auction system:
                </span>

                <div className="rule">
                    <h3 className="rule-title">1. Registration</h3>
                    <p className="rule-content">
                        <strong>User Account Creation:</strong> Participants must create an account with valid information (e.g., name, email, payment details) to participate in the auction.
                        <br />
                        <strong>Eligibility:</strong> The system may require users to meet certain criteria (e.g., age limit, location) to be eligible to bid.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">2. Auction Start and End Time</h3>
                    <p className="rule-content">
                        <strong>Auction Duration:</strong> The auction will begin and end at specific times. The auction time must be clearly stated in advance.
                        <br />
                        <strong>Time Extensions:</strong> In some cases, auctions may have an automatic extension if a bid is placed in the final few seconds (e.g., 30-second extension).
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">3. Product Listing and Descriptions</h3>
                    <p className="rule-content">
                        <strong>Product Details:</strong> Each auction listing should include clear descriptions, images, specifications, and any relevant information about the product.
                        <br />
                        <strong>Reserve Price:</strong> A minimum price may be set by the seller (reserve price), and the auction will only close successfully if the reserve price is met.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">4. Bidding Process</h3>
                    <p className="rule-content">
                        <strong>Bid Increments:</strong> The system may define a minimum bid increment, i.e., the amount by which a bid must increase from the previous bid.
                        <br />
                        <strong>Bid History:</strong> The auction system should display a real-time log of bids placed, showing the bidder and the amount.
                        <br />
                        <strong>Automatic Bidding:</strong> Some systems allow automatic bidding, where users set a maximum bid, and the system automatically places bids on their behalf within the bidding limits.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">5. Bid Validity</h3>
                    <p className="rule-content">
                        <strong>Binding Agreement:</strong> Once a bid is placed, it is legally binding, and the bidder must follow through with the payment if they win the auction.
                        <br />
                        <strong>Cancellation of Bids:</strong> In most cases, bids cannot be retracted once placed. Some systems may allow cancellations under specific conditions, such as bidding errors.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">6. Payment and Transaction</h3>
                    <p className="rule-content">
                        <strong>Payment Methods:</strong> Accepted payment methods should be clearly defined (e.g., credit card, PayPal, bank transfer).
                        <br />
                        <strong>Payment Deadline:</strong> The winning bidder must complete the payment within a specified timeframe after the auction ends (e.g., 24-48 hours).
                        <br />
                        <strong>Non-Payment Consequences:</strong> If the winning bidder fails to make payment, they may be penalized or banned from future auctions, and the second-highest bidder may be given the opportunity to purchase the item.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">7. Winning the Auction</h3>
                    <p className="rule-content">
                        <strong>Highest Bidder Wins:</strong> The product is awarded to the highest bidder at the auction's closing time, provided that the reserve price (if any) has been met.
                        <br />
                        <strong>Tie-Breaking:</strong> If two bids are placed at the same amount, the first bidder will usually be considered the winner.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">8. Shipping and Delivery</h3>
                    <p className="rule-content">
                        <strong>Shipping Costs:</strong> The system must clarify whether the shipping costs are included in the auction price or will be charged separately.
                        <br />
                        <strong>Delivery Timeframe:</strong> Delivery times and methods must be clearly stated, and the seller must fulfill the delivery within the agreed timeframe after payment is received.
                        <br />
                        <strong>International Shipping:</strong> If applicable, international shipping policies and costs should be outlined.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">9. Dispute Resolution</h3>
                    <p className="rule-content">
                        <strong>Conflict Resolution:</strong> A clear process for resolving disputes between bidders and sellers (e.g., item not as described, non-payment).
                        <br />
                        <strong>Feedback System:</strong> Both bidders and sellers may have the opportunity to leave feedback or ratings to build trust and reputation.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">10. Auction Fees</h3>
                    <p className="rule-content">
                        <strong>Listing Fees:</strong> Sellers may be required to pay a fee to list their product on the auction platform.
                        <br />
                        <strong>Transaction Fees:</strong> A percentage of the final auction price may be charged as a transaction fee to the winning bidder or seller.
                        <br />
                        <strong>Refund Policy:</strong> A clear refund policy should be in place, particularly for canceled or failed transactions.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">11. Security and Privacy</h3>
                    <p className="rule-content">
                        <strong>Data Protection:</strong> Sensitive data, such as payment information and personal details, should be securely handled and protected according to data protection laws.
                        <br />
                        <strong>Fraud Prevention:</strong> The system should have measures in place to prevent fraudulent activities, such as account verification, monitoring suspicious bids, and banning fraudulent accounts.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">12. Seller Responsibilities</h3>
                    <p className="rule-content">
                        <strong>Item Authenticity:</strong> Sellers must ensure that the product listed is authentic, as described, and in the condition indicated.
                        <br />
                        <strong>Compliance with Laws:</strong> Sellers must comply with relevant laws, including consumer protection laws, and not list prohibited or illegal items.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">13. Auction Categories and Restrictions</h3>
                    <p className="rule-content">
                        <strong>Item Restrictions:</strong> Certain items may be restricted from being sold in the auction, such as illegal, hazardous, or restricted goods.
                        <br />
                        <strong>Product Categorization:</strong> Auctions should be categorized to make it easier for users to search for specific products.
                    </p>
                </div>

                <div className="rule">
                    <h3 className="rule-title">14. System Maintenance</h3>
                    <p className="rule-content">
                        <strong>Auction Downtime:</strong> Scheduled maintenance or unscheduled outages should be communicated to users, especially if it affects auction timelines.
                        <br />
                        <strong>System Errors:</strong> The auction platform should have policies in place for handling system errors that may disrupt bids or cause other issues.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Rules;
