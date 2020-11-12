import multiprocessing
from database_DOAJ import core
#from database_DOAJ import doaj
#from database_Unpaywall import core

def pp():
    for i in range(10):
        print(i)


keywords = 'search.json'
if __name__ == '__main__':
    p = multiprocessing.Process(target=core, args=(keywords,))
    #pdoaj = multiprocessing.Process(target=doaj, args=(keywords,))
    #p = multiprocessing.Process(target=core, args=(keywords,))
    p2 = multiprocessing.Process(target=pp)

    p.start()
    #pdoaj.start()
    p2.start()

    p.join()
    #pdoaj.join()
    p2.join()