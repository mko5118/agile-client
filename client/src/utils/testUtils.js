import { createStore, applyMiddleware } from 'redux';
import { middlewares } from '../redux/store';
import { rootReducer } from '../redux/root-reducer';

import configureStore from 'redux-mock-store';

/**
 * Return node(s) with the given 'test-attr' attribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} val - Value of 'test-attr' for search 
 * @returns {ShallowWrapper} 
 */

export const findByTestAttribute = (wrapper, val) => {
  return wrapper.find(`[test-attr="${val}"]`);
};

/**
 * Create a test store with imported reducers, middleware and initial state
 * Global Imports: rootReducer, middlewares
 * @function storeFactory
 * @param {object} initialState - Initial state for store
 * @returns {Store} - Redux store
 */

// export const storeFactory = (initialState) => {
//   return createStore(rootReducer, applyMiddleware(...middlewares), initialState);
// };

export const storeFactory = configureStore(middlewares);