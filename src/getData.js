import axios from "axios"



const fetchQuestions = async (url) => {
    const response = await axios(url).catch((err) => console.log(err))
    if (response) { }
}

export const fetchAllKanjiTypeLevel = async (type, level) => {
    //console.log("fetchAllKanjiTypeLevel");

    var apiToken = '3b0f568a-0904-4b3d-887d-08e5da44da9e';
    var apiEndpointPath = `subjects?types=${type}&levels=${level}`;

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

    const trucData = new Map();

    apiData.data.forEach(radical => {
        console.log(radical.id, radical.data.slug, radical.data.level, radical.data.characters)
        trucData.set(radical.id, {
            slug: radical.data.slug,
            level: radical.data.level,
            characters: radical.data.characters
        })
    })

    console.log(trucData)
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

    let truncString = "";

    apiData.data.forEach(radical => {
        truncString = truncString
            + radical.id
            + ": {\n'slug': \'" + radical.data.slug + "\',\n'level': "
            + radical.data.level
            + ",\n'characters': \'"
            + radical.data.characters
            + "\'},\n";
    })
    console.log(truncString);

}