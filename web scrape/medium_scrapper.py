# scraping the content in medium using scrapy and create a jsonfile



import scrapy
import json
import codecs
import datetime
import csv


class MediumSpider(scrapy.Spider):
    name = "medium_scrapper"


    # DEPTH_PRIORITY = 1
    # SCHEDULER_DISK_QUEUE = 'scrapy.squeues.PickleFifoDiskQueue'
    # SCHEDULER_MEMORY_QUEUE = 'scrapy.squeues.FifoMemoryQueue'



    # it returns scrapy.request
    def start_requests(self):

        # Input a urls list
        # urls = [
        #     'https://medium.com/search?q=programming'
        # ]
        # for url in urls:
        #     yield scrapy.Request(url=url, callback=self.parse)

        url = 'https://medium.com/search?q='
        # url = './response.html'
        tag = getattr(self, 'tag', "programming")
        if tag is not None:
            url = url + tag
        yield scrapy.Request(url, self.parse)


    # response holds the page content
    # The parse() method will be called to handle each of the requests for those URLs.
    def parse(self, response):

        # for content in response.css('.section-content > div'):
        #     yield{
        #         "title": content.css('h3 ::text').get(),
        #         "article_starter": content.css('p ::text').get()
        #     }

        # for href in response.css('.postArticle-content > a::attr(href)').getall():
        #     # print(next_page)
        #     yield response.follow(href, callback=self.parse_article)


        # read the csv file and make the links into a list
        with open('./img_pg_links/medium.com.csv') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            links = []
            line_count = 0
            for row in csv_reader:
                print(row[0])
                links.append(row[0])
                line_count += 1
            print(links)
            print(f'Processed {line_count} lines.')

            # provide links to parse_article function to scrape
            for link in links:
                yield response.follow(link, callback=self.parse_article)


    # scrape the title and articles
    def parse_article(self, response):
        title = response.xpath('/html/body/div/div/article/div/section/div/div/div/div[1]/h1/text()').get()
        article = response.css('.n p ::text').getall()
        yield {"title": title,"article": article}


# scrapy fetch --nolog https://medium.com/search?q=programming > response.html

