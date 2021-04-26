import axios from "axios";

// Note: the searchParams must follow the same structure as this.$store.stata.search
export function requestPage(searchParams) {
    const searchResult = {
        articles: [],
        totalResults: 0
    };


    // Return an empty list if user has not entered any text in the search bar
    if (searchParams.queryText.length === 0) {
        return searchResult;
    }

    // console.log("search params: ");
    // console.dir(searchParams);
    searchParams.query = searchParams.queryText;
    searchParams.pageNum = searchParams.pageNumber;


    return axios
        .post("https://wvzjho1dq4.execute-api.us-east-2.amazonaws.com/search-es-api-prod/search-es-api-lambda",
            searchParams
        )
        .then((results) => {
            // The "results" argument is the response received from the elastic search instance
            // Note, this result is redirect from es to the node back end server,  which should live in port 3000
            // console.log("results from es");
            // console.log(results);
            searchResult.totalResults = results.data.body.hits.total.value;

            results = results.data.body.hits.hits;

            // TODO: move to a different function to help reuse the code
            for (let i = 0; i < results.length; i++) {
                searchResult.articles.push(results[i]._source);
            }
            // console.dir(searchResult.articles);
            return searchResult;
        })
        .catch((err) => {
            console.log("Elasticsearch error response:");
            console.log(err);
        });
}