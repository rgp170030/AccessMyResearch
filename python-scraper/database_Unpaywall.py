import urllib.request
import urllib.parse
import json
import uuid
from elasticsearch import Elasticsearch

def unpaywall(keywords):
    with open(keywords) as f:
        search_terms = json.load(f)['search']
        for i in range(len(search_terms)):
            search_terms[i] = '"' + search_terms[i].replace(' ', ' ') + '"'

    class UnpaywallApiRequestor:
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
            #print(url)
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
            for a in p['results']:
                try:
                    obj = {}
                    # set k as parameters from unpaywall
                    k = ['z_authors', 'title', 'published_date', 'doi_url', 'doi']
                    for i in k:
			        # added response to get articles
                        if i in a['response']:
                            obj[i] = a['response'][i]
                    if 'title' in obj:
                        obj['description'] = obj['title']
                        obj['title'] = obj['title']
                        #print(obj['description'])  
                    if 'z_authors' in obj: 
                        try:
                            authorz = []
                            for auth in obj['z_authors']: 
                                if 'family' in auth:
                                    if 'given' in auth:
                                        name = auth['given'] + " " + auth['family'] + " "
                                        authorz.append(name)
                                    else:
                                        authorz.append(auth['family'])
                                else: 
                                    authorz.append("")
                            #authJson = json.dumps(authorz)
                            obj['authors'] = authorz  
                        except:
                            obj['authors'] = obj['z_authors']
                        #print(authorz) 
                    if 'published_date' in obj:
                        obj['datePublished'] = obj['published_date']        
                    if 'doi_url' in obj:
                        obj['url'] = obj['doi_url']
                    obj['database'] = "Unpaywall"
                    mega_json.append(obj)
                except:
                    print('Error occurred while cleaning')
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
    print('Total documents in Unpaywall: ' , len(cleaned_data))