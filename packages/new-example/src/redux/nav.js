const HIDE = '@NAV/HIDE';
const SHOW = '@NAV/SHOW';

const initialState = {
  show: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case HIDE:
      return {
        ...state,
        show: false,
      };
    case SHOW:
      return {
        ...state,
        show: true,
      };
    default:
      return state;
  }
}

export function hide() {
  return {
    type: HIDE,
  };
}

export function show() {
  return {
    type: SHOW,
  };
}
