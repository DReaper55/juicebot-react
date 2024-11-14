import { createSlice } from '@reduxjs/toolkit';
import { fetchDrinks } from '../actions/drinkActions';
import { DrinkItem } from '../../../models/DrinkEntity';

const drinkSlice = createSlice({
    name: 'drinks',
    initialState: { list: [] as DrinkItem[], loading: false, error: null },
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchDrinks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
    }
  });
  
  export default drinkSlice.reducer;