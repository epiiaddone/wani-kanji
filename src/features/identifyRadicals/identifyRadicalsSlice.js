import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    kanjiLevel: "1"
}

const identifyRadicalsSlice = createSlice({
    name: 'identifyRadicals',
    initialState,
    reducers: {
        handleKanjiLevelChange: (state, { payload }) => {
            state.kanjiLevel = payload;
        },
    }

})

export const {
    handleKanjiLevelChange
} = identifyRadicalsSlice.actions;

export default identifyRadicalsSlice.reducer;