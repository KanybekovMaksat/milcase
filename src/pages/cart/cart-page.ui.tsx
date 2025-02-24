import { useState, useEffect } from 'react';
import { CircularProgress, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { Title } from '~shared/ui/title';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import { productQueries } from '~entities/product';

export function CartPage() {
  const isAuth = getCookie('access');
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const { mutate: placeOrder, isPending, isSuccess, isError } = productQueries.useCreateOrder();
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('CARTStorage')) || {};
    setCart(cartData);

    const total = Object.values(cartData).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, []);

  const handleQuantityChange = (id, type) => {
    const updatedCart = { ...cart };
    const product = updatedCart[id];

    if (type === 'increase') {
      product.quantity += 1;
    } else if (type === 'decrease' && product.quantity > 1) {
      product.quantity -= 1;
    } else if (type === 'decrease' && product.quantity === 1) {
      delete updatedCart[id];
    }

    setCart(updatedCart);
    localStorage.setItem('CARTStorage', JSON.stringify(updatedCart));

    const total = Object.values(updatedCart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleOrder = () => {
    const orderItems = Object.values(cart).map(item => ({
      product: item.id,
      quantity: item.quantity,
    }));

    if (orderItems.length > 0) {
      placeOrder(orderItems); 
    }
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('CARTStorage'); 
      navigate('/order'); 
    }
  }, [isSuccess, navigate]);

  if (!isAuth) {
    return (
      <div className="text-center text-gray-600">
        <p className="mb-4">Необходима авторизация.</p>
        <Link
          to="/login"
          className="bg-milk text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          авторизация
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 flex flex-col">
      <Title>Корзина</Title>

      {Object.keys(cart).length === 0 ? (
        <p className="text-gray-500 text-center mt-10">Корзина пуста</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {Object.values(cart).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-[gray] rounded-lg shadow-sm"
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex flex-col flex-1 ml-4">
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    {item.price} сом × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                    aria-label="Decrease quantity"
                  >
                    <IndeterminateCheckBoxRoundedIcon className="text-gray-600" />
                  </IconButton>
                  <span className="font-bold">{item.quantity}</span>
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                    aria-label="Increase quantity"
                  >
                    <AddBoxIcon className="text-gray-600" />
                  </IconButton>
                </div>
                <p className="font-bold">{item.price * item.quantity} сом</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-end self-end rounded-lg w-full max-w-sm">
            <p className="text-xl font-bold text-gray-800">
              Итого: <span className="text-violet">{totalPrice} сом</span>
            </p>
            <Button
              variant="contained"
              className="mt-4 bg-violet text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-violet-dark"
              onClick={handleOrder}
              fullWidth
            >
              {isPending ? <CircularProgress size={24} /> : 'Оформить заказ'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
