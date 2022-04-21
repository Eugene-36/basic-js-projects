const defaultValue = {
  count: 0,
};

export const INCREMENT = 'INCREMENT';
export const ASYNC_INCREMENT = 'ASYNC_INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ASYNC_DECREMENT = 'ASYNC_DECREMENT';

export default function counterReducer(state = defaultValue, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };

    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

export const incrementCreator = () => ({ type: INCREMENT });
export const decrementorCreator = () => ({ type: DECREMENT });
export const asyncIncrementor = () => ({ type: ASYNC_INCREMENT });
export const asyncDecrementor = () => ({ type: ASYNC_DECREMENT });
