import {
  useState,
  useEffect,
  useRef
} from 'react';
import stateSetter from 'lib/stateSetter';

const useMountedState = <T>(defaultState: T) => {
  const _isMounted = useRef(false);
  const [state, _setState] = useState(defaultState);
  const setState = new stateSetter().set<T>({
    _isMounted,
    _setState,
    // state
  });
  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);
  return { state, setState };
};

export default useMountedState;