import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Spot, SpotData} from "../../types";
import {parkingService} from "../services/parking_service";

interface InitialState {
    spots: Spot[];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: InitialState = {
    spots: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};


// requesting all available spots from API
export const getSpots = createAsyncThunk<Spot, SpotData>("spots/getSpots", async (spot, thunkApi) => {
        return parkingService.getSpots(spot);
    }
);

export const spotsSlice = createSlice({
    name: "spots",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSpots.pending, (state) => {
                state.isLoading = true;
                state.message = "Loading Spots...";
            })
            .addCase(getSpots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.spots = action.payload as any;
                state.message = "Spots loaded successfully";
                console.log('Spots okay')
            })
            .addCase(getSpots.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = (action.payload as string) || "Something went wrong";
            })

    },
});

export const {reset} = spotsSlice.actions;