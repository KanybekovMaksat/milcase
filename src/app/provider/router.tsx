import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { dashboardPageRoute } from '../../pages/dashboard';
import { coursesPageRoute } from '../../pages/courses';
import { profilePageRoute } from '../../pages/profile';
import { rankingPageRoute } from '../../pages/ranking/ranking-page.route';
import { GenericLayout, IntroLayout } from '../../pages/layout';
import { coursePageRoute } from '~pages/course';
import { aboutPageRoute } from '~pages/about';
import { ProtectedRoute } from '~pages/layout/layout.ui';
import { getCookie } from 'typescript-cookie';
import { loyaltyPageRoute } from '~pages/loyalty';
import { loginPageRoute } from '~pages/login';
import { registerPageRoute } from '~pages/register';
import { verifyPageRoute } from '~pages/verify';

function BubbleError() {
  const error = useRouteError();
  if (error instanceof Error) {
    console.error('Route Error:', error.message);
  } else {
    console.error('Unknown Route Error:', error);
  }
  return (
    <div className="text-center text-red-500">
      <h1>Ошибка!</h1>
      <p>Что-то пошло не так. Пожалуйста, попробуйте позже.</p>
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
      dashboardPageRoute,
      coursesPageRoute,
      profilePageRoute,
      rankingPageRoute,
      aboutPageRoute,
      coursePageRoute,
      aboutPageRoute,
      loyaltyPageRoute,
      loginPageRoute,
      verifyPageRoute,
      registerPageRoute,
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
