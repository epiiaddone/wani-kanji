import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    kanjiLevel: "1",
    gameOver: false,
    wrongAnswers: [],
    questionNumber: 1,
    completedCount: 0,
    correctCount: 0,
}

const identifyRadicalsSlice = createSlice({
    name: 'identifyRadicals',
    initialState,
    reducers: {
        handleKanjiLevelChange: (state, { payload }) => {
            state.kanjiLevel = payload;
        },
        setKanjiGameOver: (state, { payload }) => {
            state.gameOver = payload;
        },
        addWrongAnswer: (state, { payload }) => {
            state.wrongAnswers = [...state.wrongAnswers, payload]
        },
        resetIdentifyRadicalsGame: (state) => {
            state.gameOver = false;
            state.wrongAnswers = [];
            state.correctCount = 0;
            state.completedCount = 0;
            state.questionNumber = 1;
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
    handleKanjiLevelChange,
    setKanjiGameOver,
    addWrongAnswer,
    resetIdentifyRadicalsGame,
    incrementCompletedCount,
    incrementQuestionNumber,
    incrementCorrectCount,
} = identifyRadicalsSlice.actions;

export default identifyRadicalsSlice.reducer;