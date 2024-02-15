import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    kanjiLevel: "1",
    kanji_loading: false,
    kanji_error: false,
    kanji: [],
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
            if (payload) {
                const correctPercent = Math.round(state.correctCount * 100 / state.completedCount);
                const scores = JSON.parse(localStorage.getItem('scores'));
                let newScores = [];
                if (scores) {
                    newScores = scores.filter(score => score["level"] != state.kanjiLevel)
                }
                newScores.push({
                    level: state.kanjiLevel,
                    percent: correctPercent,
                    date: new Date()
                })
                localStorage.setItem('scores', JSON.stringify(newScores));
            }
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
            state.kanji = [];
        },
        incrementCorrectCount: (state) => {
            state.correctCount++;
        },
        incrementQuestionNumber: (state) => {
            state.questionNumber++;
        },
        incrementCompletedCount: (state) => {
            state.completedCount++;
        },
        getKanjiBegin: (state) => {
            state.kanji_loading = true;
            state.kanji_error = false;
        },
        getKanjiSuccess: (state, { payload }) => {
            state.kanji_loading = false;
            state.kanji = payload;
        },
        getKanjiError: (state) => {
            state.kanji_error = true;
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
    getKanjiBegin,
    getKanjiError,
    getKanjiSuccess,
} = identifyRadicalsSlice.actions;

export default identifyRadicalsSlice.reducer;