import axios from "axios";

// Note: the searchParams must follow the same structure as this.$store.stata.search
export function requestPage(searchParams) {
    const searchResult = {
        articles: [],
        totalResults: 0,
        timeElapsed: 0,
    };


    // Return an empty list if user has not entered any text in the search bar
    if (searchParams.queryText.length === 0) {
        return searchResult;
    }

    // console.log("search params: ");
    // console.dir(searchParams);
    searchParams.query = searchParams.queryText;
    searchParams.pageNum = searchParams.pageNumber;

    // Start the timer:
    const start = new Date().getTime();

    return axios
        .post("https://wvzjho1dq4.execute-api.us-east-2.amazonaws.com/search-es-api-prod/search-es-api-lambda",
            searchParams
        )
        .then((results) => {
            // Stop the timer
            const end = new Date().getTime();
            searchResult.timeElapsed = (end - start)/1000; // Convert from ms to seconds

            // The "results" argument is the response received from the elastic search
            // instance (which comes from a lambda call)
            searchResult.totalResults = results.data.body.hits.total.value;

            results = results.data.body.hits.hits;

            for (let i = 0; i < results.length; i++) {
                searchResult.articles.push(results[i]._source);
            }

            return searchResult;
        })
        .catch((err) => {
            console.log("Elasticsearch error response:");
            console.log(err);
        });
}