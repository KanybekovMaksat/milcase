import { CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { Title } from '~shared/ui/title';
import { productQueries } from '~entities/product';


export function OrderPage() {
  const isAuth = getCookie('access');
  const { data: ordersData, isLoading, isError } = productQueries.useGetCart();
  const { mutate: createPayment, isPending, isSuccess, isError: isPaymentError, data: paymentData } = productQueries.useCreatePayment();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CircularProgress className="text-milk w-10 h-10" />
        <h3 className="text-milk font-semibold text-lg opacity-75">Загружаем данные...</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-milk font-semibold text-lg opacity-75">Произошла ошибка при загрузке данных!</h3>
      </div>
    );
  }

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

  const latestOrder = ordersData?.data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  if (!latestOrder) {
    return (
      <div className="text-center text-gray-600">
        <p className="mb-4">У вас нет заказов.</p>
      </div>
    );
  }

  const { id, totalPrice, isPaid, status, orderItems, createdAt } = latestOrder;

  const handlePayment = () => {
    createPayment(id);
  };

  if (isSuccess && paymentData?.data.checkoutUrl) {
    window.location.href = paymentData.data.checkoutUrl; 
    return null; 
  }

  return (
    <div className="min-h-screen w-full p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto my-20 border border-[gray]/50">
      <div className="flex flex-col items-center border-b border-gray-300 pb-4">
        <Title>Заказ #{id}</Title>
        <img src="/logo.png" alt="Logo" className="w-24 h-24 mt-4 rounded-full" />
      </div>

      <div className="mt-4 border-b border-gray-300 pb-4">
        <p className="text-lg font-semibold">Статус заказа: <span className="text-violet">{status}</span></p>
        <p className="text-lg font-semibold">Общая сумма: <span className="text-violet">{totalPrice} сом</span></p>
        <p className="text-sm text-gray-500">
          Дата создания: {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold">Товары в заказе:</h4>
        <ul className="list-none mt-2">
          {orderItems.map((item, index) => (
            <li key={index} className="flex justify-between py-2 border-b border-gray-200">
              <span>{`Товар: ${item.product.name}`}</span>
              <span>{`Количество: ${item.quantity}`}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold">Итог:</h4>
        <div className="flex justify-between py-2">
          <span className="font-medium">Итого:</span>
          <span className="font-semibold text-violet">{totalPrice} сом</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="font-medium">Статус оплаты:</span>
          {isPaid ? (
            <span className="font-semibold text-green-500">Оплачено</span>
          ) : (
            <span className="font-semibold text-red-500">Не оплачено</span>
          )}
        </div>
      </div>

      <div className="mt-6">
        {!isPaid && (
          <Button
            variant="contained"
            color="primary"
            className="mt-4 bg-violet shadow-none"
            fullWidth
            onClick={handlePayment}
            disabled={isPending} 
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : 'Оплатить заказ'}
          </Button>
        )}
        {isPaid && (
          <p className="mt-4 text-green-500 font-semibold">
            Ваш заказ уже оплачен.
          </p>
        )}
        {isPaymentError && !isPaid && (
          <p className="mt-4 text-red-500 font-semibold">Ошибка при оплате, попробуйте снова.</p>
        )}
      </div>

      <div className="mt-6 border-t border-gray-300 pt-4 text-center text-sm text-[gray]">
        <p>Спасибо за покупку! Мы ценим ваш выбор.</p>
      </div>
    </div>
  );
}
