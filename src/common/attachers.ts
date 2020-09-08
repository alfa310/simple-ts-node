export function attachFor0<T, K>(
  attachArg: T,
  fn: (attachedParameter: T) => Promise<K>
): () => Promise<K> {
  return async function _attachedFn() {
    const result = await fn(attachArg);
    return result;
  };
}

export function attachFor1<T, K, L>(
  attachArg: T,
  fn: (attachedParameter: T, arg1: K) => Promise<L>
): (arg1: K) => Promise<L> {
  return async function _attachedFn(arg1: K) {
    const result = await fn(attachArg, arg1);
    return result;
  };
}

export function attachFor2<T, K, L, M>(
  attachArg: T,
  fn: (attachedParameter: T, arg1: K, arg2: L) => Promise<M>
): (arg1: K, arg2: L) => Promise<M> {
  return async function _attachedFn(arg1: K, arg2: L) {
    const result = await fn(attachArg, arg1, arg2);
    return result;
  };
}

export function actionFor0<T>(
  startAction: () => void,
  endAction: () => void,
  errorAction: () => void,
  fn: () => Promise<T>
): () => Promise<T> {
  return async function _attachedFn() {
    try {
      startAction();
      const result = await fn();
      endAction();
      return result;
    } catch (error) {
      errorAction();
      throw error;
    }
  };
}

export function actionFor1<T, K>(
  startAction: () => void,
  endAction: () => void,
  errorAction: () => void,
  fn: (arg1: K) => Promise<T>
): (arg1: K) => Promise<T> {
  return async function _attachedFn(arg1: K) {
    try {
      startAction();
      const result = await fn(arg1);
      endAction();
      return result;
    } catch (error) {
      errorAction();
      throw error;
    }
  };
}

export function actionFor2<T, K, L>(
  startAction: () => void,
  endAction: () => void,
  errorAction: () => void,
  fn: (arg1: T, arg2: K) => Promise<L>
): (arg1: T, arg2: K) => Promise<L> {
  return async function _attachedFn(arg1: T, arg2: K) {
    try {
      startAction();
      const result = await fn(arg1, arg2);
      endAction();
      return result;
    } catch (error) {
      errorAction();
      throw error;
    }
  };
}

export function actionFor3<T, K, L, M>(
  startAction: () => void,
  endAction: () => void,
  errorAction: () => void,
  fn: (arg1: T, arg2: K, arg3: M) => Promise<L>
): (arg1: T, arg2: K, arg3: M) => Promise<L> {
  return async function _attachedFn(arg1: T, arg2: K, arg3: M) {
    try {
      startAction();
      const result = await fn(arg1, arg2, arg3);
      endAction();
      return result;
    } catch (error) {
      errorAction();
      throw error;
    }
  };
}
