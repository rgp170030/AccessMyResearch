import urllib.request
import urllib.parse
import json
import uuid
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
            #print(url)
            all_articles.append(result)
            if (result['total'] > 100):
                numOfPages = int(result['total']/self.pagesize)  # rounds down
                if (numOfPages > x + 1):
                    numOfPages = x + 1
                for i in range(2, numOfPages):
                    url = self.get_method_query_request_url(
                        method, query, i)
                    #print(url)
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


    def clean(result):
        mega_json = []
        for p in result:
            for a in p['results']:
                try:
                    obj = {}
                    k = ['author','title', 'abstract','year','link']
                    for i in k:
                        if i in a['bibjson']:
                            obj[i] = a['bibjson'][i]     
                    if 'author' in obj:
                        authorz = []
                        for auth in obj['author']: #DOAJ has multiple authors
                            if 'name' in auth:
                                authorz.append(auth['name'])
                        #print(authorz) 
                        #authJson = json.dumps(authorz)
                        obj['authors'] = authorz
                        #print(obj.pop('author')[0]['name'])
                    if 'abstract' in obj:
                        obj['description'] = obj['abstract']            
                    if 'year' in obj:
                        obj['datePublished'] = obj['year']      
                    if 'link' in obj:
                        linkz = []
                        for lin in obj['link']: #DOAJ has multiple links 
                            if 'url' in lin:
                                linkz.append(lin['url'])
                        obj['url'] = linkz #   obj['url'] = obj['link'][0]['url']       
                    obj['database'] = "DOAJ"
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


    cleaned_data = clean(result)

    es = Elasticsearch()

    for doc in range(len(cleaned_data)):
        #res = es.index(index="core", id=doc, body=cleaned_data[doc])

        # changed index and id
        # i assume we need to replace article_name, but not sure with what
        res = es.index(index="amr", id=id_generator(cleaned_data[doc]['title']), body=cleaned_data[doc])
        #if doc%100 == 0:
        #    print(doc)

    es.indices.refresh(index="amr")
    print('Total documents in DOAJ: ' , len(cleaned_data))