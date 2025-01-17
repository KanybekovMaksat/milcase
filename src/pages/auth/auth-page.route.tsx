import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { AuthPage } from './auth-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const authPageRoute: RouteObject = {
  path: pathKeys.login(),
  element: createElement(AuthPage),
};
