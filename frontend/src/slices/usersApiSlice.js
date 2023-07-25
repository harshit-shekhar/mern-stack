import { apiSlice } from "./apiSlice";
const USERS_URL_USERS = "/api/users";
const IMAGE_URL = "/api/images";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL_USERS}/auth`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL_USERS}/logout`,
				method: "POST",
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL_USERS}`,
				method: "POST",
				body: data,
			}),
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: "PUT",
				body: data,
			}),
		}),

		uploadImage: builder.mutation({
			query: (data) => ({
				url: `${IMAGE_URL}/upload-image`,
				method: "POST",
				body: data,
			}),
		}),

		// New endpoint to get all images uploaded by the user
		getUserImages: builder.query({
			query: () => ({
				url: `${IMAGE_URL}/user-images`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useUpdateUserMutation,
	useUploadImageMutation, // Add this line to include the new mutation hook
	useGetUserImagesQuery,
} = userApiSlice;
