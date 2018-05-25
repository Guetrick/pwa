import { createSelector } from 'reselect';
import { PAGE_ID_INDEX } from '@shopgate/pwa-common/constants/PageIDs';
import { INDEX_PATH, PAGE_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { getCurrentRoute } from '@shopgate/pwa-common/selectors/router';

export const getCurrentPageId = createSelector(
  getCurrentRoute,
  (route) => {
    if (!route) {
      return null;
    }

    if (route.pathname === INDEX_PATH) {
      return PAGE_ID_INDEX;
    }

    if (route.params.pageId) {
      return route.params.pageId;
    }

    return null;
  }
);
