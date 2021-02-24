import urllib.request
import urllib.parse
import json
import uuid
# from elasticsearch import Elasticsearch

def core(keywords):
    with open(keywords) as f:
        search_terms = json.load(f)['search']
        for i in range(len(search_terms)):
            search_terms[i] = '"' + search_terms[i].replace(' ', ' AND ') + '"'
    print("Search terms: ", search_terms)

    class CoreApiRequestor:
        def __init__(self, endpoint, api_key):
            self.endpoint = endpoint
            self.api_key = api_key
            # defaults
            self.pagesize = 100
            self.page = 1

        def request_url(self, url):
            try: 
                with urllib.request.urlopen(url) as response:
                    html = response.read()
                return html
            except Exception as error:
                print("Error while requesting: ", url)
                print(error)
                return None

        def get_method_query_request_url(self, method, query, fullText, page):
            if (fullText):
                fullText = 'true'
            else:
                fullText = 'false'
            params = {
                'apiKey': self.api_key,
                'page': page,
                'pageSize': self.pagesize,
                'fulltext': fullText,
                'urls': 'true'
            }
            return self.endpoint + method + '/' + urllib.parse.quote(query) + '?' + urllib.parse.urlencode(params)

        def get_up_to_x_pages_of_query(self, method, query, fulltext, x = 20):
            url = self.get_method_query_request_url(method, query, fulltext, 1)
            page_responses = []
            response = self.request_url(url)
            result = json.loads(response.decode('utf-8'))

            page_responses.append(result)
            if (result['totalHits'] > self.pagesize):
                numOfPages = int(result['totalHits'] / self.pagesize) + 1 # Integer division
                numOfPages = min(numOfPages, x)
                
                for i in range(2, numOfPages + 1):
                    url = self.get_method_query_request_url(method, query, False, i)
                    response = self.request_url(url)
                    if response is not None:
                        page_responses.append(json.loads(response.decode('utf-8')))
                        print("\t - Recieved page #", i)
                    else: 
                         print("\t - Server error on page #", i)
            print("Finished term: ", query)
            return page_responses


    endpoint = 'https://core.ac.uk/api-v2'
    api_key = '5TphODMbCjoQUkWitNZSBVqsEeYlHfnI'
    method = '/articles/search'
    #topic = '*'

    api = CoreApiRequestor(endpoint, api_key)
    result = []
    for term in search_terms:
        result += api.get_up_to_x_pages_of_query(method, term, False, x = 2)
    # result += api.get_up_to_x_pages_of_query(method, search_terms[1], False, x = 7)
    
    def clean(result):
        mega_json = []
        for p in result:
            for a in p['data']:
                try:
                    obj = {}
                    # added database in parameters
                    k = ['authors', 'title', 'description',
                        'datePublished','fulltextUrls', 'journal', 'doi', 'database']  
                    for i in k:
                        if i in a:
                            obj[i] = a[i]

                    # added database name
                    obj['database'] = "CORE"
                    
                    if 'fulltextUrls' in obj:
                        obj['url'] = obj.pop('fulltextUrls')
                    mega_json.append(obj)
                except:
                    print('Error occured while cleaning')
        return mega_json

    # added id generator method
    # uuid3 creates a unique id from a namespace and a string(the title, in our example)
    # these id's are reproducible, so if 2 id's are made with the same namespace 
    # and the same name(article_name) they should be equal
    # i messed with uuid in pycharm for a while and this method seemed to work
    def id_generator(article_name):
        unique_id = uuid.uuid3(uuid.NAMESPACE_DNS, article_name)
        return unique_id


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
    print('Total documents in CORE: ' , len(cleaned_data))
