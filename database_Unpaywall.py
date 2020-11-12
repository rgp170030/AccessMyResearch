import urllib.request
import urllib.parse
import json
from elasticsearch import Elasticsearch

def core(keywords):
    with open(keywords) as f:
        search_terms = json.load(f)['search']
        for i in range(len(search_terms)):
            search_terms[i] = '"' + search_terms[i].replace(' ', ' AND ') + '"'

    class UnpaywallApiRequestor:
        # Unpaywall only allows 100000 calls per day
        api_limit: int = 100000

        # took api_key out of __init__
        # took page and pageSize out of __init__ since unpaywall doesn't have either
        def __init__(self, endpoint):
            self.endpoint = endpoint

        # Same as syed's
        def request_url(self, url):
            with urllib.request.urlopen(url) as response:
                html = response.read()
            return html

        # Took out the fullText and params since it isn't relevant to unpaywall. 
        def get_query_request_url(self, query):
            return self.endpoint + urllib.parse.quote(query) + '&email=your_email&is_oa=true'

        # changed parameters to query and is_oa
        def get_query(self, query, is_oa):
            url = self.get_query_request_url(query)
            all_articles = []
            resp = self.request_url(url)
            result = json.loads(resp.decode('utf-8'))
            all_articles.append(result)
        # deleted for loop and anything with numOfPages since it's irrelevant to unpaywall. 
        # just need to return all articles
            return all_articles

    # set endpoint as beginning of api call for unpaywall
    endpoint = "https://api.unpaywall.org/v2/search/?query="

    # took out topic since that was for syed's query 

    api = UnpaywallApiRequestor(endpoint)

    # set is_oa as true
    result = []
    for term in search_terms:
        result += api.get_query(term, True)


    def clean(result):
        mega_json = []
        for p in result:
            for a in p['data']:
                try:
                    obj = {}
                    # set k as parameters from unpaywall
                    k = ['z_authors', 'title', 'published_date', 'doi_url', 'doi']
                    for i in k:
                        if i in a:
                            obj[i] = a[i]
                    if 'doi_url' in obj:
                        obj['url'] = obj.pop('doi_url')
                    mega_json.append(obj)
                except:
                    print('Error occurred while cleaning')
        return mega_json


    cleaned_data = clean(result)

    es = Elasticsearch()

    # i don't think we should need to change this part?
    for doc in range(len(cleaned_data)):
        if doc == 100:
            break
        res = es.index(index="unpaywall", id=doc, body=cleaned_data[doc])
        # print(doc)

    es.indices.refresh(index="unpaywall")