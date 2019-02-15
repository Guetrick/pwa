import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { PROCESS_SEQUENTIAL } from '@shopgate/pwa-core/constants/ProcessTypes';
import { logger } from '@shopgate/pwa-core/helpers';
import * as pipelines from '../constants/Pipelines';
import PipelineErrorList from '../helpers/PipelineErrorList';
import { ECART } from '../constants/PipelineErrors';
import deleteProducts from '../action-creators/deleteProductsFromCart';
import successDeleteProductsFromCart from '../action-creators/successDeleteProductsFromCart';
import errorDeleteProductsFromCart from '../action-creators/errorDeleteProductsFromCart';
import { messagesHaveErrors } from '../helpers';

/**
 * Deletes products from the cart.
 * @param {Array} cartItemIds The IDs of the items to remove from the cart.
 * @return {Function} A redux thunk.
 */
const deleteProductsFromCart = cartItemIds => (dispatch) => {
  dispatch(deleteProducts(cartItemIds));

  const request = new PipelineRequest(pipelines.SHOPGATE_CART_DELETE_PRODUCTS);
  request.setInput({ cartItemIds })
    .setResponseProcessed(PROCESS_SEQUENTIAL)
    .setErrorBlacklist(ECART)
    .dispatch()
    .then(({ messages }) => {
      /**
       * @Deprecated: The property "messages" is not supposed to be part of the pipeline response.
       * Specification demands errors to be returned as response object with an "error" property.
       * This code snippet needs to be removed after fixing the `@shopgate/legacy-cart` extension.
       */
      if (messages && messagesHaveErrors(messages)) {
        dispatch(errorDeleteProductsFromCart(cartItemIds, messages));
      }

      dispatch(successDeleteProductsFromCart());
    })
    .catch((error) => {
      dispatch(errorDeleteProductsFromCart(
        cartItemIds,
        PipelineErrorList(pipelines.SHOPGATE_CART_DELETE_PRODUCTS, error)
      ));
      logger.error(pipelines.SHOPGATE_CART_DELETE_PRODUCTS, error);
    });
};

export default deleteProductsFromCart;
