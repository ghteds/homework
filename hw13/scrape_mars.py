import pandas as pd 
from bs4 import BeautifulSoup as bs
from splinter import Browser
import time

def scrape():
    #connect splint
    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=True)

    #nasa news
    theMUrl='https://mars.nasa.gov/news/'
    browser.visit(theMUrl)
    mHTML=browser.html
    mSoup = bs(mHTML, 'html.parser')
    latestNewsTitle=mSoup.find('div', class_='content_title')
    newsTitle=latestNewsTitle.get_text().strip()
    latestNewsText=mSoup.find('div', class_='article_teaser_body')
    newsText=latestNewsText.get_text().strip()
    #jpl
    jplUrl='https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(jplUrl)
    browser.click_link_by_partial_text('FULL IMAGE')
    #need delay for page to load properly... maybe it's better to check if page is loaded b4 proceeding?
    time.sleep(1)
    #jplHTML=browser.html
    #jplSoup=bs(jplHTML,"html.parser")
    #browser.click_link_by_text(jplSoup.find('footer').a.text)
    #featured image (fi)

    fiHtml=browser.html
    fiSoup=bs(fiHtml,'html.parser')
    #print("--------- THis is our fiSoup type: " ,type(fiSoup))
    #theClass=fiSoup.find('img', class_='fancybox-image')
    jplCoreUrl=fiSoup.find('img', class_='fancybox-image')['src']
    #print("--------- THis is our class type: " ,type(theClass))
    #print(theClass)
    #jplCoreUrl=theClass['src']
    #print("--------- THis is our object type: " ,type(jplCoreUrl))
    jplUrlPrefix='https://www.jpl.nasa.gov' 
    jplImgUrl=jplUrlPrefix + jplCoreUrl
    #jplImgUrl=browser.url

    #jplImgUrl=backgroundImage[backgroundImage.find("(")+2:backgroundImage.find(")")-1]
    #weather
    marsWeatherUrl='https://twitter.com/marswxreport?lang=en'
    browser.visit(marsWeatherUrl)
    weatherHtml=browser.html
    weatherSoup=bs(weatherHtml,'html.parser')
    marsWeather=weatherSoup.find("p", class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text").text

    #Facts
    mfUrl='https://space-facts.com/mars/'
    mfTable=pd.read_html(mfUrl)
    mfDf=mfTable[0]
    mfDf.rename(columns={0:'Item',1:'Value'}, inplace=True)
    mfDf.set_index('Item',inplace=True)
    marsFacts=mfDf.to_html()

    #Hemispheres
    mhUrl='https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(mhUrl)
    mhHtml=browser.html
    mhSoup=bs(mhHtml, 'html.parser')
    thePicsSections=mhSoup.find('div', class_='collapsible results')
    theDescriptions=thePicsSections.find_all('div',class_='description')
    mhDict={}
    theCount=1
    for url in theDescriptions:
        title= url.a.h3.text
        #theHref=url.a['href']
        #print(title)
        browser.click_link_by_partial_text(title)
        theImgHTML=browser.html
        imgSoup = bs(theImgHTML,'html.parser')
        theUrl = imgSoup.find('a',text='Sample')['href']
        #print(theUrl)
        mhDict[f'Title{theCount}']=title
        mhDict[f'URL{theCount}']=theUrl
        theCount= theCount +1
        browser.back()

    #the output
    output = { \
            'news_title':newsTitle, \
            'news_p': newsText, \
            'featured_image_url': jplImgUrl, \
            'mars_weather': marsWeather, \
            'mars_facts': marsFacts, \
            'hemisphere_image_urls': mhDict \
        }
    return output


#print(scrape())