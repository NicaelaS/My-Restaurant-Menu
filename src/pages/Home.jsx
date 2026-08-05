import { useReducer, useState } from 'react';
import '../App.css';
import MenuCategory from '../components/Menu Category/MenuCategory';
import Button from '@mui/material/Button';
import DailySpecial from '../components/DailySpecial';
import menuData from '../menuData'



function Home() {
  const [special, setSpecial] = useState("July Chef's Special: Grilled Salmon with Lemon Butter Sauce $20");
  const [tableNumber, setTableNumber] = useState("");
  const [note, setNote] = useState("");
  const [confirmedNote, setConfirmedNote] = useState("");
  const [cart, dispatch] = useReducer(cartReducer, []);

  const handleSpecialClick = () => {
    setSpecial("July Chef's Special: Seared Scallops with Garlic Butter $24");
  };

  function handleNoteSubmit(e) {
    e.preventDefault();
    setConfirmedNote(note);
    setNote('');
  }

  function handleAddToCart(item) {
    dispatch({ type: 'ADD_ITEM', item });
  }

  function handleRemoveFromCart(id) {
    dispatch({ type: 'REMOVE_ITEM', id });
  }

  function handleClearCart() {
    dispatch({ type: 'CLEAR_CART' });
  }

  function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="App">
      <header>
        <h1>Nicaela's Kitchen</h1>

        <input
          type="text"
          placeholder="Table number"
          value={tableNumber}

          onChange={e => setTableNumber(e.target.value)}

          onKeyDown={e => {
            if (e.key === 'Enter') {
              console.log(`Table ${tableNumber} confirmed`);
            }

            if (e.key === 'Escape') {
              setTableNumber('');
            }
          }}
        />

        {tableNumber && <p>For Table {tableNumber}</p>}

        <form onSubmit={handleNoteSubmit}>
          <input
            type="text"
            placeholder="Any allergies or requests?"
            value={note}
            onChange={e => setNote(e.target.value)}
          />

          <Button variant="text" size="small" color="secondary" type="submit">
            Send to Kitchen
          </Button>
        </form>

        {confirmedNote && <p>✅ Kitchen note sent: "{confirmedNote}"</p>}

        <p>Fresh, delicious food made with love</p>

        

      </header>

      <section className="special-section">
        <p>{special}</p>
        <button onClick={handleSpecialClick}>Show another special</button>
        <DailySpecial />
      </section>

      <section className="cart-summary">
        <div className="cart-summary-header">
          <h2>Cart Summary</h2>
          <button onClick={handleClearCart} disabled={cart.length === 0}>
              Clear Cart
          </button>

        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <ul className="cart-items">
            {cart.map(item => (
              <li key={item.id}>
                <span>{item.name} — ${item.price}</span>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        <p className="cart-total">Subtotal: ${subtotal.toFixed(2)}</p>
      </section>

      <main className="menu-container">
        {menuData.map(category => (
          <MenuCategory
            key={category.category}
            category={category.category}
            items={category.items}
            onAddToCart={handleAddToCart}
          />
        ))}
      </main>
      
    </div>
  );
}

export default Home;