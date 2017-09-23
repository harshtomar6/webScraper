
#let's watch something and by something I mean websites

import requests
from bs4 import BeautifulSoup
from BannerScraper import BannerScraper
from database import Database

class Watcher():
	#Constructor
	def __init__(self):
		self.db = Database()
		self.bs = BannerScraper()

	#Watch for Banner update
	def watch_banner(self):
		db_data = self.db.find_in_banner()
		current_data = self.bs.getTitles()

		found = False

		for d in db_data:
			if self.__isPresent(d['name'], current_data):
				print("this one is there... Checking next")
			else:
				print("Found a movie")
				found = True

		if(found):
				return "You got new data"
		else:
				return "No data"

	def __isPresent(self, ele, arr):
		for a in arr:
			if a == ele:
				return True

		return False


if __name__ == '__main__':
	watcher = Watcher()
	print(watcher.watch_banner())