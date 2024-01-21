import { configureStore } from "@reduxjs/toolkit";
import radicalReviewSlice from "./features/radicalReview/radicalReviewSlice";
import identifyRadicalsSlice from "./features/identifyRadicals/identifyRadicalsSlice";

export const store = configureStore({
    reducer: {
        radicalReview: radicalReviewSlice,
        identifyRadicals: identifyRadicalsSlice
    }
});