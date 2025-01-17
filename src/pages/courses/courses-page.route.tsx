import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { CoursesPage } from './courses-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const coursesPageRoute: RouteObject = {
  path: pathKeys.course.root(),
  element: createElement(CoursesPage),
};
