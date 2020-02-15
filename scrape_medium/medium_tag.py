# scraping the content in medium using scrapy and create a jsonfile



import scrapy
import json
import codecs
import datetime


class MediumSpider(scrapy.Spider):
    name = "medium_tag"

    # it returns scrapy.request
    def start_requests(self):


        link = "https://medium.com/"
        print(link)

        yield scrapy.Request(link, callback=self.parse_article)


    # scrape the title and articles
    def parse_article(self, response):
        
        tags = response.xpath('/html/body/div/div/div[4]/div/div/div[2]/div/text()').getall()

        print("test")
        #index = 0
        for tag in tags:
            yield {"tag": tag}


# https://medium.com/get-started?redirectUrl=https%3A%2F%2Fmedium.com%2Fm%2Fsignin%3Foperation%3Dregister%26redirect%3Dhttps%253A%252F%252Ftowardsdatascience.com%252Fa-minimalist-end-to-end-scrapy-tutorial-part-i-11e350bcdec0