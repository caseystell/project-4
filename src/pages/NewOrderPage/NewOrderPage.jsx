import './NewOrderPage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ordersAPI from '../../utilities/orders-api';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';

export default function NewOrderPage({}) {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState(null);
  let navigate = useNavigate();

  useEffect(function() {
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);

  async function handleRemoveQty(productId, newQty) {
    const updatedCart = await ordersAPI.setProductQtyInCart(productId, newQty);
    setCart(updatedCart)
  }

  async function handleCheckout(cart) {
    const order = await ordersAPI.checkout(cart);
    setOrderHistory(order);
    navigate('/orders');
  }

  return (
    <main className="NewOrderPage">
      <OrderDetail order={cart} handleRemoveQty={handleRemoveQty} handleCheckout={handleCheckout} />
      <OrderHistoryPage setOrderHistory={setOrderHistory} />
    </main>
  );
}