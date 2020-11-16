import multiprocessing
from database_Core import core
from database_DOAJ import doaj
#from database_Unpaywall import unpaywall

def pp():
    for i in range(10):
        print(i)


keywords = 'search.json'
if __name__ == '__main__':
    p = multiprocessing.Process(target=core, args=(keywords,))
    pdoaj = multiprocessing.Process(target=doaj, args=(keywords,))
    #punpaywall = multiprocessing.Process(target=unpaywall, args=(keywords,))
    p2 = multiprocessing.Process(target=pp)

    p.start()
    pdoaj.start()
    #punpaywall.start()
    p2.start()

    p.join()
    pdoaj.join()
    #punpaywall.start()
    p2.join()