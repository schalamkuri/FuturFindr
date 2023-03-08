import json
import sys
from googleapiclient.discovery import build

gsearch_key = "AIzaSyBQ3-z04RoOVwb93OevrNok30ZRTXoc4mE"
gsearch_id = "90e585031d91d445c"

# google custom search helper method
# modeled after sample code from google themselves
# https://github.com/googleapis/google-api-python-client/blob/main/samples/customsearch/main.py
def google_search(term):
    # Builds a service object for interacting with the API.
    service = build("customsearch", "v1", developerKey=gsearch_key)
    result = service.cse().list(q=term, cx=gsearch_id, searchType="image").execute()
    # If we have a valid result, return it
    try:
        return result["items"][0]["link"]
    except:
        return None


print(google_search("Grace Christian University"))
