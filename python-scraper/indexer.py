from threading import Thread
import schedule
import time
import os
import ssl
import logging
import json

# from elasticsearch import Elasticsearch
from database_Core import core
from Logger import getLogger
from database_DOAJ import doaj
# from database_Unpaywall import unpaywall



# Fix SSL issues if they are present: 
if (not os.environ.get('PYTHONHTTPSVERIFY', '') and
    getattr(ssl, '_create_unverified_context', None)): 
    ssl._create_default_https_context = ssl._create_unverified_context
    


# Get logger in context of main indexer class: 
logger = getLogger("mainIndexer")

def runThreads(): 
    keywords = getSearchKeywords()

    # Track runtime
    start_time = time.time()

    # Define the threads that need to be run:
    threadCallBacks = [doaj]
    params = (keywords,)

    # Create the thread objects: 
    threadObjects = []
    for callback in threadCallBacks: 
        t = Thread(target=callback, args=params)
        threadObjects.append(t)
        t.start()
    
    # Join back with all threads to make sure they terminate: 
    for thread in threadObjects:
        try: 
            thread.join()
        except Exception as error: 
            print(error)
  
    # es = Elasticsearch()
    # es.indices.refresh("amr")
    # elasticSearchTotal = es.cat.count("amr")
    # print("Total documents indexed (epoch|timestamp|count): ", elasticSearchTotal)
    e = int(time.time() - start_time) 
    print('All processes done')  
    print('Total indexing time: {:02d}:{:02d}:{:02d}'.format(e // 3600, (e % 3600 // 60), e % 60))

def getSearchKeywords(): 
    # Path to keywords that need to be searched
    # keywords = "python-scraper/search.json"
    keywords = 'search.json'

    # Reading in the search keywords needed and formatting them
    with open(keywords) as f:
        search_terms = json.load(f)['search']
        # Placing quotes and the "AND" keyword at every space
        for i in range(len(search_terms)):
            search_terms[i] = '"' + search_terms[i].replace(' ', ' AND ') + '"'
        # logger.info("Parsed search terms: %s" % search_terms)

        # Returning the list of formatter keywords
        return search_terms
    pass


#Main method: 
if __name__ == '__main__':
    logger.info("Running processes")
    
    runThreads()
    logger.info("Running the schedule")

    # try:
    #     print(" Will rerun the scrapers at 11:59 PM")
    #     schedule.every().day.at("23:59").do(runThreads) #Rerun the scrapers every 11:59 PM
    # except:
    #     print("Error with scheduling")

    # while True: 
    #     try:
    #         schedule.run_pending()
    #         time.sleep(1)
    #     except:
    #         print("Error with scheduling")

