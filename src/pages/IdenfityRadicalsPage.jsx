import styled from 'styled-components';
import { KanjiDisplay } from '../components/KanjiDisplay';
import { useSelector } from 'react-redux';
import { IncorrectAnswers } from '../components/IncorrectAnswers';
import { Header } from '../components/Header';
import { getKanji } from '../api/getKanji';

const IdentifyRadicalsPage = () => {
    const {
        kanjiLevel,
        gameOver,
        wrongAnswers,
        correctCount,
        questionNumber,
        completedCount } = useSelector(store => store.identifyRadicals);

    const kanji = getKanji(kanjiLevel);
    console.log("kanji:")
    console.log(kanji);

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