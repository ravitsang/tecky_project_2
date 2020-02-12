# scraping the content in medium using scrapy and create a jsonfile



import scrapy
import json
import codecs
import datetime
import csv
from tomd import Tomd

class MediumSpider(scrapy.Spider):
    name = "medium"

    # it returns scrapy.request
    def start_requests(self):
                # read the csv file and make the links into a list
        with open('./img_pg_links/medium.com.csv') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            links = []
            line_count = 0
            for row in csv_reader:
                print(row[0])
                links.append(row[0])
                line_count += 1
            # print(links)
            print(f'Processed {line_count} lines.')

            # links = "https://medium.com/incedge/web-scraping-bf2d814cc572?source=search_post"
            # print(links)
            # print('hi')
            # provide links to parse_article function to scrape
            for link in links:
                yield scrapy.Request(link, callback=self.parse_article)


# https://towardsdatascience.com/how-to-web-scrape-with-python-in-4-minutes-bc49186a8460

    # scrape the title and articles
    def parse_article(self, response):
        title = response.xpath('/html/body/div/div/article/div/section/div/div/div/div[1]/h1/text()').get()
        article = response.xpath('/html/body/div/div/article/div').get()
        
        title_markdown = Tomd(title).markdown
        article_markdown = Tomd(article).markdown

        print("test")
        print(title_markdown)
        print(article_markdown)

        f = open("test.md","a+")
        f.write(article_markdown)
        f.close() 

        yield {"title": title_markdown,"article": article_markdown}


# scrapy fetch --nolog https://medium.com/search?q=programming > response.html

