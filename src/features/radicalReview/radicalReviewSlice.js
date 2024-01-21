import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    beginningLevel: "1",
    lastLevel: "1",
}

const radicalReviewSlice = createSlice({
    name: 'radicalReview',
    initialState,
    reducers: {
        handleBeginningLevelChange: (state, { payload }) => {
            state.beginningLevel = payload;
            if (parseInt(state.lastLevel) < parseInt(payload)) state.lastLevel = payload;
        },
        handleLastLevelChange: (state, { payload }) => {
            state.lastLevel = payload;
            if (parseInt(state.beginningLevel) > parseInt(payload)) state.beginningLevel = payload;
        }
    }

})

export const {
    handleBeginningLevelChange,
    handleLastLevelChange
} = radicalReviewSlice.actions;

export default radicalReviewSlice.reducer;