import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { productQueries } from '~entities/product';
import { CircularProgress } from '@mui/material';
import { FavoriteButton } from '~features/product-card/favorite-button';

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
        <div
          key={product.id}
          className="relative w-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow md:w-64 h-70"
        >
          <img
            src={product.photo}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 flex flex-col gap-2 flex-1">
            <h3 className="text-md font-semibold text-[black]/80">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 flex items-start gap-[2px] font-semibold ">
              {Math.floor(product.price)}
              <img src="/som.png" alt="" className="w-[20px] h-[20px]" />
            </p>
            <div className="mt-auto flex items-center justify-between">
              <button className="px-4 py-1 bg-blue-600 border  text-violet hover:bg-violet transition-all duration-300 hover:text-white border-violet rounded-lg flex items-center gap-2">
                <ShoppingCartIcon fontSize="small" className="text-inherit" />В
                корзину
              </button>
              <FavoriteButton id={product.id}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
