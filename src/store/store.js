//GETTING @reduxjs/toolkit COMPONENTS
import { configureStore } from "@reduxjs/toolkit";

//GETTING ALL REDUCERS
// import { productReducer } from "./reducers/productReducer";
// import { authReducer } from "./reducers/authReducer";
// import { cartReducer } from "./reducers/cartReducer";
import { contactReducer } from "./reducers/contactReducer";

//MAKING AND EXPORT STORE INSIDE ALL REDUCERS
export const store = configureStore({
  reducer: {
    contactReducer,
    // authReducer,
    // cartReducer,
    // orderReducer,
  },
});
