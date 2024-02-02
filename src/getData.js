import axios from "axios"

const fetchQuestions = async (url) => {
    const response = await axios(url).catch((err) => console.log(err))
    if (response) { }
}

export const fetchAllKanjiTypeLevel = async (type, level) => {
    console.log("fetchAllKanjiTypeLevel");

    var apiToken = '3b0f568a-0904-4b3d-887d-08e5da44da9e';


    var apiEndpointPath = `subjects?types=${type}&levels=1,2,3,4,5,6,7,8,9,10`;

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

    const response = await fetch(apiEndpoint);
    const apiData = await response.json();

    console.log(apiData.data);

    /*
    apiData.data.forEach(kanji => {
        console.log(
            kanji.id,
            kanji.data.level,
            kanji.data.characters,
            kanji.data.component_subject_ids,
            kanji.data.meanings[0].meaning,
            kanji.data.meaning_mnemonic
        )
    })
    */
}

export const fetchAllRadicals = async () => {
    console.log("fetchAllRadicals");

    var apiToken = '3b0f568a-0904-4b3d-887d-08e5da44da9e';
    var apiEndpointPath = `subjects?types=radical`;

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

    const response = await fetch(apiEndpoint);
    const apiData = await response.json();
    console.log(apiData)

    let truncString = "";

    apiData.data.forEach(radical => {
        if (radical.data.hidden_at != null) {/*this looks bad */ }
        else {
            truncString = truncString
                + radical.id
                + ": {\n'slug': \'" + radical.data.slug + "\',\n'level': "
                + radical.data.level
                + ",\n'characters': \'"
                + radical.data.characters
                + "\'},\n";
        }
    })
    console.log(truncString);

}


export const fetchAllKanji = async () => {
    console.log("fetchAllKanji");

    var apiToken = '3b0f568a-0904-4b3d-887d-08e5da44da9e';

    var apiEndpointPath = `subjects?types=kanji&levels=3`;

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

    const response = await fetch(apiEndpoint);
    const apiData = await response.json();

    console.log(apiData.data);

    /*
    apiData.data.forEach(kanji => {
        console.log(
            kanji.id,
            kanji.data.level,
            kanji.data.slug,
            kanji.data.component_subject_ids,
            kanji.data.meanings[0].meaning,
            kanji.data.meaning_mnemonic
        )
    })
    */

    let truncString = '';

    apiData.data.forEach(kanji => {
        truncString = truncString
            + kanji.id
            + ': {\n"slug": \"' + kanji.data.slug + '\",\n"level": '
            + kanji.data.level
            + ',\n"component_subject_ids": ['
            + kanji.data.component_subject_ids
            + '],\n"meaning": \"'
            + kanji.data.meanings[0].meaning
            + '\",\n"meaning_mnemonic": \"'
            + kanji.data.meaning_mnemonic
            + '\"\n},\n';
    })
    console.log(truncString);
}