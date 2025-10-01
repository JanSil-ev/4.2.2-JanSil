// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import ky from 'ky';
// import { CardsItem } from '@/types';

// interface initialStateType {
//   data: CardsItem[];
//   isLoading: boolean;
// }
// const initialState: initialStateType = {
//   data: [],
//   isLoading: false,
// };

// export const fetchProducts = createAsyncThunk('product/fetchCards', async () => {
//   const productFetcth = await ky.get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');
//   const json = productFetcth.json()
//   console.log(productFetcth)
//     console.log(json)
    

//   // (await json) as CardsItem[]
//   return (await json) as CardsItem[];
// });

// const productsSlice = createSlice({
//   name: 'Products',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(
//         fetchProducts.fulfilled,
//         (state, action: PayloadAction<initialStateType['data']>) => {
//           state.isLoading = false;
//           state.data = action.payload;
//         }
//       )
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.isLoading = false;
//       });
//   },
// });

// export default productsSlice.reducer;


import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ky from 'ky';
import { CardsItem } from '@/types';

interface initialStateType {
  data: CardsItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'product/fetchCards', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await ky.get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');
      const json = await response.json() as CardsItem[];
      return json;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<CardsItem[]>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;