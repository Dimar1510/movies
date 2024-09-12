import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageURL: "",
  searchInput: "",
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
    setSearchInput: (state, action) => {
      state.searchInput = action.payload.toLowerCase();
    },
  },
  selectors: {
    selectBannerData: (state) => state.bannerData,
    selectImageURL: (state) => state.imageURL,
    selectSearchInput: (state) => state.searchInput,
  },
});

export const { setBannerData, setImageURL, setSearchInput } =
  movieSlice.actions;
export const { selectBannerData, selectImageURL, selectSearchInput } =
  movieSlice.selectors;

export default movieSlice.reducer;
