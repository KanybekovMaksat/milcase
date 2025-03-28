import {
  Link,
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { homePageRoute } from '../../pages/home';
import { profilePageRoute } from '../../pages/profile';
import { catalogPageRoute } from '../../pages/catalog/catalog-page.route';
import { GenericLayout, IntroLayout } from '../../pages/layout';
import { aboutPageRoute } from '~pages/about';
import { ProtectedRoute } from '~pages/layout/layout.ui';
import { getCookie } from 'typescript-cookie';
import { loyaltyPageRoute } from '~pages/loyalty';
import { loginPageRoute } from '~pages/login';
import { registerPageRoute } from '~pages/register';
import { verifyPageRoute } from '~pages/verify';
import { favoritePageRoute } from '~pages/favorite';
import { termsPageRoute } from '~pages/terms';
import { policyPageRoute } from '~pages/policy';
import { cartPageRoute } from './../../pages/cart/cart-page.route';
import { orderPageRoute } from '~pages/order';

function BubbleError() {
  const error = useRouteError();
  if (error instanceof Error) {
    console.error('Route Error:', error.message);
  } else {
    console.error('Unknown Route Error:', error);
  }
  return (
    <div className="text-center text-red-500 mt-20">
      <h1>404!</h1>
      <p className='mb-[10px]'>Не найдена такая страница</p>
      <Link className="py-[10px]  px-[30px] border bg-blue" to="/">
        Вернуться на главную
      </Link>
    </div>
  );
}

const isAuth = !!getCookie('access');

const router = createBrowserRouter([
  {
    path: '/',
    element: <GenericLayout />,
    errorElement: <BubbleError />,
    children: [
      homePageRoute,
      profilePageRoute,
      catalogPageRoute,
      aboutPageRoute,
      aboutPageRoute,
      loyaltyPageRoute,
      policyPageRoute,
      loginPageRoute,
      verifyPageRoute,
      termsPageRoute,
      registerPageRoute,
      favoritePageRoute,
      cartPageRoute,
      orderPageRoute,
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
