import {
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import React from 'react';
import { userQueries } from '~entities/user';
import { productQueries } from '~entities/product';

const OrderHistory = () => {
  const { data: productData, isLoading, isError } = productQueries.useGetCart();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  // Filter orders with status "оплачен"
  const paidOrders = productData?.data?.filter(
    (order) => order.status === 'оплачен'
  );

  return (
    <Paper
      elevation={3}
      sx={{ padding: 2 }}
      className="shadow-none border border-alto mx-auto"
    >
      <Typography variant="h6" className="text-center">
        История покупок
      </Typography>
      <div className="flex flex-col gap-10">
        {paidOrders.map((order) => (
          <div className="" key={order.id}>
            <Card className="w-full shadow-md border border-alto rounded-lg overflow-hidden">
              <CardContent className="bg-blue-50 p-4">
                <Typography variant="h6" className="font-bold text-blue-700">
                  📦 Заказ #{order.id}
                </Typography>
                <Typography variant="body2" className="text-gray-700 mt-1">
                  📅 Дата:{' '}
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </Typography>
                <Typography variant="body2" className="text-gray-700 mt-1">
                  💰 Сумма:{' '}
                  <span className="font-medium">{order.totalPrice} ₽</span>
                </Typography>
                <Typography
                  variant="body2"
                  className="text-red-600 mt-1 font-medium"
                >
                  🎉 Скидка: {order.discount} ₽
                </Typography>
              </CardContent>
              <CardContent className="p-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 mb-3 border-b pb-3 last:border-b-0"
                  >
                    <CardMedia
                      component="img"
                      image={item.product.photo}
                      alt={item.product.name}
                      sx={{ width: 60, height: 60, borderRadius: '8px' }}
                      className="shadow-md"
                    />
                    <div>
                      <Typography
                        variant="body1"
                        className="font-semibold text-gray-800"
                      >
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        🔢 Количество:{' '}
                        <span className="font-medium">{item.quantity}</span>
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        💲 Цена:{' '}
                        <span className="font-medium">{item.price} ₽</span>
                      </Typography>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default OrderHistory;
