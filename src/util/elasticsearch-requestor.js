import axios from "axios";

export function requestPage(queryText, pageNumber, resultsPerPage) {
    let articles = [];

    return axios
        .get("http://localhost:3000/search-es", {
            params: {
                title: queryText,
                pageNum: pageNumber,
                resultsPerPage,
            }
        })
        .then((results) => {
            // The "results" argument is the response received from the elastic search instance
            // Note, this result is redirect from es to the node back end server,  which should live in port 3000

            // TODO: move to a different function to help reuse the code
            for (let i = 0; i < results.data.length; i ++) {
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