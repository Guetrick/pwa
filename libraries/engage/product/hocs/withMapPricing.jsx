/* eslint-disable react/prop-types */
import React from 'react';
import TimeBoundary from '../../components/TimeBoundary';
import { useWidgetSettings } from '../../core';

/**
 * @param {Function|React.Component} PriceComponent price component with product price shape
 * @returns {Function}
 */
const withMapPricing = PriceComponent => (props) => {
  const settings = useWidgetSettings('@shopgate/engage/product/MapPrice');

  if (!settings.show) {
    return <PriceComponent {...props} />;
  }

  // price is null OR no map pricing
  if (!props.price || !props.price.mapPricing) {
    return <PriceComponent {...props} />;
  }

  // Show original when map is equal or less
  if (props.price.unitPrice >= props.price.mapPricing.price) {
    return <PriceComponent {...props} />;
  }

  return (
    <TimeBoundary
      start={new Date(props.price.mapPricing.startDate)}
      end={new Date(props.price.mapPricing.endDate)}
    >
      {({ between }) => {
        if (!between) {
          return <PriceComponent {...props} />;
        }
        return (
          <PriceComponent
            {...props}
            price={{
              ...props.price,
              unitPriceStriked: props.price.mapPricing.price,
            }}
          />
        );
      }}
    </TimeBoundary>
  );
};

export default withMapPricing;
/* eslint-enable react/prop-types */
