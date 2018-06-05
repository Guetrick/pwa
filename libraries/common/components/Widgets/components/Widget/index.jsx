import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../../../Grid';
import styles from './style';
import shouldShowWidget from '../../helpers/shouldShowWidget';
/**
 * The widget component.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
const Widget = (props) => {
  if (!props.component) {
    return null;
  }
  const {
    col,
    row,
    height,
    settings,
    width,
  } = props.config;

  const visible = shouldShowWidget(settings);

  return (
    <Grid.Item
      className={styles.widgetCell({
        col,
        row,
        height,
        width,
        visible,
      })}
      component="div"
    >
      <div >
        {React.createElement(props.component, {
          settings,
          ratio: [width, height],
        })}
      </div>
    </Grid.Item>
  );
};

Widget.propTypes = {
  config: PropTypes.shape().isRequired,
  component: PropTypes.func,
};

Widget.defaultProps = {
  component: null,
};

export default Widget;
