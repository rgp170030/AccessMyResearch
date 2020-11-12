import urllib.request
import urllib.parse
import json
from elasticsearch import Elasticsearch

def doaj(keywords):
    with open(keywords) as f:
        search_terms = json.load(f)['search']
        for i in range(len(search_terms)):
            search_terms[i] = '"' + search_terms[i].replace(' ', ' AND ') + '"'

    class DOAJApiRequestor:
        def __init__(self, endpoint):
            self.endpoint = endpoint
            # defaults
            self.pagesize = 100
            self.page = 1

        def request_url(self, url):
            with urllib.request.urlopen(url) as response:
                html = response.read()
            return html

        def get_method_query_request_url(self, method, query, page):
            params = {
                'page': page,
                'pageSize': self.pagesize,
            }
            return self.endpoint + method + '/' + urllib.parse.quote(query) + '?' + urllib.parse.urlencode(params)

        def get_up_to_x_pages_of_query(self, method, query, x = 20):
            url = self.get_method_query_request_url(method, query, 1)
            all_articles = []
            resp = self.request_url(url)
            result = json.loads(resp.decode('utf-8'))
            all_articles.append(result)
            if (result['total'] > 100):
                numOfPages = int(result['total']/self.pagesize)  # rounds down
                if (numOfPages > x + 1):
                    numOfPages = x + 1
                for i in range(2, numOfPages):
                    url = self.get_method_query_request_url(
                        method, query, i)
                    print(url)
                    resp = self.request_url(url)
                    all_articles.append(json.loads(resp.decode('utf-8')))
            return all_articles


    endpoint = 'https://doaj.org/api/v1/'
    method = 'search/articles'
    #topic = '*'

    api = DOAJApiRequestor(endpoint)
    result = []
    for term in search_terms:
        result += api.get_up_to_x_pages_of_query(method, term, x = 2)


    def clean(result): #need to edit this below
        mega_json = []
        for p in result:
            for aa in p['results']: #.created_date is outside bibjson
                for a in aa['bibjson']:
                    try:
                        obj = {}
                        k = ['abstract']
                        for i in k:
                            if i in a:
                                print(a[i])
                                obj[i] = a[i]
                        #mega_json.append(obj)
                    except:
                        print('Error occured while cleaning')
        return mega_json

#need to edit this above
    cleaned_data = clean(result)

    es = Elasticsearch()

    for doc in range(len(cleaned_data)):
        res = es.index(index="doaj", id=doc, body=cleaned_data[doc])
        if doc%100 == 0:
            print(doc)

    es.indices.refresh(index="doaj")