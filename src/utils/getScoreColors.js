
export const getScoreColorClassName = (score, attribute) => {
    if (!score) return '';

    let colorClass = '';

    if (score >= 90) colorClass = 'score-90';
    else if (score >= 80) colorClass = 'score-80';
    else if (score >= 70) colorClass = 'score-70';
    else if (score >= 60) colorClass = 'score-60';
    else if (score >= 50) colorClass = 'score-50';
    else if (score >= 40) colorClass = 'score-40';
    else if (score >= 30) colorClass = 'score-30';
    else if (score >= 20) colorClass = 'score-20';
    else if (score >= 10) colorClass = 'score-10';
    else colorClass = 'score-0';

    if (attribute === 'bg') colorClass += '-bg';
    else if (attribute === 'text') colorClass += '-text';

    return colorClass;
}