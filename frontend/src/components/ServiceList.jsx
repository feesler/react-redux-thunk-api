import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { removeService, fetchServices } from '../actions/actionCreators';
import Spinner from './Spinner';
import ServiceItem from './ServiceItem';

function ServiceList(props) {
  const { items, loading, error } = useSelector(state => state.serviceList);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    fetchServices(dispatch);
  }, [dispatch]);

  const handleUpdate = (id) => {
    history.push(`/services/${id}`);
  }

  const handleRemove = (id) => {
    removeService(dispatch, id);
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error-message">Something went wrong try again</div>
    );
  }

  return (
    <div className="service-list">
      <Link to="/services/new" className="btn btn-outline-primary mb-2">Add new</Link>
      { !items.length && <span className="empty-list-message">No services</span>}
      <ul className="list-group">
        {items.map((item) => (
          <ServiceItem
            key={item.id}
            {...item}
            onUpdate={handleUpdate}
            onDelete={handleRemove}
          />
        ))}
      </ul>
    </div>
  );
}

export default ServiceList
