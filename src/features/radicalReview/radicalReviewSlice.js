import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    beginningLevel: "1",
    lastLevel: "1",
    gameOver: false,
    wrongAnswers: [],
    correctCount: 0,
    completedCount: 0,
    questionNumber: 1,
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
        },
        setGameOver: (state, { payload }) => {
            state.gameOver = payload;
        },
        addWrongAnswer: (state, { payload }) => {
            state.wrongAnswers = [...state.wrongAnswers, payload]
        },
        resetRadicalReviewGame: (state) => {
            state.gameOver = false;
            state.wrongAnswers = [];
            state.correctCount = 0;
            state.questionNumber = 1;
            state.completedCount = 0;
        },
        incrementCorrectCount: (state) => {
            state.correctCount++;
        },
        incrementQuestionNumber: (state) => {
            state.questionNumber++;
        },
        incrementCompletedCount: (state) => {
            state.completedCount++;
        }
    }

})

export const {
    handleBeginningLevelChange,
    handleLastLevelChange,
    setGameOver,
    addWrongAnswer,
    resetRadicalReviewGame,
    incrementCorrectCount,
    incrementQuestionNumber,
    incrementCompletedCount
} = radicalReviewSlice.actions;

export default radicalReviewSlice.reducer;