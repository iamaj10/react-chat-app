//GETTING @reactjs/toolkit COMPONENTS
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//GETTING TOAST
import { toast } from "react-toastify";

//GETTING ACTION FROM CART REDUCER
// import { setCart } from "./cartReducer";

//GETTING COMPONENTS FROM FIREBASE FILE
import { db } from "../../firebaseinit";

//GETTING COMPONENTS FROM FIREBASE/FIRESTORE
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

//MAKING INITIAL STATE
const INITIAL_STATE = {
  contacts: [],
};

//purchase
// export const purchase = createAsyncThunk(
//   "orders/purchase",
//   async ({ carts, orders }, thunkAPI) => {
//     //setting date for order
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth() + 1;
//     const date = currentDate.getDate();

//     const orderDate = `${date.toString()}/${month.toString()}/${year.toString()}`;

//     //make order in object
//     const newOrder = { date: orderDate, order: carts };
//     //set order in order array
//     thunkAPI.dispatch(checkOut(newOrder));
//     toast.success("Item Purchased");

//     //set updated order to database also
//     const updatedOrders = [...orders, newOrder];
//     const users = collection(db, "users");
//     const querySnapshot = await getDocs(users);
//     querySnapshot.forEach(async (user) => {
//       const userId = user.id;
//       const useRef = doc(db, "users", userId);
//       await updateDoc(useRef, {
//         orders: updatedOrders,
//         carts: [],
//       });
//     });

//     //set cart empty after order purchased
//     thunkAPI.dispatch(setCart([]));
//   }
// );

export const fetchContacts = createAsyncThunk(
  "chats/fetch",
  async ({ contactID }, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        thunkAPI.dispatch(getChat(doc.data()));
      });
    } catch (e) {
      console.log(e);
    }
  }
);

// Reducer
const contactsSlice = createSlice({
  name: "chats",
  initialState: INITIAL_STATE,
  reducers: {
    // setOrders: (state, action) => {
    //   state.orders = action.payload;
    // },
    // checkOut: (state, action) => {
    //   state.orders.push(action.payload);
    // },
    getChat: (state, action) => {
      const newContact = action.payload;

      // Check if the chat with the same ID already exists
      const existingChatIndex = state.contacts.findIndex(
        (contact) => contact.id === newContact.id
      );

      if (existingChatIndex === -1) {
        // If not present, add the new chat to the state
        state.contacts.push(newContact);
      } else {
        // If present, update the existing chat
        state.contacts[existingChatIndex] = newContact;
      }
    },
    sentChat: (state, action) => {
      state.contacts.push(action.payload);
    },
  },
});
//export reducer
export const contactReducer = contactsSlice.reducer;
//export actions
export const { getChat, sentChat } = contactsSlice.actions;
//export selector(states)
export const contactSelector = (state) => state.contactReducer;
