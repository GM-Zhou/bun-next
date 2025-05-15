import { useSyncExternalStore } from 'react';

import { isFn } from '@/utils/type';

type Selector<T, R> = (state: T) => R;
type Listener = () => void;
type StateParams<T> = Partial<T> | ((state: T) => Partial<T>);
type SetState<T> = (params: StateParams<T>) => void;
type FnState<T> = (set: SetState<T>) => T;

export const createStore = <T extends object>(initialState: T | FnState<T>) => {
  let state: T;

  const isFnInitialState = isFn(initialState);

  const getState = () => state;

  const setState: SetState<T> = (params) => {
    const nextState = isFn(params) ? params(state) : params;
    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const originState = isFnInitialState ? initialState(setState) : initialState;

  const listeners = new Set<Listener>();

  state = originState;

  const api = { getState, setState, subscribe };

  const useStore = <R>(selector: Selector<T, R>): R => {
    return useSyncExternalStore(
      api.subscribe,
      () => selector(api.getState()),
      () => selector(originState)
    );
  };

  return { ...api, useStore };
};
