import pandas as pd
from bs4 import BeautifulSoup as bs
import requests


from splinter import Browser

executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)


jplUrl='https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
browser.visit(jplUrl)

browser.click_link_by_partial_text('FULL IMAGE')

fiHtml=browser.html 
fiSoup=bs(fiHtml,'html.parser')

theClass=fiSoup.find('img', class_='fancybox-image')

jplCoreUrl=theClass['src']

print(jplCoreUrl)