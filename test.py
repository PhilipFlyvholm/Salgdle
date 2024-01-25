import requests
import json 
from bs4 import BeautifulSoup

url = "https://www.dingeo.dk/_ah/api/tilsalgboendpoint/v1/getTilSalgMysqlGeoSpatial"


# Options "Villa", "Raekkehus", "Ejerlejlighed", "Andelsbolig", "Villalejlighed", "Landejendom", "Fritidshus", "Helaarsgrund", "Fritidsgrund", "Tvangsauktion"
boligtype = ["Villa", "Raekkehus", "Ejerlejlighed", "Andelsbolig", "Villalejlighed"]
southWestLat = "undefined"
southWestLon = "undefined"
northEastLat = "undefined"
northEastLon = "undefined"
prisinterval = "0,10000000"
noiseinterval = "0,75"
mobilinterval = "0,200"
byggeaarinterval = "1900,2022"
liggetidinterval = "0,1"
mastinterval = "0,5000"
indbrudinterval = "0,10"
bevaringsvaerdiinterval = "1,10"
energimaerkeinterval = "A,G"
page = 1
perpage = 12
orderby = "order%20by%20updatedate%20desc,%20boligaUniqueNumber%20asc"


def createUrl():
    boligtypeString = [ f"boligtype={boligtype[i]}" for i in range(len(boligtype)) ]
    boligtypeString = "&".join(boligtypeString)
    return f"{url}?{boligtypeString}&southWestLat={southWestLat}&southWestLon={southWestLon}&northEastLat={northEastLat}&northEastLon={northEastLon}&prisinterval={prisinterval}&noiseinterval={noiseinterval}&mobilinterval={mobilinterval}&byggeaarinterval={byggeaarinterval}&liggetidinterval={liggetidinterval}&mastinterval={mastinterval}&indbrudinterval={indbrudinterval}&bevaringsvaerdiinterval={bevaringsvaerdiinterval}&energimaerkeinterval={energimaerkeinterval}&page={page}&perpage={perpage}&orderby={orderby}"

print(createUrl())

#url = createUrl()
#response = requests.get(url, headers={'accept': 'application/json, text/plain, */*', 'user-agent': 'Mozilla/5.0'})
#print(response.headers['content-type'])
#response = json.loads(response.text)
#print(response)


res = requests.get("https://www.boliga.dk/bolig/2067622", headers={'user-agent': 'Mozilla/5.0'})
soup = BeautifulSoup(res.text, 'html.parser')

# Create file to write soup content to
with open("soup_content.html", "w") as file:
    file.write(str(soup.prettify()))

import re

def find_matches_by_id_and_pattern(id_value):
    # Construct the regex pattern with the provided id and flexible placeholders    
    pattern = f"(https:\/\/i\.boliga\.org\/dk\/(max|(\d+x))\/\d+\/{id_value}(-\d+)?\.jpg)"
    print(pattern)
    print(re.match(pattern, "https://i.boliga.org/dk/550x/2067/2067622.jpg"))
    print(re.match(pattern, "https://i.boliga.org/dk/max/2067/2067622.jpg"))
    print(re.match(pattern, "https://i.boliga.org/dk/max/2067/2067622-5.jpg"))
    # Use re.findall to find all matches in the example strings
    matches = re.findall(pattern, soup.prettify())

    return matches


# Example usage with flexible placeholders
id_to_search = "2067622"
result = find_matches_by_id_and_pattern(id_to_search)
print(f"Matches for ID {id_to_search} and flexible pattern: {result}")

