import { CircularProgress } from '@mui/material';
import { productQueries } from '~entities/product';
import { Title } from '~shared/ui/title';
import ProductCard from './../../entities/product/ui/Card';
import { Link } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';

export function FavoritePage() {
  const isAuth = getCookie('access');
  const {
    data: productData,
    isLoading,
    isError,
  } = productQueries.useGetFavoriteProducts();

  if (!isAuth) {
    <div className="text-center text-gray-600">
      <p className="mb-4">Необходима авторизация.</p>
      <Link
        to="/login"
        className="bg-milk text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        авторизация
      </Link>
    </div>;
  }
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CircularProgress className="text-milk w-10 h-10" />
        <h3 className="text-milk font-semibold text-lg opacity-75">
          Загружаем данные...
        </h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-milk font-semibold text-lg opacity-75">
          Произошла ошибка при загрузке данных!
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <Title className="text-center">Мои избранные товары</Title>
        {productData.data.favoriteProducts.length > 0 ? (
          productData.data.favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="text-center text-gray-600">
            <p className="mb-4">У вас нет товаров в избранном.</p>
            <Link
              to="/"
              className="bg-milk text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Вернуться на главную
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
