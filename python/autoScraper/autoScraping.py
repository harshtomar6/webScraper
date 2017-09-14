from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

class AutoScraper:
    #Constructor
    def __init__(self):
        options = Options()
        options.binary_location = "C:\Program Files (x86)\Baglook\Application\chrome.exe"

        self.browser = webdriver.Chrome(chrome_options=options)

    def getLink(self, url):
        self.browser.get(url)
        try:
            element = self.browser.find_element_by_class_name('cover')
            element.click()
            self.browser.switch_to_window(self.browser.window_handles[0])
            time.sleep(5)
            frame = self.browser.find_element_by_tag_name('video')
        except:
            return 'oops'
        return frame.get_attribute('src')

    def close(self):
        self.browser.close()
