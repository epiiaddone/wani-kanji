
export const getKanjiStage = (kanjiLevel) => {
    if (kanjiLevel <= 10) return 'Pleasant';
    if (kanjiLevel <= 20) return 'Painful';
    if (kanjiLevel <= 30) return 'Death';
    if (kanjiLevel <= 40) return 'Hell';
    if (kanjiLevel <= 50) return 'Paradise';
    if (kanjiLevel <= 60) return 'Reality';

    return 'Unknown';
}