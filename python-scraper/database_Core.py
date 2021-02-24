import urllib.request
import urllib.parse
import json
import uuid
# from elasticsearch import Elasticsearch

class CoreApiRequestor:
    # Class constructor:
    # Endpoint: The "URL" of the CORE database
    # API key: the key used to access the API
    def __init__(self, endpoint, api_key):

        self.endpoint = endpoint
        self.api_key = api_key

        # Default class variables for the CORE database request:
        # CORE API states the default page size is 100
        self.pagesize = 100
        # self.page = 1


    # Description: Given a string url, this method will perform a get request and return
    #              the response sent back by CORE
    # url (string): The URL to be requested 
    # @return (query response) None will be returned if a server side error occures
    def requestURL(self, url):
        try:
            with urllib.request.urlopen(url) as response:
                html = response.read()
            return html
        except Exception as error:
            print("Error while requesting: ", url)
            print(error)
            return None

    # Description: Forms the URL used to query the database. 
    # query (string): the string used to query CORE
    # fullText (boolean): Defines if the article's body text should be returned by CORE
    # @return (string): an absolute URL that be used with self.requestURL()
    def getRequestURL(self, method, query, fullText, page):
        params = {
            'apiKey': self.api_key,
            'page': page,
            'pageSize': self.pagesize,
            'fulltext': 'true ' if fullText else 'false',
            'urls': 'true'
        }
        return self.endpoint + method + '/' + urllib.parse.quote(query) + '?' + urllib.parse.urlencode(params)

    # Given a method and a query (as defined by CORE's api)
    
    # Method (JSON array): Request a variable amount of pages
    # query (string): the string used to query CORE
    # fullText (boolean): Defines if the article's body text should be returned by CORE
    # maxPages (integer): The amount of pages to be requested
    # @return: Request a variable amount of pages
    def getNumberOfPages(self, method, query, fulltext, maxPages=20):
        # Get the formatted url
        url = self.getRequestURL(method, query, fulltext, 1)
        
        # Creating an array to store all page responses
        pageResponses = []

        # Request the first page
        response = self.requestURL(url)
        # Return an empty array if CORE did not respond with valid data
        if response is None: 
            return []
        pageOneResponse = json.loads(response.decode('utf-8'))
        pageResponses.append(pageOneResponse)
        
        # Check if any additional pages need to be requested
        if (pageOneResponse['totalHits'] > self.pagesize):
            # Calculate the total number of pages that need to be requested
            totalRequiredPages = int(pageOneResponse['totalHits'] / self.pagesize) + 1
            totalRequiredPages = min(totalRequiredPages, maxPages)

            # Loop from page 2 (since page 1 is already stored) to totalRequiredPages
            for currPage in range(2, totalRequiredPages + 1):
                # Get the next URL to request
                url = self.getRequestURL(method, query, False, currPage)
                response = self.requestURL(url)

                # Must error check and see that response is not 'None'
                if response is not None:
                    pageResponses.append(json.loads(response.decode('utf-8')))
                    print("\t - Recieved page #", i)
                else:
                    print("\t - Server error on page #", i)  
        print("Finished term: ", query) 
        return pageResponses


    def clean(self, result):
        cleanedResult = []
        # Keywords that the method should look for in the rawdata 
        keywords = ['authors', 'title', 'description',
                    'datePublished', 'fulltextUrls',
                    'journal', 'doi', 'database', 'publisher',
                    'subjects', 'year', 'aoi', 'downloadUrl']
        
        # Go through all pages in result
        for page in result:
            # Extract all articles in each page
            for article in page['data']:
                try:
                    # Create a dictionary for the cleaned data
                    cleanedArticle = {}
                   
                    # Find all keywords in the rawdata and add it to "cleanedArticle"
                    for item in keywords:
                        if item in article:
                            cleanedArticle[item] = article[item]

                    # Specify which database the article was taken from: 
                    cleanedArticle['database'] = "CORE"
                    if 'fulltextUrls' in obj:
                        obj['url'] = obj.pop('fulltextUrls')
                    
                    cleanedResult.append(obj)

                except Exception as error:
                    print('Error occured while cleaning')
                    print(error)

        return cleanedResult
    

# added id generator method
# uuid3 creates a unique id from a namespace and a string(the title, in our example)
# these id's are reproducible, so if 2 id's are made with the same namespace
# and the same name(article_name) they should be equal
# i messed with uuid in pycharm for a while and this method seemed to work
# def id_generator(article_name):
#     unique_id = uuid.uuid3(uuid.NAMESPACE_DNS, article_name)
#     return unique_id


def core(keywords):
    with open(keywords) as f:
        search_terms = json.load(f)['search']
        for i in range(len(search_terms)):
            search_terms[i] = '"' + search_terms[i].replace(' ', ' AND ') + '"'
    print("Search terms: ", search_terms)

    # Move to indexer.py
    endpoint = 'https://core.ac.uk/api-v2'
    api_key = '5TphODMbCjoQUkWitNZSBVqsEeYlHfnI'
    method = '/articles/search'
    #topic = '*'

    api = CoreApiRequestor(endpoint, api_key)
    result = []
    for term in search_terms:
        result += api.getNumberOfPages(method, term, False, x=2)
    # result += api.get_up_to_x_pages_of_query(method, search_terms[1], False, x = 7)

    # Following code is to temporarily save the output
    # cleaned_data = clean(result)
    # f = open("cleandata.json", "w")
    # f.write(json.dumps(cleaned_data))
    # f.close()

    # f = open("rawdata.json", "w")
    # f.write(json.dumps(result))
    # f.close()

    # es = Elasticsearch()

    # for doc in range(len(cleaned_data)):
    #     #res = es.index(index="core", id=doc, body=cleaned_data[doc])

    #     # changed index and id
    #     # i assume we need to replace article_name, but not sure with what
    #     res = es.index(index="amr", id=id_generator(cleaned_data[doc]['title']), body=cleaned_data[doc])
    #     #if doc%100 == 0:
    #     #    print(doc)

    # es.indices.refresh(index="amr")
    print('Total documents in CORE: ', len(cleaned_data))
