import {
  CHANGE_SERVICE_FIELD,
  INVALIDATE_SERVICE_FIELD,
  FETCH_SERVICE_REQUEST,
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_FAILURE,
  SUBMIT_SERVICE_REQUEST,
  SUBMIT_SERVICE_FAILURE,
  SUBMIT_SERVICE_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
  item: { name: '', price: '', content: '' },
  validation: { name: true, price: true },
  loading: false,
  error: null,
  submitResult: null,
  submitting: false,
  submitError: null,
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICE_SUCCESS: {
      const { item } = action.payload;
      return {
        ...state,
        item,
        loading: false,
        error: null,
      };
    }

    case FETCH_SERVICE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case SUBMIT_SERVICE_REQUEST: {
      return {
        ...state,
        submitResult: null,
        submitting: true,
        submitError: null,
      };
    }

    case FETCH_SERVICE_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    }

    case SUBMIT_SERVICE_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        submitting: false,
        submitError: error,
      };
    }

    case SUBMIT_SERVICE_SUCCESS: {
      return {
        ...initialState,
        submitResult: true,
      };
    }

    case CHANGE_SERVICE_FIELD: {
      const { name, value } = action.payload;
      const { item, validation } = state;
      return {
        ...state,
        item: {
          ...item,
          [name]: value,
        },
        validation: {
          ...validation,
          [name]: true,
        },
      };
    }

    case INVALIDATE_SERVICE_FIELD: {
      const { name } = action.payload;
      const { validation } = state;
      return {
        ...state,
        validation: {
          ...validation,
          [name]: false,
        },
      };
    }

    default:
      return state;
  }
}
