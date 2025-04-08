import React from 'react';
import './Menu.css';

const Menu = () => {
  const menuItems = [
    {
      category: "Starters",
      items: [
        { name: "Greek Salad", price: "$12.99", description: "Fresh vegetables, feta cheese, olives with our house dressing" },
        { name: "Bruschetta", price: "$8.99", description: "Grilled bread with tomatoes, garlic, and fresh basil" },
        { name: "Lemon Garlic Shrimp", price: "$14.99", description: "Grilled shrimp with lemon garlic sauce" }
      ]
    },
    {
      category: "Main Courses",
      items: [
        { name: "Grilled Mediterranean Sea Bass", price: "$28.99", description: "Fresh sea bass with herbs and lemon" },
        { name: "Lamb Chops", price: "$32.99", description: "Grilled lamb chops with rosemary and mint sauce" },
        { name: "Vegetarian Moussaka", price: "$24.99", description: "Layered eggplant, potatoes, and bechamel sauce" }
      ]
    },
    {
      category: "Desserts",
      items: [
        { name: "Baklava", price: "$8.99", description: "Layered pastry filled with nuts and honey" },
        { name: "Tiramisu", price: "$9.99", description: "Classic Italian coffee-flavored dessert" },
        { name: "Lemon Sorbet", price: "$6.99", description: "Refreshing lemon sorbet" }
      ]
    }
  ];

  return (
    <div className="menu">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Experience the taste of Mediterranean cuisine</p>
      </div>
      
      <div className="menu-content">
        {menuItems.map((section, index) => (
          <section key={index} className="menu-section">
            <h2>{section.category}</h2>
            <div className="menu-items">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="menu-item">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="price">{item.price}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Menu; 