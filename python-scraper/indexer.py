from threading import Thread
import schedule
import time
import os
import ssl

# from elasticsearch import Elasticsearch
from database_Core import core
# from database_DOAJ import doaj
# from database_Unpaywall import unpaywall


if (not os.environ.get('PYTHONHTTPSVERIFY', '') and
    getattr(ssl, '_create_unverified_context', None)): 
    ssl._create_default_https_context = ssl._create_unverified_context
    

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


if __name__ == '__main__':
    print("Running processes")
    runThreads()
    print("Running the schedule")

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
