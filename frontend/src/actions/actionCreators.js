import {
  CHANGE_SERVICE_FIELD,
  INVALIDATE_SERVICE_FIELD,
  FETCH_SERVICE_REQUEST,
  FETCH_SERVICE_FAILURE,
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  SUBMIT_SERVICE_REQUEST,
  SUBMIT_SERVICE_FAILURE,
  SUBMIT_SERVICE_SUCCESS,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_FAILURE,
  REMOVE_SERVICE_SUCCESS,
} from './actionTypes';

export const fetchServiceRequest = () => ({
  type: FETCH_SERVICE_REQUEST,
});

export const fetchServiceFailure = (error) => ({
  type: FETCH_SERVICE_FAILURE,
  payload: { error },
});

export const fetchServiceSuccess = (item) => ({
  type: FETCH_SERVICE_SUCCESS,
  payload: {
    item,
  },
});

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = (error) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: { error },
});

export const fetchServicesSuccess = (items) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const submitServiceRequest = (item) => ({
  type: SUBMIT_SERVICE_REQUEST,
  payload: { ...item },
});

export const submitServiceFailure = (error) => ({
  type: SUBMIT_SERVICE_FAILURE,
  payload: { error },
});

export const submitServiceSuccess = () => ({
  type: SUBMIT_SERVICE_SUCCESS,
});

export const removeServiceRequest = (id) => ({
  type: REMOVE_SERVICE_REQUEST,
  payload: { id },
});

export const removeServiceFailure = (id, error) => ({
  type: REMOVE_SERVICE_FAILURE,
  payload: { id, error },
});

export const removeServiceSuccess = (id) => ({
  type: REMOVE_SERVICE_SUCCESS,
  payload: { id },
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: { name, value },
});

export const invalidateServiceField = (name) => ({
  type: INVALIDATE_SERVICE_FIELD,
  payload: { name },
});

export const fetchService = async (dispatch, id) => {
  dispatch(fetchServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchServiceSuccess(data));
  } catch (e) {
    dispatch(fetchServiceFailure(e.message));
  }
}

export const fetchServices = async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
}

export const submitService = async (dispatch, history, item) => {
  dispatch(submitServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item.id ? item : { ...item, id: 0 }),
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(submitServiceSuccess());

    history.goBack();
  } catch (e) {
    dispatch(submitServiceFailure(e.message));
  }
}

export const removeService = async (dispatch, id) => {
  dispatch(removeServiceRequest(id));
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(removeServiceSuccess(id));
  } catch (e) {
    dispatch(removeServiceFailure(id, e.message));
  }
}
