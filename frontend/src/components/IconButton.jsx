import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function IconButton(props) {
  const { icon, className, ...rest } = props;
  const IconComponent = icon;

  return (
    <button className={classNames(['icon-btn', className])} {...rest}>
      {icon && <IconComponent />}
      {props.children}
    </button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.object,
  className: PropTypes.string,
};
IconButton.defaultProps = {
  icon: null,
  className: '',
};

export default IconButton;
