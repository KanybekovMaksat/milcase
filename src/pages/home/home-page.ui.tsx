import { ProductList } from '~widgets/product-list';
import { Bestsellers } from '~widgets/bestsellers';
import { Map } from '~widgets/map';
import { AdProducts } from '~widgets/ad-products';

export function HomePage() {

  return (
    <div className="w-full my-10 flex justify-center items-center flex-col gap-6">
      <AdProducts/>
      <ProductList/>
      <Bestsellers/>
      <Map/>
    </div>
  );
}
