//GETTING @reactjs/toolkit COMPONENTS
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//GETTING TOAST
import { toast } from "react-toastify";

//GETTING COMPONENTS FROM FIREBASE FILE
import { db } from "../../firebaseinit";

//GETTING COMPONENTS FROM FIREBASE/FIRESTORE
import {
  collection,
  getDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

//MAKING INITIAL STATE
const INITIAL_STATE = {
  contacts: [],
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetch",
  async (_, thunkAPI) => {
    try {
      const contactsCollection = collection(db, "contacts");

      // Set up the snapshot listener
      const unsubscribe = onSnapshot(contactsCollection, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          thunkAPI.dispatch(getChat(doc.data()));
        });
      });
      toast.success("Contacts Loaded");
    } catch (e) {
      console.log(e);
      toast.error("Failed to Load Contacts. Try Again");
    }
  }
);

export const sentMessage = createAsyncThunk(
  "contacts/sent",
  async ({ chat, contactID }, thunkAPI) => {
    try {
      const contactDocRef = doc(db, "contacts", contactID);

      // Fetch the existing chats
      const contactDocSnapshot = await getDoc(contactDocRef);
      const existingChats = contactDocSnapshot.data().chats || [];

      // Update the document with the new chat
      await updateDoc(contactDocRef, {
        chats: [...existingChats, chat],
        new: false,
        updated: Date.now(),
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
