import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { productQueries } from '~entities/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './../../entities/product/ui/Card';
import { CircularProgress } from '@mui/material';

export const TrendingList = () => {
  const {
    data: recommendedProducts,
    isLoading: recommendedProductsLoading,
    isError: recommendedProductsError,
  } = productQueries.useGetReccommndedProducts();

  if (recommendedProductsLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CircularProgress className="text-milk w-10 h-10" />
        <h3 className="text-milk font-semibold text-lg opacity-75">
          Загружаем данные...
        </h3>
      </div>
    );
  }

  if (recommendedProductsError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-milk font-semibold text-lg opacity-75">
          Произошла ошибка при загрузке данных!
        </h3>
      </div>
    );
  }

  return (
    <section className="mb-12 w-full md:max-w-7xl px-4">
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-milk to-violet opacity-90"></div>
        <div className="relative z-10 px-8 py-12 text-white">
          <div className="flex items-center mb-4">
            <StarBorderRoundedIcon />
            <h2 className="text-2xl font-bold">Рекомендуем вам</h2>
          </div>
          <p className="mb-8 text-indigo-100">На основе ваших частых покупок</p>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className=" pb-[40px]"
          >
            {recommendedProducts?.data?.results?.map((product) => (
              <SwiperSlide key={product.id} className="pt-[20px]">
                <ProductCard key={product.id} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
