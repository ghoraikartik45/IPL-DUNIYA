async function getMatchData() {
    const desiredSeriesId = "76ae85e2-88e5-4e99-83e4-5f352108aebc";

    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=1b90af87-8fbc-4a77-920b-67f1b3513ec9&offset=0")
        .then(data => data.json())
        .then(data => {
            if (data.status !== "success") return;

            const matchesList = data.data;

            const iplMatches = matchesList.filter(match => match.series_id === desiredSeriesId);
            console.log({ iplMatches });
            const relevantData = iplMatches.map(match => {
                let scoreInfo = "Score information not available";
                let statusInfo = "Status information not available";
            
                if (match.score && match.score.length === 2) {
                    const firstInning = match.score[0];
                    const secondInning = match.score[1];
                    scoreInfo = `${firstInning.inning}: ${firstInning.r}/${firstInning.w} in ${firstInning.o} overs, ${secondInning.inning}: ${secondInning.r}/${secondInning.w} in ${secondInning.o} overs`;
                }
            
                if (match.status) {
                    statusInfo = match.status;
                }
            
                return `${match.name}, ${scoreInfo}, ${statusInfo}`;
            });
            

            console.log({ relevantData });

            document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match} </li>`).join('');

            return relevantData;
        })
        .catch(e => console.log(e));
}

getMatchData();
