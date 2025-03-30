import { useSyncExternalStore } from 'react';

type Selector<T, R> = (state: T) => R;
type Listener = () => void;

export const createStore = <T extends object>(initialState: T | ((set: Function) => T)) => {
  let state;
  const listeners = new Set<Listener>();

  const api = {
    getState: () => state,
    setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => {
      const nextState = typeof partial === 'function' ? partial(state) : partial;
      if (!Object.is(state, nextState)) {
        state = { ...state, ...nextState };
        listeners.forEach((listener) => {
          listener();
        });
      }
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };

  state = initialState(api.setState) as T;

  const useStore = <R>(selector: Selector<T, R>): R => {
    const slice = useSyncExternalStore(
      api.subscribe,
      () => selector(api.getState()),
      () => selector(initialState)
    );
    return slice;
  };

  return Object.assign(useStore, api);
};
