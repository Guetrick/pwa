import { PRODUCT, BEFORE, AFTER } from '@shopgate/pwa-common-commerce/product/constants/Portals';

// CONTENTS
const FULFILLMENT_SELECTOR = 'fulfillment-selector';
const LOCATION_STOCK_INFO = 'location-stock-info';

/* PRODUCT DETAILS */

// FULFILLMENT SELECTOR
export const PRODUCT_FULFILLMENT_SELECTOR_BEFORE = `${PRODUCT}.${FULFILLMENT_SELECTOR}.${BEFORE}`;
export const PRODUCT_FULFILLMENT_SELECTOR = `${PRODUCT}.${FULFILLMENT_SELECTOR}`;
export const PRODUCT_FULFILLMENT_SELECTOR_AFTER = `${PRODUCT}.${FULFILLMENT_SELECTOR}.${AFTER}`;

// LOCATION STOCK INFO
export const PRODUCT_LOCATION_STOCK_INFO_BEFORE = `${PRODUCT}.${LOCATION_STOCK_INFO}.${BEFORE}`;
export const PRODUCT_LOCATION_STOCK_INFO = `${PRODUCT}.${LOCATION_STOCK_INFO}`;
export const PRODUCT_LOCATION_STOCK_INFO_AFTER = `${PRODUCT}.${LOCATION_STOCK_INFO}.${AFTER}`;
