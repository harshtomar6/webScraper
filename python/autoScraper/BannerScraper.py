#Lets Scarap something

import requests
from bs4 import BeautifulSoup
from autoScraping import AutoScraper
from tvScraping import TvScraper
from database import Database
import pprint

class BannerScraper:

	#Constructor
	def __init__(self):
		self.BASE_URI = 'https://fmovies.to'
		r = requests.get(self.BASE_URI+'/fmovies')
		self.soup = BeautifulSoup(r.content, 'html.parser')
		self.bannerDiv = self.soup.find('div', attrs={'class': 'slider'})

	def getThumbnail(self):
		links = self.getMovieLinks()
		images = []
		for link in links:
			r = requests.get(link)
			soup = BeautifulSoup(r.content, 'html.parser')
			thumbDiv = soup.find('div', attrs={'class': 'thumb'})
			urls = thumbDiv.findChildren()[0]['src']
			imageUrl = urls.split('url=')[1]
			image = imageUrl+link.split('/')[4].split('.')[0]+'.jpg'
			images.append(image)

		return images

	def getImages(self):
		banners = self.soup.findAll('div', attrs={'class': 'swiper-slide'})
		images = []

		for banner in banners:
			image = banner['style'].split('&url=')[1]
			images.append(image[:-1])

		return images

	def getTitles(self):
		names = self.bannerDiv.findAll('a', attrs={'class': 'name'})
		titles = []

		for name in names:
			titles.append(name.text)

		return titles

	def getMovieLinks(self):
		names = self.bannerDiv.findAll('a', attrs={'class': 'name'})
		links = []

		for name in names:
			links.append(self.BASE_URI+name['href'])

		return links

	def getDescs(self):
		descs = self.bannerDiv.findAll('p', attrs={'class': 'desc'})
		description = []

		for d in descs:
			description.append(d.text)

		return description

	def getQuality(self):
		quality = self.bannerDiv.findAll('span', attrs={'class': 'quality'})
		qualities = []

		for q in quality:
			qualities.append(q.text)

		return qualities

	def getRatings(self):
		rating = self.bannerDiv.findAll('span', attrs={'class': 'imdb'})
		ratings = []

		for r in rating:
			ratings.append(r.findChildren()[0].text)

		return ratings

	def getGenre(self):
		genres = self.bannerDiv.findAll('span', attrs={'class': 'category'})
		genre = []
		
		for g in genres:
			children = g.findChildren()
			ge = []
			for child in children:
				ge.append(child.text)

			genre.append(ge)

		return genre

	def getStaticData(self):
		names = self.getTitles()
		description = self.getDescs()
		thumb = self.getThumbnail()
		images = self.getImages()
		infoLink = self.getMovieLinks()
		quality = self.getQuality()
		imdb = self.getRatings()
		genre = self.getGenre()

		data = []

		for i in range(0, len(names)):
			data.append({"name": names[i], "description": description[i], "thumb": thumb[i], "image": images[i], "infoLink": infoLink[i], "quality": quality[i], "imdb": imdb[i], "genre": genre[i]})

		return data


if __name__ == '__main__':
	"""bs = BannerScraper()
	data = bs.getStaticData()
	db = Database()
	autoScraper = AutoScraper()

	pp = pprint.PrettyPrinter(indent=4)
	for d in data:
		l = str.split(d['infoLink'], '/')[4]
		link = autoScraper.getLink(d['infoLink'])
		d['playLink'] = link

	db.insert_many(data, 'fmovies_banners')
	pp.pprint(data)"""

	bs = BannerScraper()
	pp = pprint.PrettyPrinter(indent=4)
	pp.pprint(bs.getStaticData())	


