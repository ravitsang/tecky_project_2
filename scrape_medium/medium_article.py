# scraping the content in medium using scrapy and create a jsonfile


import scrapy
import json
import codecs
import datetime
import csv
from tomd import Tomd


class MediumSpider(scrapy.Spider):
    name = "medium_article"

    # it returns scrapy.request
    def start_requests(self):

        # read the csv file and make the links into a list

        # with open('./img_pg_links/medium.com.csv') as csv_file:
        #     csv_reader = csv.reader(csv_file, delimiter=',')
        #     links = []
        #     line_count = 0
        #     for row in csv_reader:
        #         print(row[0])
        #         links.append(row[0])
        #         line_count += 1
        #     print(f'Processed {line_count} lines.')

        #     for link in links:
        #         yield scrapy.Request(link, callback=self.parse_article)

        link = "https://medium.com/@andrejsabrickis/scrapping-the-content-of-single-page-application-spa-with-headless-chrome-and-puppeteer-d040025f752b"

        yield scrapy.Request(link, callback=self.parse_article)

    # scrape the title and articles
    def parse_article(self, response):
        title = response.xpath(
            '/html/body/div/div/article/div/section/div/div/div/div[1]/h1/text()').get()

        article_photo = response.xpath(
            '/html/body/div/div/article/div/section[1]/div[1]/div/div/figure/div/div/div/div/img').get()

        author = response.xpath(
            '/html/body/div/div/article/div/section/div/div/div/div[2]/div/div[1]/div[2]/div/div/span/div/span/a/text()').get()
        tag = response.xpath(
            '/html/body/div/div/div[5]/div/div[1]/div/div[3]/ul/li/a/text()').getall()



# *[not(self::d)]

        # loop through all the sections
        
        # img[not(parent::div)]
# *[img[not(parent::div)]]


        # def remove_title_and_author():
            # index = 0
            # for x in response.xpath('/html/body/div/div/article/div/section[1]/div/div/child::*/*[img[not(parent::div)]]').getall():
            #     print(index)
            #     if index != 0:
            #         print(x)
            #         f = open("test2.html", "a+")
            #         f.write(x)
            #         f.close()
            #     index += 1

        def remove_title_and_author():

            x = response.xpath('/html/body/div/div/article/div/section[1]/div/div/*[not(self::div)]').get()
            f = open("test2.html", "a+")
            f.write(x)
            f.close()
         

        def omit_first_section():
            index = 0
            for content in response.xpath('/html/body/div/div/article/div/section').getall():
                if index != 0:
                    print("test")
                    print(content)
                    f = open("test2.html", "a+")
                    f.write(content)
                    f.close()
                index += 1


        remove_title_and_author()
        omit_first_section()




        # yield {"title": title, "author": author, "tag": tag}


# scrapy fetch --nolog https://medium.com/search?q=programming > response.html

# scrapy runspider medium_article.py -o ./data/medium_article.csv
