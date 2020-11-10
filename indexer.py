import multiprocessing
from database_Core import core

def pp():
    for i in range(10):
        print(i)


keywords = 'search.json'
if __name__ == '__main__':
    p = multiprocessing.Process(target=core, args=(keywords,))
    p2 = multiprocessing.Process(target=pp)

    p.start()
    p2.start()

    p.join()
    p2.join()