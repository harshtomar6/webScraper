import requests
from bs4 import BeautifulSoup
from autoScraping import AutoScraper
from database import Database
import pprint

class Scraper:
    #Constructor
    def __init__(self, page):
        self.BASE_URI = 'https://fmovies.to'
        r = requests.get(self.BASE_URI+'/movies?'+page)
        self.html_content = r.content
        self.soup = BeautifulSoup(self.html_content, 'html.parser')

    def getName(self):
        items = self.soup.findAll('a', attrs={'class': 'name'})
        names = []

        for item in items:
            names.append(item.text)

        return names

    def getMovieLinks(self):
        items = self.soup.findAll('a', attrs={'class': 'name'})
        links = []

        for item in items:
            links.append(self.BASE_URI+item['href'])

        return links

    def getImage(self):
        div = self.soup2.find('div', attrs={'class': 'cover'})
        try:
            image_attr = div['style']
        except:
            image_attr = "oooourl=000000"
        if image_attr != "background-image: url('')":
            image_attr = image_attr.split("url=")[1]
        print(image_attr[:-2])

        return image_attr[:-2]

    def getThumbnail(self, link):
        thumbDiv = self.soup2.find('div', attrs={'class': 'thumb'})
        urls = thumbDiv.findChildren()[0]['src']
        imageUrl = urls.split('url=')[1]
        image = imageUrl+link.split('/')[4].split('.')[0]+'.jpg'
        
        return image

    def getRating(self):
        div = self.soup2.find('div', attrs={'class': 'meta'})
        bold = div.find('b')

        return bold.text

    def getDuration(self):
        div = self.soup2.find('div', attrs={'class': 'meta'})
        bold = div.findAll('b')
        
        return (bold[1].text)

    def getMeta(self):
        data = []
        final_data = {}
        div = self.soup2.findAll('dl', attrs={'class': 'meta'})
        dd = []

        for d in div:
            dd.append(d.findAll('dd'))

        for e in dd:
            for f in e:
                data.append(f.text)
        
        final_data['genre'] = data[0].split(',')
        final_data['cast'] = data[1].split(',')
        final_data['director'] = data[2]
        final_data['country'] = data[3]
        final_data['released'] = data[5]
        final_data['quality'] = data[6]
        
        return final_data

    def getInfo(self):
        #links = self.getMovieLinks()

        return self.getMeta("https://fmovies.to/film/leatherface.37pl9")

    def get_item(self):
        data = []

        names = self.getName()
        movieLinks = self.getMovieLinks()
        images = []
        thumbnail = []
        imdb = []
        duration = []
        metas = []

        for link in movieLinks:
            r = requests.get(link)
            self.soup2 = BeautifulSoup(r.content, 'html.parser')
            images.append(self.getImage())
            thumbnail.append(self.getThumbnail(link))
            imdb.append(self.getRating())
            duration.append(self.getDuration())
            metas.append(self.getMeta())

        for i in range(0, len(names)):
            data.append({"name": names[i], "infoLink": movieLinks[i], "image": images[i], "thumbnail": thumbnail[i], "meta": {"imdb": imdb[i], "duration": duration[i], "genre": metas[i]['genre'], "cast": metas[i]['cast'], "director": metas[i]['director'], "country": metas[i]['country'], "released": metas[i]['released'], "quality": metas[i]['quality']}})

        return data

if __name__ == '__main__':
    pageList =   ['page=13', 'page=14', 'page=15', 'page=16']
    #autoScraper = AutoScraper()

    for page in pageList:
        scraper = Scraper(page)
        data = scraper.get_item()
        db = Database()

        """updated_data = []
        for d in data:
            link = autoScraper.getLink(d['src'])
            if link != 'oops':
                updated_data.append({"name": d['name'], "link": link})
            else:
                print(link)"""

        #print(updated_data)
        #autoScraper.close()

        db.insert_many(data, 'allmovies')
