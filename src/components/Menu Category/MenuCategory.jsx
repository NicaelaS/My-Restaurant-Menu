import MenuItem from '../Menu Item/MenuItem';
import styles from './MenuCategory.module.css';

function MenuCategory({ category, items, onAddToCart }) {
  if (items.length === 0) {
    return null }
   
  return (
    <div className={styles.menuCategory}>
      <h2>{category}</h2>
      <div className="items-container">
        {items.map(item => (
          <MenuItem
            key={item.id}
            id={item.id}
            itemId={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            onAddToCart={() => onAddToCart(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuCategory;