
import urllib.request
import urllib.parse
import json
import uuid
import logging

from Logger import getLogger

_logger = getLogger("HTTP Utils")

# Description: Given a string url, this method will perform a get request and return
#              the response sent back by CORE
# url (string): The URL to be requested
# @return (query response) None will be returned if a server side error occures
def requestURL(url):
    try:
        with urllib.request.urlopen(url) as response:
            html = response.read()
        return html
    except Exception as error:
        _logger.error("Error while requesting: %s" % url)
        _logger.error(str(error))
        return None

# added id generator method
# uuid3 creates a unique id from a namespace and a string(the title, in our example)
# these id's are reproducible, so if 2 id's are made with the same namespace
# and the same name(article_name) they should be equal
# i messed with uuid in pycharm for a while and this method seemed to work
# def id_generator(article_name):
#     unique_id = uuid.uuid3(uuid.NAMESPACE_DNS, article_name)
#     return unique_id


