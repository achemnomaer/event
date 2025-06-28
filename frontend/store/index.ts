import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { eventsApi } from "./services/eventsApi";
import { registrationApi } from "./services/registrationApi";
import { contactApi } from "./services/contactApi";
import { coursesApi } from "./services/coursesApi";

export const store = configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(
      eventsApi.middleware,
      registrationApi.middleware,
      contactApi.middleware,
      coursesApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
