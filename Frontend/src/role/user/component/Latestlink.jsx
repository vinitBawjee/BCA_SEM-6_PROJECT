const Latestlink = ({ onFilter }) => {
    return (
        <div className="product-filter">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="section-title">
                        <h2>Product For Auction</h2>
                    </div>
                    <ul className="product-controls">
                        <li onClick={() => onFilter("All")}>All</li>
                        <li onClick={() => onFilter("electronics")}>Electronic</li>
                        <li onClick={() => onFilter("furniture")}>Furniture</li>
                        <li onClick={() => onFilter("automobile")}>Automobile</li>
                        <li onClick={() => onFilter("jewelry")}>Jewelry</li>
                        <li onClick={() => onFilter("collectibles")}>Collectibles</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Latestlink;
