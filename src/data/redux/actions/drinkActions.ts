import {  createAsyncThunk } from '@reduxjs/toolkit';
import FirebaseDBService from '../../../databases/FirebaseDBService';
import FirebaseCollection from '../../../types/FirebaseCollection';
import { DrinkItem } from '../../../models/DrinkEntity';

const DBURL = FirebaseCollection.DRINKS;

export const fetchDrinks = createAsyncThunk('drinks/fetchDrinks', async () : Promise<DrinkItem[]> => {
    const data = await new FirebaseDBService().readData(DBURL);
    if(!data) return [] as DrinkItem[];
    return data.map(d => DrinkItem.fromJson(JSON.stringify(d)));
  });
