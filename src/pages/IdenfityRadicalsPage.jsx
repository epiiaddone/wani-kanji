import styled from 'styled-components';
import { KanjiDisplay } from '../components/KanjiDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { IncorrectAnswers } from '../components/IncorrectAnswers';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { useEffect } from 'react';
import { getKanjiBegin, getKanjiError, getKanjiSuccess } from '../features/identifyRadicals/identifyRadicalsSlice';
import { fetchKanji } from '../api/fetchKanji';
import { shuffleArray } from '../utils/shuffleArray';

const IdentifyRadicalsPage = () => {
    const {
        gameOver,
        wrongAnswers,
        correctCount,
        questionNumber,
        completedCount,
        kanji_error,
        kanji_loading,
        kanjiLevel,
        kanji } = useSelector(store => store.identifyRadicals);

    const dispatch = useDispatch();

    //having this function in another file doesn't work
    const getKanji = async (kanjiLevel) => {
        dispatch(getKanjiBegin());
        const { error, kanjiData } = await fetchKanji(kanjiLevel);
        if (error) {
            dispatch(getKanjiError());
        } else {
            dispatch(getKanjiSuccess(shuffleArray(kanjiData)))
        }
    }

    useEffect(() => {
        getKanji(kanjiLevel)
    }, []);

    // console.log("kanji:")
    //console.log(kanji);

    if (kanji_loading || kanji.length === 0) {
        return (<Loading />)
    }

    if (kanji_error) {
        return (<Error />)
    }

    return (
        <Wrapper>
            <Header
                total={kanji.length}
                correctCount={correctCount}
                questionNumber={questionNumber}
                completedCount={completedCount}
            />
            <KanjiDisplay kanji={kanji} />
            {gameOver && <IncorrectAnswers wrongAnswers={wrongAnswers} />}
        </Wrapper>
    )
}

const Wrapper = styled.main`
background-color: var(--kanji);
color:white;
padding:0.5rem;
min-height: 100dvh;
font-size:1.2rem;
`;

export default IdentifyRadicalsPage;