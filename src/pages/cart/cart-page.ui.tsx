// import { useState, useEffect } from 'react';
// import { CircularProgress, Button } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { getCookie } from 'typescript-cookie';
// import { Title } from '~shared/ui/title';
// import { IconButton } from '@mui/material';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
// import { productQueries } from '~entities/product';
// import { userQueries } from '~entities/user';

// export function CartPage() {
//   const isAuth = getCookie('access');
//   const [cart, setCart] = useState({});
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [oldTotalPrice, setOldTotalPrice] = useState(0);
//   const { mutate: placeOrder, isPending, isSuccess, isError } = productQueries.useCreateOrder();
//   const {data:userData, isLoading:userLoading, isError:userError} = userQueries.useLoginUserQuery();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cartData = JSON.parse(localStorage.getItem('CARTStorage')) || {};
//     setCart(cartData);

//     const total = Object.values(cartData).reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const discount = userData?.data.birthdayDiscount || 0;
//     const discountedTotal = total * (1 - discount / 100);

//     setTotalPrice(discountedTotal);
//     setOldTotalPrice(total);
//   }, [userData]);

//   const handleQuantityChange = (id, type) => {
//     const updatedCart = { ...cart };
//     const product = updatedCart[id];

//     if (type === 'increase') {
//       product.quantity += 1;
//     } else if (type === 'decrease' && product.quantity > 1) {
//       product.quantity -= 1;
//     } else if (type === 'decrease' && product.quantity === 1) {
//       delete updatedCart[id];
//     }

//     setCart(updatedCart);
//     localStorage.setItem('CARTStorage', JSON.stringify(updatedCart));

//     const total = Object.values(updatedCart).reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const discount = userData?.data.birthdayDiscount || 0;
//     const discountedTotal = total * (1 - discount / 100);

//     setTotalPrice(discountedTotal);
//     setOldTotalPrice(total);
//   };

//   const handleOrder = () => {
//     const orderItems = Object.values(cart).map(item => ({
//       product: item.id,
//       quantity: item.quantity,
//     }));

//     if (orderItems.length > 0) {
//       placeOrder(orderItems);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       localStorage.removeItem('CARTStorage');
//       navigate('/order');
//     }
//   }, [isSuccess, navigate]);

//   if (!isAuth) {
//     return (
//       <div className="text-center text-gray-600">
//         <p className="mb-4">Необходима авторизация.</p>
//         <Link
//           to="/login"
//           className="bg-milk text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//         >
//           авторизация
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full p-4 flex flex-col">
//       <Title>Корзина</Title>

//       {Object.keys(cart).length === 0 ? (
//         <p className="text-gray-500 text-center mt-10">Корзина пуста</p>
//       ) : (
//         <>
//           <div className="flex flex-col gap-4">
//             {Object.values(cart).map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between p-4 border border-[gray] rounded-lg shadow-sm"
//               >
//                 <img
//                   src={item.photo}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//                 <div className="flex flex-col flex-1 ml-4">
//                   <h3 className="text-md font-semibold">{item.name}</h3>
//                   <p className="text-gray-500">
//                     {item.price} сом × {item.quantity}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <IconButton
//                     onClick={() => handleQuantityChange(item.id, 'decrease')}
//                     aria-label="Decrease quantity"
//                   >
//                     <IndeterminateCheckBoxRoundedIcon className="text-gray-600" />
//                   </IconButton>
//                   <span className="font-bold">{item.quantity}</span>
//                   <IconButton
//                     onClick={() => handleQuantityChange(item.id, 'increase')}
//                     aria-label="Increase quantity"
//                   >
//                     <AddBoxIcon className="text-gray-600" />
//                   </IconButton>
//                 </div>
//                 <p className="font-bold">{item.price * item.quantity} сом</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 flex flex-col items-end self-end rounded-lg w-full max-w-sm">
//             <p className="text-xl font-bold text-gray-800">
//               {oldTotalPrice > totalPrice && (
//                 <>
//                   <span className="line-through text-gray-500 mr-2">
//                     {oldTotalPrice.toFixed(2)} сом
//                   </span>
//                   <span className="text-violet">{totalPrice.toFixed(2)} сом</span>
//                 </>
//               )}
//               {oldTotalPrice === totalPrice && (
//                 <span className="text-violet">{totalPrice.toFixed(2)} сом</span>
//               )}
//             </p>
//             {userData?.data.birthdayDiscount > 0 && (
//               <p className="text-sm text-gray-500">
//                 Скидка в честь дня рождения!
//               </p>
//             )}
//             <Button
//               variant="contained"
//               className="mt-4 bg-violet text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-violet-dark"
//               onClick={handleOrder}
//               fullWidth
//             >
//               {isPending ? <CircularProgress size={24} /> : 'Оформить заказ'}
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { CircularProgress, Button, Checkbox, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { Title } from '~shared/ui/title';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import { productQueries } from '~entities/product';
import { userQueries } from '~entities/user';

export function CartPage() {
  const isAuth = getCookie('access');
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [oldTotalPrice, setOldTotalPrice] = useState(0);
  const [freeCases, setFreeCases] = useState([]);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const {
    mutate: placeOrder,
    isPending,
    isSuccess,
  } = productQueries.useCreateOrder();

  const { data: userData } = userQueries.useLoginUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('CARTStorage')) || {};
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (userData) {
      updateTotal(cart, userData, freeCases);
    }
  }, [cart, userData, freeCases]);

  const updateTotal = (cartData, user, freeCasesList) => {
    const baseTotal = Object.values(cartData).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const birthdayDiscount = user?.data?.birthdayDiscount || 0;
    const welcomeDiscount =
      user?.data?.cluster === 'K4' ? user?.data?.welcomeDiscount || 0 : 0;

    const totalDiscount = Math.min(birthdayDiscount + welcomeDiscount, 100);
    const discountedTotal = baseTotal * (1 - totalDiscount / 100);

    const freeCasesTotal = Object.values(cartData)
      .filter((item) => freeCasesList.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);

    setOldTotalPrice(baseTotal);
    setTotalPrice(discountedTotal - freeCasesTotal);
  };

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
  };

  const handleFreeCaseChange = (id) => {
    setFreeCases((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : prev.length < (userData?.data?.freeCases || 0)
        ? [...prev, id]
        : prev
    );
  };

  const handleOrder = () => {
    const orderItems = Object.values(cart).map((item) => ({
      product: item.id,
      quantity: item.quantity,
      isFree: item.isCase && freeCases.includes(item.id),
    }));

    if (orderItems.length > 0 && city && address && phoneNumber) {
      placeOrder({ orderItems, city, address, phoneNumber });
    } else {
      alert('Пожалуйста, заполните все поля доставки');
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
        <p className="mb-4">Необходима войти в систему.</p>
        <Link
          to="/login"
          className="bg-milk text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Войти
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
                  src={
                    item.photo.startsWith('http')
                      ? item.photo
                      : `http://milcase.makalabox.com${item.photo}`
                  }
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex flex-col flex-1 ml-4">
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    {item.price} сом × {item.quantity}
                  </p>
                </div>
                {item.isCase && userData?.data?.freeCases > 0 && (
                  <Checkbox
                    checked={freeCases.includes(item.id)}
                    onChange={() => handleFreeCaseChange(item.id)}
                    color="primary"
                  />
                )}
                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                  >
                    <IndeterminateCheckBoxRoundedIcon className="text-gray-600" />
                  </IconButton>
                  <span className="font-bold">{item.quantity}</span>
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                  >
                    <AddBoxIcon className="text-gray-600" />
                  </IconButton>
                </div>
                <p className="font-bold">{item.price * item.quantity} сом</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4">
            <input
              type="text"
              required
              placeholder="Город"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 border rounded-md w-full"
            />
            <input
              type="text"
              required
              placeholder="Адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-3 border rounded-md w-full"
            />
            <input
              type="tel"
              required
              placeholder="Номер телефона"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-3 border rounded-md w-full"
            />
          </div>

          <div className="flex justify-between mt-6">
            <p className="text-gray-600 text-lg font-medium flex items-center gap-2">
              🎁 Доступно бесплатных чехлов:
              <span className="text-violet font-bold">
                {userData?.data?.freeCases
                  ? Math.max(userData.data.freeCases - freeCases.length, 0)
                  : 0}
              </span>
            </p>
          </div>
          <div className="mt-6 flex flex-col items-end self-end rounded-lg w-full max-w-sm">
            <p className="text-xl font-bold text-gray-800">
              {oldTotalPrice > totalPrice && (
                <>
                  <span className="line-through text-gray-500 mr-2">
                    {oldTotalPrice.toFixed(2)} сом
                  </span>
                  <span className="text-violet">
                    {totalPrice.toFixed(2)} сом
                  </span>
                </>
              )}
              {oldTotalPrice === totalPrice && (
                <span className="text-violet">{totalPrice.toFixed(2)} сом</span>
              )}
            </p>
            {userData?.data?.birthdayDiscount > 0 && (
              <p className="text-sm text-violet text-end">
                Скидка в честь дня рождения!
              </p>
            )}
            {userData?.data?.cluster === 'K4' &&
              userData?.data?.welcomeDiscount > 0 && (
                <p className="text-sm text-violet text-end">
                  Скидка в {userData.data.welcomeDiscount}%
                </p>
              )}
          </div>

          <Button
            variant="contained"
            className="mt-4 bg-violet shadow-none text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-violet-dark"
            onClick={handleOrder}
            fullWidth
          >
            {isPending ? <CircularProgress size={24} /> : 'Оформить заказ'}
          </Button>
        </>
      )}
    </div>
  );
}
