import requests
from bs4 import BeautifulSoup
from autoScraping import AutoScraper
from database import Database

class Scraper:
    #Constructor
    def __init__(self, page):
        self.BASE_URI = 'https://fmovies.to'
        r = requests.get(self.BASE_URI+'/movies?'+page)
        self.html_content = r.content
        self.soup = BeautifulSoup(self.html_content, 'html.parser')

    def pretty_print(self):
        return self.soup.prettify()

    def get_title(self):
        return self.soup.title.string

    def get_item(self):
        items = self.soup.findAll('a', attrs={'class': 'name'})
        data = []
        for item in items:
            data.append({'name' : item.text, 'src': self.BASE_URI+item['href']})

        return data

if __name__ == '__main__':
    pageList =   ['page=81']
    autoScraper = AutoScraper()

    for page in pageList:
        scraper = Scraper(page)
        data = scraper.get_item()
        db = Database()

        updated_data = []
        for d in data:
            link = autoScraper.getLink(d['src'])
            if link != 'oops':
                updated_data.append({"name": d['name'], "link": link})
            else:
                print(link)

        #print(updated_data)
        #autoScraper.close()

        db.insert_many(updated_data, 'fmovies')
