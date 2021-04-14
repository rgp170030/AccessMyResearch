import axios from "axios";

// Note: the searchParams must follow the same structure as this.$store.stata.search
export function requestPage(searchParams) {
    let articles = [];

    // Return an empty list if user has not entered any text in the search bar
    if (searchParams.queryText.length === 0) {
        return articles;
    }

    console.log("search params: ");
    console.dir(searchParams);

    return axios
        .get("http://localhost:3000/search-es", {
            params: {
                ...searchParams
            }
        })
        .then((results) => {
            // The "results" argument is the response received from the elastic search instance
            // Note, this result is redirect from es to the node back end server,  which should live in port 3000

            // TODO: move to a different function to help reuse the code
            for (let i = 0; i < results.data.length; i++) {
                articles.push(results.data[i]._source);
            }
            console.dir(articles);
            return articles;
        })
        .catch((err) => {
            console.log("Elasticsearch error response:");
            console.log(err);
        });
}