import {  createAsyncThunk } from '@reduxjs/toolkit';
import FirebaseDBService from '../../../databases/FirebaseDBService';
import FirebaseCollection from '../../../types/FirebaseCollection';
import { FoodItem } from '../../../models/FoodEntity';

const DBURL = FirebaseCollection.FOODS;

export const fetchFoods = createAsyncThunk('foods/fetchFoods', async () : Promise<FoodItem[]> => {
    const data = await new FirebaseDBService().readData(DBURL);
    if(!data) return [] as FoodItem[];
    return data.map(d => FoodItem.fromJson(JSON.stringify(d)));
  });
