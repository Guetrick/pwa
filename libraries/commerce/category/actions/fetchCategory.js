import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import { shouldFetchData } from '@shopgate/pwa-common/helpers/redux';
import { ERROR_HANDLE_SUPPRESS } from '@shopgate/pwa-core/constants/ErrorHandleTypes';
import * as pipelines from '../constants/Pipelines';
import fetchCategoryChildren from './fetchCategoryChildren';
import requestCategory from '../action-creators/requestCategory';
import receiveCategory from '../action-creators/receiveCategory';
import errorCategory from '../action-creators/errorCategory';

/**
 * Fetches the data for a given category ID (including child categories).
 * @param {string} categoryId The category ID.
 * @return {Function} The dispatched action.
 */
const fetchCategory = categoryId => (dispatch, getState) => {
  const state = getState();
  const category = state.category.categoriesById[categoryId];

  if (!shouldFetchData(category)) {
    /**
     * Child categories are maybe missing.
     * So we need to check it (check happens inside fetchCategoryChildren).
     * This is the case if we got categories from getRootCategory
    */
    if (category.childrenCount) {
      dispatch(fetchCategoryChildren(categoryId));
    }

    return Promise.resolve(category);
  }

  // No data at all. So we have the fetch the category with children included
  dispatch(requestCategory(categoryId));

  return new PipelineRequest(pipelines.SHOPGATE_CATALOG_GET_CATEGORY)
    .setInput({
      categoryId,
      includeChildren: true,
    })
    .setHandleErrors(ERROR_HANDLE_SUPPRESS)
    .dispatch()
    .then(result => dispatch(receiveCategory(categoryId, result, (result.children || []))))
    .catch((error) => {
      logger.error(error);
      dispatch(errorCategory(categoryId, error.code));
    });
};

export default fetchCategory;
