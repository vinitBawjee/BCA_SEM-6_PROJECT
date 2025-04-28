import React, { useState } from 'react';
import styles from './Slider.module.css';

const New_slider = () => {
  // Initial slider images array
  const initialItems = [
    {
      id: 2,
      name: "Furniture",
      img: "img/Table_Set.jpg",
      des: "Our Furniture is besttt!!",
    },
    {
      id: 3,
      name: "Electronic Items",
      img: "img/Big_Screen_Led.jpg",
      des: "We have next level electronic items..!",
    },
    {
      id: 4,
      name: "Jwellery",
      img: "img/Fancy_Necklesh.jpg",
      des: " Enjoy our jwellery..!",
    },
    {
      id: 1,
      name: "Automobile",
      img: "img/Mercidis.jpg",
      des: "GO and bid on supperb automobile collectionn..!",
    },
    {
      id: 5,
      name: "Best Quality Furniture",
      img: "img/Sofa_Set.jpg",
      des: "Trenidngg",
    },
    {
      id: 6,
      name: "Ireland",
      img: "img/Headphones.jpg",
      des: "X-Dev, Transforming code into visual poetry..!",
    }
  ];

  // State to manage the order of items
  const [items, setItems] = useState(initialItems);

  const handleNext = () => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const firstItem = newItems.shift(); // Remove the first item
      newItems.push(firstItem); // Add the first item to the end
      return newItems;
    });
  };

  const handlePrev = () => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const lastItem = newItems.pop(); // Remove the last item
      newItems.unshift(lastItem); // Add the last item to the start
      return newItems;
    });
  };

  return (
    <div>
      

      <div className={`${styles.container}`}>
        <div className={styles.slide}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={styles.item}
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className={styles.content}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.des}>{item.des}</div>
                <button className='btn btn-danger'>See More</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.btn}>
          <button className="btn btn-danger " onClick={handlePrev}>
            Previous
          </button>
          <button className="btn btn-success ml-3" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default New_slider;
