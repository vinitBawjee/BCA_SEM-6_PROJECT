import Latestlink from "./Latestlink";
import css from "./Latest.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './SearchBar.module.css';
import axios from "axios";

// SearchBar component
const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
      onSearch(event.target.value);  // Trigger search on every character change
    };
  
    return (
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for items..."
          className={styles.searchInput}
        />
      </div>
    );
};

const Latest = () => {
    const [auctions, setAuctions] = useState([]);
    const [filteredAuctions, setFilteredAuctions] = useState([]);

    // Fetch auction data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/auction`);
                setAuctions(data);
                setFilteredAuctions(data);  // Initially, set filtered auctions as all auctions
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Handle search filter
    const handleSearch = (query) => {
        if (!query) {
            setFilteredAuctions(auctions);  // If search query is empty, show all auctions
        } else {
            const filtered = auctions.filter(item => {
                const productName = item.product_name || '';  // Default to empty string if undefined
                const productDescription = item.product_description || '';  // Default to empty string if undefined
                return (
                    productName.toLowerCase().includes(query.toLowerCase()) ||
                    productDescription.toLowerCase().includes(query.toLowerCase())
                );
            });
            setFilteredAuctions(filtered);  // Update filtered results immediately
        }
    };

    // Handle category filter
    const handleFilter = (selectedCategory) => {
        if (selectedCategory === "All") {
            setFilteredAuctions(auctions);  // Reset to show all auctions
        } else {
            const filtered = auctions.filter(item => item.product_type.toLowerCase() === selectedCategory.toLowerCase());
            setFilteredAuctions(filtered);  // Update filtered results based on category
        }
    };

    return (
        <div className="latest-products spad border" style={{ minHeight: "1000px" }}>
            <div className="container-fluid">
                <SearchBar onSearch={handleSearch} /> 
                <Latestlink onFilter={handleFilter} />
                <div className="row" id="product-list">
                    {filteredAuctions.length > 0 ? (
                        filteredAuctions.map((item) => (
                            <Link key={item.id} to={`/auction-product/${item._id}`} className="col-lg-3 col-sm-6">
                                <div className={css.productItem}>
                                    <figure className="position-relative border rounded">
                                        <img
                                            src={`http://localhost:5000/uploads/seller/${item.image}`}
                                            alt={item.product_name}
                                            className={css.productImage}
                                        />
                                        <div className={`${css.pStatus} w-25}`}>
                                            ₹ {item.current_bid + item.starting_price}
                                        </div>
                                        <div className={css.overlay}>{item.product_name}</div>
                                    </figure>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center">No Products Available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Latest;
