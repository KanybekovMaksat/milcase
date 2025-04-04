import { ProductList } from '~widgets/product-list';
import { Bestsellers } from '~widgets/bestsellers';
import { Map } from '~widgets/map';
import { AdProducts } from '~widgets/ad-products';
import { userQueries } from '~entities/user';

export function HomePage() {
    const {
      data: userData,
      isLoading,
      isError,
    } = userQueries.useLoginUserQuery();
  
    const {
      data: models,
      isLoading: modelsLoading,
      isError: modelsError,
    } = userQueries.useGetPhoneModels();

  return (
    <div className="w-full my-10 flex justify-center items-center flex-col gap-6">
      <AdProducts/>
      <ProductList/>
      <Bestsellers/>
      <Map/>
    </div>
  );
}
