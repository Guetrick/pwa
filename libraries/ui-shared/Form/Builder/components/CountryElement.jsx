import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from '../../Select';

/**
 * React component that takes the element and additional data and renders a select box
 * with a list of countries to select from.
 * @returns {JSX}
 */
class CountryElement extends PureComponent {
  static propTypes = {
    element: PropTypes.shape().isRequired,
    errorText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    countryList: PropTypes.shape(),
    style: PropTypes.shape(),
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
      PropTypes.number.isRequired,
    ]),
  };

  static defaultProps = {
    countryList: {},
    value: '',
    style: { fields: '' },
  };

  /**
   * @returns {JSX}
   */
  render() {
    const {
      countryList,
      element,
      errorText,
      name,
      style,
      value,
    } = this.props;

    return (
      <Select
        name={name}
        className={style.fields}
        label={element.label}
        placeholder={element.placeholder}
        value={value}
        options={countryList}
        onChange={element.handleChange}
        errorText={errorText}
        isControlled
        translateErrorText={false}
      />
    );
  }
}

export default CountryElement;
