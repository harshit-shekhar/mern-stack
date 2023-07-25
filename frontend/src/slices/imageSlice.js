import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useUploadImageMutation, useGetUserImagesQuery } from "./usersApiSlice";
import { toast } from "react-toastify";

// Async Thunk to handle image upload
export const uploadImage = createAsyncThunk(
	"/upload-image",
	async ({ title, description, photo }, thunkAPI) => {
		try {
			// Make the uploadImage API call using the `useUploadImageMutation` from `userApiSlice`
			const response = await useUploadImageMutation({
				title,
				description,
				photo,
			}).unwrap();
			console.log(response);
			return response.data;
		} catch (error) {
			toast.error(error?.data?.message || error.error);
			return thunkAPI.rejectWithValue(error?.data?.message || error.error);
		}
	}
);

// Async Thunk to get all images uploaded by the user
export const getUserImages = createAsyncThunk(
	"/user-images",
	async (_, thunkAPI) => {
		try {
			// Make the getUserImages API call using the `useGetUserImagesQuery` from `userApiSlice`
			const response = await useGetUserImagesQuery().unwrap();
			return response.data;
		} catch (error) {
			// Handle error or show toast notifications
			return thunkAPI.rejectWithValue(error?.data?.message || error.error);
		}
	}
);

const initialState = {
	images: [],
	loading: false,
	error: null,
};

const imageSlice = createSlice({
	name: "images",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(uploadImage.pending, (state) => {
				state.loading = true;
			})
			.addCase(uploadImage.fulfilled, (state, action) => {
				state.loading = false;
				state.images.push(action.payload);
			})
			.addCase(uploadImage.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getUserImages.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserImages.fulfilled, (state, action) => {
				state.loading = false;
				state.images = action.payload;
			})
			.addCase(getUserImages.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default imageSlice.reducer;
