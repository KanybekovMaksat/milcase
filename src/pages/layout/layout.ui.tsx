import { Navigate, Outlet} from 'react-router-dom';
import { Footer } from '~widgets/footer';
import { Header } from '~widgets/header';
import { Navigator } from '~widgets/navigator';

export function GenericLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-[1200px] mx-auto">
        <Outlet />
      </main>
      <Navigator />
      <Footer />
    </div>
  );
}

export function IntroLayout() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

export function ProtectedRoute({
  isAuthenticated,
  redirectPath = '/auth',
}: ProtectedRouteProps) {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
}
