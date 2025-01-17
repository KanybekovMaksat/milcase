import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { RankingPage } from './ranking-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const rankingPageRoute: RouteObject = {
  path: pathKeys.ranking(),
  element: createElement(RankingPage),
};
