/**
 * @overview Reducer index
 * Combines reducers and exports
 */
import { combineReducers } from "redux";
import layout from "../reducers/layout";
import getReducers from "../reducers/get-plugin-reducers";
import plugins from "../reducers/plugins";
import theme from "../reducers/theme";

// Get reducers from plugins & combine with our reducers
const reducers = getReducers();
const rootReducer = combineReducers({
  ...reducers,
  layout,
  plugins,
  theme,
});

export default rootReducer;
