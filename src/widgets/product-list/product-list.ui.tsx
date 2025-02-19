import { productQueries } from '~entities/product';
import { CircularProgress } from '@mui/material';
import ProductCard from './../../entities/product/ui/Card';

export const ProductList = () => {
  const {
    data: productData,
    isLoading,
    isError,
  } = productQueries.useGetProducts();

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
    <div className="w-full flex flex-wrap  px-4 py-8 gap-5">
      {productData.data.results.map((product) => (
        <ProductCard product={product}/>
      ))}
    </div>
  );
};
