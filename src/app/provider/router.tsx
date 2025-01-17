import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { authPageRoute } from '../../pages/auth';
import { dashboardPageRoute } from '../../pages/dashboard';
import { coursesPageRoute } from '../../pages/courses';
import { profilePageRoute } from '../../pages/profile';
import { rankingPageRoute } from '../../pages/ranking/ranking-page.route';
import { GenericLayout, IntroLayout } from '../../pages/layout';
import { coursePageRoute } from '~pages/course';
import { badgesPageRoute } from '~pages/badges';
import { aboutPageRoute } from '~pages/about';
import { ProtectedRoute } from '~pages/layout/layout.ui';
import { getCookie } from 'typescript-cookie';

function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const isAuth = !!getCookie('access');

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <ProtectedRoute isAuthenticated={true} />,
        children: [
          {
            element: <GenericLayout />,
            children: [
              dashboardPageRoute,
              coursesPageRoute,
              profilePageRoute,
              rankingPageRoute,
              coursePageRoute,
              badgesPageRoute,
            ],
          },
        ],
      },
      {
        element: <IntroLayout />,
        children: [
          authPageRoute,
          aboutPageRoute,
        ],
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
