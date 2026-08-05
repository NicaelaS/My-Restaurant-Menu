import { useState } from 'react';
import menuItemStyles from './MenuItem.module.css';
import itemHeaderStyles from './ItemHeader.module.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


function MenuItem({ id, name, price, description, onAddToCart }) {
  const [yumCount, setYumCount] = useState(0);

  function handleYumClick() {
    setYumCount(prevCount => prevCount + 1);
  }

  function handleAddToCartClick() {
    if (onAddToCart) {
      onAddToCart({ id: id, name, price });
    }
  }

  return (
    <div className={menuItemStyles['menu-item']}>
      <div className={itemHeaderStyles['item-header']}>
        <h3><Link to={`/menu/${id}`}>{name}</Link></h3>
        <span className="price">${price}</span>
      </div>
      <p className="description">{description}</p>
      <div className={menuItemStyles['menu-item-actions']}>
        <Button variant="contained" color="inherit"  onClick={handleAddToCartClick}>
          Add to Cart
        </Button>
        
        <Button variant="outlined" color="success" onClick={handleYumClick}>
          😋 Yum! ({yumCount})
        </Button>

      </div>
    </div>
  )


  const [isHovering, setIsHovering] = useState(false)

return (

  <div
    className={`menu-item ${isHovering ? 'hovering' : ''}`}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
  >

    ...

  </div>
)


}

export default MenuItem;
