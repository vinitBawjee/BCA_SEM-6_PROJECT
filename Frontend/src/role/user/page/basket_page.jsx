import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import css from "./basket_page.module.css";

const Basket_Page = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProducts = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
    
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/auction-user-save`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProducts(data);
                console.log(data);
                
                
                
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserProducts();
    }, []);    

    return (
        <div className="p-5">
            <div className="d-flex mb-4 gap-3">
                <button className="nav-link mb-4 text-muted" onClick={() => navigate(-1)}>Previous</button>
            </div>
            <div className={css['card_container']}>
                {loading ? (
                    <p>Loading products...</p>
                ) : products.length === 0 ? (
                    <p>No auction found.</p>
                ) : (
                    <div>
                        {products.map((product) => (
                            <Link key={product._id} to={`/auction-product/${product._id}`} className={`d-flex mb-3 ${css['card']} border rounded p-2`}>
                                <div className="w-25">
                                    <figure className="position-relative h-100 rounded">
                                        <img src={`http://localhost:5000/uploads/seller/${product?.image}`} alt={product.product_name} className={css['productImage']} />
                                    </figure>
                                </div>
                                <div className="w-75 p-3">
                                    <div className="h-100 d-flex gap-1">
                                        <div className="w-75 pe-3 border-end">
                                            <h3 className="text-muted">{product.product_name}</h3>
                                            <p className="text-muted h-75 p-3 overflow-auto">{product.description}</p>
                                        </div>
                                        <div className="w-25 ps-3">
                                            <p><strong>Type:</strong> {product.product_type}</p>
                                            <p><strong>Quantity:</strong> {product.quantity}</p>
                                            <p><strong>Starting Price:</strong> ₹{product.starting_price}</p>
                                            <p><strong>Increment Price:</strong> ₹{product.increment_price}</p>
                                            <p><strong>Start Date:</strong> {product.start_date}</p>
                                            <p><strong>End Date:</strong> {product.end_date}</p>
                                            <p><strong>Status:</strong> {product.status}</p>
                                            <p><strong>Current Bid:</strong> ₹{product.current_bid}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Basket_Page