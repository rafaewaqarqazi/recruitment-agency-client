import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import * as jobs from "./ducks/jobs.duck";
import { metronic } from "../../_metronic";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  jobs: jobs.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
