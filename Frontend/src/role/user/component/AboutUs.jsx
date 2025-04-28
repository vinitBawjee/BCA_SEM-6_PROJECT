import React from 'react';

import styles from './Aboutus.module.css';  

const AboutUs = () => {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.containerSection}>
                    <div className={styles.title}>
                        <h1>About us</h1>
                    </div>
                    <div className={styles.content}>
                     
                        <p>
                        Welcome to AuctionHub – a modern, secure, and efficient online auction system designed to bring buyers and sellers together in a seamless marketplace. We are dedicated to offering an easy-to-use platform for users to bid on products in real-time while ensuring the highest level of transparency, security, and accountability.

Our Mission
At AuctionHub, our mission is to revolutionize the way products are bought and sold online through an intuitive auction system. We aim to create a trusted environment where buyers can confidently place bids on exciting products, and sellers can showcase their items to a broad audience. With a strong focus on verifying products and maintaining fairness, our platform brings peace of mind to both buyers and sellers.

Our Key Entities
Users: Our users are at the heart of the platform. Whether you're looking to get the best deals or bid on exclusive products, we’ve created an easy-to-navigate system where you can find what you're looking for and participate in dynamic auctions.

Sellers: Sellers can list their products in our marketplace and offer them to an engaged audience of potential buyers. With an easy-to-use interface, sellers can manage their listings and track bids in real-time, making the process smooth and hassle-free.

Admin: Our admin team ensures the platform runs smoothly. The admin verifies sellers and their products to ensure only authentic listings are available for bidding. We uphold the integrity of our platform by maintaining a transparent and fair environment for all users.

Why Choose Us?
Secure Transactions: We prioritize security to ensure that your personal and financial information is always protected. Our platform uses the latest encryption technologies to safeguard your data.

Fairness & Transparency: Our admin team actively monitors all transactions, ensuring that every auction is fair and free from manipulation. Sellers must undergo a verification process to list their products, and all bids are visible in real-time.

Easy to Use: Whether you’re a first-time bidder or a seasoned seller, our platform is designed to be user-friendly, with intuitive navigation and a smooth auction experience.

Join Us Today
Whether you're a buyer searching for your next great deal or a seller looking to reach a wider audience, [Your Auction Platform Name] is here to help you make your auction experience as rewarding as possible. Join us today and start bidding, selling, or both!

Thank you for choosing [Your Auction Platform Name]—where great deals are just a bid away!


                        </p>
                        <div className={styles.button}>
                            <a href="#">Read more</a>
                        </div>
                    </div>
                </div>
                <div className={styles.imageSection}>
                    <img src="/img/slider-3.jpg" alt="About Us" />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
