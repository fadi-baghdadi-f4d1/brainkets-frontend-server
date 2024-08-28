import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Designation {
  id: number;
  name: string;
}

interface UserState {
  id: string | null;
  userName: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string;
  image: string | null;
  role: string;
  birthDate: string | null;
  accessToken: string;
  language: number | null;
  notificationsEnabled: boolean;
  clockInTime: string | null;
  projectsCount: number;
  openTasksCount: number;
  hrsLog: number;
  singlePersonalProjectId: string | null;
  leaves: any[];
  designation: Designation | null;
  isLoggedIn: boolean;
}

// Define the initial state
const defaultState: UserState = {
  id: null,
  userName: '',
  firstName: '',
  lastName: '',
  email: null,
  phoneNumber: '',
  image: null,
  role: '',
  birthDate: null,
  accessToken: '',
  language: null,
  notificationsEnabled: false,
  clockInTime: null,
  projectsCount: 0,
  openTasksCount: 0,
  hrsLog: 0,
  singlePersonalProjectId: null,
  leaves: [],
  designation: null,
  isLoggedIn: false,
};

// Rehydrate state from localStorage
const persistedUserState = typeof window !== 'undefined' ? localStorage.getItem('userState') : null;
const initialState: UserState = persistedUserState ? JSON.parse(persistedUserState) : defaultState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
  Object.assign(state, action.payload);
  state.isLoggedIn = true;
},
clearUser: (state) => {
  Object.assign(state, defaultState);
},
},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
