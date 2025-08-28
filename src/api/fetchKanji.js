import { custom_wk_kanji_data } from "../data/custom_wk_kanji_data";

export const fetchKanji = async (level) => {
    let error;
    let kanjiData = [];
    console.log("inside fetchKanji");

    var apiToken = '3b0f568a-0904-4b3d-887d-08e5da44da9e';
    var apiEndpointPath = `subjects?types=kanji&hiddenfalse&levels=${level}`;

    var requestHeaders =
        new Headers({
            'Wanikani-Revision': '20170710',
            Authorization: 'Bearer ' + apiToken,
        });

    var apiEndpoint =
        new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
            method: 'GET',
            headers: requestHeaders
        });

    try {
        const fetchPromise = await fetch(apiEndpoint);
        const apiData = await fetchPromise.json();

        //console.log("here is api data:")
        //console.log(apiData);

        apiData.data.forEach(kanji => {
            let tempMeanings = [];
            kanji.data.meanings.forEach(meaningData => {
                tempMeanings.push(meaningData.meaning)
            })

            kanjiData.push({
                'id': kanji.id,
                'level': kanji.data.level,
                'slug': kanji.data.slug,
                'component_subject_ids': kanji.data.component_subject_ids,
                'amalgamation_subject_ids': kanji.data.amalgamation_subject_ids,
                'meanings': tempMeanings,
                'meaning_mnemonic': kanji.data.meaning_mnemonic,
            })
        })
    } catch (e) {
        console.log("error getting kanji:", e)
        error = e;
    }

    kanjiData.forEach(kanji =>{
        kanji.component_subject_ids = custom_wk_kanji_data[kanji.id]['component_subject_ids'];
        kanji.meaning_mnemonic = custom_wk_kanji_data[kanji.id]['meaning_mnemonic'];
    })


    /*
    console.log(
        kanji.id,  //number 
        kanji.data.level, // number 
        kanji.data.slug,  //string 
        kanji.data.component_subject_ids,  //[number] 
        kanji.data.meanings,  //[{meaning: string, primary: binary, accepted_answer: binary}]
        kanji.data.meaning_mnemonic  //string 
    )
    */
    //console.log("here is kanji data")
    //console.log(kanjiData)

    return { error, kanjiData };

}