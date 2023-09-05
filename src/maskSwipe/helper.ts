
export const reducer = (
  state: MaskReducerStates,
  action: MaskReducerActions
) => {
  switch (action.type) {
    case 'rotate-index-list': {
      let cloneListIndex = [...state.indexList];
      let last = 0;
      let len = state.indexList.length;
      for (let i = 0; i < len; i++) {
        let temp = cloneListIndex[i];
        if (i === 0) {
          cloneListIndex[i] = cloneListIndex[len - 1];
        } else {
          cloneListIndex[i] = last;
        }
        last = temp;
      }
      return {
        ...state,
        indexList: cloneListIndex,
      };
    }
    case 'change-current-index':
    case 'change-trans-index': {
      return {
        ...state,
        [action.value]:
          state[action.value as keyof MaskReducerStates] ===
          state.indexList.length - 1
            ? 0
            : state[
                action.value as keyof Pick<MaskReducerStates, 'transIndex'>
              ] + 1,
      };
    }
    case 'update-animate': {
      return {
        ...state,
        updateAnimate: Boolean(action.value),
      };
    }
    default:
      return state;
  }
};
export const directionMap = {
  center: 'center',
  left: 'start',
  right: 'end',
};
