import { MutableRefObject, Dispatch, SetStateAction } from 'react';

interface stateSetterParams {
  _setState: Dispatch<SetStateAction<any>>,
  _isMounted: MutableRefObject<boolean>
}

class stateSetter {
  cache = {};
  timeout = 0;
  set = <T>(
    params: stateSetterParams
    // & {
    //   state: T
    // }
  ) => <K extends keyof T>(newState: {
    [P in K]: T[P]
  }): void => {
    const {
      _isMounted,
      _setState
    } = params;
    this.cache = {
      ...this.cache,
      ...newState
    };
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      _isMounted.current && _setState((prevState: T) => ({
        ...prevState,
        ...this.cache
      }));
      this.cache = {};
    });
  };
}

export default stateSetter;