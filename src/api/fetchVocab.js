

export const fetchVocab = async (vocabID, abortController) => {
    console.log("inside fetchVocab, vocabID:", vocabID);


    let error;
    let vocabData = {};


    var apiToken = '3b0f568a-0904-4b3d-887d-08e5da44da9e';
    var apiEndpointPath = `subjects/${vocabID}`;

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
        const fetchPromise = await fetch(apiEndpoint, { signal: abortController.signal });
        const response = await fetchPromise.json();

        vocabData["characters"] = response.data.characters;
        vocabData["meaning"] = response.data.meanings[0].meaning;
        vocabData["reading"] = response.data.readings[0].reading;

        console.log("here is vocabData:")
        console.log(vocabData);

    } catch (e) {
        if (e.name === 'AbortError') console.log("aborted fetch");
        else {
            console.log("error getting vocab:", e)
        }
        error = e;
    }

    return { error, vocabData };
}