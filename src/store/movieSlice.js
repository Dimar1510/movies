import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageURL: "",
};

export const movieSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
  },
  selectors: {
    selectBannerData: (state) => state.bannerData,
    selectImageURL: (state) => state.imageURL,
  },
});

export const { setBannerData, setImageURL } = movieSlice.actions;
export const { selectBannerData, selectImageURL } = movieSlice.selectors;

export default movieSlice.reducer;
