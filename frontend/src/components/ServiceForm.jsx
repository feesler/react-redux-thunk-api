import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import {
  changeServiceField,
  invalidateServiceField,
  submitService,
  fetchService,
} from '../actions/actionCreators';
import Spinner from './Spinner';

function ServiceForm() {
  const { id } = useParams();
  let history = useHistory();
  const {
    item,
    validation,
    loading,
    error,
    submitting,
    submitError,
  } = useSelector(state => state.serviceForm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetchService(dispatch, id);
    }
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeServiceField(name, value));
  };

  const handleCancel = () => {
    history.goBack();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item.name.length) {
      dispatch(invalidateServiceField('name'));
      return;
    }

    const price = Number(item.price);
    if (!price) {
      dispatch(invalidateServiceField('price'));
      return;
    }

    submitService(dispatch, history, item);
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error-message">Something went wrong. Try again later</div>
    );
  }

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      <h2 className="service-form__title">Сервис</h2>
      <div className="form-field">
        <label htmlFor="productFormName" className="form-label">Название</label>
        <input
          id="productFormName"
          className={classNames('form-control', { 'is-invalid': !validation.name })}
          name="name"
          type="text"
          disabled={submitting}
          onChange={handleChange}
          value={item.name}
        />
        <span className="invalid-feedback">Название не может быть пустым</span>
      </div>
      <div className="form-field">
        <label htmlFor="serviceFormPrice" className="form-label">Стоимость</label>
        <input
          id="serviceFormPrice"
          className={classNames('form-control', { 'is-invalid': !validation.price })}
          name="price"
          type="text"
          disabled={submitting}
          onChange={handleChange}
          value={item.price}
        />
        <span className="invalid-feedback">Цена должна быть положительным числом</span>
      </div>
      <div className="form-field">
        <label htmlFor="serviceFormDescription" className="form-label">Описание</label>
        <input
          id="serviceFormDescription"
          className="form-control"
          name="content"
          type="text"
          disabled={submitting}
          onChange={handleChange}
          value={item.content}
        />
      </div>

      <div className="form-footer">
        <input
          className="btn btn-secondary"
          type="button"
          disabled={submitting}
          onClick={handleCancel}
          value="Отмена"
        />
        <input
          className={classNames(
            'btn btn-primary',
            { 'btn-striped': submitting }
          )}
          type="submit"
          value="Сохранить"
        />
      </div>

      { submitError && <div className="error-message">Something went wrong. Try again</div>}
    </form>
  );
}

export default ServiceForm;
