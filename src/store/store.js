import { legacy_createStore as createStore } from 'redux'

import { blockReducer } from './block.reducer'


const rootReducer = blockReducer;

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined;
export const store = createStore(rootReducer, middleware);


