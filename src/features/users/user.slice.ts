import { createSlice } from '@reduxjs/toolkit'
// import { fetchProducts } from '@/src/services/thunk.service'

export const productSlice = createSlice({
    name: 'products',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(fetchProducts.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchProducts.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const newProducts = Array.isArray(action.payload) ? action.payload : [];
            //     state.data = [...state.data, ...newProducts];
            // })
            // .addCase(fetchProducts.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // });
    },
})

export default productSlice.reducer;