import styled from 'styled-components';
import { RadicalDisplay } from '../components/RadicalDisplay';
import { useSelector } from 'react-redux';
import { IncorrectAnswers } from '../components/IncorrectAnswers';
import { Header } from '../components/Header';
import { getRadicalsLocal } from '../api/getRadicalsLocal';
import { useMemo } from 'react';

const RadicalReviewPage = () => {
    const {
        beginningLevel,
        lastLevel,
        gameOver,
        wrongAnswers,
        correctCount,
        completedCount,
        questionNumber } = useSelector(store => store.radicalReview);

    const radicals = useMemo(() => getRadicalsLocal(beginningLevel, lastLevel), [beginningLevel, lastLevel]);


    return (
        <Wrapper>
            <Header
                correctCount={correctCount}
                completedCount={completedCount}
                questionNumber={questionNumber}
                total={radicals.length}
            />
            <RadicalDisplay radicals={radicals} />
            {gameOver && <IncorrectAnswers wrongAnswers={wrongAnswers} />}
        </Wrapper>
    )
}

const Wrapper = styled.main`
background-color: var(--radical);
color:white;
`;

export default RadicalReviewPage;