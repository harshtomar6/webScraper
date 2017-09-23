#Lets Scrap some TV-series

import requests
from bs4 import BeautifulSoup
from threading import Thread
from autoScraping import AutoScraper

class TvScraper(Thread):
	#Constructor
	def __init__(self, url):
		Thread.__init__(self)
		self.BASE_URI = 'https://fmovies.to'
		self.final_data = []
		self.url = url
		self.r = requests.get(self.url)
		self.soup = BeautifulSoup(self.r.content, 'html.parser')

	#Check if given link is Tv Series
	def isTvSeries(self):
		lists = self.soup.find('ul', attrs={'class': 'episodes'})
		children = lists.findChildren()
		anchors = []
		for child in children:
			anchors.append(child.find('a'))

		for a in anchors:
			if a == None:
				anchors.remove(a)

		if len(anchors) == 1:
			return False
		return True

	#Get Episode Links
	def getEpisodeList(self):
		lists = self.soup.find('ul', attrs={'class': 'episodes'})
		children = lists.findChildren()
		anchors = []
		for child in children:
			anchors.append(child.find('a'))

		for a in anchors:
			if a == None:
				anchors.remove(a)

		links = []
		for a in anchors:
			links.append(self.BASE_URI+a['href'])

		return links

	def run(self):
		if self.isTvSeries():
			episodes = self.getEpisodeList()

			autoScraper = AutoScraper()
			for episode in range(1, len(episodes)):
				print(episode)
				#self.final_data.append(autoScraper.getLink(episode))
		else:
			print("Fucker")

	def __del__(self):
		self.r.connection.close()
