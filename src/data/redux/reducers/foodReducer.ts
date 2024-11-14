import { createSlice } from '@reduxjs/toolkit';
import { fetchFoods } from '../actions/foodActions';
import { FoodItem } from '../../../models/FoodEntity';

const foodSlice = createSlice({
    name: 'foods',
    initialState: { list: [] as FoodItem[], loading: false },
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchFoods.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
    }
  });
  
  export default foodSlice.reducer;