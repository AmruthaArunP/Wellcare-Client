import { createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name : 'user',
  initialState : {
        data : {}
  },
  reducers: {
    setUserdata : (state , action ) => {
      console.log(action.payload);
      state.data = action.payload;
    }
  }
})

export const {setUserdata} = userSlice.actions;

export default userSlice.reducer;