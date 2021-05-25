const { Client } = require("@elastic/elasticsearch");

const client = new Client({
    node:
        "https://search-accessmyresearch-rxbdfxn7frebom3di4du5ld464.us-east-2.es.amazonaws.com",
    auth: {
        username: "amr",
        password: "Amr123!!",
    },
});

function extractParams(event) {
    const params = {};

    if (
        event.query === undefined ||
        event.pageNum === undefined ||
        event.resultsPerPage === undefined
    ) {
        return undefined;
    }

    params.query = event.query;
    params.pageNum = parseInt(event.pageNum, 10) - 1;
    params.resultsPerPage = parseInt(event.resultsPerPage, 10);

    if (event.filters === undefined || event.filters === null) {
        params.filters = {};
    } else {
        params.filters = event.filters;
        // console.log("Filters: ", JSON.stringify(params.filters))
    }

    if (isNaN(params.pageNum) || isNaN(params.resultsPerPage)) {
        // console.log("Invalid integer: ", params.pageNum, params.resultsPerPage);
        return undefined;
    }

    return params;
}

function createResponse(statusCode, body) {
    const promise = new Promise(function (resolve, reject) {
        const returnObj = {
            statusCode: statusCode,
            body,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
        };

        resolve(returnObj);
    });

    return promise;
}


exports.lambda_handler = function (event, context, callback) {
    console.log("NEW EVENT: \n" + JSON.stringify(event, null, 2));

    const body = event;

    if (body === undefined || body === null) {
        return createResponse(400, {
            message: "Check passed parameters in the request body",
        });
    }

    const params = extractParams(body);

    if (params === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Check passed parameters",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        };
    }

    console.log("Showing applied filters: ", JSON.stringify(params.filters));

    params.filters.minYear = parseInt(params.filters.minYear);
    params.filters.maxYear = parseInt(params.filters.maxYear);

    if (
        Number.isNaN(params.filters.minYear) ||
        Number.isNaN(params.filters.maxYear) ||
        params.filters.minYear == -1 ||
        params.filters.maxYear == -1
    ) {
        params.filters.minYear = 1000;
        params.filters.maxYear = 9999;
    }

    // Check if no filters are added
    if (
        params.filters.databases === undefined ||
        params.filters.databases.length === 0
    ) {
        return wildcardQuery(params);
    }

    console.log("Performing filtered search");
    let searches = params.filters.databases.map((dbName) => {
        return getQueryObject(params.query, dbName, params.filters.minYear, params.filters.maxYear);
    });

    return client
        .search({
            index: "articles",
            from: params.pageNum * params.resultsPerPage,
            size: params.resultsPerPage,
            body: {
                query: {
                    bool: {
                        should: searches,
                    },
                },
            },
        })
        .then((results) => {
            return createResponse(200, results.body);
        })
        .catch((err) => {
            console.log(err);
            return createResponse(500, err);
        });
};

function wildcardQuery(params) {
    console.log("Perfroming wildcard search");
    return client
        .search({
            index: "articles",
            from: params.pageNum * params.resultsPerPage,
            size: params.resultsPerPage,
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                match: {
                                    title: params.query
                                }
                            },
                        ],
                        filter: {
                            range : {
                                datePublished: {
                                    "gte": params.filters.minYear,
                                    "lte": params.filters.maxYear,
                                    "format": "yyyy"
                                }
                            }
                        }
                    }
                },
            },
        })
        .then((results) => {
            return createResponse(200, results.body);
        })
        .catch((err) => {
            console.log(err);
            return createResponse(500, err);
        });
}

function getQueryObject(searchTerm, database, timeGTE, timeLTE) {
    let obj = {
        bool: {
            must: [
                {
                    match: {
                        title: searchTerm
                    }
                },
                {
                    match: {
                        database: database
                    }
                },
            ],
            filter: {
                range : {
                    datePublished: {
                        "gte": timeGTE,
                        "lte": timeLTE,
                        "format": "yyyy"
                    }
                }
            }
        }
    };

    return obj;
}
