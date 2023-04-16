import { createSlice } from "@reduxjs/toolkit";

const userList = [
  {
    id: 1,
    name: "user1",
    email: "user1@gmail.com",
  },
  {
    id: 2,
    name: "user2",
    email: "user2@gmail.com",
  },
  {
    id: 3,
    name: "user3",
    email: "user3@gmail.com",
  },
];

const userSlice = createSlice({
  name: "user",
  initialState: userList,
  reducers: {
    addUser: (state, action) => {
      return [...state, action.payload];
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    editUser: (state, action) => {
      const target = action.payload;
      const uu = state.find((user) => user.id === target.id);
      if (uu) {
        uu.name = target.name;
        uu.email = target.email;
      }
    },
  },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;
