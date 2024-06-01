import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_SUCCESS,
  REMOVE_SERVICE_FAILURE,
} from '../actions/actionTypes'

const initialState = {
  items: [],
  loading: false,
  error: null,
  removing: false,
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICES_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case FETCH_SERVICES_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    }

    case FETCH_SERVICES_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        items,
        loading: false,
        error: null,
      };
    }

    case REMOVE_SERVICE_REQUEST: {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          (item.id === id)
            ? { ...item, removing: true, error: null }
            : item
        ),
      };
    }

    case REMOVE_SERVICE_SUCCESS: {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => (item.id !== id)),
      };
    }

    case REMOVE_SERVICE_FAILURE: {
      const { id, error } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          (item.id === id)
            ? { ...item, removing: false, error }
            : item
        ),
      };
    }

    default:
      return state;
  }
}
