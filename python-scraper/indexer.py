from threading import Thread
import schedule
import time
import os
import ssl
import logging

# from elasticsearch import Elasticsearch
from database_Core import core
# from database_DOAJ import doaj
# from database_Unpaywall import unpaywall

# Set the logger format
#logging.basicConfig(format='[%(asctime)s] [%(name)s]: %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p') 

def getLogger(name): 
    # create logger
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    # create console handler and set level to debug
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)

    # create formatter
    formatter = logging.Formatter(
        '[%(asctime)s] [%(name)s]: %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')

    # add formatter to ch
    ch.setFormatter(formatter)

    # add ch to logger
    logger.addHandler(ch)
    return logger


# Fix SSL issues if they are present: 
if (not os.environ.get('PYTHONHTTPSVERIFY', '') and
    getattr(ssl, '_create_unverified_context', None)): 
    ssl._create_default_https_context = ssl._create_unverified_context
    


# Path to keywords that need to be searched
keywords = "python-scraper/search.json"
# keywords = 'search.json'

def runThreads(): 
    start_time = time.time()

    # Define the threads that need to be run:
    threadCallBacks = [core]
    params = (keywords,)

    # Create the thread objects 
    threadObjects = []
    for callback in threadCallBacks: 
        print(params)
        t = Thread(target=callback, args=params)
        threadObjects.append(t)
        t.start()
    
    # Join back with all threads
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

# def log():
#     print "%s: %s" % ( threadName, time.ctime(time.time()) )


#Main method: 
if __name__ == '__main__':
    logger = getLogger("mainIndexer")
    logger.info("Running processes")
    # runThreads()
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

"""
- make a log function to print time
- move api keys to separate file
- move the thing that opens the search terms to indexer.py
"""
