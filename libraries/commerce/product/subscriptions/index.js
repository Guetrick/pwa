import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import { historyPop } from '@shopgate/pwa-common/actions/router';
import fetchProduct from '../actions/fetchProduct';
import fetchProductDescription from '../actions/fetchProductDescription';
import fetchProductProperties from '../actions/fetchProductProperties';
import fetchProductImages from '../actions/fetchProductImages';
import fetchProductShipping from '../actions/fetchProductShipping';
import fetchProductVariants from '../actions/fetchProductVariants';
import fetchProductOptions from '../actions/fetchProductOptions';
import fetchProductMedia from '../actions/fetchProductMedia';
import { productImageFormats } from '../collections';
import {
  productWillEnter$,
  productReceived$,
  cachedProductReceived$,
  productRelationsReceived$,
  receivedVisibleProduct$,
  visibleProductNotFound$,
} from '../streams';
import fetchProductsById from '../actions/fetchProductsById';
import { getProductRelationsByHash } from '../selectors/relations';
import { checkoutSucceeded$ } from '../../checkout/streams';
import expireProductById from '../action-creators/expireProductById';

/**
 * Product subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
function product(subscribe) {
  const processProduct$ = productReceived$.merge(cachedProductReceived$);

  subscribe(productWillEnter$, ({ action, dispatch }) => {
    const { productId } = action.route.params;
    const { productId: variantId } = action.route.state;
    const id = variantId || hex2bin(productId);

    dispatch(fetchProduct(id));
    dispatch(fetchProductDescription(id));
    dispatch(fetchProductProperties(id));
    dispatch(fetchProductImages(id, productImageFormats.getAllUniqueFormats()));
    dispatch(fetchProductShipping(id));
    dispatch(fetchProductMedia(id));
  });

  subscribe(processProduct$, ({ action, dispatch }) => {
    const {
      id,
      flags = {
        hasVariants: false,
        hasOptions: false,
      },
      baseProductId,
    } = action.productData;

    if (baseProductId) {
      dispatch(fetchProduct(baseProductId));
      dispatch(fetchProductImages(baseProductId, productImageFormats.getAllUniqueFormats()));
    }

    if (flags.hasVariants) {
      dispatch(fetchProductVariants(id));
    }

    if (flags.hasOptions) {
      dispatch(fetchProductOptions(id));
    }
  });

  const receivedVisibleProductDebounced$ = receivedVisibleProduct$.debounceTime(500);
  /** Refresh product data after getting cache version for PDP */
  subscribe(receivedVisibleProductDebounced$, ({ action, dispatch }) => {
    const { id } = action.productData;
    dispatch(fetchProduct(id, true));
  });

  /** Visible product is no more available */
  subscribe(visibleProductNotFound$, ({ action, dispatch }) => {
    dispatch(showModal({
      confirm: null,
      dismiss: 'modal.ok',
      title: 'modal.title_error',
      message: 'product.no_more_found',
      params: {
        name: action.productData.name,
      },
    }));
    dispatch(historyPop());
    dispatch(expireProductById(action.productData.id));
  });

  subscribe(productRelationsReceived$, ({ dispatch, getState, action }) => {
    const { hash } = action;
    const productIds = getProductRelationsByHash(hash)(getState());

    dispatch(fetchProductsById(productIds));
  });

  /**
   * Expire products after checkout, fetch updated data
   */
  subscribe(checkoutSucceeded$, ({ dispatch, action }) => {
    const { products } = action;

    const productIds = products.map(p => p.product.id);
    productIds.forEach(id => dispatch(expireProductById(id)));

    dispatch(fetchProductsById(productIds));
  });
}

export default product;
