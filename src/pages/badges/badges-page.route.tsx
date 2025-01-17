import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { BadgesPage } from './badges-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const badgesPageRoute: RouteObject = {
  path: pathKeys.profile.badges(),
  element: createElement(BadgesPage),
};
