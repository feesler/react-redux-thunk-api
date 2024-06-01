import React from 'react';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import Spinner from './Spinner';
import { ReactComponent as UpdateIcon } from '../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/close.svg';

const ServiceItem = (props) => {
  const { id, name, price, removing, error, onUpdate, onDelete } = props;

  return (
    <li className="list-group-item">
      <div className="service-item">
        <span className="service-item__name">{name}</span>
        <span className="service-item__price">{price}</span>
        <div className="service-item__controls">
          {!removing && <IconButton icon={UpdateIcon} onClick={() => onUpdate(id)} />}
          {(removing && !error)
            ? <IconButton className="spinner-btn"><Spinner className="spinner-border-sm" /></IconButton>
            : <IconButton icon={DeleteIcon} onClick={() => onDelete(id)} />
          }
        </div>
      </div>
      { error && <span className="service-item__error">Error. Try again later.</span>}
    </li>
  );
}

ServiceItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  removing: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

ServiceItem.defaultProps = {
  removing: false,
};

export default ServiceItem;
