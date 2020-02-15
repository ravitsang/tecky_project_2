How Xpath Plays Vital Role In Web Scraping Part 2
=================================================

[![Sandra K](https://miro.medium.com/fit/c/96/96/2*mIH5vdwhAOewjJjvRqoZ1Q.png)](/@sandra_21783?source=post_page-----fd32e6c45c65----------------------)

[Sandra K](/@sandra_21783?source=post_page-----fd32e6c45c65----------------------)

Follow

[Aug 26, 2016](/@sandra_21783/how-xpath-plays-vital-role-in-web-scraping-part-2-fd32e6c45c65?source=post_page-----fd32e6c45c65----------------------) · 4 min read

To read the first part of this blog do read:

[

How Xpath Plays Vital Role In Web Scraping - Data hut


---------------------------------------------------------

### 

XPath is a language for finding information in structured documents like XML or HTML. You can say that XPath is (sort…

#### 

blog.datahut.co



](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping/)

Here is a piece of content on Xpaths which is the follow up of [How Xpath Plays Vital Role In Web Scraping](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping/)

Let’s dive into a real-world example of scraping amazon website for getting information about deals of the day. Deals of the day in amazon can be found at this . So navigate to the (deals of the day) in Firefox and find the XPath selectors. Right click on the deal you like and select “Inspect Element with Firebug”:

If you observe the image below keenly, there you can find the source of the image(deal) and the name of the deal in src, alt attribute’s respectively. So now let’s write a generic XPath which gathers the name and image source of the product(deal). //img\[@role=”img”\]/@src ## for image source //img\[@role=”img”\]/@alt ## for product name

In this post, I’ll show you some tips we found valuable when using XPath in the trenches.

If you have an interest in Python and web scraping, you may have already played with the nice [requests library](http://docs.python-requests.org/) to get the content of pages from the Web. Maybe you have toyed around using [Scrapy selector](http://doc.scrapy.org/en/latest/topics/selectors.html) or to make the content extraction easier. Well, now I’m going to show you some tips I found valuable when using XPath in the trenches and we are going to use both and [Scrapy selector](http://doc.scrapy.org/en/latest/topics/selectors.html) for HTML parsing.

Avoid using expressions which contains(.//text(), ‘search text’) in your XPath conditions. Use contains(., ‘search text’) instead.

Here is why: the expression .//text() yields a collection of text elements — a node-set(collection of nodes).and when a node-set is converted to a string, which happens when it is passed as argument to a string function like contains() or starts-with(), results in the text for the first element only.

**Scrapy Code:**

from scrapy import Selector  
html\_code = “””<a href=”#”>Click here to go to the <strong>Next Page</strong></a>”””  
sel = Selector(text=html\_code)  
print xp(‘//a//text()’)  
xp = lambda x: sel.xpath(x).extract() # Let’s type this only once # Take a peek at the node-set  
\[u’Click here to go to the ‘, u’Next Page’\] # output of above command  
print xp(‘string(//a//text())’) # convert it to a string # output of the above command  
\[u’Click here to go to the ‘\]

Let’s do the above one by using lxml then you can implement XPath by both lxml or Scrapy selector as XPath expression is same for both methods.

**lxml code:**

from lxml import html  
html\_code = “””<a href=”#”>Click here to go to the <strong>Next Page</strong></a>””” # Parse the text into a tree  
parsed\_body = html.fromstring(html\_code) # Perform xpaths on the tree  
print parsed\_body(‘//a//text()’) # take a peek at the node-set  
\[u’Click here to go to the ‘, u’Next Page’\] # output  
print parsed\_body(‘string(//a//text())’) # convert it to a string  
\[u’Click here to go to the ‘\] # output

A node converted to a string, however, puts together the text of itself plus of all its descendants:

\>>> xp(‘//a\[1\]’) # selects the first a node  
\[u’<a href=”#”>Click here to go to the <strong>Next Page</strong></a>’\]

\>>> xp(‘string(//a\[1\])’) # converts it to string  
\[u’Click here to go to the Next Page’\]

Beware of the difference between //node\[1\] and (//node)\[1\]//node\[1\] selects all the nodes occurring first under their respective parents and (//node)\[1\] selects all the nodes in the document, and then gets only the first of them.

from scrapy import Selector

sel = Selector(text=html\_code)  
xp = lambda x: sel.xpath(x).extract()

xp(“//li\[1\]”) # get all first LI elements under whatever it is its parent

xp(“(//li)\[1\]”) # get the first LI element in the whole document

xp(“//ul/li\[1\]”) # get all first LI elements under an UL parent

xp(“(//ul/li)\[1\]”) # get the first LI element under an UL parent in the document

//a\[starts-with(@href, ‘#’)\]\[1\] gets a collection of the local anchors that occur first under their respective parents and (//a\[starts-with(@href, ‘#’)\])\[1\] gets the first local anchor in the document.

When selecting by class, be as specific as necessary.

If you want to select elements by a CSS class, the XPath way to do the same job is the rather verbose:

**\*\[contains(concat(‘ ‘, normalize-space(@class), ‘ ‘), ‘ someclass ‘)\]**

Let’s cook up some examples:

\>>> sel = Selector(text=’<p class=”content-author”>Someone</p><p class=”content text-wrap”>Some content</p>’)

\>>> xp = lambda x: sel.xpath(x).extract()

BAD: because there are multiple classes in the attribute

\[\]

BAD: gets more content than we need

\>>> xp(“//\*\[contains(@class,’content’)\]”)

\[u’<p class=”content-author”>Someone</p>’, u’<p class=”content text-wrap”>Some content</p>’\]

\>>> xp(“//\*\[contains(concat(‘ ‘, normalize-space(@class), ‘ ‘), ‘ content ‘)\]”)  
\[u’<p class=”content text-wrap”>Some content</p>’\]

And many times, you can just use a CSS selector instead, and even combine the two of them if needed:

\>>> sel.css(“.content”).extract()  
\[u’<p class=”content text-wrap”>Some content</p>’\]

\>>> sel.css(‘.content’).xpath(‘@class’).extract()  
\[u’content text-wrap’\]

Learn to use all the different axes.

It is handy to know how to use the axes, you can follow through these examples .

In particular, you should note that following and following-sibling are not the same thing, this is a common source of confusion. The same goes for preceding and preceding-sibling, and also ancestor and parent.

**Useful trick to get text content**

Here is another XPath trick that you may use to get the interesting text contents:

//\*\[not(self::script or self::style)\]/text()\[normalize-space(.)\]

This excludes the content from the script and style tags and also skip whitespace-only text nodes.

Tools & Libraries Used:

Firefox  
Firefox inspect element with firebug  
Scrapy : 1.1.1  
Python : 2.7.12  
Requests : 2.11.0

Have questions? Comment below. Please share if you found this helpful.

Read the original article here: [https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping-part-2/](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping-part-2/)

* * *

_Originally published at_ [_https://blog.datahut.co_](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping-part-2/) _on August 26, 2016._

100 Days of Code — Day 5 of 100
===============================

[![Victoria Lo](https://miro.medium.com/fit/c/96/96/2*ukM4UJE841N2TQ4YoDkTWQ.png)](/@victoria2666?source=post_page-----c368583a1b2c----------------------)

[Victoria Lo](/@victoria2666?source=post_page-----c368583a1b2c----------------------)

Follow

[Feb 7](/@victoria2666/100-days-of-code-day-5-of-100-c368583a1b2c?source=post_page-----c368583a1b2c----------------------) · 2 min read

Today’s project is a web scraper! I have always been curious about what web scraping is about and how to do it.

Apparently, after hours of researching, there is an easy way to do it using Puppeteer. I followed a youtube tutorial closely and I got it done in less than an hour! Yay! Or so I thought…

My initial plan was to scrape some data then display it on a HTML page. So as usual, I attached <script> to my HTML but something went very wrong…

ERROR: ‘require is not defined’. Oh boy, I thought. So I researched what this error is about and apparently the keyword require cannot be used for client-side execution. In other words, no browsers. Boo.

It took me another 2 hours and more to figure out what to do from here. Am I satisfied with just this back-end but completed web scraper? Or do I want a page too? After browsing and reading about browserify, I decided to have a page! But… Oh dear. Issues after issues that I don’t understand. After researching more, I’m back to square one — which is having no page because apparently, Browserify and Puppeteer don’t like each other…

Ok, so fine, I thought. Let’s just push this to gitHub without the front-end… ERROR! File exceeded 100MB! \*slaps face\* Nothing seems to be going right today… It turns out that the “node\_modules” folder which contains the Puppeteer module is over 145MB and I honestly have no idea why it is so large so I deleted it and put it in the README.md. The long day seems to finally come to an end.

But wait! The front-end is not complete. All I have now is some data scraped by scraper.js. I can’t let it go to waste! So I save them to the JSON file while learning about File System in Nodejs. Very handy! After saving the JSON, I load it up to a HTML page into a table dynamically (learned from [Day 3](/@victoria2666/100-days-of-code-day-3-of-100-d2141c4e7932))! BAM! Front and back now all covered and this noob feels accomplished for the day.

**The Project:** [GameScraper](https://victoria-lo.github.io/GameScraper/)

**What I Learn:**

*   WEB SCRAPING!
*   Save data to local JSON using File System module
*   Using Puppeteer and how large it is in memory
*   GitHub’s size limit is 100MB (good to know)
*   There’s too much StackOverflow forums addressing the same issues/problems that my brain got overloaded

**What I Did Not Learn:**

*   Browserify
*   How to make require() work for client-side
*   Why Puppeteer is so large

**Thoughts:**

Today was exhausting because it felt like I made no progress ever since I got the scraper running. The scraper is the main topic I want to learn today so actually, I could have been done within an hour but I just had to be all ambitious and research stuff. But it all ended in vain so it felt exhausting to me. Overall, I am still glad that I learnt how to scrape data from other sites.

Scrapping the content of single-page application (SPA) with headless Chrome and puppeteer
=========================================================================================

[![Andrejs Abrickis](https://miro.medium.com/fit/c/96/96/2*0kyh9TAgRWsvoE9U4BOFnw.jpeg)](/@andrejsabrickis?source=post_page-----d040025f752b----------------------)

[Andrejs Abrickis](/@andrejsabrickis?source=post_page-----d040025f752b----------------------)

Follow

[Jan 14, 2019](/@andrejsabrickis/scrapping-the-content-of-single-page-application-spa-with-headless-chrome-and-puppeteer-d040025f752b?source=post_page-----d040025f752b----------------------) · 5 min read

![](https://miro.medium.com/max/60/0*Nm6YR258nleQ3_PN?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/12000/0\*Nm6YR258nleQ3\_PN" width="6000" height="4000" role="presentation">

Photo by [Pankaj Patel](https://unsplash.com/@pankajpatel?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

TL;DR
=====

All the code examples from this articles you can find on a GitHub repository [https://github.com/AndrejsAbrickis/axios-cheerio-puppeteer](https://github.com/AndrejsAbrickis/axios-cheerio-puppeteer)

* * *

Axios and cheerio is a great toolset to fetch and scrape the content of a static web page. But nowadays when many of the websites are built as a single page application and gets rendered dynamically on the client it might not be possible to get the content.

Just because it’s rendered asynchronously and the content is not backed into the HTML received over the wire, doesn’t mean you cannot access it. You just need a different toolset which allows waiting for the content to appear.

Let’s have a quick look on the source HTML of a SPA application and the rendered result.

![](https://miro.medium.com/max/60/1*rf9VXhBcni3ub-I_UHO9Ug.png?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/5584/1\*rf9VXhBcni3ub-I\_UHO9Ug.png" width="2792" height="1538" role="presentation">

Screenshot of the beach volleyball standing on [https://bvopen.abrickis.me/#/standings](https://bvopen.abrickis.me/#/standings)

In the screenshot above, on the left, you can see a fully rendered standings table. But look at the source the browser downloaded all we can notice is a single `<div id="#app"></div>` and a couple of JavaScript files and NO content. So let’s try to get the HTML content of the body.

Start with axios + cheerio
==========================

[axios](https://github.com/axios/axios) is a “Promise based HTTP client for the browser and node.js”. Because it’s an HTTP client we can use it to fetch an HTTP endpoint and receive the response with the body. We can use the HTTP client to fetch not only HTML endpoint but also JSON, images, etc. And hence we are responsible to handle the plain text response.

That’s where the cheerio comes to help. [Cheerio](https://github.com/cheeriojs/cheerio) is a “Fast, flexible & lean implementation of core jQuery designed specifically for the server”. Basically, it loads and parses the HTML markup as plain text and returns a DOM model we can then access and traverse in jQuery style.

And because cheerio doesn’t interpret the markup as a browser does. It won’t apply the CSS styles and won’t run the JavaScript and the dynamically rendered content won’t be added to the DOM.

As an example let’s try to get the content of the body tag using axios and cheerio. In the following gist you can see that we are firing a GET request (L6), then parse the response data into a DOM using cheerio (L7) and finally search for the `<body>` element (L9) to output its HTML content.

When executed this node script we get the web apps placeholder element `<div id="app">` without the dynamically rendered content.

![](https://miro.medium.com/max/60/1*DcGa07rn0f0HPFs0tP_nHg.png?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/2048/1\*DcGa07rn0f0HPFs0tP\_nHg.png" width="1024" height="277" role="presentation">

Because of what we received over the wire was a plain text and the JavaScripts included in the HTML were not executed and this is where a headless browser comes to rescue.

Switch to puppeteer and headless Chrome
=======================================

Let me shortly explain what a [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) browser is. In a nutshell headless means it’s a browser without graphical user interface (GUI) which can be controlled programmatically. Mostly it’s useful for E2E testing as it will apply all styles, and run JavaScript to generate the DOM. And because of that, it’s a perfect tool to scrape Single Page Applications.

And as I mentioned that it’s controlled programmatically. And for that reason, we can use puppeteer to control the browser over the [DevTools](https://chromedevtools.github.io/devtools-protocol/) protocol. Let’s get hands-on and see how to get the dynamically rendered HTML.

In the example above we are using single dependancy pf puppeteer package. First, we initialize a browser instance (L5) and create a new browser page (L6). Afterward, we instruct the browser page to visit an URL (L7) and wait for an element to appear on the page (L8) before to continue. Notice that one can set the timeout in milliseconds how long the browser should wait for the element.

After we have awaited the element we are using page’s evaluate method to execute a JavaScript within the web page’s context (L10 — L12). This allows us to access the HTML document using vanilla DOM API. From this, we return the HTML of body element and output. And finally, we close the browser which kills the headless Chrome’s process.

![](https://miro.medium.com/max/60/1*sIEBwWRmcf3544YxRTiu3w.png?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/2048/1\*sIEBwWRmcf3544YxRTiu3w.png" width="1024" height="277" role="presentation">

A part of the output

And now the result of running this script includes the content of dynamically rendered HTML.

Conclusion
==========

This short post demonstrated two solutions how to scrape a website. One can use a combination of axios and cheerio to get the content of a statically rendered website. And use puppeteer to get a dynamical content which is rendered by a fully-powered and invisible (headless) browser.

I hope this article will help you to start to utilize the mentioned tools as they can be used not only to scrape the websites but also for testing your web apps (E2E or snapshot tests) or taking screenshots.

* * *

If you found this post useful and would like to read more about random web development topics, just clap for this article or drop a comment here. And as always you can find me on [Twitter@andrejsabrickis](https://twitter.com/andrejsabrickis)

* * *

This article, the content, and opinions expressed on Medium are my own. But as I work for one of the [leading P2P loans marketplaces Mintos.com](https://www.mintos.com/en/) I would like to use this last line to promote that we are hiring. Including the Growth Engineering team, I am leading at the moment.

You can see all list of the [open positions on our Workable board](https://mintos.workable.com). And feel free to contact me directly if you find something interesting in the list or would like to recommend a person you know.

Cheers!

How to Scrape Data from Web Pages for Sentiment Analysis?
=========================================================

[![X-Byte Enterprise Crawling](https://miro.medium.com/fit/c/96/96/0*58raBoA0H70LX-hG.jpg)](/@xbytecrawling?source=post_page-----927b31b08f36----------------------)

[X-Byte Enterprise Crawling](/@xbytecrawling?source=post_page-----927b31b08f36----------------------)

Follow

[Nov 27, 2019](/@xbytecrawling/how-to-scrape-data-from-web-pages-for-sentiment-analysis-927b31b08f36?source=post_page-----927b31b08f36----------------------) · 4 min read

![HOW TO SCRAPE DATA FROM WEB PAGES FOR SENTIMENT ANALYSIS?](https://miro.medium.com/max/60/1*oa1PS-Ldgr4M5RByT-9udg.png?q=20)

<img alt="HOW TO SCRAPE DATA FROM WEB PAGES FOR SENTIMENT ANALYSIS?" class="cp t u gi ak" src="https://miro.medium.com/max/2342/1\*oa1PS-Ldgr4M5RByT-9udg.png" width="1171" height="510">

Scrape Data from Web Pages for Sentiment Analysis Image

Today, Businesses can understand their customers’ reactions with the help of many available tools. They can analyze if the customers have liked the layout or not, get the existing offers, did the services please them? The increased data volume is valuable to evaluate success as well as draw insights about the future.

![](https://miro.medium.com/max/60/0*nERODEcq6J1r5E3Z.png?q=20)

<img class="cp t u gi ak" src="https://miro.medium.com/max/2342/0\*nERODEcq6J1r5E3Z.png" width="1171" height="510" role="presentation">

At [**_X-Byte Enterprise Crawling_**](https://www.xbyte.io/), We are a Data-as-a-Service provider, so we understand the importance of this data as well as help you get valuable insights through our Data Scraping Services. We Extract Websites and Scrape Structured Data that can be utilized to derive some insights. We provide the [**_best webpage data scraping_**](https://www.xbyte.io/service/web-scraping-service/) for sentiment analysis services to help your business do better with real time sentiment analysis of social media platform data.

We Help Extract Products’ User Reviews
======================================

Being a [**_web scraping service_**](https://www.xbyte.io/service/web-scraping-service/) provider, we make that easier to scrape data from the web. With our professional webpage data scraping services for sentiment analysis, you just need to provide us the websites list that you want to scrape for sentiment analysis with the required fields as well as the frequency that you wish the data to. With our personalized crawlers as well as progressive computing stacks, we have retrieved the data in a format you want (generally JSON, CSV, XML,). You can ask for the data through our API or even get the data provided to your AWS or FTP location.

How Important the Sentiment Analysis Is?
========================================

![How Important the Sentiment Analysis Is?](https://miro.medium.com/max/60/0*hwyQV4JiYG87AoYj.png?q=20)

<img alt="How Important the Sentiment Analysis Is?" class="cp t u gi ak" src="https://miro.medium.com/max/2342/0\*hwyQV4JiYG87AoYj.png" width="1171" height="510">

As the data scraping is really challenging, we do replicate on how the opinion mining could help our business enterprise clients do better. Sentiment Analysis or Opinion Mining copes with automatic data scanning as well as establishing its purpose or nature. Basically, it is very important to define if the text extracted and scraped from the website is helpful or not; or whether it associates with the subject which is given in the title.

Study of Sentiment Analysis Functions
=====================================

![Study of Sentiment Analysis Functions](https://miro.medium.com/max/60/0*sCoU-BjYVtG2bmmC.png?q=20)

<img alt="Study of Sentiment Analysis Functions" class="cp t u gi ak" src="https://miro.medium.com/max/2342/0\*sCoU-BjYVtG2bmmC.png" width="1171" height="510">

The functions of Sentiment Analysis of Twitter or Sentiment Analysis of Facebook could be to analyze records (product feedback, user reviews, services feedback forms, etc.) as well as specify feelings expressed (dissatisfaction, happiness, etc.). On the easy scale, it can be attained by creating a rating system from 1–10 where every word is usually associated with emotions. The scores of every word, as well as the entire text, is calculated to observe what the sentiments or opinions are indicated.

The added methodology is objectivity or subjectivity identification. Here, scraped data is verified for being objective or subjective. Though, this might prove to be tough as results of assessments are person-specific.

Maybe the most advanced type is Feature-Based Sentiment Analysis. Here, individuals give opinions about users that are scraped from the text about a definite service or product and then evaluate it to see if a consumer gets satisfied or not. That is where X-Byte Enterprise Crawling’s [**_Web Data Scraping Services_**](https://www.xbyte.io/service/web-scraping-service/) help. For instance, if you want to crawl hundreds and thousands of news, blogs, or forum websites to scrape high-level data like date, title, article URLs, content, and author, mass-scale crawls, etc. will offer the data in a well-structured format like constant feeds.

We could also filter these crawls based on a list of keywords to facilitate better sentiment analysis based on subject topic, language, and even keyword detection. Our named-entity recognition service only helps to enrich this information.

We help our clients with product sentiment analysis. The customer wanted to scrape comments about that from websites and forums, from distributors, retailers, and enthusiasts to an average customer. The customer’s use case was to get data to know how promising users found the product as well as what consumers have talked about that on the Internet.

Considering there are thousands of websites that might comprise product reviews as well as different online forums based on the consumer durables or associated topics, you get a valued collection of understandings. We set crawls to scrape reviews from highly valued websites with thousands of URLs spontaneously.

Our automated data scraping and [**_Monitoring Solutions_**](https://www.xbyte.io/solutions/) target sites as well as deliver exact results. Furthermore, with place normalization, we deliver analysis-ready well-structured data.

The X-Byte Enterprise Crawling Advantage
========================================

*   Our process is simple and efficient to make the crawls running.
*   Our site maintenance and monitoring record all the changes in structure to offer constant data coverage.
*   With our [**_Web Data Scraping Services_**](https://www.xbyte.io/service/web-scraping-service/)**,** you will get the data you want.
*   You will get complete and easy access.
*   You will get regular data feed alerts on uploads as well as a collaborative API system to request data from.

To get professional web data scraping for Sentiment Analysis, contact [**_X-Byte Enterprise Crawling_**](https://www.xbyte.io/)  or ask for a free quote!

* * *

**Visit Us:** [_www.xbyte.io_](https://www.xbyte.io/)

Scalable do-it-yourself scraping — How to build and run scrapers on a large scale
=================================================================================

[

![ScrapeHero](https://miro.medium.com/fit/c/96/96/1*7F4A2PkgQ5Rd0vZKGHR9bw.png)

](/@ScrapeHero?source=post_page-----79eb1ab85482----------------------)

[ScrapeHero](/@ScrapeHero?source=post_page-----79eb1ab85482----------------------)

Follow

[Dec 1, 2015](/@ScrapeHero/scalable-do-it-yourself-scraping-how-to-build-and-run-scrapers-on-a-large-scale-79eb1ab85482?source=post_page-----79eb1ab85482----------------------) · 4 min read

![](https://miro.medium.com/max/60/0*HWswa5tQM1c6O3TY.jpg?q=20)

<img class="cp t u gs ak" src="https://miro.medium.com/max/1280/0\*HWswa5tQM1c6O3TY.jpg" width="640" height="426" role="presentation">

Scraping data for your business

Businesses that don’t rely on data have a very low chance of success in a data driven world.

One of the best sources of data is the data available publicly online on various websites and to get this data you have to employ the technique called Web Scraping or Data Scraping.

You can use full service professionals such [ScrapeHero](http://scrapehero.com/) to do all this for you or if you feel brave enough, you can tackle this yourself.

The purpose of this article is to walk you through some of the things you need to do and the issues you need to be cognizant of when you do decide to do it yourself.

When you decide to do this yourself, you will most likely be hiring a few developers who know how to build scrapers and setting up some servers and related infrastructure to run these scrapers without interruption, and integrating the data you extract into your business process.

Building and maintaining a large number of web scrapers is a very complex process so proceed with caution.

Here are the high level steps involved in this process and we will go through each of these in detail in this article.

1.  Build Scrapers
2.  Run the Scrapers
3.  Store the data
4.  IP Rotation, Proxies and Blacklisting
5.  Quality Checks on Data
6.  Maintenance

Build Scrapers and Set up the servers
=====================================

The first thing to do is build the scrapers.

It may be best to choose an open-source framework for building your scrapers, like Scrapy or PySpider. These are excellent frameworks with a large community of developers. Both these frameworks are based on Python. You won’t run into the risk of your developer(s) disappearing in a day, and no one to maintain your scrapers because Python is popular and the community is really supportive.

There is also a massive difference between writing and running one scraper that scrapes 100 pages to a large scale distributed scraping infrastructure that can scrape thousands of websites and millions of pages a day.

If you are scraping a large number of big websites, you might need lot of servers to get the data in a reasonable time frame. We would suggest using Scrapy Redis or Run PySpider in scaled mode, across multiple servers.

Once you have chosen a framework, hire some good developers to build these scrapers, and set up the servers required to run them and to store the data.

Run Scrapers
============

If you need the data to be refreshed periodically, you’ll either have to **run it manually or automate** it using some tool or process.

If you are using Scrapy,scrapyd + cron can schedule the spiders for you, and it will update the data the way you need it. PySpider also has a UI to do that

Store your data
===============

Once you have this massive data trove, you need a place to store it. We would suggest using a NoSQL database like MongoDB, Cassandra or HBase to store this data, depending upon the frequency and speed of scraping.

You can then extract this data from this database/datastore and integrate it with your business process. But before you do that, you should setup some Quality Assurance tests for your data (more on that later)

IP Rotation, Proxies and Blacklisting
=====================================

Large scale scraping comes with a multitude of problems and one of the big ones is anti-scraping measures by the websites that you are trying to scrape.

If any of the target websites has any kind of **IP based blocking** involved, your servers’ IP address will be black listed in no time and the site won’t respond to requests from your servers. You’ll be left with very few options after getting blacklisted.

So, how do you bypass that? You’ll have to get some **Proxies or Rotating IP solutions** to use these for making requests from the scraper.

[Here are few tips to prevent getting blacklisted](http://learn.scrapehero.com/how-to-prevent-getting-blacklisted-while-scraping/)

Quality Assurance
=================

The data you scrape is only as good as its quality. To ensure the data that you scraped in accurate and complete, you need to run a variety of QA tests on it right after it is scraped.

Having a set of **Tests** for the integrity of the data is essential. Some of it can be automated by using Regular Expressions, to check if the data follows a predefined pattern and if it doesn’t then generate some alerts so that it can be manually inspected.

Maintenance
===========

Scrapers
--------

**Every website will change** their structure now and then, and so should your scrapers. Scrapers usually need adjustments every few weeks, as a minor change in the target website affecting the fields you scrape might either give you incomplete data or even crash the scraper, depending on the logic of the scraper.

You have to be smart and detect this change and fix it before this ruins the data you are collecting.

Database & Servers
------------------

Depending upon the size of data, you will have to clean up your database of outdated data to save space and money. You might also have to scale up your systems if you still need the old data. Sharding and Replication of databases can be of help.

Server logs should also be cleaned periodically.

Know when to ask for help
=========================

This whole process is expensive and time consuming and you need to be ready to take on this challenge.

You also need to know when to stop and ask for help. [ScrapeHero](http://scrapehero.com/) has been doing all this and more for many years now, so let us know if you need any help.

Related
=======

* * *

_Originally published at_ [_learn.scrapehero.com_](http://learn.scrapehero.com/scalable-do-it-yourself-scraping-how-to-build-and-run-scrapers-on-a-large-scale/) _on December 1, 2015._

How to web scrape with Puppeteer in Google Cloud Functions
==========================================================

[![Benjamin Morali](https://miro.medium.com/fit/c/96/96/0*BOVMH1ZPEe_ObyJl.jpg)](/@benjaminmorali4?source=post_page-----59ad86d3abdc----------------------)

[Benjamin Morali](/@benjaminmorali4?source=post_page-----59ad86d3abdc----------------------)

Follow

[Feb 21, 2019](/benextcompany/how-to-web-scrape-with-puppeteer-in-google-cloud-functions-59ad86d3abdc?source=post_page-----59ad86d3abdc----------------------) · 7 min read

> In this article, I will use _Javascript_ (_Node.js_) for the code, _Yarn_ as a package manager for Node, and _apt-get_ for OS dependencies.

When you need data from a source that doesn’t provide an API, you have to do web scraping. That’s why you can consider using Puppeteer combined with Google Cloud Functions. Puppeteer is a library that uses Chromium to automate browser interactions. However, this is a time-consuming process, heavy for CPU and memory. So in order to keep your app light, you may want to execute this code into a cloud environment like Google Cloud Functions (the equivalent of AWS Lambda).

![](https://miro.medium.com/max/60/1*yVVJToJSlbCH0m63Kzwf1g.png?q=20)

<img class="dq t u hx al" src="https://miro.medium.com/max/2048/1\*yVVJToJSlbCH0m63Kzwf1g.png" width="1024" height="694" role="presentation">

Basic configuration
===================

Let’s start by initializing a node project:

$ yarn init -y

Then, `cd` to your new project and install Puppeteer:

$ yarn add puppeteer

This will download the most recent stable version of Chromium on your machine, about ~200MB depending on your OS.

In order to test and deploy your functions, you will need to install the Google Cloud SDK and the Google Cloud Functions Emulator. To get the SDK, run the following command (on _Ubuntu_):

$ sudo apt-get install google-cloud-sdk

This SDK will allow you to deploy your functions. But before that, you will need to test them locally with the functions emulator:

$ yarn global add @google-cloud/functions-emulator --ignore-engines

The `--ignore-engines` option will very likely be required. Currently, the Google Cloud Functions Emulator is fully compatible with Node 6. If your Node version is higher than that, the dependency won’t work unless you choose to ignore it with this option.

So basically, your project only needs two files:

*   `index.js` for your Javascript code
*   `package.json` for the Puppeteer dependency and your scripts

Here, `package.json` contains the basic scripts to test your function locally and deploy it:

This file contains the main dependency of this project, `puppeteer`, and two scripts to test and deploy your function. Both scripts rely on `scrapingExample`, the name used in the example below with `exports.scrapingExample`.

*   The `deploy` script is used to put your function on a remote cloud environment. `--trigger-http` associates an HTTP verb (by default POST) to our function. `--runtime` is the runtime used here (others are available like Node 6, Go and Python). The complete list of options is available [here](https://cloud.google.com/sdk/gcloud/reference/functions/deploy).
*   The `start` script launches the functions emulator and locally deploys the function with the same `--trigger-http` flag described above.

The following code is a basic configuration for `index.js`:

There is a lot of boilerplate here: the only important lines are lines 38-41! However, we’ll go through the rest of the code to understand what happens.

First, we import `puppeteer` and declare its options:

*   `headless` is one of the most important options. When you test your function locally, put it to `false` to see what happens in your browser. Every action of your script will be visible. Nevertheless, **you must put it to** `**true**` **before deploying it to Google Cloud Functions**. Otherwise, the execution will crash because the service cannot execute the GUI of Chromium.
*   `args` contains a list of useful options. Some of them are pretty explicit like `--disable-gpu` or `--timeout=30000` and some others like`--no-sandbox` are here to prevent crashes in some environments. The complete list of arguments can be found [here](https://peter.sh/experiments/chromium-command-line-switches/).

Then finally comes the code, split into 3 functions:

*   `openConnection` initializes all the necessary objects to browse with Puppeteer. It also sets a few parameters like the user agent and the viewport, necessary for some websites.
*   `closeConnection` destroys the objects initialized before and must be called at the end of every execution, regardless of the results of the execution. I’ll explain why in the _Tips and tricks_ section.
*   `scrapingExample` is the main function, which is going to be called by the functions emulator and deployed in Google Cloud. The `exports.` before the function name makes it available for Google Cloud Functions. In order to keep this example simple, it only does a simple thing: go to the Medium homepage, get its first article title, and return it.

Interactions with Google Cloud Storage
======================================

At some point, you may need to have persistent data. To do that, you cannot use the execution environment of your Google Cloud Function. A storage in fact exists, but it is temporary and very limited. To store a large number of files, you can use a cloud storage service like Google Cloud Storage or AWS S3. Just know that with the Google Cloud’s Free Plan, **you cannot send data to another IP, so in this case, forget about Amazon S3, and go for Google Cloud Storage.**

There are several ways to upload files to a cloud storage. The most elegant one (not always possible), is to download your file (through _axios_ for example), and pipe it to your remote bucket. This way, you never store anything in your Cloud Function environment, and avoid a lot of potential problems, like available storage or file naming. You can see an example of this method [here](https://stackoverflow.com/questions/44945376/how-to-upload-an-in-memory-file-data-to-google-cloud-storage-using-nodejs?rq=1).

But sometimes, piping directly is not possible so you need to store your files in a temporary directory before uploading them. There is a simple way to initialize and use Google Cloud Storage with Puppeteer:

Here, we do several things:

1.  We import Puppeteer and Google Cloud Storage.
2.  We initialize our bucket and Puppeteer.
3.  We allow Puppeteer to download files and we define the storage location. In the context of a Google Cloud Function, you would only be able to write in the `/tmp/` directory.
4.  We scrape our file: Puppeteer goes to the page, clicks the link (which will download the file to `/tmp/`) and upload it to Google Cloud Storage.

Handling bad website design
===========================

As a programmer, it’s a common thing to say it’s someone else’s fault. And when you do web scraping… this may be true! In fact, a website can be very poorly designed at several levels, making it difficult to scrape.

![](https://miro.medium.com/max/46/1*gXq-DCVPmArBK1qHtawTqQ.jpeg?q=20)

<img class="dq t u hx al" src="https://miro.medium.com/max/1828/1\*gXq-DCVPmArBK1qHtawTqQ.jpeg" width="914" height="1200" role="presentation">

One problem you may encounter is related to page loading. Puppeteer provides several functions to wait for events. For example, if you need to navigate to a page and get an element from it, you can use the following function: `await page.waitForNavigation({ waitUntil: 'load' })`. However, bad website design can make this instruction crash if you try to get an unexisting HTML element on the new page. Some websites trigger the `load` event when the new page is loaded, but it only contains a loader element. You have to be careful, and it’s sometimes preferable to use `await page.waitForSelector('.mySelector')`. The good thing about these two functions is that they have an optional `timeout` argument. This can be useful on websites with a long loading time: the default timeout is 500ms.

You also need to be careful with navigation links. Sometimes the information you want to scrape won’t be on a page directly accessible by URL. Some websites load data as you navigate, and you may need to reproduce a full “human” browsing to get the information you need.

Finally, be very precise with your CSS selectors! Some websites use the same id on several elements. This can make you select the wrong element in your code. When possible, use the `>` selector (or other selectors) to prevent any ambiguity.

Tips and tricks
===============

Memory management
-----------------

Your Google Cloud Function can run out of memory if you are not careful. Puppeteer launches Chromium, and you need to instantiate big objects (like `browser` or `page`) to use it. In the example above titled _Basic configuration_, you can see that `closeConnection` is called in the `finally` block. This is to destroy the objects and clean up the memory as you exit the function. In many Puppeteer examples, you don’t destroy anything in case of error. After several executions, your environment memory can then become full, and the first instruction `puppeteer.launch(PUPPETEER_OPTIONS)` will crash.

Debugging
---------

In the Google Cloud Management Console, you have access to logs that give you information about the remote execution of your functions. But for your local logs, you can use:

$ functions logs read

To clear them, just execute (`sudo` may be required here):

$ functions logs clear

DOM interactions
----------------

In order to get information on DOM elements, you can use the Puppeteer function `page.evaluate()`. Inside its callback, you have access to DOM elements (through CSS selectors for example), but the rest of your code is not accessible. As a second argument after the callback, you can pass it a serializable object. This means that **a function defined outside** `**evaluate()**` **cannot be used inside of it.**

Another problem with `page.evaluate()` is that it’s hard to debug. In fact, if you try to use `console.log` inside of it, you won’t see anything in your local logs. To solve this issue, add the following instruction just after you initialize the `page` object:

await page.on(‘console’, obj => console.log(obj.text()));

Using headless
--------------

When you test your function locally, you almost always put the `headless` option to `false` to see what happens in your browser. But when you deploy your function, you want the `headless` option to be set to `true` (otherwise it won’t work). So here is the perfect place to use an environment variable as the value of `headless`.

Optimization
------------

Finally, a very easy way to reduce the execution time of your cloud function is to parallelize text inputs in forms. If you have forms to fill, instead of doing several `await page.type('.selector', fieldValue)`, parallelize them in a `Promise.all`. Of course, the submitting of the form must be done outside of this `Promise.all` to have valid field values.

Sources
=======

*   [Puppeteer documentation](https://pptr.dev/)
*   [Google Cloud SDK documentation](https://cloud.google.com/sdk/docs/)
*   [Google Cloud Functions Quickstart](https://cloud.google.com/functions/docs/quickstart)
*   [Github Puppeteer issues](https://github.com/GoogleChrome/puppeteer/issues): sometimes better than the documentation!
*   [A list of 30 useful CSS selectors](https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048), good to have precise DOM selectors
*   [Yarn documentation](https://yarnpkg.com/en/docs/install)
*   [Node documentation](https://nodejs.org/dist/latest-v11.x/docs/api/)
*   Two other great articles about the Puppeteer and Google Cloud Functions : [here](https://rominirani.com/using-puppeteer-in-google-cloud-functions-809a14856e14) and [here](/@ebidel/puppeteering-in-firebase-google-cloud-functions-76145c7662bd)
*   [My personal gist](https://gist.github.com/Alezco), containing the code examples of this article

I hope you found this article useful! Feel free to give me your feedback and ask any questions :)

How to scrape websites with Python and BeautifulSoup
====================================================

[![Guillaume Odier](https://miro.medium.com/fit/c/96/96/0*BdTFzdZCu482BaXl.png)](/@GuillaumeOdier?source=post_page-----c9f0dac5e928----------------------)

[Guillaume Odier](/@GuillaumeOdier?source=post_page-----c9f0dac5e928----------------------)

Follow

[Nov 8, 2018](/captain-data-blog/how-to-scrape-websites-with-python-and-beautifulsoup-c9f0dac5e928?source=post_page-----c9f0dac5e928----------------------) · 4 min read

![](https://miro.medium.com/max/60/1*9yn_stb9a0OWJK_Qog6urw.png?q=20)

<img class="ds t u hd ak" src="https://miro.medium.com/max/2562/1\*9yn\_stb9a0OWJK\_Qog6urw.png" width="1281" height="714" role="presentation">

What do you do when you can’t download a website’s information? You do it by hand? Wow, you’re brave!

I’m a web developer, so I’m way too lazy to do things manually 🙂

If you’re about to scrape data for the first time, go ahead and read [How To Scrape A Website](https://captaindata.co/blog/how-scrape-website/). You can also read a small intro about [web scraping](https://captaindata.co/web-scraping).

Today, let’s say that you need to enrich your CRM with company data.

To make it interesting for you, we will scrape [Angel List](https://angel.co/).

More specifically, we’ll scrape [Uber’s company profile](https://angel.co/uber).

> _Please scrape responsibly!_

Getting started
===============

Before starting to code, be sure to have **Python 3** installed, as we won’t cover it here. Chances are you already have it installed.

You also need `pip`, a package management tool for Python.

easy\_install pip

The full code and dependencies are [available here](https://github.com/captaindatatech/scraping-examples/blob/master/scripts/Angel%20List%20Company%20Info.py).

We’ll be using BeautifulSoup, a standard Python scraping library.

pip install BeautifulSoup4

You could also create a [virtual environment](https://realpython.com/python-virtual-environments-a-primer/) and install all the dependencies inside the requirements.txt file:

pip install -r requirements.txt

Inspecting Content
==================

Open [https://angel.co/uber](https://angel.co/uber) in your web browser (I recommend using Chrome).

Right-click and open your browser’s inspector.

![](https://miro.medium.com/max/60/1*iVZ3ZDXCq7cJ3VeRZnw-1w.png?q=20)

<img class="ds t u hd ak" src="https://miro.medium.com/max/670/1\*iVZ3ZDXCq7cJ3VeRZnw-1w.png" width="335" height="244" role="presentation">

Sorry, it’s in French!

Hover your cursor on the description.

![](https://miro.medium.com/max/60/1*9hXctTThkIj6AiB7HNXMRA.png?q=20)

<img class="ds t u hd ak" src="https://miro.medium.com/max/5016/1\*9hXctTThkIj6AiB7HNXMRA.png" width="2508" height="796" role="presentation">

This example is pretty straightforward: you want the `**<h2>**` tag with the **js-startup\_high\_concept** class.

This would be the unique location of our data thanks to the `class` tags.

Extracting Data
===============

Let’s dive right in with a bit of code:

\# we'll get back to this   
headers = {} \# the Uber company page you're about to scrape!   
company\_page = '<https://angel.co/uber>' \# open the page   
page\_request = request.Request(company\_page, headers=headers)   
page = request.urlopen(page\_request) \# parse the html using beautifulsoup   
html\_content = BeautifulSoup(page, 'html.parser')   
description = html\_content.find('h2', attrs={'class': 'js-startup\_high\_concept'})   
print(description)

Let’s get into the details:

*   We create a variable **_headers_** (more on this very soon)
*   The **_company\_page_** variable is the page we’re targeting
*   Then we build our request. We inject the **_company\_page_** and **_headers_** variable inside the **Request** object. Then we open the url with the parameterized request.
*   We parse the HTML response with BeautifulSoup
*   We look for our text content with the **_find()_** method
*   We print our result!

Save this as [script.py](http://script.py/) and run it in your shell, like this `python script.py`.

You should get the following:

urllib.error.HTTPError: HTTP Error 403: Forbidden

Oh 🙁 What happened?

Well, it seems that AngelList has detected that we are a bot. Clever people!

Okay, so change the **_headers_** variable for this one:

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10\_13\_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'}

Run the code with `python script.py`. Now it should be good:

<h2 class="js-startup\_high\_concept u-fontSize15 u-fontWeight400 u-colorGray3"> The better way to get there </h2>

Yeah! Our first piece of data 😀

Want to find the website? Easy:

\# we extract the website   
website = html\_content.find('a', attrs={'class': 'company\_url'})  
print(website)

And you get:

<a class="u-uncoloredLink company\_url" href="http://www.uber.com/" rel= nofollow noopener noreferrer" target="\_blank">uber.com</a>

Ok, but how do I get the **value** of the website?

Easy. Tell the program to extract the **href**:

print(website\['href'\])

Make sure to use the **strip()** method, otherwise you’ll have big spaces:

description = description.text.strip()

I won’t cover in detail all the elements you could extract. If you’re having issues, you can always check [this amazing XPath cheatsheet](https://devhints.io/xpath).

Save results to CSV
===================

Pretty useless to print data, right? We should definitely save it!

The Comma-Separated Values format is really a standard for this purpose. You can import it very easily in Excel or Google Sheets.

import csv

Add the following lines:

\# open a csv with the append (a) parameter   
with open('angel.csv', 'a') as csv\_file:   
    writer = csv.writer(csv\_file)   
    writer.writerow(\[description, website\])

What you get is a single line of data. Since we told the program to append every result, new lines won’t erase previous results.

Check out the whole script
==========================

The script is [available here](https://github.com/captaindatatech/scraping-examples/blob/master/scripts/Angel%20List%20Company%20Info.py).

[

captaindatatech/scraping-examples


-------------------------------------

### 

Various Web Scraping Examples. Checkout how to scrape Angel List Company Info in our github.



](https://github.com/captaindatatech/scraping-examples/blob/master/scripts/Angel%20List%20Company%20Info.py)

Conclusion
==========

It wasn’t that hard, right?

We covered a very basic example. You could also add multiple pages and parse them inside a for loop.

Remember how we got blocked by the website’s security and resolved this by adding a custom User-Agent? We wrote a small paper about [anti-scraping](https://captaindata.co/blog/anti-scraping/) techniques. It’ll help you understand how websites try to block bots.

If you feel like web scraping is too difficult for you or you’re getting blocked, you can always [contact us](https://captaindata.co/contact)!

[You can also use a more advanced version of this script on our platform](https://captaindata.co/api/angellist-company-profile/).

* * *

_Originally published at_ [_captaindata.co_](https://captaindata.co/blog/how-scrape-websites-python-beautifulsoup/) _on November 8, 2018._

How to get the next page on Beautiful Soup
==========================================

[![DavidMM](https://miro.medium.com/fit/c/96/96/2*FXde8jim4cXJDME3ge9Amg.jpeg)](/@davidmm1707?source=post_page-----85b743750df4----------------------)

[DavidMM](/@davidmm1707?source=post_page-----85b743750df4----------------------)

Follow

[Aug 28, 2019](/quick-code/how-to-get-the-next-page-on-beautiful-soup-85b743750df4?source=post_page-----85b743750df4----------------------) · 5 min read

![](https://miro.medium.com/max/60/0*wZdLE2d3KCFUNSU0?q=20)

<img class="dz t u hc ak" src="https://miro.medium.com/max/1376/0\*wZdLE2d3KCFUNSU0" width="688" height="360" role="presentation">

It is easy to scrape a simple page, but how do we get the next page on Beautiful Soup? What can we do to crawl all the pages until we reach the end?

Today, we are going to learn how to fetch all the items while Web Scraping by reaching to the next pages.

Video version of this tutorial

* * *

Getting Started
===============

![](https://miro.medium.com/max/60/0*A7iEoM2hTb0YD2f9?q=20)

<img class="dz t u hc ak" src="https://miro.medium.com/max/1376/0\*A7iEoM2hTb0YD2f9" width="688" height="368" role="presentation">

As the topic of this post is what to do to crawl next pages, instead of coding a Beautiful Soup script again, we are going to take the one we did previously.

If you are a beginner, please, do the ‘[Your first Web Scraping script with Python and Beautiful Soup](https://letslearnabout.net/python/beautiful-soup/your-first-web-scraping-script-with-python-beautiful-soup/)‘ tutorial first.

If you know how to use Beautiful Soup, use this starting code in [repl.it.](https://repl.it/@DavidMM1707/Best-CD-Price)

This code fetches us the albums from the band the user asks for. All of them? No, just the first 10 ones that are displayed on the first page. By now.

Open a new repl.it file or copy-paste the code in your code editor: Now it’s time to code!

* * *

Refactoring — Getting rid of the clutter
========================================

![](https://miro.medium.com/max/60/0*8YN3cst3CFrEenKn?q=20)

<img class="dz t u hc ak" src="https://miro.medium.com/max/1376/0\*8YN3cst3CFrEenKn" width="688" height="491" role="presentation">

Before adding features, we need to clean the clutter by refactoring.

We are going to take blocks of code and placing them in their own functions, then calling that functions where the code was.

Go to the end of the code and take the lines where we create the table:

Cut them and create a function, for example, export\_table\_and\_print, and put it after base\_url and search\_url:

We also added a ‘clean\_band\_name’ so the filename where we store the data doesn’t have empty spaces and it is all lowercase, so “ThE BeAtLES” search stores a ‘the\_beatles\_albums.csv’ file.

Now, where the old code was, call the function, just at the end of the file:

The first part is done. Run the code and check it is still working.

Go to the ‘for loop’ at around line 45. Take everything that involves in extracting values and adding them to ‘data’ (so, the whole code) and replace it with the ‘get\_cd\_attributes(cd)’.

After the last function, create that function and paste the code:

Again, run the code and check it is still working. If it is not, compare your code with mine:

t is working? Cool. Time to get ALL the albums!

* * *

Recursive function — The trick to get the next page
===================================================

![](https://miro.medium.com/max/60/0*T5q-HFDG11EtQfkV?q=20)

<img class="dz t u hc ak" src="https://miro.medium.com/max/1376/0\*T5q-HFDG11EtQfkV" width="688" height="656" role="presentation">

Ok, here’s the trick to get the job done: Recursiveness.

We are going to create a “parse\_page’ function. That function will fetch the 10 albums the page will have.

After the function it is done, it is going to call itself again, with the next page, to parse it, over and over again until we have everything.

Let me simplify it for you:

![](https://miro.medium.com/max/54/0*yLfU_f7NP-AHSfYp?q=20)

<img class="dz t u hc ak" src="https://miro.medium.com/max/1376/0\*yLfU\_f7NP-AHSfYp" width="688" height="774" role="presentation">

I hope it is clear: As we keep having a ‘next page’ to parse, we are going to call the same function again and again to fetch all the data. When there is no more, we stop. As simple as that.

Step 1: Create the function
---------------------------

Grab this code, create another function called ‘parse\_page(url)’ and call that function at the last line.

The data object is going to be used in different places, take it out and put it after the search\_url.

We took the main code and created a parse\_page function, called it using the ‘search\_url’ as parameter and took the ‘data’ object out so we can use it globally.

In case you are dizzy, here’s what your code should look like now:

Please check this line:

Now we are not fetching the ‘search\_url’ (the first one) but the URL that we pass as an argument. This is very important.

Step 2: Add recursion
---------------------

Run the code again. It should fetch the 10 first albums as always.

That’s why because we haven’t used recursion. Let’s write the code that will:

*   Get all the pagination links
*   From all the links, grab the last one
*   Check if the last one has a ‘Next’ text
*   If it has it, get the relative (partial) url
*   Build the next page url by adding base\_url and the relative\_url
*   Call parse\_page again with the next page url
*   If doesn’t has the ‘Next’ text, just export the table and print it

Once we have fetched all the cd attributes (that’s it, after the ‘for cd in list\_all\_cd’ loop), add this line:

We are getting all the ‘list item’ (or ‘li’) elements inside the ‘unordered list’ with the ‘SearchBreadcrumbs’ class. That’s the pagination list.

Then, we go to the last one and get the text. Add this after the last code:

Now we check if ‘next\_page\_text’ has ‘Next’ as text. If it does, we take the partial url, we add it to the base to build the next\_page\_url. If it does not, there is no more pages, so we can create the file and print it.

That’s all we need. Run the code, and now you are getting dozens, if not hundreds of items!

Step 3: Fixing a small bug
--------------------------

But we can still improve the code. Add this 4 lines after parsing the page with Beautiful Soup:

Sometimes there is a ‘Next’ page when the numbers of albums are multiple of 10 (10, 20, 30, 40 and so on) but there is no album there. That makes the code to end without creating the file.

With this code, it is fixed.

Your coding is done! Congratulations!

* * *

Conclusion
==========

Let me summarize what we have done:

*   We moved blocks of code with the same functionality to functions
*   We put the scraping code inside a function and we call it passing the initial search\_url
*   Inside the function, we scrap the code
*   After it is done, we check for the next URL
*   If there is a ‘next url‘, we call the function with the next page URL
*   If not, we end the scraping and create the .csv file

Now it seems simpler, right?

I want to keep doing tutorials like this one, but I want to ask you what do you want to see:

*   Do you want more Web Scraping with Beautiful Soup or Scrapy?
*   Do you want me to teach how to make a Flask web app or a Django one?
*   Or do you want to learn more Front-End things like Vue.js?

Please, leave me a comment with what do you want to see in future posts.

And if this tutorial has been useful to you, share it with your friends, on Twitter, Facebook or where you can help others.

* * *

[Final code on Repl.it](https://repl.it/@DavidMM1707/Best-CD-Price-Next-Page)

[Reach to me on Twitter](https://twitter.com/DavidMM1707)

[My Youtube tutorial videos](https://www.youtube.com/channel/UC9OLm6YFRzr4yjlw4xNWYvg?sub_confirmation=1)

[My Github](https://github.com/david1707)

Contact me: DavidMM1707@gmail.com

Keep reading [more tutorials](https://letslearnabout.net/category/tutorial/)

Web Scraping with Python and BeautifulSoup
==========================================

[![Mohit Sharma](https://miro.medium.com/fit/c/96/96/1*mbUxV0WrINAue8xaqsIL0A@2x.jpeg)](/@imoisharma?source=post_page-----bf2d814cc572----------------------)

[Mohit Sharma](/@imoisharma?source=post_page-----bf2d814cc572----------------------)

Follow

[Sep 12, 2018](/incedge/web-scraping-bf2d814cc572?source=post_page-----bf2d814cc572----------------------) · 9 min read

![](https://miro.medium.com/max/60/0*pp7uaEHrKY5iiWw9?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1530/0\*pp7uaEHrKY5iiWw9" width="765" height="380" role="presentation">

I am back with another tutorial on how to do Web Scraping with Python and [BeautifulSoup](https://en.wikipedia.org/wiki/Beautiful_Soup_(HTML_parser)).
======================================================================================================================================================

What you’ll learn
=================

*   What is Web Scraping
*   Why we need Web Scraping
*   At last, how to do Web Scraping using Python and BeautifulSoup

When performing data science tasks, it’s common to want to use data found on the internet. You’ll usually be able to access this data in _CSV format_, or via an [Application Programming Interface](https://en.wikipedia.org/wiki/Application_programming_interface) (API). However, there are times when the data you want can only be accessed as part of a web page. In cases like this, you’ll want to use a technique called **web scraping** to get the data from the web page into a format you can work within your analysis.

Today, I’ll show you how to perform Web Scraping using Python3 and BeautifulSoup library.

> Before moving forward, I would like to share some of the basic components of a Web page

Whenever you visit a website or web page, your web browser makes a request to a web server. This request is called a `GET` request, since we’re getting files from the server. The server then sends back files that tell our browser how to render the page for us. The files fall into a few main types:

*   [HTML](https://www.w3.org/TR/html/) — contain the main content of the page.
*   [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) — add styling to make the page look nicer.
*   [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — Javascript files add interactivity to web pages.
*   Images — image formats, such as [JPG](https://en.wikipedia.org/wiki/JPEG) and [PNG](https://en.wikipedia.org/wiki/Portable_Network_Graphics) allow web pages to show pictures.

After our browser receives all the files, it renders the page and displays it to us. There’s a lot that happens behind the scenes to render a page nicely, but we don’t need to worry about most of it when we’re web scraping. When we perform web scraping, we’re interested in the main content of the web page, so we look at the HTML.

HTML
====

HTML is the standard markup language for creating Web pages.
============================================================

*   HTML stands for Hyper Text Markup Language
*   HTML describes the structure of Web pages using markup
*   HTML elements are the building blocks of HTML pages
*   HTML elements are represented by tags
*   HTML tags label pieces of content such as “heading”, “paragraph”, “table”, and so on
*   Browsers do not display the HTML tags, but use them to render the content of the page

* * *

A Simple HTML Document
======================

Example
=======

<!DOCTYPE html>  
<html>  
<head>  
<title>Page Title</title>  
</head>  
<body><h1>My First Heading</h1>  
<p>My first paragraph.</p>

</body>  
</html>

[Try it Yourself »](https://www.w3schools.com/htmL/tryit.asp?filename=tryhtml_intro)

Example Explained
=================

*   The `<!DOCTYPE html>` declaration defines this document to be HTML5
*   The `<html>` element is the root element of an HTML page
*   The `<head>` element contains meta information about the document
*   The `<title>` element specifies a title for the document
*   The `<body>` element contains the visible page content
*   The `<h1>` element defines a large heading
*   The `<p>` element defines a paragraph

> More Details refer to this [HTML Tutorials](https://www.w3schools.com/html/default.asp)

**What is Web Scraping?**

**Web scraping**, **web harvesting**, or **web data extraction** is [data scraping](https://en.wikipedia.org/wiki/Data_scraping) used for [extracting data](https://en.wikipedia.org/wiki/Data_extraction) from [websites](https://en.wikipedia.org/wiki/Website).[\[1\]](https://en.wikipedia.org/wiki/Web_scraping#cite_note-Boeing2016JPER-1) Web scraping software may access the World Wide Web directly using the [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), or through a web browser. While web scraping can be done manually by a software user, the term typically refers to automated processes implemented using a [bot](https://en.wikipedia.org/wiki/Internet_bot) or [web crawler](https://en.wikipedia.org/wiki/Web_crawler). It is a form of copying, in which specific data is gathered and copied from the web, typically into a central local [database](https://en.wikipedia.org/wiki/Database) or spreadsheet, for later [retrieval](https://en.wikipedia.org/wiki/Data_retrieval) or [analysis](https://en.wikipedia.org/wiki/Data_analysis).

More details refer to [Wikipedia](https://en.wikipedia.org/wiki/Web_scraping)

![](https://miro.medium.com/max/60/0*axoXXE3STGLBd1N2?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/770/0\*axoXXE3STGLBd1N2" width="385" height="131" role="presentation">

**Why we need Web Scraping?**

A large organization will need to keep itself updated with the information changes occurring in multitudes of websites. An intelligent web scraper will find new websites from which it needs to scrap the data. Intelligent approaches identify the changed data, extract it without extracting the unnecessary links present within and navigate between websites to monitor and extract information on a real-time basis efficiently and effectively. You can easily monitor several websites simultaneously while keeping up with the frequency of updates.

You will observe, as has been mentioned earlier, that data across the websites constantly changes. How will know if a key change has been made by an organization? Let’s say there has been a personnel change in the organization, how will you find out about that? That’s where the alerts feature in web scraping comes to play. The intelligent web scraping techniques will alert you to the data changes that have occurred on a particular website, thus helping you keep an eye on opportunities and issues.

Web Scraping using Python and BeautifulSoup
===========================================

Firstly, I will demonstrate you with very basic HTML web page. And later on, show you how to do web scraping on the real-world web pages.

The first thing we’ll need to do to scrape a web page is to download the page. We can download pages using the Python [requests](http://docs.python-requests.org/en/master/) library. The requests library will make a `GET` request to a web server, which will download the HTML contents of a given web page for us. There are several different types of requests we can make using `requests`, of which `GET` is just one.

Let’s try downloading a simple sample website, `[http://dataquestio.github.io/web-scraping-pages/simple.html](http://dataquestio.github.io/web-scraping-pages/simple.html)`. We’ll need to first download it using the [requests.get](http://docs.python-requests.org/en/master/user/quickstart/#make-a-request) method.

![](https://miro.medium.com/max/60/0*JHkrrSEgzauK6uw8?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*JHkrrSEgzauK6uw8" width="620" height="321" role="presentation">

After running our request, we get a [Response](http://docs.python-requests.org/en/master/user/quickstart/#response-content) object. This object has a `status_code`property, which indicates if the page was downloaded successfully.

We can print out the HTML content of the page using the `content` property:

![](https://miro.medium.com/max/60/0*m9mC7W9TbCNgTUvU?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*m9mC7W9TbCNgTUvU" width="620" height="293" role="presentation">

BeautifulSoup
=============

We can use the [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) library to parse this document, and extract the text from the `p` tag. We first have to import the library, and create an instance of the `BeautifulSoup` class to parse our document:

![](https://miro.medium.com/max/60/0*LIFVm1PXB1rgaQD1?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*LIFVm1PXB1rgaQD1" width="620" height="293" role="presentation">

We can now print out the HTML content of the page, formatted nicely, using the `prettify` method on the `BeautifulSoup` object:

![](https://miro.medium.com/max/60/0*3QoZBn_qy4KBgLse?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*3QoZBn\_qy4KBgLse" width="620" height="297" role="presentation">

As all the tags are nested, we can move through the structure one level at a time. We can first select all the elements at the top level of the page using the `children` property of `soup`. Note that `children` returns a list generator, so we need to call the `list`function on it.

![](https://miro.medium.com/max/60/0*ClM0k7I56wWg7N_C?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*ClM0k7I56wWg7N\_C" width="620" height="293" role="presentation">

![](https://miro.medium.com/max/60/0*rnAfC5xoxEXvXiql?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*rnAfC5xoxEXvXiql" width="620" height="205" role="presentation">

As you can see above, there are two tags here, `head`, and `body`. We want to extract the text inside the `p` tag, so we’ll dive into the body(Refer to just above, under html.children).

Now, we can get the `p` tag by finding the children of the body tag

![](https://miro.medium.com/max/60/0*99sx3Gg5_rTmWE-r?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*99sx3Gg5\_rTmWE-r" width="620" height="272" role="presentation">

we can use the `get_text` method to extract all of the text inside the tag.

Finding all instances of a tag at once
======================================

What we did above was useful for figuring out how to navigate a page, but it took a lot of commands to do something fairly simple. If we want to extract a single tag, we can instead use the `find_all` method, which will find all the instances of a tag on a page.

If you instead only want to find the first instance of a tag, you can use the `find`method, which will return a single `BeautifulSoup` object.

![](https://miro.medium.com/max/60/0*hRNR8nfl4r4NYlUf?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*hRNR8nfl4r4NYlUf" width="620" height="308" role="presentation">

If you want to fork this notebook go to [Web Scraping Tutorial.](https://github.com/mohitsharma44official/Python-Web-Scraping-/blob/master/Web%20Scraping%20Tutorial.ipynb)

> **Now, I’ll show you how to perform web scraping using** [**Python 3**](https://www.python.org/downloads/release/python-350/) **and the** [**BeautifulSoup**](https://www.crummy.com/software/BeautifulSoup/) **library. We’ll be scraping weather forecasts from the** [**National Weather Service**](http://www.weather.gov/)**, and then analyzing them using the** [**Pandas**](http://pandas.pydata.org/) **library.**

![](https://miro.medium.com/max/60/0*gsFmW_2wmeOxwEQJ?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*gsFmW\_2wmeOxwEQJ" width="620" height="349" role="presentation">

We now know enough to proceed with extracting information about the local weather from the National Weather Service website. The first step is to find the page we want to scrape. We’ll extract weather information about downtown San Francisco from [this page](http://forecast.weather.gov/MapClick.php?lat=37.7772&lon=-122.4168).

![](https://miro.medium.com/max/60/0*iPFAzDtLzeXam19Q?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*iPFAzDtLzeXam19Q" width="620" height="253" role="presentation">

Once you open this page then use **CRTL+SHIFT+I** to inspect the element, but here we are interested in this particular column (San Francisco CA).

So, by right-clicking on the page near where it says “Extended Forecast”, then clicking “Inspect”, we’ll open up the tag that contains the text “Extended Forecast” in the elements panel.

![](https://miro.medium.com/max/60/0*hmrLLRS8ABucVS9u?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*hmrLLRS8ABucVS9u" width="620" height="322" role="presentation">

We can then scroll up in the elements panel to find the “outermost” element that contains all of the text that corresponds to the extended forecasts. In this case, it’s a `div` tag with the id `seven-day-forecast.`

Explore the div, you’ll discover that each forecast item (like “Tonight”, “Thursday”, and “Thursday Night”) is contained in a `div`with the class `tombstone-container`.

![](https://miro.medium.com/max/60/0*-GgEk-0vOw6-bLN9?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*-GgEk-0vOw6-bLN9" width="620" height="319" role="presentation">

We now know enough to download the page and start parsing it. In the below code, we:

*   Download the web page containing the forecast.
*   Create a `BeautifulSoup` class to parse the page.
*   Find the `div` with id `seven-day-forecast`, and assign to `seven_day`
*   Inside `seven_day`, find each individual forecast item.
*   Extract and print the first forecast item.

![](https://miro.medium.com/max/60/0*mDANCbLPPTrwr7rP?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*mDANCbLPPTrwr7rP" width="620" height="323" role="presentation">

**Extract and print the first forecast item**

![](https://miro.medium.com/max/60/0*gRqjKOfSoMXlZkbC?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*gRqjKOfSoMXlZkbC" width="620" height="321" role="presentation">

As you can see, inside the forecast item `tonight` is all the information we want. There are `4` pieces of information we can extract:

*   The name of the forecast item — in this case, `Today`.
*   The description of the conditions — this is stored in the `title` property of `img`.
*   A short description of the conditions — in this case, `Sunny`.
*   The temperature low — in this case, `69_°F_`.

![](https://miro.medium.com/max/60/0*TXLAF4HFIwdU1sig?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*TXLAF4HFIwdU1sig" width="620" height="323" role="presentation">

Now that we know how to extract each individual piece of information, we can combine our knowledge with CSS selectors and list comprehensions to extract everything at once.

**In the below code**:

Select all items with the class `period-name` inside an item with the class `tombstone-container` in `seven_day`.

Use a list comprehension to call the `get_text` method on each `BeautifulSoup`object.

![](https://miro.medium.com/max/60/0*_IkAqANAYESvIjs0?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*\_IkAqANAYESvIjs0" width="620" height="321" role="presentation">

**Combining our data into Pandas DataFrame**

![](https://miro.medium.com/max/60/0*XYjEtU4LxT7hw_OE?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*XYjEtU4LxT7hw\_OE" width="620" height="322" role="presentation">

**We can use a regular expression and the** [**Series.str.extract**](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.Series.str.extract.html) **method to pull out the numeric temperature values.**

![](https://miro.medium.com/max/60/0*6uSQnZBhes0e-5fA?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*6uSQnZBhes0e-5fA" width="620" height="321" role="presentation">

![](https://miro.medium.com/max/60/0*j9bEzJBcFVPHmHGA?q=20)

<img class="dx t u gz ak" src="https://miro.medium.com/max/1240/0\*j9bEzJBcFVPHmHGA" width="620" height="323" role="presentation">

If you want to fork this notebook go to [Web Scraping](https://github.com/mohitsharma44official/Python-Web-Scraping-/blob/master/Web%20Scraping.ipynb) and [GitHub](https://github.com/mohitsharma44official/Python-Web-Scraping-)

I hope now you have a good understanding of how to Scrape the data from web pages. In the coming weeks, I’ll do web scraping on

*   News articles
*   Sports scores
*   Weather forecasts
*   Stock prices
*   Online retailer price etc.

Hope you like this article!! Don’t forget to like this blog and share with others.

> **Thank You**
> 
> **Go Subscribe** [**THEMENYOUWANTTOBE**](https://themenyouwanttobe.wordpress.com)
> 
> **Show Some Love ❤**

How to do Web Scraping with Ruby?
=================================

[![Ellina Bereza](https://miro.medium.com/fit/c/96/96/0*xFa1CwVoPDPOfsx7)](/@hello_47260?source=post_page-----80a705d041a----------------------)

[Ellina Bereza](/@hello_47260?source=post_page-----80a705d041a----------------------)

Follow

[Aug 20, 2018](/@hello_47260/how-to-do-web-scraping-with-ruby-80a705d041a?source=post_page-----80a705d041a----------------------) · 7 min read

Web scraping is a popular method of automatically collecting the information from different websites. It allows you to quickly obtain the data without the necessity to browse through the numerous pages and copy and paste the data. Later, it is outputted into a CSV file with structured information. Scraping tools are also capable of actualizing the changing information.

There are numerous applications, websites, and browser plugins allowing you to parse the information quickly and efficiently. It is also possible to create your own web scraper — this is not as hard as it may seem.

In this article, you will learn more about web scraping, its types, and possible applications. We will also tell you how to scrape websites with Ruby.

Ways of collecting the information
==================================

There are two ways to automatically collect the information: web scraping and web crawling. They are both used for extracting the content from websites, but the areas of work are different.

**Web scraping** refers to collecting the data from a particular source (website, database) or a local machine. It does not involve working with large datasets, and a simple download of the web page is considered to be a sort of data scraping.

**Web crawling** implements processing large sets of data on numerous resources. The crawler attends the main page of the website and gradually scans the entire resource. Generally, the bot is programmed to attend numerous sites of the same type (for example, internet furniture shops).

Both processes result in presenting the output of the collected information. Since the Internet is an open network, and the same content can be reposted on different resources, the output can contain lots of duplicated information. Data crawling involves processing the output and removing the duplicates. This can also be done while scraping the information, but it is not necessarily part of it.

How web scraping works and how to choose the tool
=================================================

The scraping scripts are executed according to the following algorithm: the program attends the web page and selects the necessary HTML-elements according to the settled CSS- or XPath-selectors. The necessary information is processed, and the result is saved in the document.

The web provides quite a lot of out-of-box scraping tools like online and desktop applications, browser extensions, etc. They provide different functionalities that are suitable for different needs. That is why choosing a web scraper requires a bit of market research. Let’s have a look at the key features to consider when choosing a web scraping tool.

The different scrapers process different types of information: articles, blog and forum comments, internet shop databases, tables, dropdowns, Javascript elements, etc. The result can also be presented in different formats, like XML or CSV, or be written right into a database.

The out-of-box scrapers can provide a free and commercial license. The free tools generally have fewer options for customization, less capacity, and less thorough scraping. The paid scrapers offer wider functionality and efficiency of work and are perfectly suited for professional usage.

*   **Technical background for usage**

Some of the tools can be used just via the visual interface, without writing any lines of code. The other ones require a basic technical background. There are also tools for advanced computer users. The difference between them is in the customization options.

It is also possible to develop a custom web scraper from scratch. The application can be written on any of the existing programming languages, including Ruby. The custom Ruby parser will have all the necessary functionality and the output information will be pre-processed exactly the way you need it.

Having considered the existing types of web scraping tools, let’s see how to choose a scraper according to your needs:

*   A **free out-of-box tool** will be sufficient for processing small amounts of information for personal use.
*   A scraper with a **paid license** is necessary for users collecting large, yet similar sets for information for business and scientific needs (e.g. collecting financial statistics).
*   A **customized tool** for scraping the web with Ruby is suitable for users who need a fully customized tool for professional scraping tasks on a regular basis.

The application of web scraping
===============================

Data scraping and crawling are used for processing sets of unstructured information and logically presenting them as a database or a spreadsheet. The output is valuable information for analysts and researchers, and it can be applied in many different areas.

The Ruby web crawler can collect the information from different resources, and output the dynamics of market changes (such as changes of currency rates, prices for securities, oil, gold, estate, etc). The output can then be used for predictive analytics and training of artificial intelligence.

*   **Collecting product characteristics and prices**

Web scraping is widely used by aggregators — they collect the information about the goods in different internet shops, and later present it on their websites. This gives the users the opportunity to compare the prices and characteristics of the necessary item on different platforms without having to browse through numerous sites.

*   **Collecting contact details**

Web scraping can be useful for establishing both B2B and B2C relationships. With the help of scraping tools, companies can create lists of suppliers, partners, etc., and collect the databases of existing and potential clients. In other words, web scraping can help to obtain the lists of any individuals of interests.

*   **Collecting job opportunities**

Recruitment companies can extract the contact details of potential applicants for different vacancies, and vice versa — the information about job opportunities in different companies can be collected as well. This output is a good base not only for finding the necessary specialists and jobs, but also for market analysis, creating statistics about the demand and requirements for the different specialists, their salary rates, etc.

*   **Collecting information on a topic**

With the help of scraping, you can download all the necessary information in bulk and then use it offline. For example, it is possible to extract all the questions and answers on a particular topic from Quora or any other service for questions and answers. You can also collect blog posts or the results of internet searches.

*   **Conducting market research**

Data scraping can be applied by marketing specialists for conducting research on a target audience, collecting the email base for newsletters, etc. It helps to monitor competitors’ activities and track if they are changing their catalogs. SEO specialists can also scrape the web pages of competitors in order to analyze the semantics of the website.

How to do web scraping using Ruby
=================================

Having considered the variety of web scraping tools and the possible ways to apply the scraped data, now let’s talk about creating your own custom tool. We are going to present you with a brief guide covering the basic stages of web scraping in Ruby.

Useful tools
============

This language provides a wide range of ready-made tools for performing typical operations. They allow developers to use official and reliable solutions instead of reinventing the wheel. For Ruby web scraping, you will need to install the following gems on your computer:

*   [NokoGiri](https://rubygems.org/gems/nokogiri/versions/1.6.6.2) is an HTML, SAX and RSS parser providing access to the elements based on XPath and CSS3-selectors. This gem can be applied not only for web parsing but also for processing different types of XML files.
*   [HTTParty](https://rubygems.org/gems/httparty) is a client for RESTful services, sending HTTP queries to the scrapped pages and automatic parsing of JSON and XML files to your Ruby storage.
*   [Pry](https://rubygems.org/gems/pry) is a tool used for debugging. It will help us to parse the code from the scrapped pages.

Web scraping is quite a simple operation and, generally, there is no need to install the Rails framework for this. However, it does make sense if the scraper is part of a more complicated service.

Having installed the necessary gems, you are now ready to learn how to make a web scraper. Let’s proceed!

Step 1. Creating the scraping file
==================================

Create the directory where the application data will be stored. Then add a blank text file named after the application and save it to the folder. Let’s call it “web\_scraper.rb”.

In the file, integrate the Nokogiri, HTTParty and Pry gems by running these commands:

**require ‘nokogiri’**

**require ‘httparty’**

**require ‘pry’**

Step 2. Sending the HTTP-queries
================================

Create a variable and send the HTTP-request to the page you are going to scrape:

**page = HTTParty.get(‘https://www.iana.org/domains/reserved’)**

Step 3. Launching NokoGiri
==========================

The aim of this stage is to convert the list items into Nokogiri objects for further parsing. Set a new variable named “parsed\_page” and make it equal to the Nokogiri method of converting the HTML data to objects — you will use it throughout the process.

**parsed\_page = Nokogiri::HTML(page)**

**Pry.start(binding)**

Save your file and launch it once again. Execute a “parsed\_page” variable for retrieving the necessary page as the set of Nokogiri objects.

In the same folder, create an HTML file (let’s call it “output”), and save the result of “parse page command” there. You will be able to refer to this document later.

Before proceeding, exit from Pry in the terminal.

Step 4. Parsing
===============

Now you need to extract all the needed list items. To do this, select the necessary CSS item and enter it to the Nokogiri output. You can locate the selector by viewing the page’s source code:

**array = parsed\_page.css(‘h2’).map(&:text)**

Once the parsing is complete, it is necessary to export the parsed data to the CSV file so it won’t get lost.

Step 5. Export
==============

Having parsed the information, you need to complete the scraping and convert the data into a structured table. Return to the terminal and execute the commands:

**require ‘csv’**

**CSV.open(‘reserved.csv’, ‘w’) { |csv| csv << array }**

You will receive a new CSV file with all the parsed data inside.

Conclusion
==========

We have covered the process of web scraping, its types, benefits, and possible applications. You are now aware of the basic features of the existing tools and know how to choose right one. If your business needs a customized solution, drop us a line. Our developers will create an application for web scraping on Ruby on Rails that will perfectly satisfy your needs.

* * *

_Originally published at_ [_sloboda-studio.com_](https://sloboda-studio.com/blog/how-to-do-web-scraping-with-ruby/) _on August 20, 2018._

Learn web app development while solving a real world problem
============================================================

[![Ajay Sainy](https://miro.medium.com/fit/c/96/96/0*kbEmHUGls4WAP006.)](/@sainyajay?source=post_page-----94203cdd6461----------------------)

[Ajay Sainy](/@sainyajay?source=post_page-----94203cdd6461----------------------)

Follow

[Jan 6](/analytics-vidhya/practical-web-scraping-94203cdd6461?source=post_page-----94203cdd6461----------------------) · 4 min read

![](https://miro.medium.com/max/60/0*Mh245eSDxm5CQchB?q=20)

<img class="dq t u gx ak" src="https://miro.medium.com/max/12000/0\*Mh245eSDxm5CQchB" width="6000" height="4000" role="presentation">

Photo by [Luca Bravo](https://unsplash.com/@lucabravo?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

In this series, we will learn creating a web application from scratch, web scraping and storing the scraped data. All this while solving a real world problem.

This is going to be a fun practical series divided into 3 part:

1\. Scrape the data

2\. Store it

3\. Create a web application

> Note: I am not sure if web scraping is illegal or not. It’s a complex topic to discuss. This series does not discuss the legal aspects of web scraping. However, I believe web scraping done ethically (debatable what is ethical) should not be a problem for the websites being scrapped.

**The problem we are going to solve**
=====================================

Assume that you are living in the USA and want to send some money to your friend or family in India. You would first google USD to INR rate, then you look for a money transfer service that allows you to send money from USD to INR. But, there are a lots of different services that provide different exchange rates, different service charges. First, you collect a list of such money transfer services and then you visit their websites to check what is the rate that they are providing. This takes a lot of time and effort.

In this tutorial we are going solve this problem by creating a web-application that will show the exchange rates provided by these services at one place only. So that, you have to open only one website to decide which service to use.

**Lets solve the problem by breaking it into three parts:**

1.  Collect data from various services
2.  Store the data
3.  Create web app using the data

**This article is going to cover the #1.**

Sounds interesting?

We have a lot to cover, so without wasting a moment, let’s get started.

Requirements
------------

1. [Python (web scraping)](https://www.python.org/downloads/)

2\. [BeautifulSoup (Python library for webscraping)](https://pypi.org/project/beautifulsoup4/)

3\. [urllib.request (Python library for opening URLs)](https://docs.python.org/3/library/urllib.html)

In this part, we will cover the web scraping section.

**Basics**
==========

In a typical client server scenario, client (eg. web browsers) sends a request to server. Server responds with data. For eg. When we open google.com in any web browser, the browser sends the request to google’s server to get the google search page. The google server returns the data in HTML and then browser renders the HTML and display beautiful UI to the user. The same thing happens when we open any other website. Web-Scraping is to read the HTML and get the required data/information from that HTML.

Lets understand this while solving our problem at hand. Follow the below steps:

Step 1: Select the target
-------------------------

As we are going to create an application where users can view the USD to INR exchange rate offered by various services that lets users send money from USA to India. The obvious requirement is the list of such services. We are going to use Remitly and Transferwise (randomly selected).

Step 2: Find the element to scrape in the website
-------------------------------------------------

We learned in the basics that all websites are in HTML(Hyper Text Markup Language). Underlying HTML of the website opened in commonly used browsers (chrome, safari, edge, firefox) can be easily seen by right clicking on the page and selecting _Inspect_ option.

We want to get the USD to INR, so open the first website ([Remitly](https://www.remitly.com/us/en/india/pricing)), right click on the place where it shows INR rate that you would like to scrape. In the developer console that gets opened, right click on the selected element and copy -> Copy Selector.

The **selector** is copied to the clipboard, save it for now (!important), we will use it later. Similarly, open the second website ([Tranferwise](https://transferwise.com/us/currency-converter/usd-to-inr-rate)) and do the same.

Now we have the selectors (which is the CSS path to the element that displays the INR rate in the DOM). We will write Python script to [programmatically](https://go.skimresources.com/?id=126542X1588076&xs=1&url=https://en.wiktionary.org/wiki/programmatically) make request (using urllib) to Remitly and Tranferwise web pages and read the HTML response (using BeautifulSoup library) and extract the INR rate using the selectors (obtained in previous step).

The above script contains all the comments to explain what each line is doing. If it needs more explanation, let me know in comments section :). In short, the above script is performing the below steps:

1\. Call the page(url) that shows the exchange rate from USD to INR.

2\. Get the HTML.

3\. Create a BeautifulSoup object to navigate the html easily.

4\. Extract the rate using the selectors we got in step2.

Execute
=======

Copy the above script in a file and save it with **.py** extension (e.g. scrapper.py).

Run the script by executing below command in terminal/cmd (python3 should be installed already)

CopyCopyCopypython scrapper.py 

Now, we have the nice script that scrapes the exchange rate from two money exchange services (Remitly & Transferwise). This script can be easily extended to include more services without much changes in the code. Simply create new class for a new service and include the name of the service in the MONEY\_TRANSER\_SERVICES array. That’s it.

Conclusion
==========

In this part, we saw how to extract the information from a web-page. In the next part we will see how to structure the data and store in MongoDB for long term storage. Stay tuned!

Webscrape with Java, NodeJs & Python
====================================

[![Andrei Elekes](https://miro.medium.com/fit/c/96/96/2*wjWo7rxf5hk0eDb-LImfLw.jpeg)](/@aele54?source=post_page-----56117ed12b62----------------------)

[Andrei Elekes](/@aele54?source=post_page-----56117ed12b62----------------------)

Follow

[Dec 16, 2019](/coding-in-simple-english/webscrape-with-java-nodejs-python-56117ed12b62?source=post_page-----56117ed12b62----------------------) · 8 min read

![](https://miro.medium.com/freeze/max/60/1*wjQtHlKnE3xDk4Y4ZqUSSg.gif?q=20)

<img class="dq t u hg ak" src="https://miro.medium.com/max/2304/1\*wjQtHlKnE3xDk4Y4ZqUSSg.gif" width="1152" height="648" role="presentation">

[Source](https://dribbble.com/kidwill)

_So you need to extract data from a webpage into your application? How do you do it? Simple! Its called Webscaping and here’s how it's done._

* * *

What Is Web Scraping? 🤷‍♂️
===========================

> **Web scraping**, **web harvesting**, or **web data extraction** is [data scraping](https://en.wikipedia.org/wiki/Data_scraping) used for [extracting data](https://en.wikipedia.org/wiki/Data_extraction) from [websites](https://en.wikipedia.org/wiki/Website).

Webscraping software may access the World Wide Web directly using the [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) or through a web browser. While web scraping can be done manually by a software user, the term typically refers to automated processes implemented using a [bot](https://en.wikipedia.org/wiki/Internet_bot) or [web crawler](https://en.wikipedia.org/wiki/Web_crawler). It is a form of copying, in which specific data is gathered and copied from the web, typically into a central local [database](https://en.wikipedia.org/wiki/Database) or spreadsheet, for later [retrieval](https://en.wikipedia.org/wiki/Data_retrieval) or [analysis](https://en.wikipedia.org/wiki/Data_analysis).

Web scraping a web page involves fetching it and extracting from it. Fetching is the downloading of a page (which a browser does when you view the page). Therefore, web crawling is the main component of web scraping, to fetch pages for later processing. Once fetched, then extraction can take place. The content of a page may be [parsed](https://en.wikipedia.org/wiki/Parsing), searched, reformatted, its data copied into a spreadsheet, and so on. Web scrapers typically take something out of a page, to make use of it for another purpose somewhere else. An example would be to find and copy names and phone numbers, or companies, and their URLs, to a list (contact scraping).

There are, however, some web scraping software that will automatically load and extract data from multiple pages of websites based on your requirements. It is either custom-built for a specific website or is one that can be configured to work with any website. With the click of a button, you can easily save the data available on the website to a file on your computer.

Many services offer web scraping like [Scrapestorm Jp](https://medium.com/u/bbe5609206b0?source=post_page-----56117ed12b62----------------------), [Grepsr](https://medium.com/u/3b0f669c90bc?source=post_page-----56117ed12b62----------------------), and [ScrapingHub](https://medium.com/u/4d3a276154a2?source=post_page-----56117ed12b62----------------------). But today, I will be discussing how to build your own web scraper application using Java, NodeJs and Python.

Java WebScraper ☕️
==================

The best library to use for Java webscraping is [Jsoup](https://jsoup.org/).

> `_jsoup_` is a Java library for working with real-world HTML. It provides a very convenient API for extracting and manipulating data, using the best of DOM, CSS, and jquery-like methods.

`jsoup` implements the [WHATWG HTML5](https://whatwg.org/html) specification, and parses HTML to the same DOM as modern browsers do.

*   scrape and [parse](https://jsoup.org/cookbook/input/parse-document-from-string) HTML from a URL, file, or string
*   [find](https://jsoup.org/cookbook/extracting-data/selector-syntax) and extract data, using DOM traversal or CSS selectors
*   [manipulate](https://jsoup.org/cookbook/modifying-data/set-html) the HTML elements, attributes, and text
*   [clean](https://jsoup.org/cookbook/cleaning-html/whitelist-sanitizer) user-submitted content against a safe white-list, to prevent XSS attacks
*   [output](https://jsoup.org/apidocs/org/jsoup/select/Elements.html#html--) tidy HTML

jsoup is designed to deal with all varieties of HTML found in the wild, from pristine and validating, to invalid tag-soup; jsoup will create a sensible parse tree.

Download the Jsoup JAR file from [**here**](https://jsoup.org/download) and then create a java class containing the URL that you need to scrape:

import java.io.IOException;  
import org.jsoup.Jsoup;public class JsoupFromStringEx { public static void main(String\[\] args) throws IOException { String webPage = "https://www.google.com/"; String html = Jsoup._connect_(webPage).get().html(); System._out_.println(html); }  
}

After running the java class, the webpage data should be printed out. This is the most basic way of webscraping in Java. Of course, this does not separate the data; many functions need to be placed for the application to do so. To create a more elaborate webscraping application follow [**this**](https://stackabuse.com/web-scraping-the-java-way/)**.**

NodeJs WebScraper 🕸
====================

By using the superb tutorial [**here**](https://pusher.com/tutorials/web-scraper-node)**,** we create a new `scraper` directory for this tutorial and initialize it with a `package.json` file by running `npm init -y` from the project root. Then run this command to install all the dependencies needed:

**npm install** axios  cheerio  puppeteer **--save**

Here’s what each one does:

*   [**Axios**](https://github.com/axios/axios): Promise-based HTTP client for Node.js and the browser
*   [**Cheerio**](https://cheerio.js.org/): jQuery implementation for Node.js. Cheerio makes it easy to select, edit, and view DOM elements.
*   [**Puppeteer**](https://github.com/GoogleChrome/puppeteer): A Node.js library for controlling Google Chrome or Chromium.

When the installation is complete, create a new `pl-scraper.js` file in the root of your project directory and populate it with the following code:

_// pl-scraper.js_const axios = require('axios');const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';axios(url)  
      .then(response => {  
        const html = response.data;  
        console.log(html);  
      })  
      .catch(console.error);

If you run the code with `**node** pl-scraper.js`, a long string of HTML will be printed to the console.

And that’s it, you just retrieved all the data from a webpage using a NodeJs webscraper. But how can you parse the HTML for the exact data you need? Continue following [Pusher](https://medium.com/u/2b9d77ff34df?source=post_page-----56117ed12b62----------------------)’s tutorial [**here**](https://pusher.com/tutorials/web-scraper-node).

Python Webscraper 🐍
====================

With reference to Python Docs found [**here**](https://docs.python.org/3/)**,** we start off by downloading [lxml](http://lxml.de/) that is a pretty extensive library written for parsing XML and HTML documents very quickly, even handling messed up tags in the process. We will also be using the [Requests](http://docs.python-requests.org/en/latest/) module instead of the already built-in urllib2 module due to improvements in speed and readability. You can easily install both using `**pip** **install** lxml` and `**pip** **install** requests`.

Let’s start with the imports:

**from** lxml **import** html  
**import** requests

Next, we will use `requests.get` to retrieve the web page with our data, parse it using the `html` module, and save the results in `tree`:

page = requests.get**(**'http://econpy.pythonanywhere.com/ex/001.html'**)**  
tree = html.fromstring**(**page.content**)**

(We need to use `page.content` rather than `page.text` because `html.fromstring` implicitly expects `bytes` as input.)

`tree` now contains the whole HTML file in a nice tree structure which we can go over two different ways: XPath and CSSSelect. In this example, we will focus on the former.

XPath is a way of locating information in structured documents such as HTML or XML documents. A good introduction to XPath is on W3Schools. There are also various tools for obtaining the XPath of elements such as FireBug for Firefox or the Chrome Inspector. If you’re using Chrome, you can right-click an element, choose ‘Inspect element’, highlight the code, right-click again, and choose ‘Copy XPath’.

After a quick analysis, we see that in our page the data is contained in two elements — one is a div with title ‘buyer-name’ and the other is a span with class ‘item-price’:

**<div** title="buyer-name"**\>**Carson Busses**</div>**  
**<span** class="item-price"**\>**$29.95**</span>**

Knowing this we can create the correct XPath query and use the lxml `xpath` function like this:

_#This will create a list of buyers:_  
buyers = tree.xpath**(**'//div\[@title="buyer-name"\]/text()'**)**  
_#This will create a list of prices_  
prices = tree.xpath**(**'//span\[@class="item-price"\]/text()'**)**

Let’s see what we got exactly:

**print** 'Buyers: '**,** buyers  
**print** 'Prices: '**,** pricesBuyers**:**  **\[**'Carson Busses'**,** 'Earl E. Byrd'**,** 'Patty Cakes'**,**  
'Derri Anne Connecticut'**,** 'Moe Dess'**,** 'Leda Doggslife'**,** 'Dan Druff'**,**  
'Al Fresco'**,** 'Ido Hoe'**,** 'Howie Kisses'**,** 'Len Lease'**,** 'Phil Meup'**,**  
'Ira Pent'**,** 'Ben D. Rules'**,** 'Ave Sectomy'**,** 'Gary Shattire'**,**  
'Bobbi Soks'**,** 'Sheila Takya'**,** 'Rose Tattoo'**,** 'Moe Tell'**\]**Prices**:**  **\[**'$29.95'**,** '$8.37'**,** '$15.26'**,** '$19.25'**,** '$19.25'**,**  
'$13.99'**,** '$31.57'**,** '$8.49'**,** '$14.47'**,** '$15.86'**,** '$11.11'**,**  
'$15.98'**,** '$16.27'**,** '$7.50'**,** '$50.85'**,** '$14.26'**,** '$5.68'**,**  
'$15.00'**,** '$114.07'**,** '$10.09'**\]**

Congratulations! We have successfully scraped all the data we wanted from a web page using lxml and Requests. We have it stored in memory as two lists. Now we can do all sorts of cool stuff with it: we can analyze it using Python, or we can save it to a file and share it with the world.

Caution ⚠️
==========

So is it legal or illegal? Web scraping and crawling aren’t illegal by themselves. After all, you could scrape or crawl your own website, without a hitch…

![](https://miro.medium.com/max/60/1*XMwWhmkmiSs484luuLRQ7Q.jpeg?q=20)

<img class="dq t u hg ak" src="https://miro.medium.com/max/3840/1\*XMwWhmkmiSs484luuLRQ7Q.jpeg" width="1920" height="1080" role="presentation">

[Source](https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjou97ZrrzmAhUJaBoKHZePBakQjRx6BAgBEAQ&url=https%3A%2F%2Fwallpaperaccess.com%2Fhd-law&psig=AOvVaw2_rG6d_1UqvKqyjJUMBEMT&ust=1576661150366495)

In 2016, the US Congress passed its first legislation specifically to target bad bots — the [Better Online Ticket Sales (BOTS) Act](https://www.congress.gov/bill/114th-congress/senate-bill/3183), which bans the use of software that circumvents security measures on ticket seller websites. Automated ticket scalping bots use several techniques to do their dirty work including web scraping that incorporates advanced business logic to identify scalping opportunities, input purchase details into shopping carts, and even resell inventory on secondary markets.

In other words, if you’re a venue, organization or ticketing software platform, it is still on you to defend against this fraudulent activity during your major on sales. But of course, this depends on where in the world you are:

The UK however, seems to have followed the US with its [Digital Economy Act 2017](https://www.gov.uk/government/news/a-better-deal-for-consumers-in-the-digital-age) which achieved Royal Assent in April. The Act seeks to protect consumers in a number of ways in an increasingly digital society, including by “cracking down on ticket touts by making it a criminal offence for those that misuse bot technology to sweep up tickets and sell them at inflated prices in the secondary market.”

You can read more about this [**here**](https://resources.distilnetworks.com/all-blog-posts/is-web-scraping-illegal-depends-on-what-the-meaning-of-the-word-is-is)**.**

To put that into perspective, companies themselves have the responsibility of protecting their own data from web scrapers as they have to invoke the law themselves. So before you go off and try to web scrape from a .gov webpage with your python program, think again!

Use Cases 〽️
============

[Businesses](https://www.quora.com/What-are-examples-of-how-real-businesses-use-web-scraping-Are-there-any-types-of-businesses-which-use-this-more-than-others) use web scraping for different purposes and it varies on a case to case basis.

![](https://miro.medium.com/freeze/max/60/1*wNGxHlTCsH9zU90WDouoDQ.gif?q=20)

<img class="dq t u hg ak" src="https://miro.medium.com/max/1600/1\*wNGxHlTCsH9zU90WDouoDQ.gif" width="800" height="600" role="presentation">

[Source](https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwixrqj2r7zmAhUlzYUKHeRwAZ8QjRx6BAgBEAQ&url=https%3A%2F%2Fdribbble.com%2Fshots%2F4171367-Coding-Freak&psig=AOvVaw1Jdl8ZMhLi5rrYeb595BO2&ust=1576661497136416)

In **eCommerce**, Retailers/ marketplaces use web scraping to monitor their competitor prices and to improve their product attributes. Also, collect product reviews to do sentimental analysis. **Lawyers** use web scraping to see the past judgment report for their case reference. **Lead generation** companies use it to scrape the email address and phone numbers. **Recruiters** use it to collects user's profiles. Some **travel companies** collect data in real-time to provide live tracking details. **Media companies** collect trending topics and use hashtags to collect information from social media profiles. **Business directories** scrape complete information about the business profile, address, email, phone, products/services, working hours, Geocodes, etc.  
Each business has competition in the present world, So companies scrape their competitor information regularly to monitor the movements. **Government** secret agencies also scrape for national securities purpose.

It's safe to say that webscaping is a big field, and you have just finished a brief tour of that field, using Java, NodeJs, and Python as your guide. You have also learned that it is illegal to scrape some sites, and you should check their terms and conditions before scraping. So do your webscraping wisely!

References 📖
=============

[

Web Scraping Explained


--------------------------

### 

Web Scraping (also termed Screen Scraping, Web Data Extraction, Web Harvesting, etc.) is a technique employed to extract…

#### 

www.webharvy.com



](https://www.webharvy.com/articles/what-is-web-scraping.html)

* * *

Still worried about implementing applications, API’s or backends? Oracle is here to help, with industry-standard cloud applications, their team of experts will make implementation more than enjoyable.

☁️ Follow to get a [free 30-day trial with Oracle Cloud services](http://bit.ly/2HzFQJE) ☁️
-------------------------------------------------------------------------------------------

_Thank you for taking the time to read my article, if you’re looking for more posts like this, you can find me on_ [_Linkedin_](https://www.linkedin.com/in/andrei-elekes/)_,_ [_Twitter_](https://twitter.com/ElekesAndrei)_, or_ [_Medium_](/@aele54)_._

How to Crawl the Web Politely with Scrapy
=========================================

[![ScrapingHub](https://miro.medium.com/fit/c/96/96/0*QKCSR-4TgI0iqDQR.png)](/@ScrapingHub?source=post_page-----15fbe489573d----------------------)

[ScrapingHub](/@ScrapingHub?source=post_page-----15fbe489573d----------------------)

Follow

[Oct 26, 2016](/hackernoon/how-to-crawl-the-web-politely-with-scrapy-15fbe489573d?source=post_page-----15fbe489573d----------------------) · 7 min read

The first rule of web crawling is you do not harm the website. The second rule of web crawling is you do **NOT** harm the website. We’re supporters of the democratization of web data, but not at the expense of the website’s owners.

In this post we’re sharing a few tips for [Scrapy](https://scrapy.org/) users (Scrapy is a 100% open source web crawling framework) who want polite and considerate web crawlers.

Whether you call them spiders, crawlers, or robots, let’s work together to create a world of Baymaxs, WALL-Es, and R2-D2s rather than an apocalyptic wasteland of HAL 9000s, T-1000s, and Megatrons.

![](https://miro.medium.com/max/60/1*YSO3AbxfWQ6Bc8McB5-dGA.png?q=20)

<img class="ds t u hs ak" src="https://miro.medium.com/max/620/1\*YSO3AbxfWQ6Bc8McB5-dGA.png" width="310" height="171" role="presentation">

Embrace the lovable bots

What Makes a Crawler Polite?
============================

> A polite crawler respects robots.txt  
> A polite crawler never degrades a website’s performance  
> A polite crawler identifies its creator with contact information  
> A polite crawler is not a pain in the buttocks of system administrators

robots.txt
==========

Always make sure that your crawler follows the rules defined in the website’s robots.txt file. This file is usually available at the root of a website (www.example.com/robots.txt) and it describes what a crawler should or shouldn’t crawl according to the [Robots Exclusion Standard](https://support.google.com/webmasters/answer/6062608?hl=en). Some websites even use the crawlers’ user agent to specify separate rules for different web crawlers:

User-agent: Some\_Annoying\_Bot  
Disallow: /User-Agent: \*  
Disallow: /\*.json  
Disallow: /api  
Disallow: /post  
Disallow: /submit  
Allow: /

Crawl-Delay
===========

Mission critical to having a polite crawler is making sure your crawler doesn’t hit a website too hard. Respect the delay that crawlers should wait between requests by following the robots.txt Crawl-Delay directive.

When a website gets overloaded with more requests that the web server can handle, they might become unresponsive. Don’t be that guy or girl that causes a headache for the website administrators.

User-Agent
==========

However, if you have ignored the cardinal rules above (or your crawler has achieved aggressive sentience), there needs to be a way for the website owners to contact you. You can do this by including your company name and an email address or website in the request’s User-Agent header. For example, Google’s crawler user agent is “Googlebot”.

How to be Polite using Scrapy
=============================

[Scrapy](https://scrapy.org/) is a bit like Optimus Prime: friendly, fast, and capable of getting the job done no matter what. However, much like Optimus Prime and his fellow Autobots, Scrapy occasionally needs to be [kept in check](https://youtu.be/DgQHgy7Nmkk?t=8s). So here’s the nitty gritty for ensuring that Scrapy is as polite as can be.

[

![](https://miro.medium.com/max/60/1*FsyqhfN3evDrckB5IH_h8w.png?q=20)

<img class="ds t u hs ak" src="https://miro.medium.com/max/512/1\*FsyqhfN3evDrckB5IH\_h8w.png" width="256" height="256" role="presentation">







](https://scrapy.org/)

Robots.txt
==========

Crawlers created using Scrapy 1.1+ already respect robots.txt by default. If your crawlers have been generated using a previous version of Scrapy, you can enable this feature by adding this in the project’s settings.py:

ROBOTSTXT\_OBEY = True

Then, every time your crawler tries to download a page from a disallowed URL, you’ll see a message like this:

2016-08-19 16:12:56 \[scrapy\] DEBUG: Forbidden by robots.txt: <GET http://website.com/login>

Identifying your Crawler
========================

It’s important to provide a way for sysadmins to easily contact you if they have any trouble with your crawler. If you don’t, they’ll have to dig into their logs and look for the offending IPs.

Be nice to the friendly sysadmins in your life and identify your crawler via the Scrapy USER\_AGENT setting. Share your crawler name, company name and a contact email:

USER\_AGENT = 'MyCompany-MyCrawler (bot@mycompany.com)'

Introducing Delays
==================

Scrapy spiders are blazingly fast. They can handle many concurrent requests and they make the most of your bandwidth and computing power. However, with great power comes great responsibility.

To avoid hitting the web servers too frequently, you need to use the [DOWNLOAD\_DELAY](http://doc.scrapy.org/en/latest/topics/settings.html?highlight=download_delay#download-delay) setting in your project (or in your spiders). Scrapy will then introduce a random delay ranging from 0.5 \* DOWNLOAD\_DELAY to 1.5 \* DOWNLOAD\_DELAY seconds between consecutive requests to the same domain. If you want to stick to the exact DOWNLOAD\_DELAY that you defined, you have to disable [RANDOMIZE\_DOWNLOAD\_DELAY](http://doc.scrapy.org/en/latest/topics/settings.html?highlight=download_delay#randomize-download-delay).

By default, DOWNLOAD\_DELAY is set to 0. To introduce a 5 second delay between requests from your crawler, add this to your settings.py:

DOWNLOAD\_DELAY = 5.0

If you have a multi-spider project crawling multiple sites, you can define a different delay for each spider with the download\_delay (yes, it’s lowercase) spider attribute:

class MySpider(scrapy.Spider):  
    name = 'myspider'  
    download\_delay = 5.0  
    ...

Concurrent Requests Per Domain
==============================

Another setting you might want to tweak to make your spider more polite is the number of concurrent requests it will do for each domain. By default, Scrapy will dispatch at most 8 requests simultaneously to any given domain, but you can change this value by updating the [CONCURRENT\_REQUESTS\_PER\_DOMAIN](http://doc.scrapy.org/en/latest/topics/settings.html#concurrent-requests-per-domain) setting.

Heads up, the [CONCURRENT\_REQUESTS](http://doc.scrapy.org/en/latest/topics/settings.html?highlight=download_delay#concurrent-requests) setting defines the maximum amount of simultaneous requests that Scrapy’s downloader will do for all your spiders. Tweaking this setting is more about your own server performance / bandwidth than your target’s when you’re crawling multiple domains at the same time.

AutoThrottle to Save the Day
============================

Websites vary drastically in the number of requests they can handle. Adjusting this manually for every website that you are crawling is about as much fun as watching paint dry. To save your sanity, Scrapy provides an extension called [AutoThrottle](http://doc.scrapy.org/en/latest/topics/autothrottle.html).

AutoThrottle automatically adjusts the delays between requests according to the current web server load. It first calculates the latency from one request. Then it will adjust the delay between requests for the same domain in a way that no more than [AUTOTHROTTLE\_TARGET\_CONCURRENCY](http://doc.scrapy.org/en/latest/topics/autothrottle.html#std:setting-AUTOTHROTTLE_TARGET_CONCURRENCY) requests will be simultaneously active. It also ensures that requests are evenly distributed in a given time span.

To enable AutoThrottle, just include this in your project’s settings.py:

AUTOTHROTTLE\_ENABLED = True

[Scrapy Cloud](https://scrapinghub.com/scrapy-cloud/) users don’t have to worry about enabling it because it’s already enabled by default.

There’s a [wide range of settings](http://doc.scrapy.org/en/latest/topics/autothrottle.html#settings) to help you tweak the throttle mechanism, so have fun playing around!

Use an HTTP Cache for Development
=================================

Developing a web crawler is an iterative process. However, running a crawler to check if it’s working means hitting the server multiple times for each test. To help you to avoid this impolite activity, Scrapy provides a built-in middleware called [HttpCacheMiddleware](http://doc.scrapy.org/en/latest/topics/downloader-middleware.html#module-scrapy.downloadermiddlewares.httpcache). You can enable it by including this in your project’s settings.py:

HTTPCACHE\_ENABLED = True

Once enabled, it caches every request made by your spider along with the related response. So the next time you run your spider, it will not hit the server for requests already done. It’s a win-win: your tests will run much faster and the website will save resources.

Don’t Crawl, use the API
========================

Many websites provide HTTP APIs so that third parties can consume their data without having to crawl their web pages. Before building a web scraper, check if the target website already provides an HTTP API that you can use. If it does, go with the API. Again, it’s a win-win: you avoid digging into the page’s HTML and your crawler gets more robust because it doesn’t need to depend on the website’s layout.

Scrapinghub Abuse Report Form
=============================

Hey folks using our [Scrapy Cloud](https://scrapinghub.com/scrapy-cloud/) platform! We trust you will crawl responsibly, but to support website administrators, we provide an [abuse report form](https://scrapinghub.com/abuse-report/) where they can report any misbehaviour from crawlers running on our platform. We’ll kindly pass the message along so that you can modify your crawls and avoid ruining a sysadmin’s day. If your crawler’s are turning into Skynet and [running roughshod over human law](https://scrapinghub.com/tos/), we reserve the right to halt their crawling activities and thus avert the robot apocalypse.

Wrap Up
=======

Let’s all do our part to keep the peace between sysadmins, website owners, and developers by making sure that our web crawling projects are as noninvasive as possible. Remember, we need to band together to delay the rise of our robot overlords, so let’s keep our crawlers, spiders, and bots polite.

![](https://miro.medium.com/max/60/1*kgoZTFROt7PpugiqcGHWLQ.jpeg?q=20)

<img class="ds t u hs ak" src="https://miro.medium.com/max/600/1\*kgoZTFROt7PpugiqcGHWLQ.jpeg" width="300" height="225" role="presentation">

To all website owners, help a crawler out and ensure your site has an HTTP API.

* * *

[Scrapy Cloud is forever free](https://scrapinghub.com/platform/) and is the peanut butter to Scrapy’s jelly. Hopefully you learned a few tips for how to both speed up your crawls and prevent abuse complaints.

* * *

![](https://miro.medium.com/max/60/1*eB6mGeLhPSP3hXrcrtRuqQ.jpeg?q=20)

<img class="ds t u hs ak" src="https://miro.medium.com/max/434/1\*eB6mGeLhPSP3hXrcrtRuqQ.jpeg" width="217" height="217" role="presentation">

This post was written by Valdir Stumm( [@stummjr](https://twitter.com/stummjr)), a developer at Scrapinghub.

Please heart the “Recommend” so that others can learn more about how to use Scrapy politely.

[**Learn more about what web scraping and web data can do for you**](https://scrapinghub.com/data-services/)**.**

Originally published on the [Scrapinghub blog](https://blog.scrapinghub.com/2016/08/25/how-to-crawl-the-web-politely-with-scrapy/).

[

![](https://miro.medium.com/max/60/1*0hqOaABQ7XGPT-OYNgiUBg.png?q=20)

<img class="ds t u hs ak" src="https://miro.medium.com/max/2272/1\*0hqOaABQ7XGPT-OYNgiUBg.png" width="1136" height="572" role="presentation">





](http://bit.ly/HackernoonFB)

[

![](https://miro.medium.com/max/60/1*Vgw1jkA6hgnvwzTsfMlnpg.png?q=20)

<img class="ds t u hs ak" src="https://miro.medium.com/max/2272/1\*Vgw1jkA6hgnvwzTsfMlnpg.png" width="1136" height="572" role="presentation">





](https://goo.gl/k7XYbx)

[

![](https://miro.medium.com/max/60/1*gKBpq1ruUi0FVK2UM_I4tQ.png?q=20)

<img class="ds t u hs ak" src="https://miro.medium.com/max/2272/1\*gKBpq1ruUi0FVK2UM\_I4tQ.png" width="1136" height="572" role="presentation">





](https://goo.gl/4ofytp)

> [Hacker Noon](http://bit.ly/Hackernoon) is how hackers start their afternoons. We’re a part of the [@AMI](http://bit.ly/atAMIatAMI) family. We are now [accepting submissions](http://bit.ly/hackernoonsubmission) and happy to [discuss advertising & sponsorship](mailto:partners@amipublications.com) opportunities.
> 
> If you enjoyed this story, we recommend reading our [latest tech stories](http://bit.ly/hackernoonlatestt) and [trending tech stories](https://hackernoon.com/trending). Until next time, don’t take the realities of the world for granted!

[

![](https://miro.medium.com/max/60/1*35tCjoPcvq6LbB3I6Wegqw.jpeg?q=20)

<img class="ds t u hs ak" src="https://miro.medium.com/max/30000/1\*35tCjoPcvq6LbB3I6Wegqw.jpeg" width="15000" height="1800" role="presentation">





](https://goo.gl/Ahtev1)

How to do web scraping with Cheerio
===================================

[![Andrew Smith](https://miro.medium.com/fit/c/96/96/0*PF6Zr-UH-806fprw.jpeg)](/@silentworks?source=post_page-----f83c0467e202----------------------)

[Andrew Smith](/@silentworks?source=post_page-----f83c0467e202----------------------)

Follow

[Aug 29, 2017](/@silentworks/how-to-do-web-scraping-with-cheerio-f83c0467e202?source=post_page-----f83c0467e202----------------------) · 9 min read

![](https://miro.medium.com/max/60/1*RKryPeD5M_aKc_YATUEfyA.jpeg?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/9988/1\*RKryPeD5M\_aKc\_YATUEfyA.jpeg" width="4994" height="3329" role="presentation">

This past weekend (13 August 2017) I started on a quest to get some data from a cinema website here in Accra, Ghana. I thought this would have been easy, since the data is available publicly. I immediately opened the Chrome web inspector to see some markup like I have not seen in years.

![](https://miro.medium.com/max/60/0*32PIKXI1GS2PrJ5s.png?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/1710/0\*32PIKXI1GS2PrJ5s.png" width="855" height="390" role="presentation">

The Problem
===========

There was no structure to this data, the listings were just a bunch of `<p>` tags with some nested `<span>` and `<br>` tags inside. This to me was a sign of a no go, I even went on to state that there was no way of getting this data in the [DevCongress](http://slack.devcongress.org/) (you might be wondering what DevCongress is, more to come soon) slack group, along with a solution I wasn’t too sure would work.

![](https://miro.medium.com/max/60/0*LuDDRLMwRunwXnoY.png?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/1768/0\*LuDDRLMwRunwXnoY.png" width="884" height="103" role="presentation">

The Old Solution
================

After a few minutes of thinking it through, I realised there was a pattern even in the `<p>` tags, when I did a count I noticed that each movie has around **12** nodes of `<p>` which contained the data I would need for the movie. So now I could do a loop over the `<p>` tags and count down from **12**, then reset the counter once we hit **0**.

The Actual Solution
===================

Just when I finished writing this post, the data I was scraping changed and broke my solution, so I had to go back to the drawing board and come up with a new solution, which I think in turn has worked out to be a better and more robust solution.

Instead of counting the `<p>` tags, I have decided to use the `<hr>` tags on the page as the breaking point between each movie, I have also decided to not use the method I was before by counting down from **12** to get the movie information. I have instead opted for checking the actual string I am looping over to test if it contains a certain word where possible. In other places I am using some crazy thinking to get the information I need.

Its now a bit clearer to me as to how to approach the problem, I then decided its time to start writing some code, I was thinking of doing this in Python as I had used [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) in the past to do this sort of thing, but lately I have been doing more work in JavaScript and Node. So I did a quick search and I found [this article](https://hackernoon.com/cheerio-node-nodejs-tutorial-web-html-scraping-note-a4ceb37d9cbb) using [Cheerio](https://cheerio.js.org/) and the Request library, I quickly started writing some code and couldn’t believe how easy the API was to use.

Getting started with the necessary tooling
==========================================

Lets start by installing the libraries we will need, also note I am using Node 8, so will be using new features of JavaScript where I see fit.

Requirements
============

For this tutorial you will need the following libraries. At the time of writing these are the versions I used.

*   Cheerio (1.0.0-rc.2)
*   Request (2.81.0)

npm install cheerio@^1.0.0-rc.2 request@^2.81.0

Now lets start requiring the libraries we need in order to get some data from the webpage.

let fs = require('fs');   
let request = require('request');   
let cheerio = require('cheerio');

You will notice I am also requiring the `fs` library, we are doing this so that later on we don’t hit the API more times than necessary, we can cache the data and easily read from cache and do our scraping from that data.

Now lets define a few variables to store the URL of the website we want to scrape and the name of the cache files.

const cinema = 'accra';   
const apiUrl = \`http://silverbirdcinemas.com/${cinema}/\`;   
const cacheFile = \`cache/${cinema}-silverbird.html\`;   
const outputCacheFile = \`cache/${cinema}-silverbird.json\`;

Lets Go!
========

We can now start defining our data structure that we want to deliver to our end user.

// main movie listing   
let movieListings = {   
    address: '',  
    movies: \[\]  
};  
   
// each individual movie   
let newMovieObj = {  
    title: '',  
    showtimes: \[\],  
    synopsis: '',  
    cast: \[\],  
    runningTime: '',  
    genre: \[\],   
    rating: 'Unknown'   
};

Here we have defined the properties our output data will conform to, so in the `movieListings` structure, we are currently only storing the _address_ of the cinema and a list of _movies_. While in the `newMovieObj` we are storing all the attributes of the movie that we need.

Lets start writing our code to make a request to get the `apiUrl` and then cache it to the file system using the `fs` library. We will start off by wrapping the function so we can reuse it later on.

let requestPage = (url, cachePath) => {   
    request(url, (err, response, html) => {   
        if (err) {   
            return console.log(err);   
        }   
        fs.writeFile(cachePath, html, err => {   
            if (err) {   
                return console.log(err);   
            }   
            console.log('The file was saved!');   
        });  
    });  
};

Lets look at some of this code, we start off by defining our function called `requestPage`, which requires two parameters, one for the `url` we are making the request to and another for the `cachePath` we wish to save the response data to. We know what we are requesting is html so we will save it as html as defined in the `cacheFile` variable we set earlier. We call the `request` library with the `url` and a callback function with the parameters of `err, response, html`, with these we can determine the state of the request we’ve made. If there is an error, we just log it to the console for now, otherwise we can move on to starting to write to the filesystem. We now have some data, so lets move on to writing it to the filesystem for now with `fs.writeFile`, in this we will also check for error and log them to the console again.

Now that we have our function to request and write data to the filesystem, lets move on to reading the cache file we saved.

fs.stat(cacheFile, (err, stat) => {   
    if (!err) {   
        fs.readFile(cacheFile, (err, data) => {});   
    } else if (err.code == 'ENOENT') {   
        requestPage(apiUrl, cacheFile);   
    }   
});

We start by checking if the `cacheFile` exists, if it doesn’t we send a request and create one, otherwise we just read it using the `fs.readFile` function.

Inside our `fs.readFile` callback, lets start loading up the data (which we know is an html page) into cheerio so we can crawl the DOM (Document Object Model) and select the data we need.

fs.readFile(cacheFile, (err, data) => {   
    let $ = cheerio.load(data);   
    let numLines = 10;   
    let synopsisNext = false;   
});

Lets take a look at this line by line.

let $ = cheerio.load(data);

You might be wondering why are we assigning a `$` variable to the loading of the DOM data, we are using the `$` for no specific reason, except that its what jQuery uses and it became universal amongst most developers to represent the DOM.

let numLines = 10;

We assign the `numLines` variable to **10**, because this is what we will use to figure out where our movie title is. So each time the `numLines` is reduced to **10** we know its the node of a movie title.

let movie = Object.assign({}, newMovieObj);

The `movie` variable is assigned to a new copy of the `newMovieObj` to get all the properties in that object.

let synopsisNext = false;

This `synopsisNext` variable is to make sure that we know when the synopsis information is coming up, since the actual information and the title word **SYNOPSIS** are stored in different `<p>` tags.

$('#content .page').children().each((i, elem) => {  
    let text = $(elem).text();  
    let html = $(elem).html();  
    if (i >= 1 && i < 3) {  
        movieListings.address += text.replace("\\'", '');  
    }  
      
    // Movies start  
    if (i > 12) {  
        if (html == '') {  
            if (movie.title !== '') {  
                movieListings.movies.push(movie);  
            }  
            numLines = 11; // offset by 1 in order to get movie title  
            movie = Object.assign({}, newMovieObj);  
        }  
          
        // The movie title should be the first item in the loop  
        if (numLines == 10) {  
            movie.title = text.replace('\\n ', '').trim();  
        }if (checkDaysOfWeek(text, \['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'\])) {  
            movie.showtimes = text.split('\\n').map(item => item.trim());  
        }// Search for SYNOPSIS keyword and know that the next loop  
        // will be the actual synopsis  
        if (synopsisNext) {  
            movie.synopsis = text;  
            synopsisNext = false;  
        }if (text.indexOf('SYNOPSIS') === 0) {  
            synopsisNext = true;  
        }// Search for the CASTS keyword  
        if (text.indexOf('CASTS:') === 0) {  
            movie.cast = (text.replace('CASTS:', '').trim()).split(',').map(item => item.trim());  
        }// Search for RUNNING TIME keyword  
        if (text.indexOf('RUNNING TIME:') === 0) {  
            movie.runningTime = text.replace('RUNNING TIME:', '').trim();  
        }// Search for GERNE keyword  
        if (text.indexOf('GENRE:') === 0) {  
            movie.genre = (text.replace('GENRE:', '').trim()).split(',').map(item => item.trim());  
        }// Search for RATING keyword  
        if (text.indexOf('RATING:') === 0) {  
            movie.rating = text.replace('RATING:', '').trim();  
        }  
        numLines--;  
    }  
});

The code above is plenty, but lets break it down as to what each part is doing.

We will start off on line 1 which loops through all the `p` tags inside of a `div` with the **id** of `content`.

$('#content .page').children().each((i, elem) => {

On line 2 and 3 we are assigning the text of each `p` tag into a variable called `text` and a variable called `html`.

let text = $(elem).text();   
let html = $(elem).html();

From line 4 we are then checking if the current `p` tag is situated in the first 3, as we have figured this is where the address for the cinema is located. We then append that text to the `address` property of the `movieListings` object. At this point we do some cleanup on the text with the `replace` string method.

if (i >= 1 && i < 3) {   
    movieListings.address += text.replace("\\'", '');  
}

Next we can see that the actual movie listings start from line 9 onwards, this is because we know that after 12 `p` tags we have the movie listings starting.

if (i > 12) {

On line 10 to 16, we check if `html` is empty and reset `numLines` to 11, you might be wondering why 11 instead of 10, this is because we have to offset by 1 in order to get any subsequent title after the first time, now we add the current `movie` to the `movieListings.movies`. We then move on to creating a new `movie` object to make sure that our next loop is not updating an existing movie reference.

if (html == '') {   
    if (movie.title !== '') {   
        movieListings.movies.push(movie);  
    }   
    numLines = 11; // offset by 1 in order to get movie titlemovie = Object.assign({}, newMovieObj);  
}

On line 19 to 56, we use multiple `if` statements to decide which piece of movie information we are currently accessing. Here you will notice we are using different methods to check the data against. When we find the information we need, we are doing some manipulation and cleanup in order to create a format we are happy with. In this particular area we created a helper function to get the showtimes, by check a string to see if it contains any of the days in the week. That helper function is the `checkDaysOfWeek` function, which looks like the below.

let checkDaysOfWeek = (text, days) => {   
    for (var i = 0; i < days.length; i++) {   
        if (text.toLowerCase().indexOf(days\[i\]) !== -1) {   
            return true;   
        }   
    }   
    return false;   
};

The rest of the code below is just working out how best to find a particular piece of movie information.

// The movie title should be the first item in the loop  
if (numLines == 10) {  
    movie.title = text.replace('\\n ', '').trim();  
}if (checkDaysOfWeek(text, \['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'\])) {  
    movie.showtimes = text.split('\\n').map(item => item.trim());  
}// Search for SYNOPSIS keyword and know that the next loop  
// will be the actual synopsis  
if (synopsisNext) {  
    movie.synopsis = text;  
    synopsisNext = false;  
}if (text.indexOf('SYNOPSIS') === 0) {  
    synopsisNext = true;  
}// Search for the CASTS keyword  
if (text.indexOf('CASTS:') === 0) {  
    movie.cast = (text.replace('CASTS:', '').trim()).split(',').map(item => item.trim());  
}// Search for RUNNING TIME keyword  
if (text.indexOf('RUNNING TIME:') === 0) {  
    movie.runningTime = text.replace('RUNNING TIME:', '').trim();  
}// Search for GERNE keyword  
if (text.indexOf('GENRE:') === 0) {  
    movie.genre = (text.replace('GENRE:', '').trim()).split(',').map(item => item.trim());  
}// Search for RATING keyword  
if (text.indexOf('RATING:') === 0) {  
    movie.rating = text.replace('RATING:', '').trim();  
}

Once we hit line 57, we reduce by 1 the `numLines` left.

numLines--;

You can view the full source code and working copy on [Glitch](https://glitch.com/edit/#!/sunrise-alloy).

And this is how I went about scraping the movie data I needed from the cinema website. In the code there are a lot of places that can be refactored and simplified. I might write another post on refactoring the current codebase.

Thanks to [Wendy Smith](https://twitter.com/micheallshair), [Edmond Mensah](https://twitter.com/Eddy_mens), [Emmanuel Lartey](https://twitter.com/elartey) and [David Oddoye](https://twitter.com/theRealBraZee) for reviewing this post and giving feedback to improve it. If you need Front-end/NodeJS/PHP development done, please visit [https://www.donielsmith.com](https://www.donielsmith.com/) and check out some of my work. Feel free to get in-touch with me on Twitter [@silentworks](https://twitter.com/silentworks) with questions.

* * *

_Originally published at_ [_www.donielsmith.com_](https://www.donielsmith.com/blog/2017/08/29/how-to-do-web-scraping-with-cheerio/) _on August 29, 2017._

Visual Web Scraping Tools: What to Do When They Are No Longer Fit For Purpose?
==============================================================================

[![ScrapingHub](https://miro.medium.com/fit/c/96/96/0*QKCSR-4TgI0iqDQR.png)](/@ScrapingHub?source=post_page-----a366996a25d1----------------------)

[ScrapingHub](/@ScrapingHub?source=post_page-----a366996a25d1----------------------)

Follow

[May 30, 2019](/@ScrapingHub/visual-web-scraping-tools-what-to-do-when-they-are-no-longer-fit-for-purpose-a366996a25d1?source=post_page-----a366996a25d1----------------------) · 7 min read

![](https://miro.medium.com/max/60/1*RfiGIGBvUSwUkkA3cNn1vg.png?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/2400/1\*RfiGIGBvUSwUkkA3cNn1vg.png" width="1200" height="628" role="presentation">

Visual web scraping tools are great. They allow people with little to no technical know-how to extract data from websites with only a couple hours of upskilling, making them great for simple lead generation, market intelligence and competitor monitoring projects. Removing countless hours of manual entry work for sales and marketing teams, researchers, and business intelligence team in the process.

However, no matter how sophisticated the creators of these tools say their visual web scraping tools are, users often run into issues when trying to scrape mission-critical data from complex websites or when scraping the web at scale.

In this article, we’re going to talk about the biggest issues companies face when using visual web scraping tools like Mozenda, Import.io and Dexi.io, and what they should do when they are no longer fit for purpose.

First, let’s use a commonly known comparison to help explain the pros and cons of visual web scraping tools versus manually coding your own web crawlers.

The Visual Website Builders of Web Scraping
===========================================

If you have any experience of developing a website for your own business, hobby or client projects, odds are you have come across one of the many online tools that say you can create visually stunning and fully featured websites using a simple-to-use visual interface.

When we see their promotional videos and the example websites their users have “created” on their platforms we believe we have hit the jackpot. With a few clicks of a button, we can design a beautiful website ourselves at a fraction of the cost of hiring a web developer to do it for us. Unfortunately, in most cases these tools never meet our expectations.

No matter how much they try, visual point and click website builders can never replicate the functionality, design and performance of a custom website created by a web developer. Websites created by visual website builder tools are often slow, inefficient, have poor SEO and severely limit the translation of design requirements into the desired website. As a result, outside of very small business websites and rapid prototyping of marketing landing pages, companies overwhelming have professional web developers design and develop custom websites for their businesses.

The same is true of visual point and click web scraping tools. Although the promotional material of many of these tools make it look like you can extract any data from any website at any scale, in reality this is often never true.

Like visual website builder tools, visual web scraping tools are great for small and simple data extraction projects where lapses in data quality or delivery aren’t critical, however, when scraping mission critical data from complex websites at scale then they quickly suffer some serious issues often making them a bottleneck in companies data extraction pipelines and a burden on their teams.

With that in mind we will look at some of these performance issues in a bit more detail…

Efficiency When Scraping At Scale
=================================

Visual point and click web scraping tools suffer from similar issues that visual website builders encounter. Because the crawler design needs to be able to handle a huge variety of website types/formats and isn’t being custom developed by an experienced developer, the underlying code can sometimes be clunky and inefficient. Impacting the speed at which visual crawlers can extract the target data and make them more prone to breaking.

Oftentimes, these crawlers make additional requests that aren’t required, render JavaScript when there is no need, and increase the footprint of the crawler increasing the likelihood of your crawlers being detected by anti-bot countermeasures.

These issues often have little noticeable impact on small scale and infrequent web scraping projects, however, as the volume of data being extracted increases, users of visual web scrapers often notice significant performance issues in comparison to custom developed crawlers.

Unnecessarily, putting more strain on the target websites servers, increasing the load on your web scraping infrastructure and make extracting data within tight time windows unviable.

Increased Data Quality & Reliability Issues
===========================================

Visual web scraping tools also suffer from increased data quality and reliability issues due to the technical limitations described above along with their inherent rigidity, lack of quality assurance layers and the fact their opaque nature makes it harder to identify and fix the root causes of data quality issues.

*   **Flexibility** — Due to the automated and rigid nature of visual web scraping tools, the crawlers they develop may be overly specific in extracting data from a website. This means that if there is even a small change in the website’s structure, the crawler could break. In comparison, experienced crawl engineers can design their crawlers from the outset to be much more flexible to website changes etc. making them much more reliable.
*   **Limited Visibility of Crawlers Inner Workings** — With visual web scraping tools you have limited visibility of precisely how it is crawling the target website making it harder to identify and fix the root causes of data quality issues.
*   **Quality Assurance Layers** — With visual web scraping tools you have less control over how your crawlers and data feeds are being monitored and checked for data quality issues. Making it harder to maintain data quality and troubleshoot any issues that inevitably will arise.

These issues combine to reduce the overall data quality and reliability of data extracted with visual web scraping tools and increase the maintenance burden.

Complex Websites
================

Another drawback of visual web scraping tools is the fact that they often struggle to handle modern websites that make extensive use of JavaScript and AJAX. These limitations can make it difficult to extract all the data you need and simulate user behaviour adequately.

It can often also be complex to next to impossible to extract data from certain types of fields on websites, for example: hidden elements, XHR requests and other non-HTML elements (for example PDF or XLS files embedded on the page).

For simple web scraping projects these drawbacks might not be an issue, but for certain use cases and sites they can make extracting the data you need virtually impossible.

Anti-Bot Countermeasures
========================

Oftentimes, the technical issues described above aren’t that evident for smaller scale web scraping projects, however, they can quickly become debilitating as you scale up your crawls. Not only do they make your web scraping processes more inefficient and buggy, they can stop you from extracting your target data entirely.

Increasingly, large websites are using anti-bot countermeasures to control the way automated bots access their websites. However, due to the inefficiency of their code, web crawlers designed by visual web scraping tools are often easier to detect than properly optimised custom spiders.

Custom spiders can be designed to better simulate user behaviour, minimise their digital footprint and counteract the detection methods of anti-bot countermeasures to avoid any disruption to their data feeds.

In contrast, the same degree of customisation is often impossible to replicate with crawlers built using visual web scraping tools without getting access to and modifying the underlying source code of the crawlers. Which can be difficult to do as it is often proprietary to the visual website builder.

As a result, often the only step you can take is to increase the size of your proxy pool to cope with the increasing frequency of bans, etc. as you scale.

Experiencing Issues Your Visual Web Scraping Tool?
==================================================

If you are using a visual web scraping tool with zero issues and have no plans to scale your web scraping projects then you might as well just keep using your current web scraping tool. You likely won’t get any performance boost from switching to custom designed tools.

Although current visual web scraping tools have come along way, currently they often can’t replicate the accuracy and performance of custom designed crawlers, especially when scraping at scale.

In the coming years, with the continued advancements in artificial intelligence these crawlers may be able to match their performance. However for the time being, if your web scraping projects are suffering from poor data quality, crawlers breaking, difficulties scaling, or want to cut your reliance on your current providers support team then you should seriously consider building a custom web scraping infrastructure for your data extraction requirements.

In cases like these, it is very common for companies to contact Scrapinghub to migrate their web scraping projects from a visual web scraping tool to a custom web scraping infrastructure.

Not only are they able to significantly increase the scale and performance of your web scraping projects, they no longer have to rely on proprietary technologies, have no vendor lock-in, and have more flexibility to get the exact data they need with no data quality or reliability issues.

Removing all of the bottlenecks and headaches companies normally face when using visual web scraping tools.

If you think it is time for you to take this approach with your web scraping, then you have two options:

1.  Build it yourself; or,
2.  Partner with an experienced web scraping provider

At Scrapinghub, we can help you with both options. We have a [comprehensive suite of web scraping tools](https://scrapinghub.com/compare-products) to help development teams build, scale and manage their spiders without all the headaches of managing the underlying infrastructure. Along with a range of [data extraction services](https://scrapinghub.com/data-services) where we develop and manage your custom high performance web scraping infrastructure for you.

If you have a need to start or scale your web scraping projects then our [Solution Architecture team](http://bit.ly/2Vm96rO) is available for a free consultation, where we will evaluate and develop the architecture for a data extraction solution to meet your data and compliance requirements.

At Scrapinghub we always love to hear what our readers think of our content and would be more than interested in any questions you may have. So please, leave a comment below with your thoughts and perhaps consider sharing what you are working on right now!

* * *

_Originally published at_ [_https://blog.scrapinghub.com_](https://blog.scrapinghub.com/visual-web-scraping-tools-what-to-do-when-they-are-no-longer-fit-for-purpose) _on May 30, 2019._

Natural Language Processing
===========================

[![Sam Lundberg](https://miro.medium.com/fit/c/96/96/0*eWraRIABOV2q1Drq)](/@sslundberg?source=post_page-----6e6e92edbd11----------------------)

[Sam Lundberg](/@sslundberg?source=post_page-----6e6e92edbd11----------------------)

Follow

[Sep 22, 2018](/@sslundberg/natural-language-processing-6e6e92edbd11?source=post_page-----6e6e92edbd11----------------------) · 2 min read

I recently became familiar with the process of using website API’s and/or how to do web scraping, to extract words or tables from websites, to become a source of data for machine learning purposes. That in itself was pretty interesting, but what you can do with all that information, particularly with words, is fascinating. Welcome to the world of Natural Language Processing (NLP).

NLP has become on of my favorite subjects I have learned in my Data Science learning. Being able to take a post from Reddit, or comments from Amazon, or an article from a webpage, and to create a predictive model from that blows my mind. I mean, how can words be treated like numerical values?! But if start thinking about it, certain words can define who wrote/said in a statement, and if you can identify that, you now have a feature you can help predict on. Finding the occurence of the number of times a word shows up can hold a lot of power.

For instance, the phrase “Make America Great Again” is President Trump’s slogan. If I am trying to predict if an article or post is written by a democrat or republican, and those words show up in that record, with some tuning, the model would probably predict if a republican wrote that post, or if there are ties to the Republican party, or even Trump himself.

At the time I was learning this, there was the big news of someone close in Trump’s cabinet that wrote a very incriminating letter of Trump’s alleged missteps as President. Nobody knew who wrote it, but I came across several news reports and articles, where Data Scientists were using NLP to try and find who wrote the article, comparing how certain words were used, compared to a number of other published articles from Trump’s cabinet over the years. Talk about relevant and an exciting use of techniques! It is like being a data detective! That just increased my excitement more and more to dive into the NLP process further.

I also had an opportunity to talk with a Data Science company, and they had just finished a project using NLP to look for gender discrimination in employee reviews, and they were successful at building a model that helped find these type of discriminatory reviews. Words hold power and can have equal weight, if applied right, to predicting outcomes. The old saying “Sticks and stones can break my bones but words will never hurt me” is something we all know is not true, but apply the concepts of NLP to words, and words might actually be more of a threat than a feature of just rocks and sticks!

![](https://miro.medium.com/max/60/1*OVSQPzUI8Kcj35d_Fk1lZg.jpeg?q=20)

<img class="ds t u ez ak" src="https://miro.medium.com/max/6000/1\*OVSQPzUI8Kcj35d\_Fk1lZg.jpeg" width="3000" height="2000" role="presentation">

How do we find daily good deals online, automatically?
======================================================

Basic web content scraping with R to automate boring tasks
----------------------------------------------------------

[![James Chen](https://miro.medium.com/fit/c/96/96/1*SzPGtdaPS0Zh41UrcrDiyA.jpeg)](/@jameschen_78678?source=post_page-----fe8cfc8f783a----------------------)

[James Chen](/@jameschen_78678?source=post_page-----fe8cfc8f783a----------------------)

[Follow](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Ftowardsdatascience.com%2Fhow-do-we-find-daily-good-deals-online-automatically-fe8cfc8f783a&source=-c16867ccea73-------------------------follow_byline-)

[Jan 7, 2017](/how-do-we-find-daily-good-deals-online-automatically-fe8cfc8f783a?source=post_page-----fe8cfc8f783a----------------------) · 5 min read

> Background

As defined [here](https://discuss.analyticsvidhya.com/t/what-are-different-paths-in-data-sciences/302), “a data scientist is someone who is better at statistics than any software engineer and better at software engineering than any statistician.” Therefore, this blog post focuses on the practice of web content scrapping, which is an essential skill for data scientists to acquire information outside of structured databases, and when APIs are unavailable.

When looking for good deals online, we often go on to a few eCommerce websites frequently to check the prices on the items we want. After a while, this becomes a tedious task. Inspired by [_The Programmer’s Guide to Booking a Plane_](https://hackernoon.com/the-programmers-guide-to-booking-a-plane-11e37d610045#.z50j983vh), in which Zeke wrote a script in Node to automate the process of finding cheap plane tickets, we would like to replicate his method on good MacBook deals, using a few packages in R.

> Objective

The objective is to receive automatic email alerts when the MacBook price drops to below a certain point.

> Approach

1.  **Scrap the product information from the eCommerce website**

We need to load the html structure of the website first, in order to retrieve the information we need. The R package we will be using is _rvest_.

library(rvest)  
library(XML)#save html of URL  
url <- "[http://www.rakuten.com.tw/category/4945/?p=1&l-id=tw\_pagen\_1](http://www.rakuten.com.tw/category/4945/?p=1&l-id=tw_pagen_1)"

After saving the URL html, we need to find the section of information that we need, by inspecting the page source. We will search a price to navigate to product related information, as shown below.

![](https://miro.medium.com/max/60/1*Sff7wJgMYMqTyk0qJ_ap4g.png?q=20)

<img class="ds t u ez ak" src="https://miro.medium.com/max/2880/1\*Sff7wJgMYMqTyk0qJ\_ap4g.png" width="1440" height="809" role="presentation">

Screenshot of the page source

We noticed that product related information is under  
**<div class=”b-content”>**  
and therefore we will extract this part only.

product <- url %>%  
  read\_html() %>%  
  html\_nodes(".b-content")

An excellent Chrome add on called **SelectorGadget** can be downloaded [here](https://chrome.google.com/webstore/detail/selectorgadget/mhjhnkcfbdhnjickkkdbjoemdmbfginb?hl=en). This tool allows us to intuitively select the specific content we want.

When we select the name of the product, the content will be highlighted in green, as shown below. The tool also guesses that we also want other product names as well, and therefore it will highlight other product names in yellow. For any content that we do not need, we can click on it and it will be removed (the color will turn red).

![](https://miro.medium.com/max/60/1*13P2YG4PHIvNPxxxNDIYww.png?q=20)

<img class="ds t u ez ak" src="https://miro.medium.com/max/2880/1\*13P2YG4PHIvNPxxxNDIYww.png" width="1440" height="816" role="presentation">

We found that product name can be extracted using **.product-name**, as shown on the bottom of the page.

name <- product %>%  
  html\_nodes(".product-name") %>%  
  html\_text()

Next we will repeat the process to find price and save it in numeric format.

price <- product %>%  
  html\_nodes(".b-underline .b-text-prime") %>%  
  html\_text() %>%  
  gsub(",","",.) %>%  
  as.numeric()

After we are done, we can save name and price in a dataframe.

all <- data.frame(name, price,stringsAsFactors = FALSE)

We will also need to scrap multiple pages to extract all the information.

for (i in 1:10){  
starturl <- "[http://www.rakuten.com.tw/category/4945/?p=](http://www.rakuten.com.tw/category/4945/?p=)"  
nexturl <- "&l-id=tw\_pagen\_"  
url <- paste(starturl,i,nexturl,i,sep="")product <- url %>%  
  read\_html() %>%  
  html\_nodes(".b-content")name <- product %>%  
  html\_nodes(".product-name") %>%  
  html\_text()price <- product %>%  
  html\_nodes(".b-underline .b-text-prime") %>%  
  html\_text() %>%  
  gsub(",","",.) %>%  
  as.numeric()mydata <- data.frame(name, price,stringsAsFactors = FALSE)  
all <- rbind(all,mydata)  
}all<-all\[!duplicated(all),\]

The final result is stored below in dataframe format.

![](https://miro.medium.com/max/38/1*CSA61earMGgZjM_u8CSBZA.png?q=20)

<img class="ds t u ez ak" src="https://miro.medium.com/max/846/1\*CSA61earMGgZjM\_u8CSBZA.png" width="423" height="672" role="presentation">

Screenshot of the scrapped prices on MacBooks

**2\. Create rules to send out email alerts**

Next, we will set up the rules to receive email alerts. Say we only wish to receive alerts on products with price between NT$25,000 and NT$30,000.

alert <- all\[all$price>25000&all$price<=30000,\]

Next we will use the _mailR_ package to send out the email, if there is at least one alert, as shown below.

if (nrow(alert) >=1){write.table(alert,"alert.txt",fileEncoding = "UTF-8")send.mail(from = "[jchen6912@gmail.com](mailto:jchen6912@gmail.com)",  
          to = c("[jchen6912@gmail.com](mailto:jchen6912@gmail.com)"),  
          subject = "Mac Deal Alert",  
          body <- "alert.txt",  
          smtp = list(host.name = "smtp.gmail.com", port = 465, user.name = "[jchen6912@gmail.com](mailto:jchen6912@gmail.com)", passwd = "xxxxxxxx", ssl = TRUE),  
          encoding = "utf-8",  
          authenticate = TRUE,  
          send = TRUE)  
}

![](https://miro.medium.com/max/34/1*If07soGQ43YmQ_fGIGdJXA.png?q=20)

<img class="ds t u ez ak" src="https://miro.medium.com/max/640/1\*If07soGQ43YmQ\_fGIGdJXA.png" width="320" height="568" role="presentation">

Screenshot of the automatic email alert received

**3\. Automate the process by scheduling the task regularly**

This can be done with the _taskscheduleR_ package, but currently only available in Windows. Click [here](https://github.com/bnosac/taskscheduleR) for more details. We can schedule the Rscript to run at desired frequency and receive automatic alerts accordingly.

![](https://miro.medium.com/max/60/1*yTD4zDA4GY1BLLXrVi1ZWg.png?q=20)

<img class="ds t u ez ak" src="https://miro.medium.com/max/1542/1\*yTD4zDA4GY1BLLXrVi1ZWg.png" width="771" height="761" role="presentation">

Screenshot of the UI in taskscheduleR

This sums up the short blog on how to scrap content for websites with static content, however, dynamic websites are more complicated and may require additional code to simulate real browsing behaviors, such as member login and form submits. Alternatively, similar task can also be performed in Python with _scrapy_ and _BeautifulSoup_.

> R Code

library(rvest)  
library(XML)  
library(taskscheduleR)  
library(mailR)setwd("~/Desktop/deals")url <- "[http://www.rakuten.com.tw/category/4945/?p=1&l-id=tw\_pagen\_1](http://www.rakuten.com.tw/category/4945/?p=1&l-id=tw_pagen_1)"  
product <- url %>%  
  read\_html() %>%  
  html\_nodes(".b-content")name <- product %>%  
  html\_nodes(".product-name") %>%  
  html\_text()price <- product %>%  
  html\_nodes(".b-underline .b-text-prime") %>%  
  html\_text() %>%  
  gsub(",","",.) %>%  
  as.numeric()all <- data.frame(name, price,stringsAsFactors = FALSE)for (i in 1:10){  
starturl <- "[http://www.rakuten.com.tw/category/4945/?p=](http://www.rakuten.com.tw/category/4945/?p=)"  
nexturl <- "&l-id=tw\_pagen\_"  
url <- paste(starturl,i,nexturl,i,sep="")product <- url %>%  
  read\_html() %>%  
  html\_nodes(".b-content")name <- product %>%  
  html\_nodes(".product-name") %>%  
  html\_text()price <- product %>%  
  html\_nodes(".b-underline .b-text-prime") %>%  
  html\_text() %>%  
  gsub(",","",.) %>%  
  as.numeric()mydata <- data.frame(name, price,stringsAsFactors = FALSE)  
all <- rbind(all,mydata)  
}all<-all\[!duplicated(all),\]alert <- all\[all$price>25000&all$price<=30000,\]if (nrow(alert) >=1){write.table(alert,"alert.txt",fileEncoding = "UTF-8")send.mail(from = "[jchen6912@gmail.com](mailto:jchen6912@gmail.com)",  
          to = c("[jchen6912@gmail.com](mailto:jchen6912@gmail.com)"),  
          subject = "Mac Deal Alert",  
          body <- "alert.txt",  
          smtp = list(host.name = "smtp.gmail.com", port = 465, user.name = "[jchen6912@gmail.com](mailto:jchen6912@gmail.com)", passwd = "xxxxxxxx", ssl = TRUE),  
          encoding = "utf-8",  
          authenticate = TRUE,  
          send = TRUE)  
}

* * *

Questions, comments, or concerns?  
jchen6912@gmail.com

How to do data scraping EFFICIENTLY?
====================================

[![JOHN CHAN](https://miro.medium.com/fit/c/96/96/0*2XkuHE8Q9-m8tIJd.jpg)](/@ust.johnchan?source=post_page-----f2a70794d086----------------------)

[JOHN CHAN](/@ust.johnchan?source=post_page-----f2a70794d086----------------------)

Follow

[Oct 7, 2019](/@ust.johnchan/how-to-do-data-scraping-efficiently-f2a70794d086?source=post_page-----f2a70794d086----------------------) · 4 min read

For many people, data scraping or web scraping is to write some programs that click websites and copy information from them. While this is a legitimate way to do scraping, it is the least efficient method.

In this article, I will list a few methods I used in scraping data from less efficient ones to more efficient ones.

Understanding the Request Response Cycle
========================================

Put it in a very simple way, the web is a place where a lot of requests and responses happening. A client (user) requests information from a server (which is just another computer). And the server serves the information (response) back to the client.

What you see as a client on a browser is just a bunch of data parsed and formatted in a pretty and presentable way, thanks to HTML, CSS, and JavaScript. The key here is the line: “just a bunch of data” which means we may be able to scrape it.

There is a subtle detail which may affect the technique to scrape data. Sometimes, the whole webpage is rendered in the server side which means the server sends the complete HTML, CSS and JavaScript to the client and the client’s browser displays it. The other way is that the server returns the data and the client browser is responsible for parsing it. For the websites which is rendered in server side, we can only scrape by HTML elements . For the websites which is rendered in the client side, we can scrape by a more efficient method.

Actually, the key to efficient scraping is to find a place where data is rendered in the client side. For example, you may find that in a website, the data is rendered in server. But you also find that the company provides an android app. It is very likely that for an android app, the data is rendered in the client side. This enable us to use a more efficient method.

Don’t underestimate the difference. Scraping HTML elements are usually very slow!

Server Side: Scraping HTML elements
===================================

A script will send a request to the server. Server responses with the HTML file. Then the script find the location of information and extract it.

Pros:
-----

*   Easy to implement
*   Straight-forward

Cons:
-----

*   Slow for scraping large amount of webpages
*   Not robust. Webpages change
*   Development time is long. You need to hard code the location of information.

Tools:
------

*   [Scrapy](https://scrapy.org/)
*   [Selenium](https://www.seleniumhq.org/)

Client Side: Scraping the responded data
========================================

A script will send a request to the server. Server responses with data, usually JSON, XML. Then the script extracts the useful information or store the responded data directly.

Usually people we look at the Network Tab in the developer tool (Firefox) to inspect the traffic. [Mitmproxy](https://mitmproxy.org/) may also be used for more detail analysis.

![](https://miro.medium.com/max/60/1*WTy8lGHaZNQfb0zhN-zNjg.png?q=20)

<img class="cp t u ic ak" src="https://miro.medium.com/max/3714/1\*WTy8lGHaZNQfb0zhN-zNjg.png" width="1857" height="984" role="presentation">

Network Tab (Firefox)

Pros:
-----

*   Fast for scraping large amount of webpage
*   Robust. Usually the request endpoints will not change.
*   Fast development. Less code to write.

Cons:
-----

*   Take some experience to find it.
*   Authentication issue. Sometimes the webpage is protected by password. You need to understand the authentication mechanism to get in.

Tools:
------

*   [Scrapy](https://scrapy.org/)
*   [Requests](https://pypi.org/project/requests/)

Special Tricks: Scraping APPs
=============================

This is a special tricks I used to scrape webpage that renders in server side. But it only works if the company provides an Android app (Haven’t tried it on IOS app).

The steps go like this:

1.  Download the APK file and add security exception to APK. Since Android 7.0, google introduced changed to Certificate Authorities (CA) settings which prevents third-parties listening to network requests. Luckily you can find a script to add the exception automatically [here](https://github.com/levyitay/AddSecurityExceptionAndroid).
2.  Install the modified APK to your phone
3.  Set up the man-in-the-middle proxy (MitmProxy) and your phone. You can refer to this [article](/testvagrant/intercept-ios-android-network-calls-using-mitmproxy-4d3c94831f62).
4.  Inspect the traffic and look for the data you want.

For example, I want to scrape Centaline Property Website. After inspecting the webpage, I found that it seems like data is rendered in the server side.

![](https://miro.medium.com/max/60/1*jBa2It730cM5ZD-EYoo1Tw.png?q=20)

<img class="cp t u ic ak" src="https://miro.medium.com/max/2120/1\*jBa2It730cM5ZD-EYoo1Tw.png" width="1060" height="920" role="presentation">

Centaline Web (server side render)

But, they provided an android app. After using the above steps, I managed to find the data which is requested (POST) using

[https://hkapi.centanet.com/api/FindProperty/MapV2.json?postType=s&order=desc&page=1&pageSize=20&pixelHeight=2220&pixelWidth=1080&points\[0\].lat=22.705635288642362&points\[0\].lng=113.85844465345144&points\[1\].lat=22.705635288642362&points\[1\].lng=114.38281349837781&points\[2\].lat=21.993328259196705&points\[2\].lng=114.38281349837781&points\[3\].lat=21.993328259196705&points\[3\].lng=113.85844465345144&sort=score&zoom=9.745128631591797&platform=android](https://hkapi.centanet.com/api/FindProperty/MapV2.json?postType=s&order=desc&page=1&pageSize=20&pixelHeight=2220&pixelWidth=1080&points%5B0%5D.lat=22.705635288642362&points%5B0%5D.lng=113.85844465345144&points%5B1%5D.lat=22.705635288642362&points%5B1%5D.lng=114.38281349837781&points%5B2%5D.lat=21.993328259196705&points%5B2%5D.lng=114.38281349837781&points%5B3%5D.lat=21.993328259196705&points%5B3%5D.lng=113.85844465345144&sort=score&zoom=9.745128631591797&platform=android)

Conclusion
==========

I cannot go into very detail in the steps. The article is quite long already. The message here is that try not to use HTML element in the first place. Always look for client side render service. This will improve your scraping efficiency greatly.

However, something that is working is always better than nothing. If you really can’t find a better way at this moment, just use HTML element and keep looking for better solution!

How to Do Price Monitoring from Car Dealers Sites?
==================================================

[![X-Byte Enterprise Crawling](https://miro.medium.com/fit/c/96/96/0*58raBoA0H70LX-hG.jpg)](/@xbytecrawling?source=post_page-----caffc6a521af----------------------)

[X-Byte Enterprise Crawling](/@xbytecrawling?source=post_page-----caffc6a521af----------------------)

Follow

[Nov 7, 2019](/@xbytecrawling/how-to-do-price-monitoring-from-car-dealers-sites-caffc6a521af?source=post_page-----caffc6a521af----------------------) · 4 min read

![Best Car Dealer’s Price Monitoring Services : X-Byte Enterprise Crawling](https://miro.medium.com/max/60/1*m6lRSB8tt6t_Cc_rtujpxg.png?q=20)

<img alt="Best Car Dealer’s Price Monitoring Services : X-Byte Enterprise Crawling" class="cp t u gi ak" src="https://miro.medium.com/max/2342/1\*m6lRSB8tt6t\_Cc\_rtujpxg.png" width="1171" height="510">

How to Do Price Monitoring from Car Dealers Sites Image

The automobile business is booming in all countries including the USA. According to **NADA**, since the year 2018, the USA’s 16,794 franchised dealers had sold over 8.6 million light-duty vehicles. The sale of new vehicles has touched the figure of more than $500 billion. Altogether, the dealerships had ordered 155 million repairs, whereas and services sales have reached $58 billion.

![Car Dealership Data Scraping Service in X-Byte Enterprise Crawling USA](https://miro.medium.com/max/60/0*FojMKGbJCF_pYckl.png?q=20)

<img alt="Car Dealership Data Scraping Service in X-Byte Enterprise Crawling USA" class="cp t u gi ak" src="https://miro.medium.com/max/2048/0\*FojMKGbJCF\_pYckl.png" width="1024" height="446">

Car Dealership Data Scraping Image

However, there are no location-wise automobile dealer directories available and mostly, the information needs to be collected either using personal contacts or a location-specific Google search. If you want to try and scrape data about [**Price Monitoring**](https://www.xbyte.io/solution/price-monitoring/) from the car dealers sites, you can use Google itself as well as use the keywords that should comprise- “car dealer”, together with the location as well as the car’s company name. You can try the initial few links which are not endorsed by Google and scrape data from them. It can be reiterated for different locations as well as car companies through an excel sheet. Although, the efficiency and scale of manually scraping car dealers data are particularly limited.

For scraping data in an automated manner, you can use professional Web Crawling Services of X-Byte Enterprise Crawling, once you get the website list ready. As a professional [**Web and Data Scraping Service**](https://www.xbyte.io/service/web-scraping-service/) provider, X-Byte Enterprise Crawling can provide this data in the plug-and-use format. Provided that you have collected the resources with required persistence, your data will be clean and dependable. However, if you are unaware of which cars are more accepted in which states or countries, you can only scrape data for getting that information and for that [**X-Byte Enterprise Crawling**](https://www.xbyte.io/) is the finest option.

![Professional Data Scraping Service in X-Byte Enterprise Crawling USA](https://miro.medium.com/max/60/0*UzedILL1A06iPc0Z.png?q=20)

<img alt="Professional Data Scraping Service in X-Byte Enterprise Crawling USA" class="cp t u gi ak" src="https://miro.medium.com/max/2048/0\*UzedILL1A06iPc0Z.png" width="1024" height="446">

Professional Data Scraping Image

All the car dealers around the world promote themselves heavily to get more customers. [**Data scraping from social media websites**](https://www.xbyte.io/solution/social-media-monitoring/) and online communities can help you collect information on all the popular auto dealers. Besides that, there are many other resources to scrape price monitoring data from car dealers sites on the web.

As the web is growing exponentially, it doesn’t matter what research you are doing or applications you are creating, the web is the finest place to collect data and the same applies to scrape data on car dealers. Whether you are creating an application that will utilize your location as well as get you your nearest car dealer or if you want to create a ranking or reviewing site for car dealers, data scraping will assist you to create your data source and fill your website or app with information.

[**Scraping price monitoring data**](https://www.xbyte.io/solution/price-monitoring/) from the car dealers are extremely difficult and that’s where X-Byte Enterprise Crawling has an important role to play.

Many dealerships work in both new and used cars and they provide vehicles that fit everyone’s requirements. They offer wonderful customer service with the help of friendly salespeople. They have a lot of used cars to select from. These dealers offer cars of different brands.

Scraping data from all these car dealers is difficult and that’s what [**X-Byte Enterprise Crawling**](https://www.xbyte.io/) does easily! At X-Byte Enterprise Crawling, we scrape price monitoring data from car dealers’ sites as well as do car inventory scraping and used cars inventory scraping.

What Data We Extract from Car Dealers Websites?
===============================================

*   Car Name
*   Pricing
*   Seller Name
*   Seller’s Address
*   Ratings
*   Number of Reviews
*   Contact Details

Additional Car Information
==========================

You can also get addition car information like:

*   Fuel Type
*   City MPG
*   Highway MPG
*   Drivetrain
*   Engine
*   Mileage
*   Interior Color
*   External Color
*   Stock
*   Transmission
*   VIN

The dealers usually have online inventories that are amongst the key reasons why these dealerships are a brilliant source for different car companies. All the drivers can approach their sales associates and let their customer service specify how they make used or new car procedure, hassle-free!

![Car Data Scraping Service in X-Byte Enterprise Crawling USA](https://miro.medium.com/max/60/0*3Ctm2YeAnWAK8ite.png?q=20)

<img alt="Car Data Scraping Service in X-Byte Enterprise Crawling USA" class="cp t u gi ak" src="https://miro.medium.com/max/2048/0\*3Ctm2YeAnWAK8ite.png" width="1024" height="446">

Car Data Scraping Image

Why Should You Hire a Professional Like X-Byte Enterprise Crawling for Price Monitoring from Car Dealers Sites?
===============================================================================================================

*   Our car dealer site [**Price Monitoring Services**](https://www.xbyte.io/solution/price-monitoring/) can save your invaluable time & money. We can find information in only some hours that might take some days or weeks in case, you perform that manually!
*   Our expert team realizes how to change unstructured data into a structured one. Our car dealer site price monitoring scrapers keep track of all the pages of directed websites to get all the required results.
*   Our expert [**Consumer Support**](https://www.xbyte.io/resources/faqs/) team always helps you if you face any problem whereas using our car dealer site price monitoring service. Our car dealer site price monitoring services are reliable, skillful, and offer faster results without any mistakes.

Contact [**X-Byte Enterprise Crawling**](https://www.xbyte.io/) for all your car dealer site price monitoring services requirements or ask for a free quote!

* * *

**Visit Our Site :** [www.xbyte.io](https://www.xbyte.io/)

6 Tips on How to Do Data Scraping of Unstructured Data
======================================================

[![3i Data Scraping](https://miro.medium.com/fit/c/96/96/1*pTBf2MTUyiDWXDDY4GglGg.jpeg)](/@3idatascraping?source=post_page-----4ac44f0cda29----------------------)

[3i Data Scraping](/@3idatascraping?source=post_page-----4ac44f0cda29----------------------)

Follow

[Jun 30, 2017](/@3idatascraping/6-tips-on-how-to-do-data-scraping-of-unstructured-data-4ac44f0cda29?source=post_page-----4ac44f0cda29----------------------) · 3 min read

![](https://miro.medium.com/max/60/1*t6twgG_AhTS12trEglwjQg.png?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/2034/1\*t6twgG\_AhTS12trEglwjQg.png" width="1017" height="770" role="presentation">

Data scraping, data extraction or web scraping is an automatic web method to fetch or do data collection from your web. It converts unstructured data into structured one which can warehouse to the database.

**6 Tips on How to Do Data Scraping of Unstructured Data**

1\. Find a reliable solution for unstructured data scraping
-----------------------------------------------------------

Conventional technical approaches of unstructured data scraping isolate the moving parts of the results to make that easier for the programmers resolve the issues.

They are unapproachable from the real time usage setups. However, while the non-programmatic method builds a code, this opens the chances of accepting indications regarding proposed use of the extracted data.

**Any automated data scraping software and checking solution can do this, for example:**

• Avoid worthless links and attain projected data quickly  
• Build a responsive load footprint for the targeted websites  
• Use lesser hardware resources

It will help in the data mining of unstructured data using the unstructured data scraping tools.

Besides, non-programmatic method, it will capture knowledge regarding targeted websites better and influence that to promptness of learning using multiple websites, adding up to the ability of scaling proficiently and brilliantly while extracting the unstructured data.

2\. Be capable enough to work for the unstructured data
-------------------------------------------------------

All the web scraping software depend on the HTML delimiters that breakdown while the main HTML changes as well as the requirement for fixing problems need to be tracked manually.

Any automated data scraping and tracing solution identify additions and changes with accuracy, offering only the ideal data using techniques of unstructured data examination.

3\. Efficiently produce and manage scripts for unstructured data
----------------------------------------------------------------

Any automatic **web data scraping solution**, particularly for the data extraction tools for retailer, can help in rationalizing the workflows and processes at scale, smoothly generates productivity gains. They consist of:

• Automatic load handling and deployment  
• Bulk operations to complete the jobs and task preparation  
• Consistent testing for superior quality assurance  
• Data mining techniques and tools for the unstructured data  
• Shared request lists and schemas for handling different projects having dependable team practices  
• Tools which effortlessly increase the mass regulation activities  
• User subscriptions and agent migrations among the systems

4\. Alteration of Unstructured Data into Useful Structured Data
---------------------------------------------------------------

Unstructured data can be used for the human eyes whereas well-structured can be used for computers.

A conventional data scraper as well as an automated **data scraping solution**, both can [**transform the unstructured data into structured data**](http://www.3idatascraping.com/services.php), offering analysis to take superior business decisions.

Nevertheless, the automated data scraping solutions integrate and use data normalization techniques to ensure that your structured data is effortlessly converted into main data insights.

5\. Reduce the errors through automation in collecting structured data
----------------------------------------------------------------------

Visual abstraction is the method to use machine learning for creating well-organized codes. Visual abstraction recognizes each and every web page just like a human examines a page visually.

However, an automated **data mining and extraction solution** can help you better with a superior level of visual abstraction without utilizing the HTML structures. This doesn’t break while it gets page variations.

6\. Combine data mining results with business operations and procedures
-----------------------------------------------------------------------

In the existing data-obsessed business environment, many teams frequently interrelate with the data collection as well as analysis procedures.

Business organizations searching for the web scraping about unstructured data have to talk about and support all the data necessities, for different purposes.

As the business requirements are different, built-in aspects supportive to different requirements are the key for ranging higher frequencies and volumes of the data collection.

Find out more about accurate, result-oriented and better accessible data scraping solutions.

You can [**contact us**](http://www.3idatascraping.com/contact-us.php) to discover how the automated data intelligence and data extraction solution can improve your organization’s productivity, efficiency, and general workflow.

* * *

_Originally published at_ [_www.3idatascraping.com_](http://www.3idatascraping.com/6-tips-on-how-to-do-data-scraping-of-unstructured-data.php) _on June 30, 2017._

Asynchronous Web Scraping in Python using concurrent module.
============================================================

[![Pranav Gajjewar](https://miro.medium.com/fit/c/96/96/2*NUbV1uECdoDM087Sf8SnsQ.jpeg)](/@apbetahouse45?source=post_page-----a5ca1b7f82e4----------------------)

[Pranav Gajjewar](/@apbetahouse45?source=post_page-----a5ca1b7f82e4----------------------)

Follow

[Apr 22, 2018](/@apbetahouse45/asynchronous-web-scraping-in-python-using-concurrent-module-a5ca1b7f82e4?source=post_page-----a5ca1b7f82e4----------------------) · 7 min read

![](https://miro.medium.com/max/60/1*9hUizS9cheTAYEH1NhkUDA.png?q=20)

<img class="cp t u fv ak" src="https://miro.medium.com/max/1400/1\*9hUizS9cheTAYEH1NhkUDA.png" width="700" height="400" role="presentation">

Ever felt frustrated at how long your web scraping script takes to complete the task? Have you ever wished there was a faster way to do your web scraping?

Well, there is. And I’m going to show you today how you can increase the performance of your scraper in a very beginner friendly way.

In this post we will also talk about asynchronous programming in Python. And then apply that knowledge to optimize web scraping.

Let’s dive in!

**What is Asynchronous execution? And why would you want it?**
--------------------------------------------------------------

If you’re a beginner in web scraping, then I assume you’ve worked with `requests` and `BeautifulSoup` modules in python. And what you generally do while writing your scraper is as follows —

def parse(soup):  
    # Extract data  
    # return dataurls = \[...\]results = \[\]  
for url in urls:  
    r = requests.get(url)  
    soup = BeautifulSoup(r.content, 'lxml')  
    results.append(parse(soup))

Or you might use a different structure than this. But the end result is same. The way you code your scraper is in a _synchronous_ fashion.

What it means is that your program goes through the target URLs one by one, in a synchronized way. You send a GET request to the server and the server takes some time to send a response. But what do you suppose is happening while your program is waiting for a response from the server?

**Nothing!**

That’s right. The network request is the instruction that takes the most time in your script. And when you’re doing it in a synchronous way, your script remains idle a large amount of time which is spent waiting for the server response. How would you make use of that free time?

It’s quite obvious. We do not want our program to remain idle while one of the GET requests is waiting for server’s response. We want our program to move ahead with other URLS and their processing without being blocked due to one sluggish network request.

> Asynchronous programming is simply executing multiple instructions simultaneously.

So we need a way to process multiple URLs simultaneously and independent of one another. Let’s see how we can achieve this in Python.

How asynchronous execution is achieved?
---------------------------------------

In this section, I will discuss different strategies of asynchronous execution. If you’re just interested in the asynchronous python code, you can skip this part.

There are many ways in which asynchronous execution is implemented. Three broad categories of multi-processing can be given as —

*   Process level multi-processing.
*   Thread level multi-processing.
*   Application level multi-processing.

If you have some background in Unix operating system, you would be familiar with these concepts. Still, I will do my best to explain them as concisely and cogently as possible.

In Process level multi-processing, you can achieve asynchronous execution by dividing the total work across separate processes. Each process running on a different processor core. In this way, your original task is divided into number of chunks and all of these chunks are being processed simultaneously. This level of multi-processing is in-built in an OS. So all you have to do is utilize this and let the kernel worry about process scheduling.

Thread level multi-processing is almost same as the previous one. Except in this case, we are dividing the task across multiple threads. A thread is like a process but a lightweight process. And we can add multiple threads under a single process context. So all of these thread would belong to the same process. This feature is also implemented in the OS itself. We just need to utilize this using Python and we will see how it is done.

Application level multi-processing is somewhat different than the previous two. Here the OS is under the impression that it is executing only one process with a single thread. But our application itself schedules different tasks on that thread for execution. So the asynchronous nature of execution is implemented in our application program itself.

These are the main ways to handle parallel execution on a traditional Unix system. Now we will see how we can use the `concurrent` module in Python to utilize these concepts and to boost our scraping speed.

Implementing asynchronous execution:
------------------------------------

Okay, so you must be itching to get started. Let’s start coding —

from concurrent.futures import ProcessPoolExecutor  
from concurrent.futures import ThreadPoolExecutor  
from concurrent.futures import Future 

So we first import the things we require. You will observe that we imported `ProcessPoolExecutor` and `ThreadPoolExecutor.` Both of these classes correspond to Process level and Thread level multi-processing respectively. We only need to use one of these. And for our use case i.e web scraping, both of these will be effective.

So the multi-processing features in the OS are abstracted and we can directly do parallel processing using the above classes.

> The `[concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html#module-concurrent.futures)` module provides a high-level interface for asynchronously executing callables.
> 
> The asynchronous execution can be performed with threads, using `[ThreadPoolExecutor](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor)`, or separate processes, using `[ProcessPoolExecutor](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor)`.

The way it works is that we have a **pool** of threads or processes. And we can assign some task to each of them and they will start executing independently of each other.

We can create a pool —

pool = ThreadPoolExecutor(3) # This means a pool of 3 threads  
            OR  
pool = ProcessPoolExecutor(3) # This means a pool of 3 processes 

Now we can `submit` or `map` different tasks to each individual thread or process.

Suppose we have a list of 100 URLs and we want to download the HTML page for each URL and do some post-processing and extract data.

def download\_and\_extract(url):  
    r = requests.get(url)  
    soup = BeautifulSoup(r.content, 'lxml')  
    # Some data extraction logic  
    return data

We have a function `download_and_extract` which will gather our data and we want to gather data from the 100 URLs previously mentioned.

If we were to do this synchronously, it would take 100 multiplied by average time for one GET request ( assuming post-processing time is trivial ). But instead if we divide the 100 URLs on 4 separate threads/processes, then the time required would be 1/4th the original time, at least theoretically.

So let us try this —

URLs = \[...\]def d\_and\_e(url): # Our download and extract function  
    ....with ProcessPoolExecutor(max\_workers=4) as executor:  
    futures = \[ executor.submit(d\_and\_e, url) for url in URLs\]

Here we have slightly modified the Pool initialization to suit our use case but it does the same thing when we initialized it previously.

`executor.submit` function takes two parameters in our code. The first one is the task we want to perform Or more technically, the function we want to execute and the parameters for the execution of our function. The executor will distribute the work across 4 different processes with each process executing one instance of `download_and_extract` for the given URL.

But how do we know when the tasks are done? And what about the data that we wanted?

`executor.submit` returns a `Future` object.

> (Future) Encapsulates the asynchronous execution of a callable.

This object represents the asynchronous execution of a specific function. You can read more about its properties in the [documentation](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.Future). We will only focus on two main functions for this object that we will require viz. `done` and `result.`

`done()` function returns the bool value `True` if the function has finished executing or if there was some exception in it. And when it has finished execution, we can retrieve the result using the `result()` function.

URLs = \[...\]def d\_and\_e(url): # Our download and extract function  
    ....with ProcessPoolExecutor(max\_workers=4) as executor:  
    futures = \[ executor.submit(d\_and\_e, url) for url in URLs\] results = \[\]  
    for result in concurrent.futures.as\_completed(futures):  
        results.append(result)

Here’s another new thing — `as_completed().`

The function `as_completed()` simply determines the order of the results that are returned by the future. Using this function, we avoid having to write a block of code where we keep checking whether a given `Future` is `done()` or not.

The function will start generating results as soon as any one of the functions being executed yields some result. And then we simply append that result to our main collection of data.

And that’s it! Using these simple concepts you can make your program multi-processing capable. Web scraping is just a simple example to illustrate the concept. You can apply this concept anywhere you want.

We will look at a fully coded and working example below —

import time  
import requests  
from bs4 import BeautifulSoup  
from concurrent.futures import ProcessPoolExecutor, as\_completedURLs = \[ ... \] # A long list of URLs.def parse(url):  
    r = requests.get(url)  
    soup = BeautifulSoup(r.content, 'lxml')  
    return soup.find\_all('a')with ProcessPoolExecutor(max\_workers=4) as executor:  
    start = time.time()  
    futures = \[ executor.submit(parse, url) for url in URLs \]  
    results = \[\]  
    for result in as\_completed(futures):  
        results.append(result)  
    end = time.time()  
    print("Time Taken: {:.6f}s".format(end-start))

You can now experiment using this example with URLs of your choice and different degrees of parallelization. See what conclusions you can draw from this.

What next?
----------

In this post, I demonstrated how to divide a particular task across multiple threads and process. And we achieved asynchronous execution of a specific task in this way.

But think about this, the task we are doing i.e downloading data from the network, it is admittedly being done across multiple processes but on any one process the task is still being done synchronously.

What I mean is that we are simply performing the task in a parallel fashion. So in any one of the threads/processes, that one process or thread still remains idle for some time until server responds.

There is a way in which we can overcome this and make our scraping truly asynchronous. We would have to use Application level multi-processing to accomplish this.

We want our program to send a GET request and while the server is processing that request, we want our program to suspend that request and move on to next requests. When the server finally responds, we want that data to be mapped to the correct request. In this way, we do not allow our program to remain idle at all. It is always doing something.

This is possible in python using `asyncio` and `aiohttp` modules. I will explore both of those modules in the context of web scraping in a future post.

So stay tuned!

master web scraping : understand the big picture
================================================

[

![tan pham](https://miro.medium.com/fit/c/96/96/1*9tc04KWdvWh1HdM4eui2Vw.jpeg)

](/@phamtan500?source=post_page-----68540a66ec7f----------------------)

[tan pham](/@phamtan500?source=post_page-----68540a66ec7f----------------------)

Follow

[Jul 14, 2019](/datamadeeasy/master-web-scraping-understand-the-big-picture-68540a66ec7f?source=post_page-----68540a66ec7f----------------------) · 2 min read

In this post we will explain how to do web scraping with beautiful soup and selenium.

![](https://miro.medium.com/max/60/1*8B-fOXenzIDWg-CXTTwK9g.png?q=20)

<img class="dq t u hv ak" src="https://miro.medium.com/max/2406/1\*8B-fOXenzIDWg-CXTTwK9g.png" width="1203" height="316" role="presentation">

selenium web driver
===================

Any data scraping task start with a url to page which contain data need to be scraped. Selenium web driver will take input url and produce content in html.

Some people will ask, why we need selenium ? because we could simply use package like `requests` to download html from input url.

First reason is now a day, a lot of modern web page is dynamic meain contain javascript. Actual html content only be created when javascript code running through browser.

For example if you run following code, console will print out only js code due to `requests` could not handle js

import  requestsurl = '[https://www.youtube.com/'](https://www.youtube.com/')  
response = requests.get(url)  
print(response.content)

Second reason to use selenium is some time in order to go to page contain needed information, we need to do some action on browser like login, click to access some where.

beautiful soup
==============

After html content is render with selenium web driver, we need `beautiful soup` to parse this html to pull out target data.

Before use beautiful soup we need to know where our data located inside html structure. Normally we will use chrome developer tool to do this. Then finally we could pull out texts or links from html.

Access my full course on [master web scraping with python](https://www.datamadeeasy.co/courses/master-web-scraping-with-python-do-16-projects)

How to do web scraping with python
==================================

[![Tyler Garrett](https://miro.medium.com/fit/c/96/96/2*H0Y15YLZacoZTnkRFsSFdQ.png)](/@itylergarrett.tag?source=post_page-----e6c4d5e860f6----------------------)

[Tyler Garrett](/@itylergarrett.tag?source=post_page-----e6c4d5e860f6----------------------)

Follow

[Jul 5, 2018](/@itylergarrett.tag/using-pip-to-install-requests-and-lxml-on-python-3-7-mac-os-e6c4d5e860f6?source=post_page-----e6c4d5e860f6----------------------) · 7 min read

Hey, [web scraping](http://bit.ly/Web-scraping) is easy with python 3.7 —the way I was doing it before this tutorial was overly complex and extremely inefficient.

> I wrote this blog in July/2018, when I was still learning how to program in Python. This particular version is not as complete or easy as my future version on web scraping.
> 
> It was not my best blog but it does show a quick way to do some web scraping basics, like grabbing numbers off a website. However, I reblogged this topic in a more straight forward example.
> 
> Please — if you’re interested in [learning web scraping with python](/@itylergarrett.tag/learning-web-scraping-with-python-requests-beautifulsoup-936e6445312), check out the blog I released on Dec.25,2018!

[

Learning Web Scraping with Python, Requests, & BeautifulSoup


----------------------------------------------------------------

### 

Did you know learning web scraping w/ Python, Requests, and Beautiful Soup is easy...

#### 

medium.com



](/@itylergarrett.tag/learning-web-scraping-with-python-requests-beautifulsoup-936e6445312)

I was trying to make an a drag and drop ETL handle web scraping but it isn’t designed for parsing HTML.

Meet Python, lxml, requests, beautifulsoup4, etc… throw away the paid for services, throw away third party vendors, start web scraping on your own, on your computer, now!

Share this with your friends: [http://tinyurl.com/yaupbwv8](http://tinyurl.com/yaupbwv8)

![](https://miro.medium.com/max/60/1*mWK4ePw6uECtp6YMYYVQQw.png?q=20)

<img class="cp t u hs ak" src="https://miro.medium.com/max/2908/1\*mWK4ePw6uECtp6YMYYVQQw.png" width="1454" height="116" role="presentation">

Learn how I made this blog URL into a tinyurl with 2 lines of python code! Follow along here @ [how to make tinyurls with python](/@itylergarrett.tag/how-to-build-shortlinks-with-python-on-mac-ef6fec7cc1b1).

Web scraping is easy in Python….
================================

Web scrapping is easy in python but you need to ramp up. It won’t take long, and let me know if you get stuck, I sure as hell did a lot.

So above, Python, lxml, requests, etc… Speaking gibberish, well I explain everything in tutorials/blogs, without a single funnel or recommendation to buy anything! You’re welcome.

Using Pip to install Requests and lxml on python 3.7 — MAC OS
=============================================================

Found a blog about web [scraping](http://docs.python-guide.org/en/latest/scenarios/scrape/) and it had a little bit of python, not much explanation, per the usual programmer blog, a bunch of short hand written stuff as if we speak this language… Hours of troubleshooting, digging through SEO’ed websites, and finally…. I think we have some cool content. Btw, the blog mentioned about scraping — it also has a bit of an incomplete tutorial surrounding this process/method. I will continue to clean this up, and maybe reblog it on my website at [tylergarret.com](http://tylergarrett.com).

Python is extremely efficient at handling web parsing, I’m blown away. I was trying to do this in softwares and it was a massive work-around/waste of time… This is exciting, but what is it.

![](https://miro.medium.com/max/60/1*qDOcZEgJD0gEX7p12UtOWg.png?q=20)

<img class="cp t u hs ak" src="https://miro.medium.com/max/3168/1\*qDOcZEgJD0gEX7p12UtOWg.png" width="1584" height="398" role="presentation">

Did you miss that? In 6 lines of code, we are getting prices…

![](https://miro.medium.com/max/60/1*K0ogX5MKMSax9hsqtbZvaw.png?q=20)

<img class="cp t u hs ak" src="https://miro.medium.com/max/2692/1\*K0ogX5MKMSax9hsqtbZvaw.png" width="1346" height="422" role="presentation">

And boom prices… from a website…

![](https://miro.medium.com/max/60/1*5cG5ZTjlUPIN98fcbjbV1Q.png?q=20)

<img class="cp t u hs ak" src="https://miro.medium.com/max/2740/1\*5cG5ZTjlUPIN98fcbjbV1Q.png" width="1370" height="570" role="presentation">

One more line of code, and boom, buyers + prices… Now we are looking at prices online, instantly, loop this and you have price analysis… Push into a database, you have prices over time… Here we go…

Python… What is it though?

![](https://miro.medium.com/max/60/1*0wjrtrO21Tmoom840YxQvQ.png?q=20)

<img class="cp t u hs ak" src="https://miro.medium.com/max/2324/1\*0wjrtrO21Tmoom840YxQvQ.png" width="1162" height="878" role="presentation">

Learning python is like space force. Everyone has an opinion, but none of it is factual, true, or exactly the truth. Like politics.

![](https://miro.medium.com/max/60/1*nan1kle3WubmFbEobeJnmg.png?q=20)

<img class="cp t u hs ak" src="https://miro.medium.com/max/2420/1\*nan1kle3WubmFbEobeJnmg.png" width="1210" height="914" role="presentation">

lol. Let me explain below.

Setting up pip to install requests and lxml
===========================================

Below I’m going to show you how to setup your requests and lxml on python 3.7 on mac os. [Trying to learn python from scratch](/@tyler_48883/trying-to-learn-python-from-scratch-6ab60bf08907) is a lot of fun, appears to be a bit of a ramp up, **but that’s why I’m blogging about it every day**.

It’s easy, fun, and user friendly, don’t be discouraged trying to figure out how to get it working, keep it up, maybe give [pycharm](https://www.jetbrains.com/pycharm/download/) a visit too.

Installing python is important for any data related guru.
---------------------------------------------------------

[Learning how to install python](/@tyler_48883/how-to-install-python-blogged-by-a-technical-non-developer-38e90347bc89) seems to be critical for the future of my career, I’m tired of spending countless hours making a software do what code has done for decades… Time to grow a pair. I don’t know if homebrew helped me but I wrote about [how to setup homebrew for python](/@tyler_48883/my-miserable-path-to-python-expertise-continues-on-the-macbook-homebrew-for-dumbies-f414768c1dbf) too.

A quick video on setting up pip on your mac. And I cover [how to setup pip on your windows 10](/@itylergarrett.tag/setting-up-python-3-7-on-windows-10-a-non-developer-tutorial-e836639ca16) too. Be sure to catch up, and install python, etc… Let me know if you get stuck, I’m still learning myself and want to know if I’m getting you past the point that I was stuck, trying to dig through….

Learning how to do web scraping with python!
--------------------------------------------

When I first started learning about web scraping, no one wanted to help me and I was stuck figuring out how to parse HTML with a tool 100% not designed to handle the task… So, when you hit this bridge, I hope more than anything my blog ranks half decent and you don’t waste any time trying to do web scraping with random tools, paid services, or third part vendors.

So, here we go! Web scraping is fun, you need to dig through a bunch of tabs if you ignore my blogs.

If you made it this far… You’re clearly really intelligent and enjoy learning. Please follow along below, so you don’t have to open 20 tabs and spin your mother flipping wheels off. This should be easy! It’s just a bunch of junk in google searches right now.

![](https://miro.medium.com/max/60/1*x2O2t-rs2IxcttO5uEyUTA.png?q=20)

<img class="cp t u hs ak" src="https://miro.medium.com/max/2692/1\*x2O2t-rs2IxcttO5uEyUTA.png" width="1346" height="70" role="presentation">

You feel me? Anyways, ping me if you need any help, I will likely be very far ahead of this point when this article begins ranking… I don’t want you struggling to get ahead, please ping me if you want source code to any projects I’m blogging about. Enjoy! And thanks for the follows.

Follow along w/ this video to get pip working on your mac, before you begin.

Let’s start with the imports:

**from** lxml **import** html  
**import** requests

Well these imports will not just work out of the box. Sorry. Which throws a big loop in the ramp up, also there’s some syntax that’s incorrect [here](http://docs.python-guide.org/en/latest/scenarios/scrape/), that I will update below.

First you need to install requests. Below ensures you’re installing pip installs in python3, VS other python installs on your mac. Like 2.7, which comes with your mac, don’t uninstall or break that too… [leave it alone](https://stackoverflow.com/questions/3819449/how-to-uninstall-python-2-7-on-a-mac-os-x-10-6-4). Or reinstall everything.

Install requests with this code in your terminal, ensure pip is function on this machine by typing “pip” in your CMD/terminal.

python3 -m pip install requests --user

Above code offers access to pushing a new installation. You can learn a little more about some of these pieces of code [here](https://packaging.python.org/tutorials/installing-packages/#ensure-you-can-run-pip-from-the-command-line).

Python3 has another install called lxml, make sure you install it to python3 if you want to use the 3.7 python install.

python3 -m pip install lxml

Installing lxml took me a little bit because I kept typing xmlx. Be sure you’re not installing weird stuff.

![](https://miro.medium.com/max/60/1*ByIlRCPi0F-xhZUlacdFWw.png?q=20)

<img class="cp t u hs ak" src="https://miro.medium.com/max/3216/1\*ByIlRCPi0F-xhZUlacdFWw.png" width="1608" height="1298" role="presentation">

here’s the rest of the code working plus using ()… in the code, which the tutorial does not include.

Now we want to “get” the HTML, and parse through looking for buyers and prices.

page = requests.get**(**'http://econpy.pythonanywhere.com/ex/001.html'**)**  
tree = html.fromstring**(**page.content**)**

After a quick analysis, we see that in our page the data is contained in two elements — one is a div with title ‘buyer-name’ and the other is a span with class ‘item-price’:

HTML looks like this:

**<div** title="buyer-name"**\>**Carson Busses**</div>**  
**<span** class="item-price"**\>**$29.95**</span>**

Knowing this we can create the correct XPath query and use the lxml `xpath` function like this:

Here’s the code to capture the values in the html.

_#This will create a list of buyers:_  
buyers = tree.xpath**(**'//div\[@title="buyer-name"\]/text()'**)**  
_#This will create a list of prices_  
prices = tree.xpath**(**'//span\[@class="item-price"\]/text()'**)**

Let’s see what we got exactly:

**print** 'Buyers: '**,** buyers  
**print** 'Prices: '**,** prices

Boom.

Now you have your next step, time to start learning how to push this into a database!

Oh you’re still here…

DO you want to [automate building tinyurls](/@itylergarrett.tag/how-to-build-shortlinks-with-python-on-mac-ef6fec7cc1b1)? It’s super important for SEO, so head over here.

![](https://miro.medium.com/max/60/1*Hr3EucT35S93tQUTpK5hXA.png?q=20)

<img class="cp t u hs ak" src="https://miro.medium.com/max/1416/1\*Hr3EucT35S93tQUTpK5hXA.png" width="708" height="118" role="presentation">

Too easy right!?

typos by [tyler garrett](http://tylergarrett.com)

[

Pip install on python2 break python3? Here’s a solution to pip install version problems.


--------------------------------------------------------------------------------------------

### 

I rushed ahead, broke shit, here’s the explanation…If you kick your python off in your CMD or terminal, you will want…

#### 

medium.com



](/@itylergarrett.tag/pip-install-on-python2-break-python3-heres-a-solution-to-pip-install-version-problems-5e05c9d808f2)

[

Setting up Pip on Python 3.7 in Windows 10 — A non-developer version


------------------------------------------------------------------------

### 

Install python, or do my how to install python 3.7 windows 10. This can be accomplished using the python installer at…

#### 

medium.com



](/@itylergarrett.tag/setting-up-python-3-7-on-windows-10-a-non-developer-tutorial-e836639ca16)

[

{zomg} Doing basic math in Python, or jump in and do HTTPS requests — mac users. #imnotadeveloper


-----------------------------------------------------------------------------------------------------

### 

Python is finally moving a bit now, I’ve been blogging about this randomly from both PC and MAC… Finally made some…

#### 

medium.com



](/@itylergarrett.tag/zomg-doing-basic-math-in-python-or-jump-in-and-do-https-requests-mac-users-imnotadeveloper-a4c1df9c5735)

[

How to install python 3.7 on windows 10 PC , The non-developer version.


---------------------------------------------------------------------------

### 

Installing python on windows 10 PC is the end goal, the long term project is to learn python, to build an app that…

#### 

medium.com



](/@itylergarrett.tag/how-to-install-python-3-7-on-windows-10-pc-the-non-developer-version-b063e1913b39)

[

My miserable path to python expertise, continues, on the Macbook — Homebrew for dumbies.


--------------------------------------------------------------------------------------------

### 

After digging around trying to understand what was the next step, everything leads me to setting up Homebrew. Thanks…

#### 

medium.com



](/@tyler_48883/my-miserable-path-to-python-expertise-continues-on-the-macbook-homebrew-for-dumbies-f414768c1dbf)

[

How to Install Python — Blogged by a technical non-developer.


-----------------------------------------------------------------

### 

What’s up, let’s talk about how to install python, blogged by a technical non-developer. I can dabble in code, have…

#### 

medium.com









](/@tyler_48883/how-to-install-python-blogged-by-a-technical-non-developer-38e90347bc89)

[

Trying to learn python from scratch


---------------------------------------

### 

We can only imagine trying to learn python from scratch is not something anyone will be able to do without a nice…

#### 

medium.com









](/@tyler_48883/trying-to-learn-python-from-scratch-6ab60bf08907)

Cheers.

Coupling Web Scraping with Functional programming in R for Scale
================================================================

[![AbdulMajedRaja RS](https://miro.medium.com/fit/c/96/96/0*w0fQtGt26KJqthRE.jpg)](/@amrwrites?source=post_page-----1bc4509eef29----------------------)

[AbdulMajedRaja RS](/@amrwrites?source=post_page-----1bc4509eef29----------------------)

[Follow](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Ftowardsdatascience.com%2Fcoupling-web-scraping-with-functional-programming-in-r-for-scale-1bc4509eef29&source=-bee33e964a63-------------------------follow_byline-)

[Feb 11, 2019](/coupling-web-scraping-with-functional-programming-in-r-for-scale-1bc4509eef29?source=post_page-----1bc4509eef29----------------------) · 4 min read

![](https://miro.medium.com/max/60/1*aPhII8tpOj9XsXXQNngPzw.jpeg?q=20)

<img class="ds t u hn ak" src="https://miro.medium.com/max/10368/1\*aPhII8tpOj9XsXXQNngPzw.jpeg" width="5184" height="3456" role="presentation">

[https://unsplash.com/photos/-lp8sTmF9HA](https://unsplash.com/photos/-lp8sTmF9HA)

In this article, we will see how to do web scraping with R while doing so, we’ll leverage functional programming in R to scale it up. The nature of the article is more like a cookbook-format rather than a documentation/tutorial-type, because the objective here is to explain how effectively web scraping can be coupled with Functional Programming

**Web Scraping in R**
---------------------

Web scraping needs no introduction among Data enthusiasts. It’s one of the most viable and most essential ways of collecting Data when the data itself isn’t available.

Knowing web scraping comes very handy when you are in shortage of data or in need of Macroeconomics indicators or simply no data available for a particular project like a Word2vec / Language with a custom text dataset.

`rvest` a beautiful (like BeautifulSoup in Python) package in R for web scraping. It also goes very well with the universe of `tidyverse` and the super-handy `%>%` pipe operator.

**Sample Use-case**
-------------------

Text Analysis of how customers feel about Etsy.com. For this, we are going to extract reviews data from [trustpilot.com](http://trustpilot.com).

Below is the R code for scraping reviews from the first page of Trustpilot’s Etsy page. [URL: https://www.trustpilot.com/review/www.etsy.com?page=1](https://www.trustpilot.com/review/www.etsy.com?page=1)

library(tidyverse) #for data manipulation - here for pipe  
library(rvest) - for web scraping#single-page scrapingurl <- "[https://www.trustpilot.com/review/www.etsy.com?page=1](https://www.trustpilot.com/review/www.etsy.com?page=1)"url %>%   
  read\_html() %>%   
  html\_nodes(".review-content\_\_text") %>%   
  html\_text() -> reviews

This is fairly a straightforward code where we pass on the URL to read the html content. Once the content is read, we use `html_nodes` function to get the reviews text based on its `css selector property` and finally just taking the text out of it `html_text()` and assigning it to the R object `reviews` .

Below is the sample output of `reviews`:

![](https://miro.medium.com/max/60/1*NfimrAbyjQFZ7icNctmTrw.png?q=20)

<img class="ds t u hn ak" src="https://miro.medium.com/max/5108/1\*NfimrAbyjQFZ7icNctmTrw.png" width="2554" height="1770" role="presentation">

Well and Good. We’ve successfully scraped the reviews we wanted for our Analysis.

![](https://miro.medium.com/max/60/1*zeuLPCYv_9AIn7Gz6VpeNQ.png?q=20)

<img class="ds t u hn ak" src="https://miro.medium.com/max/948/1\*zeuLPCYv\_9AIn7Gz6VpeNQ.png" width="474" height="188" role="presentation">

But the catch is the amount of reviews we’ve got is just 20 reviews — in that as we can see in the screenshot we’ve already got a non-English review that we might have to exclude in the data cleaning process.

This all puts us in a situation to collect more data to compensate the above mentioned data loss and make the analysis more effective.

Need for Scale
--------------

With the above code, we had scraped only from the first page (which is the most recent). So, Due to the need for more data, we have to expand our search to further pages, let’s say 10 other pages which will give us 200 raw reviews to work with before data processing.

Conventional Way
----------------

The very conventional way of doing this is to use a loop — typically `for`loop to iterate the URL from 1 to 20 to create 20 different URLs (String Concatenation at work) based on a base url. As we all know that’s more computationally intensive and the code wouldn’t be compact either.

**The Functional Programming way**
----------------------------------

This is where we are going to use R’s functional programming support from the package `purrr` to perform the same iteration but quite in R’s `tidy` way within the same data pipeline as the above code. We’re going to use two functions from `purrr` ,

1.  `map()` is the typical map from the functional programming paradigm, that takes a function and maps onto a series of values.
2.  `map2_chr()` is the evolution of map that takes additional arguments for the function and formats the output as a character.

**Below is our Functional Programming Code**

library(tidyverse)  
library(rvest)  
library(purrr)#multi-pageurl <- "[https://www.trustpilot.com/review/www.etsy.com?page=](https://www.trustpilot.com/review/www.etsy.com?page=)" #base URL without the page numberurl %>%   
  map2\_chr(1:10,paste0) %>% #for building 20 URLs   
  map(. %>%   
    read\_html() %>%   
      html\_nodes(".review-content\_\_text") %>%   
      html\_text()  
  ) %>%   
  unlist() -> more\_reviews

As you can see, this code is very similar to the above single-page code and hence it makes it easier for anyone who understand the previous code to read this through with minimal prior knowledge.

The additional operations in this code is that we build 20 new URLs (by changing the query value of the URL) and pass on those 20 URLs one-by-one for web scraping and finally as we’d get a list in return, we use `unlist` to save all the reviews whose count must be 200 (20 reviews per page x 10 pages).

Let’s check how the output looks:

![](https://miro.medium.com/max/60/1*gb-oTtYRXoBMBQ4_j83-dA.png?q=20)

<img class="ds t u hn ak" src="https://miro.medium.com/max/5172/1\*gb-oTtYRXoBMBQ4\_j83-dA.png" width="2586" height="912" role="presentation">

Yes, 200 reviews it is. That fulfills our goal of collecting (fairly) sufficient data for performing the text analysis use-case we mentioned above.

But the point of this article is to introduce you to the world of functional programming in R and to show how easily it fits in with the existing data pipeline / workflow and how compact it is and with a pinch of doubt, how efficient it is (than a typical for-loop). Hope, the article served its purpose.

*   **If you are more interested, Check out this** [**Datacamp course on Functional Programming with purrr**](https://www.datacamp.com/courses/foundations-of-functional-programming-with-purrr?tap_a=5644-dce66f&tap_s=210728-e54afe)
*   The complete code used here is available [here on github](https://github.com/amrrs/blogpost_codes/blob/master/rvest_purrr_scraping_at_scale.R)

_Thanks: This entire article and code was inspired by the Session that Saurav Ghosh took in the Bengaluru R user group meetup_

Hands-On Web Scraping With Python
=================================

[![Rouven](https://miro.medium.com/fit/c/96/96/2*gZLiLCvc1Tmo8zVvTvhslA.jpeg)](/@rouvenglauert?source=post_page-----2dff4d1bf7be----------------------)

[Rouven](/@rouvenglauert?source=post_page-----2dff4d1bf7be----------------------)

Follow

[Nov 6, 2019](/swlh/hands-on-web-scraping-with-python-2dff4d1bf7be?source=post_page-----2dff4d1bf7be----------------------) · 8 min read

Web scraping is inherently useful for many people, in particular those who do not know how to do it. I have written many web scraping scripts for friends. None of them had any programming or computer science related background. This tutorial is for all the Sociologists, Business Analysts, Literature Researcher and all other people sometimes need to automatically collect data from the web.

At the end of this tutorial we will have a little script, which if you run it automatically collects an article from medium.com which you could for instance store in a .csv file. You then can process with another software of your choice. The goal is also to teach fundamentals you need in order to do simple website scraping. This guide will not make you a web developer or anything close to that, but I provide some references in the last section, if you are interested in deeper knowledge. For the sake of making this guide understandable for readers without technical background, I decided to oversimplify in some parts as well as I did not use exact terminology.

The Things That I Will Not Explain
==================================

Here are listed the things which you need to know in order to follow this guide. In the scope of this tutorial there in no space to explain them, but I will add some resources so you can learn them beforehand.

1.  What is Python and how do I use it?
2.  How do I install Python packages?

Basics 1: See Websites From A Different Perspective
===================================================

The first thing we have to understand in order to perform web scraping is the function of the browser. In order to do so, press F12 on the keyboard. If you are using Firefox or Chrome you see the developer tools popping up. One of the things you can see in the developer tools is the plain HTML text which your browser interprets into a website (see Fig. 1). We will need the developer tools later, in order to locate the data that we want to extract in the HTML text of the website. For now, close the developer tools again and lets discuss where the HTML text comes from in first place.

![](https://miro.medium.com/max/60/1*Yv-nhzSOCr4VkCop2kV12A.png?q=20)

<img class="dq t u iy ak" src="https://miro.medium.com/max/2800/1\*Yv-nhzSOCr4VkCop2kV12A.png" width="1400" height="297" role="presentation">

Fig 1. Your Browser interprets the HTML text, the Style Sheets (CSS) and the JavaScript code into a beautiful website.

The browser requests the data that it needs to display a website from a web server via a HTTP request. Such a requests gets then answered from a web server via a HTTP response (See Fig. 2). All this happens in the background while you are clicking through the web. For this guide, we are mostly interested in the body of the response, this is where the HTML text is located.

![](https://miro.medium.com/max/60/1*4jCsz3axu7pmKnDRcbH9IA.png?q=20)

<img class="dq t u iy ak" src="https://miro.medium.com/max/2802/1\*4jCsz3axu7pmKnDRcbH9IA.png" width="1401" height="301" role="presentation">

Fig. 2 Your browser sends a HTTP request for the information it needs to display a website. The server answers with the demanded content.

Basics 2: HTML
==============

HTML is a language which allows to structure the content of a website. It is part of what we get as a response from the HTTP request. The HTML code consists of tags and content in between the tags. The tags are like markers for content on the website. The browser then knows in which style sheet (CSS) it has to look to into in order to display the content correctly.  
A tag _<h1>Something</h1>_ for instance is interpreted by the browser as a heading of type 1. In the corresponding Style Sheet, it could for instance be noted that h1 heading have to be displayed in blue or a certain font.

We will use such tags later in order to find the information we want to extract. It is important to note that the <h1> tag for instance is in between the body tag. The tags have an hierarchical order, the inner tags are called children and the outer ones are called parents. In our case the <body> tag is the parent of the <h1> and the <p> tag. Later, when extracting a link from a heading we will come back to this concept.

Code 1: A simple example of an HTML structured document. You can run this HTML in your browser.

We learned about interpretation of the HTML into a beautiful website and the request of the HTML text from the web server are two different things, that the browser does for us. Therefor, we can conclude, that we can write our own file containing only HTML text and have the browser interpret it. And this is what we are going to do now.

Create an empty text file on your desktop. Open the file and copy the text from (Code 1) into the file and save it. Right click on the file, click on _Open with_ with any browser of your choice. If everything worked out, you should now see only the text in between the tags formatted in two different ways.

* * *

After we got the basics we can now start to use Python to replace the browser. First we are going to make the HTTP request with the help of Python and then we are going to use also Python to actually extract the information from the webserver’s response.

Get the request
===============

For this tutorial, our job will be to extract the headings from medium.com and put them into a .csv file. Then select one article and also save the text of the article.

We start to use Python in order to make a HTTP request without using the browser. Therefor, we will use the Python package called [requests](https://2.python-requests.org/en/master/). Requests allows us in a very simple manner to formulate an HTTP request and store the response so we can use it later for the extraction of our data.

Code 2: Most simple HTTP GET request in python with the help of requests

In code to we first make a request with the _get()_ function and we store the response into the variable _r_. Then we print the HTML text of the response which is located in the attribute _text_ of the response object.

Find the data on the website
============================

We will work with the non personalized version of the medium.com start page. The easiest way to see how it looks is to open a browser window in [incognito mode](https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history) and go to medium.com. Then open the developer tools again with F12. And use the inspection tool to find the corresponding HTML part for the headings you want to extract. In our case click with the inspection tool activated onto the main heading. The developer tools will now jump to the part of the HTML text which is responsible for the main heading.

![](https://miro.medium.com/max/60/1*dnj_TkWzjwu80ImOOET5Ww.png?q=20)

<img class="dq t u iy ak" src="https://miro.medium.com/max/46/1\*dnj\_TkWzjwu80ImOOET5Ww.png" width="23" height="20" role="presentation">

Inspection tool to find HTML text passage corresponding to the content on the website.

![](https://miro.medium.com/max/60/1*8RUMQaHQ7S68gZC07zmVug.png?q=20)

<img class="dq t u iy ak" src="https://miro.medium.com/max/1628/1\*8RUMQaHQ7S68gZC07zmVug.png" width="814" height="264" role="presentation">

Fig. 3 Part of the HTML text of medium.com. The blue highlighted text is what you marked with the inspector tool.

We can identify which HTML tag medium has used for the main heading, by looking into the blue marked part and check for the tag which is written in the smaller and larger signs _<>_ . As we can see in Fig. 3 medium.com has used an _<h1>_ tag for the main heading. In the next step we will find all _<h1>_ tags used on the website and extract the heading itself.

Extract the data from the website
=================================

To extract the heading we have to first find it in the response, that we got from the HTTP request and secondly we have to remove the surrounding HTML structures. The package we are going to use for this job is called [beautiful soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/).

Beautiful Soup makes it possible to search through the the different HTML tags, but before we extract certain HTML tags we have to decide which tags we are interested in. The biggest helper here will be the developer tools of your browser, which we have seen before.

Code 3 Making a requests, parsing the response, searching for <h1> tags, print the search result, print the text of the first result

In order to extract the first heading we will

**Make a request (1),** which we learned before. The response of the server will be stores in a variable called _r_. The HTML text of the response will be **parsed (2)** the into a Beautiful Soup object, we called it _soup_ here. The parsing basically means that the whole website will be stored in a structure which makes it easy to search through. The BeautifulSoup object additionally gives us some new functions which makes our life easier such as removes the tags from the content. The **search for all <h1> tags in the response (3)** is performed by calling the function [find\_all()](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#searching-the-tree) function on the BeautifulSoup object _soup._ You can find out how find\_all() works in detail by clicking on the link, but for now it is enough to know that it returns a [list](https://www.w3schools.com/python/python_lists.asp) of all tags which match the search condition. The first element of the list is our heading. For better understanding, we will **display the whole list (4)** first and then we only print out the first element without the HTML tags by accessing its .text attribute.

The next step is to open the link behind the text and to extract the content. In Code 4 we can see how this is done. The new line here is line 8, we formulate a new HTTP get request as we have learned before, but this time we will use the link behind the heading in order to get the request. In Fig. 3 we can see that the link is a parent of the heading node, this means we can acces the link by accesing the parent of the heading. In line 8, we acces the first element of the list containing all headings by using _headings\[0\]_, then we acces its parent tag _headings\[0\].parent_ and lastly we get what is written in between the _<href>_ tag. [_<href>_](https://www.w3schools.com/tags/att_a_href.asp) stands for hyper reference and is basically a link as you know it.

As before, we make a Beautiful Soup object from the response (line 9) and then we are going to find the text of the article which is placed in a couple of <p> tags, but how do we know, that the articles main text is located in <p> tags. We again checked this with the help of the developer tools of the browser. We first click on the link and then mark the text body with the inspection tool.

Since the text is written in different paragraphs .find\_all() returns a list of all <p> tags. In line 12 we remove the tags from the elements so that only the plain text is which we put back into a list. In line 13 we use the [reduce function,](https://thepythonguru.com/python-builtin-functions/reduce/) which makes it easy for us to combine the different paragraphs into one single string.

Code 4

And what can we do now?
=======================

Probably you have some application with scraped data in mind. Either you just want to save it, because the website you are looking at in your work tends to go offline from time to time or you want to to analytics.

One great case is to observe changes in the content of a newspaper over time [(David Kriesel, CCC, 2017)](https://www.youtube.com/watch?v=-YpwsdRKt8Q). If we have scraped a couple of articles from, e.g. a news site, we could search for certain key words or [count their appearance](https://www.w3resource.com/python-exercises/string/python-data-type-string-exercise-12.php). We could use also different Machine Learning tools to classify text, which I will cover in a different article.

Further reading
===============

[HTTP](https://www.w3schools.com/tags/ref_httpmethods.asp)

[Beautiful Soup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

[requests Documentation](https://requests.kennethreitz.org/en/master/)

EZ Web Scraping
===============

[![Chris Marker](https://miro.medium.com/fit/c/96/96/1*zD9OL5i9q25HU_7ZGDSrUA.jpeg)](/@chris.d.marker?source=post_page-----fd39ef1c1f50----------------------)

[Chris Marker](/@chris.d.marker?source=post_page-----fd39ef1c1f50----------------------)

Follow

[Apr 18, 2018](/@chris.d.marker/ez-web-scraping-fd39ef1c1f50?source=post_page-----fd39ef1c1f50----------------------) · 1 min read

Before I actually learned how to do it the concept of web scraping seemed like something extremely complicated and advanced. Using a few simple packages in python, however, it turns out its something that can be learned in an afternoon.

To accomplish some basic web scraping tasks, all you really need is requests and BeautifulSoup.

import requests  
from bs4 import BeautifulSoup

From there, you can simply request a url (after checking that the website allows you to do so, of course) to get the html:

url = "[https://www.datatau.com/](https://www.datatau.com/)"  
response = requests.get(url)

From there you can use BeautifulSoup to organize the content in a manageable way and search through it by element.

html = response.text  
soup = BeautifulSoup(html, 'lxml')  
all\_td = soup.find\_all('td', {'class':'title'})

The above will return all of the ‘td’ elements with the class ‘title’ which you can then further refine.

Using the above basic skills and something like Chrome’s developer tools, you can learn to scrape almost any basic information off of a website.

[![Web Parsing](https://miro.medium.com/fit/c/96/96/0*vcqLwB8kAKqVxYbu.png)](/@websiteparsing?source=post_page-----815c3838fe1a----------------------)

[Web Parsing](/@websiteparsing?source=post_page-----815c3838fe1a----------------------)

Follow

[Nov 16, 2015](/@websiteparsing/how-to-improve-your-business-using-web-data-extraction-815c3838fe1a?source=post_page-----815c3838fe1a----------------------) · 3 min read

How to Improve Your Business Using Web Data Extraction
------------------------------------------------------

If you own a business, you need to monitor your competitors’ move so as to remain ahead of the game. However, you need to do a market research so as to gather useful information that will help you determine your position in the online business. The easiest and convenient way to gather data is through [**web data extraction**](http://www.web-parsing.com/Web-Scraping-Services.php). This can be done manually or by using data extraction software. Most businesses employ manual methods by browsing the web in order to gather useful information. While this method is reliable, it is time consuming and expensive. For effective results it is advisable to use automated data mining software which is faster and cheaper.

![](https://miro.medium.com/max/60/1*UTy3AdgMBVTlWO237XIQbA.png?q=20)

<img class="cp t u gk ak" src="https://miro.medium.com/max/1272/1\*UTy3AdgMBVTlWO237XIQbA.png" width="636" height="278" role="presentation">

Today, [**data mining companies**](http://www.web-parsing.com) have developed web harvesting software which you could buy and install in your computers or you can outsource the services from a qualified company. However, outsourcing the services will help you cut on costs which come with the installation, maintenance and running of the software. All you need to do is specify the type of information you require and the web scraping company will do the searching. According to your specifications, you’ll get customized data scraping services where web crawler show up data that matches your specifications. The information collected is readable, easy to understand and transferable.

There are different reasons why you should seek web data extraction services. May be you want to monitor your performance in the online market compared to your competitors. This may be in terms of sales and marketing strategies. You need to do a competitor price monitoring to know the products your competitors have and their rates. This will help you set the right prices for your products or services so as to attract more customers. Setting higher prices than your competitors will scare away customers. Competitor price monitoring software will also help you keep track on price changes. However you can only achieve this by getting the right data harvesting specialists. You need to work with a company that will give you value for your money.

Due to the fast growth in the eCommerce market, business trends keep on changing so you need to check what your competitors are doing in order to remain relevant in business. The web harvesting company should provide you with up to date information for the businesses you’re monitoring. Ensure you get the right data that you can use to formulate a good pricing strategy for your business. Clients will be prompted to order from businesses that offer the right prices for their products. As a business owner you need to ensure you remain ahead of your competition.

If you’re doing business online it’s mandatory to invest in [**web data extraction services**](http://www.web-parsing.com/Web-Scraping-Services.php) so as to enhance business growth. Contact a reputable web data mining company and they’ll do the donkey work as you enjoy the benefits. They have a team of experts who will work closely with your company. They’ll assess your business needs and help you improve your presence in the online market.

How can Competitive Business Intelligence (BI) escalate your Success?
=====================================================================

[![3i Data Scraping](https://miro.medium.com/fit/c/96/96/1*pTBf2MTUyiDWXDDY4GglGg.jpeg)](/@3idatascraping?source=post_page-----e8ff70bc64e4----------------------)

[3i Data Scraping](/@3idatascraping?source=post_page-----e8ff70bc64e4----------------------)

Follow

[Nov 16, 2017](/@3idatascraping/how-can-competitive-business-intelligence-bi-escalate-your-success-e8ff70bc64e4?source=post_page-----e8ff70bc64e4----------------------) · 3 min read

![](https://miro.medium.com/max/60/1*U5ozk2TKyZkA2hq-LjAIlw.jpeg?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/1460/1\*U5ozk2TKyZkA2hq-LjAIlw.jpeg" width="730" height="448" role="presentation">

You wish to ace it, but is it so easy to do so? You recognize your market; however, do they recognize you as well? You have a massive variety of items for your customers; however, are they of real worth to your clients or consumers? How to really defeat your competition at this game?

A universal answer to all these questions is [**Competitive Business Intelligence obtained from web data scraping**](http://www.3idatascraping.com/business-intelligence-web-scraping-services.php)!!! If you typically aren’t leveraging big information to your benefit, then you are missing out on those instrumental data mining benefits that your competitors are already doing. You need to understand that there are rivals keeping a competitive eye on you.

What can Big Information deliver to a business?
-----------------------------------------------

For beginners, it could aid you to snoop your competitors. Considering that today’s economic situation has become a lot fiercer, businesses, as well as vendors have actually been aiming to ace the race. Currently, [big data](https://en.wikipedia.org/wiki/Big_data) simply makes it all that easier. With the right tools in place, you not just understand exactly what your rivals do daily, weekly, monthly, or yearly; but even discover exactly what they are doing now.

Big data analytics offers actual real-time understandings on Market Intelligence, which gives the capability to:
----------------------------------------------------------------------------------------------------------------

*   Determine successful prices that could help you get an edge over others
*   Projection of future strategies by determining the influence of cost modifications
*   Automate the prices to guarantee uniformity of costs while removing error-prone jobs
*   Carry out product positioning while optimizing revenue possibilities
*   Mimic real-time “what-if” circumstances for forecasting alternative method results
*   Localize rates based upon consumer needs as well as affordable habits

Regardless of this, 75% sellers do not make use of real-time affordable analytics.

What is more than likely to be exposed after evaluation of such details?
------------------------------------------------------------------------

*   **Action-Based Insights**: Knowledge about the kind of activities that must be undertaken.
*   **Anticipative Insights**: Circumstances that may take place.
*   **Analytical Insights**: What occurred in the past, and why?
*   **Detailed Insights**: A ‘what’s taking place currently’ perspective based on real-time information.

How it’s done?
--------------

There is a remarkable quantity of understandings that big information could discover, yet to be able to utilize it to your advantage needs a framework. Below are a couple of points to watch out for:

*   **Automation Possibilities need to be scrutinized**

Constantly inspect that the procedures you are preparing to use could be automated or not. In spite of the fact that today everything could be automated, it’s best to be assured. You do not wish to end up doing such a stressful job manually.

*   **Resources need to be Validated**

Be specific that the details you are placing for evaluation is exact and also from a qualified resource. Guarantee that you feed the appropriate kind of information for the most precise outcomes.

*   **Insights need to be Immediate**

Produce applications that make it simpler for team members to draw out real-time details while placing the same for evaluation. When dealing with challenging clients, this could be extremely useful.

*   **Collect Responses for both Performing & Non-Performing Locations**

The most effective feature of competitive business intelligence is the location-specific understandings. These kinds of understandings could be several of one of the most important little bits of information you will certainly stumble upon.

*   **Identify Violations taking place within your Approach**

Make your approaches smarter. Your approach can not be as easy as decreasing the cost each time your rival does. Your method needs to make it possible for constant growth as well as most valuable activities based on your sales technique.

*   **Develop plans leading to advance preparation for Longer Terms**

Constantly think of long-term preparation for cost reduction by matching your rival’s activities. You require taking into consideration whether decreasing the cost of a provided product diminish inventory too rapidly or not.

Want Competitive Business Intelligence (BI) solutions at cost-effective or cheaper rates to leverage your company growth? See us at [3i Data Scraping](http://www.3idatascraping.com/), your ultimate Big Data outsourcing partners.

* * *

_Originally published at_ [_www.3idatascraping.com_](http://www.3idatascraping.com/how-can-competitive-business-intelligence-bi-escalate-your-success.php) _on November 16, 2017._

Web scraping with Python(using BeautifulSoup)
=============================================

[![Kenechi Ojukwu](https://miro.medium.com/fit/c/96/96/1*GPU32yt1uCsPXcBSTLfESw.jpeg)](/@kenechiojukwu?source=post_page-----bf677172d6ba----------------------)

[Kenechi Ojukwu](/@kenechiojukwu?source=post_page-----bf677172d6ba----------------------)

Follow

[Mar 24, 2019](/@kenechiojukwu/web-scraping-using-python-bf677172d6ba?source=post_page-----bf677172d6ba----------------------) · 5 min read

![](https://miro.medium.com/max/60/1*a4xWpmTJ14YsMVDg0Wwlbw.jpeg?q=20)

<img class="cp t u fz ak" src="https://miro.medium.com/max/1440/1\*a4xWpmTJ14YsMVDg0Wwlbw.jpeg" width="720" height="566" role="presentation">

As usual the first set of questions always go like this, what is web scraping? What is the usefulness? And how do I do it? Now, to answer the first two questions with the simplest of words, web scraping is simply the collection of specific data or information from a web site or a simple web page, to which this information or data could be used for analysis or whatever the web scraper needs such information for. Several programming languages can be used for web scraping, but as stated above we would be using the python programming language to scrape a web site. How do I do it? lets get right to it with a simple example. First, it would be a good thing to note that one of the languages used in building a website is the Hyper Text Mark-up Language(HTML). HTML contains large amount of data in text form. To scrape data from a web site, we would use the beautifulsoup4 from the bs4 python library and the lxml parser( there are other types of parsers but we would be using ‘lxml’ for this example). These tools are way more preferable, very helpful and easy to use when it comes to web scraping.

**Getting Started:**

You would need to create a folder, after which you create a virtual environment in that folder, then install these tools and libraries in the virtual environment. All these steps would be done in the command prompt using pip.

#on the command prompt  
1) mkdir work  
2) cd work   
3) virtualenv work\_flow\_env   
4) work\_flow\_env\\Scripts\\activate  
5) pip install beautifulsoup4  
6) pip install lxml  
7) pip install html5lib #optional  
8) pip install requests\# explanation of code lines:line 1 creates a folder named work  
line 2 opens the folder  
line 3 creates a virtual environment named work\_flow\_env in that folder  
line 4 activates the virtual environment(this code is for a windows os)  
line 5,6,7 and 8 installs the tools and libraries needed for web scraping.

I will assume that most of the readers have an idea even if it’s a little knowledge on HTML, but if you have none, you could always skim through a good free source website, in which I will recommend “w3schools.com”.

Now if you are using sublime text, all you have to do is drag your folder named “work’’ into the sublime text application and you are ready to code. If you have a well downloaded anaconda application, jupyter notebook has all these installed, so you would not have to go through the ‘Getting started’ phase.

Our task is really simple, we are to get the name of movies from ‘[http://toxicwap.com/New\_Movies/](http://toxicwap.com/New_Movies/)’ and their links. In your already set compiler, you import the libraries.

**Importing Libraries:**

from bs4 import BeautifulSoup  
import requests  

**Getting the raw data:**

After importing the libraries, you get the information in text format from the web page using requests.get().text

source = requests.get('[http://toxicwap.com/New\_Movies/').text](http://toxicwap.com/New_Movies/').text) 

**Parsing:**

Now, you have gotten the information needed, so you parse through the text using lxml, you make it clean and readable using prettify().

soup = BeautifulSoup(source, 'lxml')  
print(soup.prettify())

**Inspecting the web page:**

Go back to the web page and inspect it( you right click and and select inspect), you then navigate the web page from the source code seen, you navigate to the point you are able to highlight the part you want to scrape. When you have gotten all you need, you go back to your code then look through your “prettified” text. When going through your cleaned up data(prettified text) you would see the code you highlighted from the web page, depending on the site you are scraping you may have to dig a lot deeper before getting to what you want.

**Digging(navigating) through the text data:**

div = soup.find('div', attrs={'data-role':'content'})  
ul = div.find('ul')  
li = ul.find('li')  
print(li)

To explain the code. First, if you are doing exactly what I am doing, when you inspect the web page you would notice the tags are mostly “div”, now line 1 selects the particular div that holds the content you want to scrape. Line 2 digs deeper into the div to the ul(unordered list) and line 3 digs into the ul to the li(list). Well, We all know what line 4 does( it displays the list).

Note: some sources online use ‘class\_=()’ when trying to get to a particular div, but you would notice that in this particular case the prettified text did not display the class of the div, hence resulting to the use of ‘attrs ={}’.

title = li.a.text  
print(title)  
link = li.a  
print(link\['href'\])

Now, the first line says put in the variable named title the text which can be found in the ‘a’ tag(<a>: link tag in HTML), which is also found in the ‘li’ tag. It is literally just digging from ‘li’ into ‘a’ to the ‘text’. From what I have said, you should be able to interpret the third line. Basically, you are already done, but this written code will get you just the first title and the first link, to get all the titles and links you use a for loop.

**Displaying the whole output:**

for li in ul.find\_all('li'):  
    title = li.a.text  
    print(title)  
      
    link =li.a  
    print(link\['href'\])

Notice how .find() changed to .find\_all()? That’s what you do when you want to get all the data needed. It is good practice to use .find() first when trying to navigate, then when the code format is gotten you use the .find\_all() to get the data remaining. So now the whole code should look like this.

**Complete code:**

from bs4 import BeautifulSoup  
import requestssource = requests.get('[http://toxicwap.com/New\_Movies/').text](http://toxicwap.com/New_Movies/').text)  
soup = BeautifulSoup(source, 'lxml')div = soup.find('div', attrs={'data-role':'content'})  
ul = div.find('ul')  
li = ul.find('li')for li in ul.find\_all('li'):  
    title = li.a.text  
    print(title)  
      
    link = li.a  
    print(link\['href'\])  
    print() 

You are done, but if you want to save the scrapped data into a text file or csv file, you can. I’ll be saving this into a csv file.

**Saving in a format:**

from bs4 import BeautifulSoup  
import requests  
import csvsource = requests.get('[http://toxicwap.com/New\_Movies/').text](http://toxicwap.com/New_Movies/').text)  
soup = BeautifulSoup(source, 'lxml')div = soup.find('div', attrs={'data-role':'content'})  
ul = div.find('ul')  
li = ul.find('li')file = open('s\_data.csv', 'w')  
file\_writer = csv.writer(file)  
file\_writer.writerow(\['Titles','Links'\])for li in ul.find\_all('li'):  
    title = li.a.text  
    print(title)  
      
    link = li.a  
    print(link\['href'\])  
    print()  
      
    file\_writer.writerow(\[title, link \])file.close()

I would like to add that some websites make it really hard to scrape their page and for some it is illegal to scrape their page.

That is it. It is all done. I guess I could say you just learnt how to scrape a website.

How to Run JavaScript in Python | Web Scraping | Web Testing
============================================================

[

![Mahmud Ahsan](https://miro.medium.com/fit/c/96/96/2*NweAj3YbA04w9moXyaubdQ.jpeg)

](/@mahmudahsan?source=post_page-----16bd04894360----------------------)

[Mahmud Ahsan](/@mahmudahsan?source=post_page-----16bd04894360----------------------)

Follow

[May 2, 2018](/@mahmudahsan/how-to-run-javascript-in-python-web-scraping-web-testing-16bd04894360?source=post_page-----16bd04894360----------------------) · 5 min read

![](https://miro.medium.com/max/60/1*R7Fvc3uJkHaaWvvgJVlx-Q.png?q=20)

<img class="cp t u gp ak" src="https://miro.medium.com/max/3840/1\*R7Fvc3uJkHaaWvvgJVlx-Q.png" width="1920" height="1080" role="presentation">

When we develop web application sometimes **we need to test the UX**. Most of the time we do it manually. For example, after a form submission what happen, which a person check it manually. In future, if another coder wrongly modified the form code it may creates a bug which may be skipped by manual tester.

Sometimes **we want to scrap some webpage’s information** but which is fully loaded by JavaScript framework. In normal scraping techniques it’s not possible to scrap data as the data is loaded lazily.

We **can solve both webpage testing and dynamic web page scraping** by running **JavaScript code using** [**Selenium**](https://www.seleniumhq.org/) **library.** Which is called automate the web browser.

In this post I will discuss about:

1.  Installing [Selenium library in Mac and Windows](http://selenium-python.readthedocs.io/getting-started.html)
2.  Install Headless [Google Chrome driver](https://sites.google.com/a/chromium.org/chromedriver/downloads) in Mac and Windows
3.  A Python script to run [github.com](https://github.com/) site in headless browser
4.  Using Python selenium library to run JavaScript code
5.  Scraping [**github.com**](http://github.com/) **webpage data** after it loaded
6.  **Filling** the [**github.com**](http://github.com/) **search form** and **submit by code**
7.  Finally **taking the invisible browsers screenshot programmatically**

We have a Bangla narrated video tutorial for this solution:

Setup
=====

We need [pipenv](https://thinkdiff.net/python/python-official-pipenv-packaging-tool-for-virtualenv-and-pip-in-mac-and-windows/) to install Selenium library for this project. **If you don’t know how to install Pipenv then please** [**check my other tutorial**](https://thinkdiff.net/python/python-official-pipenv-packaging-tool-for-virtualenv-and-pip-in-mac-and-windows/)**.**

1\. Installing Selenium library in Mac and Windows
==================================================

First in terminal go to a directory. In my case I am in this directory:

![](https://miro.medium.com/max/60/1*-Rt2mw8xG2brxylbi92J4A.png?q=20)

<img class="cp t u gp ak" src="https://miro.medium.com/max/1852/1\*-Rt2mw8xG2brxylbi92J4A.png" width="926" height="304" role="presentation">

`/Users/mahmud/Desktop/demo/sel1`

Now open the Terminal in Mac or PowerShell in Windows and run the following commands:

`pipenv install selenium`

![](https://miro.medium.com/max/60/1*FTvrCwBNDs54-FfpDa_A1A.png?q=20)

<img class="cp t u gp ak" src="https://miro.medium.com/max/3184/1\*FTvrCwBNDs54-FfpDa\_A1A.png" width="1592" height="330" role="presentation">

It will create 2 files, Pipfile and Pipfile.lock

Now run the following command to activate sel1 project’s virtualenv.

pipenv shell

2\. Install Headless Google Chrome driver
=========================================

To automate web browser, which is done in invisible way, we need to install Google Chrome driver. Please visit [the following website](https://sites.google.com/a/chromium.org/chromedriver/downloads) and download the latest released driver for your mac or windows or linux operating system.

![](https://miro.medium.com/max/60/1*CAXyYYp-sqJlf46c_i0j8g.png?q=20)

<img class="cp t u gp ak" src="https://miro.medium.com/max/1860/1\*CAXyYYp-sqJlf46c\_i0j8g.png" width="930" height="530" role="presentation">

Now **unzip the downloaded file**, and c**opy the chromedriver.exe file** in our project directory **sel1**.

3\. Run the python script
=========================

Now in the sel1 directory, create a python script named **chapter9.py** and paste the following codes. [Github Source](https://git.io/vpCuV)

_\# author: Mahmud Ahsan_  
_\# github: https://github.com/mahmudahsan_  
_\# blog: http://thinkdiff.net_  
_\# Web: http://pythonbangla.com_  
_\# youtube: https://www.youtube.com/c/banglaprogramming_  
_\# License: MIT License_  
_\# https://github.com/mahmudahsan/thinkdiff/blob/master/LICENSE_   
  
_\# --------------------------_  
_\#      Execute JavaScript_  
_\# --------------------------_  
  
from selenium import webdriver  
from selenium.webdriver.chrome.options import Options  
from selenium.webdriver.common.keys import Keys  
import os  
  
def main():  
    chrome\_options = Options()  
    chrome\_options.add\_argument("--headless")  
    chrome\_options.add\_argument("--window-size=1024x1400")  
  
    _\# download Chrome Webdriver_   
    _\# https://sites.google.com/a/chromium.org/chromedriver/download_  
    _\# put driver executable file in the script directory_  
    chrome\_driver = os.path.join(os.getcwd(), "chromedriver")  
  
    driver = webdriver.Chrome(chrome\_options=chrome\_options, executable\_path=chrome\_driver)  
  
    driver.get("https://github.com")  
    assert "GitHub".lower() in driver.title.lower()  
      
    _\# scrap info_  
    h1\_elem = driver.find\_element\_by\_tag\_name("h1")  
    print(h1\_elem.text)  
  
    _\# fill and submit form_  
    elem = driver.find\_element\_by\_name("q")  
    elem.clear()  
    elem.send\_keys("python")  
    elem.send\_keys(Keys.RETURN)  
  
    _\# screenshot capture_  
    driver.get\_screenshot\_as\_file("python-github.png")  
    driver.close()  
  
if \_\_name\_\_ == '\_\_main\_\_' : main()

4\. Run the program
===================

In macOS terminal run the following command:

python3 chapter9.py

In windows 10 power shell run the following command. Just use Python instead of Python3

python chapter9.py

![](https://miro.medium.com/max/60/1*nRz-blrMVBWgWBfIM2P08w.png?q=20)

<img class="cp t u gp ak" src="https://miro.medium.com/max/2500/1\*nRz-blrMVBWgWBfIM2P08w.png" width="1250" height="288" role="presentation">

After successfully run the program, you will get a png file named python-github.png.

![](https://miro.medium.com/max/60/1*2_GofjsRy38xfD4SUYQnAw.png?q=20)

<img class="cp t u gp ak" src="https://miro.medium.com/max/3982/1\*2\_GofjsRy38xfD4SUYQnAw.png" width="1991" height="988" role="presentation">

5\. Python script analysis
==========================

It is a very simple script. At first we import python selenium libraries in our script. Then we create a webdriver object based on some options we provided also we mentioned the google chrome browser driver location via **chrome\_driver** object.

Then by **driver.get()** method we load [github.com](http://github.com/) website.

In the **#scrap info section** we **scrap HTML h1 tag data** and **print it in the console**. **This is how we scrap** via selenium and headless web driver.

In the #scrap info section we scrap HTML h1 tag data and print it in the console. This is how we scrap via selenium and headless web driver.

_\# scrap info_  
 h1\_elem = driver.find\_element\_by\_tag\_name("h1")  
 print(h1\_elem.text)

We see “Built for developers” is printed in the terminal.

![](https://miro.medium.com/max/60/1*nRz-blrMVBWgWBfIM2P08w.png?q=20)

<img class="cp t u gp ak" src="https://miro.medium.com/max/2500/1\*nRz-blrMVBWgWBfIM2P08w.png" width="1250" height="288" role="presentation">

Finally we fill and submit the form by code. To select the search form in the webpage by javascript, we use Google Chrome Browser’s Inspect code option to check the form element name.

![](https://miro.medium.com/max/60/1*AOHcPNi_-CQSH8fVV_PUEg.png?q=20)

<img class="cp t u gp ak" src="https://miro.medium.com/max/4184/1\*AOHcPNi\_-CQSH8fVV\_PUEg.png" width="2092" height="1472" role="presentation">

This is the code that automates search and submit the form:

_\# fill and submit form_  
elem = driver.find\_element\_by\_name("q")  
elem.clear()  
elem.send\_keys("python")  
elem.send\_keys(Keys.RETURN)

To take screenshot of the final page we write the following code:

\# screenshot capture  
  driver.get\_screenshot\_as\_file("python-github.png")  
  driver.close()

![](https://miro.medium.com/max/60/1*0ZVoK4jdithY6obzXU4c8A.png?q=20)

<img class="cp t u gp ak" src="https://miro.medium.com/max/2596/1\*0ZVoK4jdithY6obzXU4c8A.png" width="1298" height="228" role="presentation">

This is one of the way we can use selenium library in Python to execute JavaScript to test webpage or scrap dynamic or static website information.

**Reference:**

1.  Selenium: [https://www.seleniumhq.org](https://www.seleniumhq.org/)

2\. Selenium Python Docs: [http://selenium-python.readthedocs.io/getting-started.html](http://selenium-python.readthedocs.io/getting-started.html)

3\. Google Chrome Web Driver: [https://sites.google.com/a/chromium.org/chromedriver/downloads](https://sites.google.com/a/chromium.org/chromedriver/downloads)

Source: [Thinkdiff.net](http://thinkdiff.net/python/how-to-run-javascript-in-python-web-scraping-testing/)

Scraping Data from Website to Excel
===================================

[![Alen Cooper](https://miro.medium.com/fit/c/96/96/2*HHO9R-4kQGPTFsqqrHwFIw.jpeg)](/@skeer834?source=post_page-----ee9cb6fe5fb----------------------)

[Alen Cooper](/@skeer834?source=post_page-----ee9cb6fe5fb----------------------)

Follow

[Apr 22, 2019](/@skeer834/scraping-data-from-website-to-excel-ee9cb6fe5fb?source=post_page-----ee9cb6fe5fb----------------------) · 4 min read

![](https://miro.medium.com/max/60/1*bF0NxOqVHkNXSDqpcf7jUg.png?q=20)

<img class="cp t u fy ak" src="https://miro.medium.com/max/1360/1\*bF0NxOqVHkNXSDqpcf7jUg.png" width="680" height="456" role="presentation">

You probably know how to use basic functions in Excel. It’s easy to do things like sorting, applying filters, making charts, and outlining data with Excel. You even can perform advanced data analysis using pivot and regression models. It becomes an easy job when the live data turns into a structured format. The problem is, how can we extract scalable data and put it into Excel? This can be tedious if you doing it manually by typing, searching, copying and pasting repetitively. Instead, you can achieve automated data scraping from websites to excel.

In this article, I will introduce several ways to save your time and energy to scrape web data into Excel.

**Disclaimer**: There many other ways to scrape from websites using programming languages like PHP, Python, Perl, Ruby and etc. Here we just talk about how to scrape data from websites into excel for non-coders.

**Getting web data using Excel Web Queries**
============================================

Except for transforming data from a web page manually by copying and pasting, Excel Web Queries is used to quickly retrieve data from a standard web page into an Excel worksheet. It can automatically detect tables embedded in the web page’s HTML. Excel Web queries can also be used in situations where a standard ODBC(Open Database Connectivity) connection gets hard to create or maintain. You can directly scrape a table from any website using Excel Web Queries.

The process boils down to several simple steps (Check out [this article](http://www.excel-university.com/pull-external-data-into-excel/)):

1\. Go to Data > Get External Data > From Web

2\. A browser window named “New Web Query” will appear

3\. In the address bar, write the web address

![](https://miro.medium.com/max/60/0*RNSiEzMrSHQCIUJp.png?q=20)

<img class="cp t u fy ak" src="https://miro.medium.com/max/1290/0\*RNSiEzMrSHQCIUJp.png" width="645" height="417" role="presentation">

(picture from excel-university.com)

4\. The page will load and will show yellow icons against data/tables.

5\. Select the appropriate one

6\. Press the Import button.

Now you have the web data scraped into the Excel Worksheet — perfectly arranged in rows and columns as you like.

![](https://miro.medium.com/max/60/0*p5egK5jHH64SYo-X.png?q=20)

<img class="cp t u fy ak" src="https://miro.medium.com/max/1690/0\*p5egK5jHH64SYo-X.png" width="845" height="432" role="presentation">

**Getting web data using Excel VBA**
====================================

Most of us would use formula’s in Excel(e.g. =avg(…), =sum(…), =if(…), etc.) a lot, but less familiar with the built-in language — Visual Basic for Application a.k.a VBA. It’s commonly known as “Macros” and such Excel files are saved as a \*\*.xlsm. Before using it, you need to first enable the Developer tab in the ribbon (right click File -> Customize Ribbon -> check Developer tab). Then set up your layout. In this developer interface, you can write VBA code attached to various events. Click HERE (https://msdn.microsoft.com/en-us/library/office/ee814737(v=office.14).aspx) to getting started with VBA in excel 2010.

![](https://miro.medium.com/max/60/0*_D0KxpQjrhh0hqTz.jpg?q=20)

<img class="cp t u fy ak" src="https://miro.medium.com/max/1484/0\*\_D0KxpQjrhh0hqTz.jpg" width="742" height="167" role="presentation">

Using Excel VBA is going to be a bit technical — this is not very friendly for non-programmers among us. VBA works by running macros, step-by-step procedures written in Excel Visual Basic. To scrape data from websites to Excel using VBA, we need to build or get some VBA script to send some request to web pages and get returned data from these web pages. It’s common to use VBA with XMLHTTP and regular expressions to parse the web pages. For Windows, you can use VBA with WinHTTP or InternetExplorer to scrape data from websites to Excel.

With some patience and some practice, you would find it worthwhile to learn some Excel VBA code and some HTML knowledge to make your web scraping into Excel much easier and more efficient for automating the repetitive work. There’s a plentiful amount of material and forums for you to learn how to write VBA code.

**Automated Web Scraping Tools**
================================

For someone who is looking for a quick tool to scrape data off pages to Excel and doesn’t want to set up the VBA code yourself, I strongly recommend automated web scraping tools [(https://www.octoparse.com/)](http://www.octoparse.com) to scrape data for your Excel Worksheet directly or via API. There is no need to learn programming. You can pick one of those web scraping freeware from the list, and get started with extracting data from websites immediately and exporting the scraped data into Excel. Different web scraping tool has its pros and cons and you can choose the perfect one to fit your needs.

Check out [this post](https://www.octoparse.com/blog/top-30-free-web-scraping-software/) and try out these TOP 30 free web scraping tools

**Outsource Your Web Scraping Project**
=======================================

If time is your most valuable asset and you want to focus on your core businesses, outsourcing such complicated web scraping work to a proficient web scraping team that has experience and expertise would be the best option. It’s difficult to scrape data from websites due to the fact that the presence of anti-scraping bots will restrain the practice of web scraping. A proficient web scraping team would help you get data from websites in a proper way and deliver structured data to you in an Excel sheet, or in any format you need.

* * *

**Don’t hesitate if you have things to say. I am a passionate web scraper.** Welcome to read more articles, and learn web scraping at [**Octoparse**](http://www.octoparse.com)**.**

![](https://miro.medium.com/max/60/0*Y0HlJutBZuGHoibP?q=20)

<img class="cp t u dn ak" src="https://miro.medium.com/max/10368/0\*Y0HlJutBZuGHoibP" width="5184" height="3456" role="presentation">

“A close-up of a frozen spider web in Neumühl.” by [Nicolas Picard](https://unsplash.com/@artnok?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

Web Crawling? eh.. What is it?
==============================

[![Siddhartha Anand](https://miro.medium.com/fit/c/96/96/1*2V5VvaF6S8rBAnjstr-unQ@2x.jpeg)](/@siddharthalibra13?source=post_page-----fdfb91e946f7----------------------)

[Siddhartha Anand](/@siddharthalibra13?source=post_page-----fdfb91e946f7----------------------)

Follow

[Apr 17, 2015](/@siddharthalibra13/web-crawling-eh-what-is-it-fdfb91e946f7?source=post_page-----fdfb91e946f7----------------------) · 2 min read

Hey folks! This post is for all those who have always wondered what web crawling is, how do you do it but have never been able to understand it. Lo and behold! your search stops here..:) In layman’s terms, Web crawling is the art of extracting vast amounts of _information_ from the world wide web.

Hey so what.. what’s so different about it? Extracting data was done years ago(large data sheets, hand-written bank records, all people staying at a hotel, etc). Ahem!.. wait! Imagine the online register at the entrance of a hotel that was built a few years ago. Now, imagine one million such registers containing the exact same information of people who have visited the hotel since that time. You are the new supervisor and are supposed to draw out the details of all those people. That’s tough! right? A hard working guy would take a paper and a pen and manually do all the hard work. A smart guy would write a code that automatically does this for him. That’s one kind of web scraping and crawling.

**Web crawlers** are also known as **_spiders_** because of the their very nature to walk through the **_world wide_** **_web_**. Yes, they are the soul of online search engines that help you with relevant pages in barely a fraction of a second! How? These silent warriors pack their tools and tricks up their sleeves and go around the world downloading bulk of information from the online document store(i.e. WWW). Just to generate more interest among you guys I am sharing another link [here](http://bostinno.streetwise.co/2015/04/16/recorded-future-has-raised-12m-for-its-cyber-threat-web-crawling-service/). Just read it and think about it. If you want to further try out something, then [y](https://sidlearnstocrawl.wordpress.com/2015/06/27/first-chapter-learning-basics/)ou can get your [feet wet here](/@siddharthalibra13/first-chapter-learning-basics-c14ef98230f3).

* * *

_Originally published at_ [_sidlearnstocrawl.wordpress.com_](https://sidlearnstocrawl.wordpress.com/2015/04/17/web-crawling-eh-what-is-it/) _on April 17, 2015._

How Xpath Plays Vital Role In Web Scraping Part 2
=================================================

[![Sandra K](https://miro.medium.com/fit/c/96/96/2*mIH5vdwhAOewjJjvRqoZ1Q.png)](/@sandra_21783?source=post_page-----fd32e6c45c65----------------------)

[Sandra K](/@sandra_21783?source=post_page-----fd32e6c45c65----------------------)

Follow

[Aug 26, 2016](/@sandra_21783/how-xpath-plays-vital-role-in-web-scraping-part-2-fd32e6c45c65?source=post_page-----fd32e6c45c65----------------------) · 4 min read

To read the first part of this blog do read:

[

How Xpath Plays Vital Role In Web Scraping - Data hut


---------------------------------------------------------

### 

XPath is a language for finding information in structured documents like XML or HTML. You can say that XPath is (sort…

#### 

blog.datahut.co



](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping/)

Here is a piece of content on Xpaths which is the follow up of [How Xpath Plays Vital Role In Web Scraping](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping/)

Let’s dive into a real-world example of scraping amazon website for getting information about deals of the day. Deals of the day in amazon can be found at this . So navigate to the (deals of the day) in Firefox and find the XPath selectors. Right click on the deal you like and select “Inspect Element with Firebug”:

If you observe the image below keenly, there you can find the source of the image(deal) and the name of the deal in src, alt attribute’s respectively. So now let’s write a generic XPath which gathers the name and image source of the product(deal). //img\[@role=”img”\]/@src ## for image source //img\[@role=”img”\]/@alt ## for product name

In this post, I’ll show you some tips we found valuable when using XPath in the trenches.

If you have an interest in Python and web scraping, you may have already played with the nice [requests library](http://docs.python-requests.org/) to get the content of pages from the Web. Maybe you have toyed around using [Scrapy selector](http://doc.scrapy.org/en/latest/topics/selectors.html) or to make the content extraction easier. Well, now I’m going to show you some tips I found valuable when using XPath in the trenches and we are going to use both and [Scrapy selector](http://doc.scrapy.org/en/latest/topics/selectors.html) for HTML parsing.

Avoid using expressions which contains(.//text(), ‘search text’) in your XPath conditions. Use contains(., ‘search text’) instead.

Here is why: the expression .//text() yields a collection of text elements — a node-set(collection of nodes).and when a node-set is converted to a string, which happens when it is passed as argument to a string function like contains() or starts-with(), results in the text for the first element only.

**Scrapy Code:**

from scrapy import Selector  
html\_code = “””<a href=”#”>Click here to go to the <strong>Next Page</strong></a>”””  
sel = Selector(text=html\_code)  
print xp(‘//a//text()’)  
xp = lambda x: sel.xpath(x).extract() # Let’s type this only once # Take a peek at the node-set  
\[u’Click here to go to the ‘, u’Next Page’\] # output of above command  
print xp(‘string(//a//text())’) # convert it to a string # output of the above command  
\[u’Click here to go to the ‘\]

Let’s do the above one by using lxml then you can implement XPath by both lxml or Scrapy selector as XPath expression is same for both methods.

**lxml code:**

from lxml import html  
html\_code = “””<a href=”#”>Click here to go to the <strong>Next Page</strong></a>””” # Parse the text into a tree  
parsed\_body = html.fromstring(html\_code) # Perform xpaths on the tree  
print parsed\_body(‘//a//text()’) # take a peek at the node-set  
\[u’Click here to go to the ‘, u’Next Page’\] # output  
print parsed\_body(‘string(//a//text())’) # convert it to a string  
\[u’Click here to go to the ‘\] # output

A node converted to a string, however, puts together the text of itself plus of all its descendants:

\>>> xp(‘//a\[1\]’) # selects the first a node  
\[u’<a href=”#”>Click here to go to the <strong>Next Page</strong></a>’\]

\>>> xp(‘string(//a\[1\])’) # converts it to string  
\[u’Click here to go to the Next Page’\]

Beware of the difference between //node\[1\] and (//node)\[1\]//node\[1\] selects all the nodes occurring first under their respective parents and (//node)\[1\] selects all the nodes in the document, and then gets only the first of them.

from scrapy import Selector

sel = Selector(text=html\_code)  
xp = lambda x: sel.xpath(x).extract()

xp(“//li\[1\]”) # get all first LI elements under whatever it is its parent

xp(“(//li)\[1\]”) # get the first LI element in the whole document

xp(“//ul/li\[1\]”) # get all first LI elements under an UL parent

xp(“(//ul/li)\[1\]”) # get the first LI element under an UL parent in the document

//a\[starts-with(@href, ‘#’)\]\[1\] gets a collection of the local anchors that occur first under their respective parents and (//a\[starts-with(@href, ‘#’)\])\[1\] gets the first local anchor in the document.

When selecting by class, be as specific as necessary.

If you want to select elements by a CSS class, the XPath way to do the same job is the rather verbose:

**\*\[contains(concat(‘ ‘, normalize-space(@class), ‘ ‘), ‘ someclass ‘)\]**

Let’s cook up some examples:

\>>> sel = Selector(text=’<p class=”content-author”>Someone</p><p class=”content text-wrap”>Some content</p>’)

\>>> xp = lambda x: sel.xpath(x).extract()

BAD: because there are multiple classes in the attribute

\[\]

BAD: gets more content than we need

\>>> xp(“//\*\[contains(@class,’content’)\]”)

\[u’<p class=”content-author”>Someone</p>’, u’<p class=”content text-wrap”>Some content</p>’\]

\>>> xp(“//\*\[contains(concat(‘ ‘, normalize-space(@class), ‘ ‘), ‘ content ‘)\]”)  
\[u’<p class=”content text-wrap”>Some content</p>’\]

And many times, you can just use a CSS selector instead, and even combine the two of them if needed:

\>>> sel.css(“.content”).extract()  
\[u’<p class=”content text-wrap”>Some content</p>’\]

\>>> sel.css(‘.content’).xpath(‘@class’).extract()  
\[u’content text-wrap’\]

Learn to use all the different axes.

It is handy to know how to use the axes, you can follow through these examples .

In particular, you should note that following and following-sibling are not the same thing, this is a common source of confusion. The same goes for preceding and preceding-sibling, and also ancestor and parent.

**Useful trick to get text content**

Here is another XPath trick that you may use to get the interesting text contents:

//\*\[not(self::script or self::style)\]/text()\[normalize-space(.)\]

This excludes the content from the script and style tags and also skip whitespace-only text nodes.

Tools & Libraries Used:

Firefox  
Firefox inspect element with firebug  
Scrapy : 1.1.1  
Python : 2.7.12  
Requests : 2.11.0

Have questions? Comment below. Please share if you found this helpful.

Read the original article here: [https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping-part-2/](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping-part-2/)

* * *

_Originally published at_ [_https://blog.datahut.co_](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping-part-2/) _on August 26, 2016._

Theory vs. The World: How Retrieving Links from Google Is not t_hat Easy_
=========================================================================

[![Guglielmo Feis](https://miro.medium.com/fit/c/96/96/1*VJbR-mrPzjtpHVxaGqdIGg.jpeg)](/@guglielmofeis?source=post_page-----3ab35c8ac92a----------------------)

[Guglielmo Feis](/@guglielmofeis?source=post_page-----3ab35c8ac92a----------------------)

Follow

[Jan 20](/@guglielmofeis/theory-vs-the-world-how-retrieving-links-from-google-is-not-hat-easy-3ab35c8ac92a?source=post_page-----3ab35c8ac92a----------------------) · 7 min read

> Do you want to prove a bit of coding helps in the Humanities? Easy!

We all use Google a lot in our research, what if you can store the links you get from search results? This looks like a super-easy task. It takes a second to figure out the steps you need to perform _by hand_: access Google, perform the search, get results, save data, move to the next page, iterate if needed.

Plus the “extract the link” is quite a popular feature in variaty of packages that perform webscraping, you there should be a lot of documentation annd tutorials out there. Even better: the script we want to build is helpful for some colleagues (we’ll work with **Python** here).

It looks like that’s an eay task to learn some new features of a library by putting it in practice. Further, it proves the point of **coding helps in the humanities**.

Cool, so just go. It won’t take long, right? Spoiler: it was not that easy (hence the post).

![](https://miro.medium.com/max/60/1*wgmjZE_Ex0XhiMLPqLvsDw.png?q=20)

<img class="cp t u ha ak" src="https://miro.medium.com/max/1280/1\*wgmjZE\_Ex0XhiMLPqLvsDw.png" width="640" height="513" role="presentation">

\[SPOILER: but we’ll make it a yes. Image by [Gordon Johnson](https://pixabay.com/users/GDJ-1086657/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2069850) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2069850)\]

* * *

The Basic Idea: Requests and BeautifulSoup
==========================================

The project outline is easy to map and close to what we would do by hand:

1.  reach a search engine;
2.  query it;
3.  get the results of the query;
4.  extract all the links;
5.  save them;
6.  move to the next page;
7.  rinse and repeat.

Step 4 looks like the most scary one. We’ll have to inspect the html and get the right tag. But that’s part of the fun. Ok, there are issues lurking here like “how do I find out when I run out of results?”. But we can agree to have a fixed set of pages scraped or even stop a the first one.

Armed with **requests** and **BeautifulSoup** library (if you don’t have them, get the instruction for installation [here](https://2.python-requests.org/en/master/user/install/) and [here](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#installing-beautiful-soup), respectively) we begin our journey with some standard imports:

**import** requests  
**from** bs4 **import** BeautifulSoup **as** bs

Next, we build our request to a search engige (Google here). To do that we note that all queries on Google have the url that goes as: ‘[_https://www.google.com/search?q=_](https://www.google.com/search?q=)’ + ‘something to query’.

As we don’t want to keep typing our query as an input, we’ll hard code it, i.e. search ‘Goofy’. Then, we check the status of our request to make sure everything is ok when we access the page.

**import** requests  
**from** bs4 **import** BeautifulSoup **as** bs_#search for our term with requests_  
searchreq = requests.get('https://www.google.com/search?q=Goofy')  
_  
#ensure it works_  
searchreq.raise\_for\_status()

If you want to input a different query everytime (i.e. not to hard code it) you may go with something like this:

**import** requests  
**from** bs4 **import** BeautifulSoup **as** bs_\# ask the user what to search_  
query = input('What do you want to search?')_#search for our term with requests_  
searchreq = requests.get('https://www.google.com/search?q=' + query)_#ensure it works_  
searchreq.raise\_for\_status()

Getting the Links
=================

We have done tasks 1, 2 and 3 from our sketch. Now comes the tricky part. We need to isolate the links that Google gives us. This means we need to create a BeautifulSoup object for each page returning the search results (i.e. what we called **searchreq**) and process them with BeautifulSoup.

We follow the standard practice and call this object ‘soup’. We also specify it’s html that we want to parse. Then in ‘results’ we are going to use our soup object to return what we need and print it. That’s what we add to our code:

_\# creating the Beautiful Soup object to parse html_ soup = bs(searchreq.text, 'html.parser')_#apply a find all method on our soup object to get the result_  
results = soup.find\_all() _#but wait, what to we have to search?__#print them and be happy (if it works)_  
print(results)_#SPOILER: it won't_

Scraping the Links
==================

To scrape the links we need to tell BeautifulSoup what we need it to extract. To find this out, we call the inspector mode from our web browser on one of the search results (right click and select inspect on Chrome).

From there we play a game of:

1.  finding the items we need;
2.  extracting patterns or regularities for the items we care about (i.e. the links);
3.  catch them all.

![](https://miro.medium.com/max/60/1*NBLLEGDxvYM3iQOBpKih_Q.jpeg?q=20)

<img class="cp t u ha ak" src="https://miro.medium.com/max/2560/1\*NBLLEGDxvYM3iQOBpKih\_Q.jpeg" width="1280" height="853" role="presentation">

\[Sorry, this has to happen — Photo by [Carolina Castilla Arias](https://www.pexels.com/@carocastilla?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels) from [Pexels](https://www.pexels.com/photo/close-up-photo-of-pokemon-pikachu-figurine-1716861/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)\]

Our first choice might be something like ‘http’, but this is going to catch a lot of extra stuff as well like links that are **not** search results.

You have to think about HTML patterns and tags. If you look at it (or Google around like crazy), you’ll find out that there’s a nice thing called **div class=“r”** that seems to have what you are looking for.

After a few extra minutes with the BeautifulSoup documentation page, we learn to get them from the soup with: **soup.select(‘.r a’)**.

So we put all together:

**import** requests  
**from** bs4 **import** BeautifulSoup **as** bs  
_\# ask the user for a the search_  
query = input('What do you want to search?')_#search for our term with requests_  
searchreq = requests.get('https://www.google.com/search?q=' + query)_#ensure it works_  
searchreq.raise\_for\_status()_\# creating the Beautiful Soup object_  
soup = bs(searchreq.text, 'html.parser')_#apply a find all method on our soup object to get the result_  
results = soup.select('.r a')print(results)

We are ready to try this out!

Stuck: The World Strikes Back
=============================

**\[\]**

Exactly, watch that again. A pair of square brackets. That’s our output.

**\[\], i.e.** an empty list.

That’s our result. This is disappointing. Why is that? What’s happening? Let’s check what’s going on.

The first we do is try to print our soup object (if you have Ipython, use the shell). Once we have the soup object printed, we try to search our beloved “r” class, the one we are trying to select with out soup object.

**It’s not there!**

This is: _the world getting back on us_. In practice, theory is not enough. So, well, _now we can panic_. What’s going on? This was supposed to be an easy task.

Ways Out
========

We start googling more. I went out on Twitter and ask Al Sweigart (the author of [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/), a book you should check if you are starting out with Python) about it. In fact, one of the programs in the book discusses the task of getting links.

Al was kind enough to let me know that’s common practice for Google to obscure its results. That’s why the soup doesn’t match what we looked at. He briefly reminded me there’s life out of Google, so there are chances to be better off searching on different search engines (he suggested duckduckgo).

That’s _reeeeally_ important (hence the extra _Es_). Now we know the cause of the problem: **the HTML we see on the Google is not the same we get with our request**. And we already have a hint towards a solution: try asking to different search engines.

We can use these new knowledge to build alternative ways.

Rethinking the Issue
====================

We have a new problem. The HTML that delivers our search results is partly out of our control. What can we do? Can we get it like we see? Are there ways around it? This depends on how we want to fight.

1\. Ways Around: Different Search Engines
=========================================

The first option is to circumvent the problem: we pick a different search engine. In practice, we go on _Wikipedia_ and asks for search engines names. We then figure out how the query is asked and hope that the links extraction phase stays the same.

Assuming this, that doesn’t look as a costly option. And we hope one of the engines gives us the same html we can inspect.

2\. No Way(s): We Fight!
========================

We know what we want to get. Despite the HTML tags being different, we know the links are still there. What about extracting them through [**regular expressions**](https://docs.python.org/3/howto/regex.html)? It will be difficult and maybe sub-optmial, but rather than risking to fight again with HTML obfuscation, etc. we can tackle the issue once and forever.

We’ll write a regular expression extracting all that _http-something_. We can predict we will:

*   have double results or even more copies (which we’ll exclude by way of making a **set** out of our results)
*   have some bad results (like links to you Google account; or extra non-search related links).

Assuming you can identify the bad links, more links than required might be better than the \[empty list\] we got before.

3\. Rebuilding: from BeutifulSoup to Selenium
=============================================

Maybe we can get around the HTML obfuscation and get the search results in a different way. **Selenium** is another popular Python library that allows us to automate our browsing.

Selenium will open the browser for us and then we’ll have a look at the HTML. Should this fail, we may have Selenium inspect the page for us and copy and paste the inspected html.

This seems something that can work _in theory_. But requires extra efforts.

4\. Download the HTML in Different Ways
=======================================

We know that obfuscation happens but we do not know how and when. Maybe we can try to download the page and save it on our desktop and operate from there.

This sounds both simple and complicated. Saving a file, easy. Still, we need to access it properly… Is request the way to go? This requires some extra efforts.

To Do:
======

Ok, there’s still a problem but the field looks clearer:

*   the different ways need exploring;
*   code should grow and make it to GitHub.

* * *

(This is an improved and reviewed version of a previous post that appeared here: [http://www.thegui.eu/blog/scraping-links-from-google-part-1.htm](http://www.thegui.eu/blog/scraping-links-from-google-part-1.htm)).

This work is carried out as part of a **CAS Fellowship** as _CAS-SEE Rijeka_. See more about the Fellowship [here.](http://cas.uniri.hr/cas-see-fellowship-application/)

ReactJS Examples
================

[![makzan](https://miro.medium.com/fit/c/96/96/0*IGKg4bOHHmOslgKv.jpeg)](/@makzan?source=post_page-----f46dc076886a----------------------)

[makzan](/@makzan?source=post_page-----f46dc076886a----------------------)

Follow

[Nov 11, 2015](/makzan-scrapbook/reactjs-examples-f46dc076886a?source=post_page-----f46dc076886a----------------------) · 1 min read

I’m writing some ReactJS examples to demonstrate how we use React as the view rendering library. It also shows how we do data-view separation.

You can find the examples in the following CodePen collection:

[http://codepen.io/collection/XwaeGM/](http://codepen.io/collection/XwaeGM/)

![](https://miro.medium.com/max/58/0*LiuEqORBLJqLScO5.jpg?q=20)

<img class="dq t u hp ak" src="https://miro.medium.com/max/1280/0\*LiuEqORBLJqLScO5.jpg" width="640" height="665" role="presentation">

Need to know about the scrapping a car
======================================

[![We Buy Cars Today](https://miro.medium.com/fit/c/96/96/1*qbb2wzil0UVTI9AEo0DJvA.jpeg)](/@WeBuyCarsToday?source=post_page-----700d60394613----------------------)

[We Buy Cars Today](/@WeBuyCarsToday?source=post_page-----700d60394613----------------------)

Follow

[Mar 16, 2018](/@WeBuyCarsToday/need-to-know-about-the-scrapping-a-car-700d60394613?source=post_page-----700d60394613----------------------) · 1 min read

[

Get to know where to sell your car with no difficulty


---------------------------------------------------------

### 

Selling a car can be such a pain if you do not explore the web and not find out what to do with the car, how to sell it…

#### 

buycarstoday.blogspot.com









](http://buycarstoday.blogspot.com/2018/03/how-and-where-to-sell-car.html)

Selling a car can be such a pain if you do not explore the web and not find out what to do with the car, how to sell it and what price to demand the car itself.

How to link preview like Facebook, Twitter, Slack, and WhatsApp
===============================================================

[![Adel ak](https://miro.medium.com/fit/c/96/96/0*sSbgQI54wZC-y2Ki)](/@adoolak?source=post_page-----549381fef40a----------------------)

[Adel ak](/@adoolak?source=post_page-----549381fef40a----------------------)

Follow

[Jan 10](/@adoolak/how-to-link-preview-like-facebook-twitter-slack-and-whatsapp-549381fef40a?source=post_page-----549381fef40a----------------------) · 10 min read

![](https://miro.medium.com/max/60/1*IRKtkTpZ5B4ZXU0aLuQ9GA.jpeg?q=20)

<img class="cp t u gj ak" src="https://miro.medium.com/max/5904/1\*IRKtkTpZ5B4ZXU0aLuQ9GA.jpeg" width="2952" height="1080" role="presentation">

Link previews

Have you ever wondered how do web applications preview a link once you’ve posted it on your timeline or send a message ?, I’ve been to the sun and back multiple times trying to figure it out.

I had many questions that needed to be answered, but it was either no one understood what I asked or I was asking the wrong questions.

Worrest answers I’ve received were “you can use a web scraper API tool to achieve it, that’s what I used in my project”.

Services like

*   [Linkpreview](https://www.linkpreview.net/)
*   [Scraperapi](https://www.scraperapi.com/)
*   [Scrapesimple](https://www.scrapesimple.com/)
*   [Guteurls](https://guteurls.de/)

A few more…..

Until one day I met a guardian angel and I was introduced to [open graph protocol](https://ogp.me/).

Thank you, Emma 🤗.

FYI — The correct word for what we are doing is called web scraping

What is open graph protocol ?
=============================

> The Open Graph protocol enables any web page to become a rich object in a social graph. For instance, this is used on Facebook to allow any web page to have the same functionality as any other object on Facebook.
> 
> ~ Someone from [https://ogp.me/](https://ogp.me/)

In short, it describes a website with objects like title, description, images, and more with `<meta>` tags.

I’m not here to talk about open graph protocol, I’m here to show you how to fetch those data to make your own link preview, so if you want to know more about OGP, here are a couple of links.

FYI — Twitter has its own meta tag, but they use the “twitter” prefix instead of “og”

[

What is Open Graph?


-----------------------

### 

Open Graph is a technology first introduced by Facebook in 2010 that allows integration between Facebook and its user…

#### 

www.computerhope.com



](https://www.computerhope.com/jargon/o/open-graph.htm)

[

Getting Meta: Why Does My Social Post Not Show an Image When I Share a Link?


--------------------------------------------------------------------------------

### 

How to fix this with The Open Graph protocol

#### 

medium.com



](/better-programming/getting-meta-why-does-my-social-post-not-show-an-image-when-i-share-a-link-316b35b311e2)

[

Open Graph protocol


-----------------------

### 

The Open Graph protocol enables any web page to become a rich object in a social graph. For instance, this is used on…

#### 

ogp.me



](https://ogp.me/)

[

The Essential Meta Tags for Social Media | CSS-Tricks


---------------------------------------------------------

### 

These days, almost every website encourages visitors to share its pages on social media. We’ve all seen the ubiquitous…

#### 

css-tricks.com



](https://css-tricks.com/essential-meta-tags-social-media/)

How do we do it ?
=================

It’s a simple process and doesn’t require much work, we will fetch the web page as text in our Node.js application. Then we will select the HTML elements we need and get the data/text it holds, save it to a JSON file then send the data back.

“But how can we select the dom from the back end Adel ?”

Easy, with the help of cheerio and other modules like it, cheerio is a _Fast, flexible, and lean implementation of core jQuery designed specifically for the server._

Can we do it on the front end ?
===============================

As far as I know, you cant, this cant be done in the front end script, when you try to fetch eg my portfolio or any other site in chrome’s console, it will throw a cors (Cross-Origin Resource Sharing) error.

![](https://miro.medium.com/max/60/1*rAU9xQYpm2MTc8ZMASHWNA.jpeg?q=20)

<img class="cp t u gj ak" src="https://miro.medium.com/max/1044/1\*rAU9xQYpm2MTc8ZMASHWNA.jpeg" width="522" height="310" role="presentation">

To bypass this issue, we will send the URL to the back end server, process the request then send back the data we scrapped.

Prerequisite
============

*   JQuery, if you know how to select an element and get its values, your good.
*   Async/Await
*   NodeJS/ExpressJS

OK LETS CODE!!!
===============

If you want to tag along, I’ve got starter files you can clone/download, and I’ll be adding the completed files too.

[

Adel-ak/web-scraping-101


----------------------------

### 

You can’t perform that action at this time. You signed in with another tab or window. You signed out in another tab or…

#### 

github.com



](https://github.com/Adel-ak/web-scraping-101)

**1 — Get to know the front end script**

In our front end script located in the public/javascript folder has a fairly small amount of code in it, we have a click event listener on our add button, which will

*   prepend a loading preview card with an id.
*   send a post request to the backend with the URL link and the card id which was added to the page.
*   await for the data to come back, then add the data to the correct preview card but searching the id of the card.

const addButton = document.querySelector('button');addButton.addEventListener('click', async (e) => {e.preventDefault();try {  
    let urlInput = document.querySelector('input');  
    const id = await uuid();  
    const fetchData = {  
             method: 'POST',  
             headers: {  
                 'Content-Type': 'application/json;charset=utf-8'  
             },  
            body: JSON.stringify({ previewUrl: urlInput.value, id })  
    };urlInput.value = '';prependLoadingPreview(id);const data = await fetch('/get-preview', fetchData)  
     .then(res => res.json());  
       
     addDataToPreview(data);} catch (err) {console.log(err);}  
});

This function accepts an id and will add the loading preview to the unordered list,

function prependLoadingPreview(id) {document.querySelector(\`ul\`).prepend(document.createRange()  
  .createContextualFragment(\`<li class="preview-container loading" data-id="${id}"></li>\`,'text/html'));}

This function will receive an object, it will get the loading list by its id which was previously added, remove the loading class name then append the data

Object example  
{  
  id: "a60d491d-8c70-4620-aa18-111ae1abaea9",   
  url: "https://www.adelak.me",   
  img:"https://www.npmjs.com/package/mongoose",   
  title: "Mongoose",   
  description: "Mongoose is a [MongoDB](https://www.mongodb.org/) object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.",   
  domain: "npmjs.com"  
}function addDataToPreview({ id, url, img, title, description, domain }) {const li = document.querySelector(\`li\[data-id="${id}"\]\`);li.classList.remove('loading');li.innerHTML =\`<svg class="delete-button" viewBox="0 0 24 24" onClick="removePreview(this)"><polygon points="17.8,16.7 16.6,17.9 12,13.3 7.4,17.9 6.2,16.7 10.8,12.1 6.2,7.5 7.4,6.3 12,11 16.6,6.4 17.8,7.6 13.2,12.2"></polygon></svg>  
<a href="${url}" target="\_blank"><img class="preview-image" src="${img}" alt="preview image" onError="imgError(this)"/><div class="preview-info"><h5 class="preview-title">${title}</h5><p class="preview-description">${description}</p><span class="preview-url">${domain}</span></div></a>\`;}

This function removes a preview card

const removePreview = async (e) => {  
  try{let li = e.parentElement;li.parentElement.removeChild(li);const id = li.getAttribute('data-id');await fetch(\`/remove/${id}\`, { method: 'POST' });  
    
  }catch(err){console.log(err);}  
}

The UUID CDN was making the app load super slow, thanks to [broofa](https://stackoverflow.com/users/109538) who came up with this function, it will be creating our unique id for each preview card

function uuid(){let date = new Date().getTime();const randomStrings = (c) => {const r = (date + Math.random()\*16)%16 | 0;date = Math.floor(date/16);return (c=='x' ? r :(r&0x3|0x8)).toString(16);}const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/\[xy\]/g, randomStrings);return id;}

**2 — Installing modules**

We need to install a few modules.

**Cheerio** to  load the source code of the webpage we want to crawl.

**ExpressJS** to create our HTTP server.

**Express-handlebars** a template engine that makes writing HTML code easier and renders out page.

**Node-fetch** to make our HTTP request in node.js.

I’ve added these modules to the dependencies, simply install them by running `npm i` in the command line.

**3 — Creating our server**

Over at app.js, we have requested all our modules, set up our view engine and middlewares.

We can start by creating the home route, which will render the home temple and passing it the data in `data.json` (currently, `data,json`is empty).

app.get('/', function(req, res) {  
   res.render('home.handlebars', { data });  
});

Open up a command line and run npm start, then in your browser open up localhost://3000.

You should get an empty home page, with just an input filed.

![](https://miro.medium.com/max/60/1*EyrgqyH5r_ALEqdbfXhBVA.jpeg?q=20)

<img class="cp t u gj ak" src="https://miro.medium.com/max/2006/1\*EyrgqyH5r\_ALEqdbfXhBVA.jpeg" width="1003" height="695" role="presentation">

Now we work on fetching the metadata we want to get from a web page, let’s create a post route to receive the id and URL from the front end once the add button is clicked.

In the request body, we are expecting a value from previewUrl and id

app.post('/get-preview',(req, res) => {  
  const { previewUrl, id } = req.body;  
  console.log(previewUrl); //[https://medium.com/@adoolak/how-to-deploy-a-reactjs-and-express-app-to-heroku-afb5b117e0eb](/@adoolak/how-to-deploy-a-reactjs-and-express-app-to-heroku-afb5b117e0eb)  
  console.log(id);//"a60d491d-8c70-4620-aa18-111ae1abaea9"  
});

Let’s work on fetching the HTML page from my last medium post.

Make the anonymous function into an async/await function, and use the fetch API from the node-fetch module, then create a variable called html and give it the value of the fetch method (make sure you use the await keyword, to wait for a result from the fetch), pass it the previewUrl value from the request body, then chain a `.then(res => res.text())` to it.

Next, we use cheerio, remember cheerio is an _implementation of_ core jquery for the server side.

Create a variable with the $ sign and give it the value of `cheerio.load(),` pass the html variable to the load method, you can now try and select an html element using the $ sign.

app.post('/get-preview',async (req, res) => {  
  const { previewUrl, id } = req.body;  
  const html = await fetch(previewUrl).then(res => res.text());  
  const $ = cheerio.load(html);  
  console.log($('h1').text()) //How to deploy a Reactjs and Express App to Heroku});

We can now start getting the meta tags we want, create a variable named `metaTagData` which will hold an object of the data,

**id** — we will pass in the id from `req.body` to the object,

**url** — the web site url to the url key.

**domain** — For the domain we just need the domain name of the previewUrl, we can use the url module from nodejs to get the hostname.

**title** — use cheerio to select the meta tag with the attribute of `name="title"`

**img**— use cheerio to select the meta tag with the attribute of `name="title"`

**description**— use cheerio to select the meta tag with the attribute of `name="description"` and get the attribute of `content` .

The meta tags have another attribute called `content` that's where the values are stored, to get the values, you need to chain the cheerio selectors with the `attr` method and pass it the string of `content` .

You should end with an object like this.

const metaTagData = {  
  id:id,  
  url: previewUrl,  
  domain: url.parse(previewUrl).hostname,  
  title: $('meta\[name="title"\]').attr('content'),  
  img: $('meta\[name="image"\]').attr('content'),  
  description: $('meta\[name="description"\]').attr('content'),  
}

Now, this should do it, but some web pages use a basic html meta tag, some use open graph, some use twitter cards, some use the property attribute instead of the name attribute, some don't add a image meta tag, we can basically end up with missing data or no data at all.

**Solution**

Creating a function which will return the first thing it finds

const getMetaRag = (name) =>  { return(  
    $(\`meta\[name=${name}\]\`).attr('content') ||  
    $(\`meta\[name="og:${name}"\]\`).attr('content') ||  
    $(\`meta\[name="twitter:${name}"\]\`).attr('content') ||  
    $(\`meta\[property=${name}\]\`).attr('content') ||  
    $(\`meta\[property="og:${name}"\]\`).attr('content') ||  
    $(\`meta\[property="twitter:${name}"\]\`).attr('content')  
  );}

We can now change the value of title, img and description of our metaTagData object to the getMetaTag function and pass it a the meta tag name as a string.

And what if a web page doesn't use meta tags at all ?

We add a fallback value on our title, img and description keys.

const metaTagData = {  
  id:id,  
  url: previewUrl,  
  domain: url.parse(previewUrl).hostname,  
  title: getMetaTag('title') || $(\`h1\`).text(),  
  img: getMetaTag('image') || './images/no-image.png',  
  description: getMetaTag('description') || $(\`p\`).text(),  
}

**title** — will fall back to the first h1 tag on the page

**img** — will fall back to an image in the public/images folder

**description** — will fall back to the first paragraph tag on the page

Some descriptions can get a bit lengthy, I decided to keep all descriptions at a max of 200 character count.

let { description } = metaTagData;if(description.length > 200){  
 metaTagData.description = description.substring(0,200) + '...';  
}

Next, we push the data to the beginning of the data array, using the unshift array method, then write it to the `data.json` file using the `writeFile` from the fs (file system) nodejs module.

data.unshift(metaTagData);fs.writeFile("./data.json", JSON.stringify(data, null, 2),()=>{  
  res.status(201).json(data.shift());  
});

The first parameter of the `writeFile` method takes in the file location, the second parameter we pass in the data we want to write to the file, since its a JSON file we need to stringify the data using the`JSON.stringify` method, the third parameter takes in a call back function, where we respond back with JSON and passing it the data using the shift array method and also set the HTTP status to 201.

**Test Run!**

If you start your app, and past a link of any web page then click on add, you should end up with this.

![](https://miro.medium.com/freeze/max/60/1*UQiIXwzOZvzCzpIRAj4hCQ.gif?q=20)

<img class="cp t u gj ak" src="https://miro.medium.com/max/1980/1\*UQiIXwzOZvzCzpIRAj4hCQ.gif" width="990" height="928" role="presentation">

**Deleting the card**

To remove a card, create another post route which will accept an ID from the URL parameter, create a variable named indexOfId and the value you map over the data json array and return the just the id of each object, then chaining the array method `indexOf()` to the map, will give you the exact position of the id you want to remove from the array (make sure you pass in the id from the url parameter to the indexOf method).

Next, we use the splice array method to remove the data from the data json array and passing the first parameter the `indexOfId` variable and second parameter the value `1` , indicating we want to remove just the object from the array.

Then we use the fs nodejs module to rewrite the new edited data to the `data.json` file, and respond back with a status of 200 and using the respond `end()` to end the request.

app.post('/remove/:id', (req, res) => { const { id } = req.params; const indexOfId = data.map(dataId => dataId.id).indexOf(id); data.splice(indexOfId,1); fs.writeFile("./data.json", JSON.stringify(data, null, 2), () => ( res.status(200).end() ));});

**Test Run!**

If you try and remove a card, then refresh the page, the removed cards will it will no longer be there.

![](https://miro.medium.com/freeze/max/60/1*BgEhnOulIwCpfOkp78Qawg.gif?q=20)

<img class="cp t u gj ak" src="https://miro.medium.com/max/1980/1\*BgEhnOulIwCpfOkp78Qawg.gif" width="990" height="928" role="presentation">

End Of The Road!!
-----------------

Conclusion
----------

We learned how to create a link preview by web scraping meta tags, but with the power of web scraping, you can do more than scrap meta tags.

Take Adidas as an example, they don't prove an API for their product, images, prices, etc…, and you want to create an eCommerce side project.

You can go to their web page and start scraping the products, but if a web page like adidas.com uses react, angular or vue, it can get complicated to web scrap.

You will need to use a headless browser to get around scraping that kind of web sites.

**_!!! Watch out though, it is illegal to scrap some web sites !!!_**

Headless browser resources
--------------------------

[

An Introduction to Web Scraping with Puppeteer


--------------------------------------------------

### 

Learn Puppeteer with me in this article.

#### 

medium.com



](/swlh/an-introduction-to-web-scraping-with-puppeteer-3d35a51fdca0)

[

A Guide to Automating & Scraping the Web with JavaScript (Chrome + Puppeteer + Node JS)


-------------------------------------------------------------------------------------------

### 

Learn to Automate and Scrape the web with Headless Chrome

#### 

codeburst.io



](https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921)

[

Scraping using zombie.js


----------------------------

### 

I’m using zombie for testing and want to pull back a list of anchor tags (so not really scraping but a common thing you…

#### 

medium.com









](/@lynzt/scraping-using-zombie-js-8fb2877348fd)

> Got any questions ?  
> DM me in twitter @Adel\_xoxo and I’ll answer to the best of my knowledge
> 
> ~Adel ak

How I took a break from Job Searching and let Python do it for me.
==================================================================

[![Umang Shah](https://miro.medium.com/fit/c/96/96/0*VUv8Qy5XzcpPBUxA.)](/@umangkshah?source=post_page-----25f05c0f3dea----------------------)

[Umang Shah](/@umangkshah?source=post_page-----25f05c0f3dea----------------------)

[Follow](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fcodeburst.io%2Fhow-i-took-a-break-from-job-searching-and-let-python-do-it-for-me-25f05c0f3dea&source=-5cd646935234-------------------------follow_byline-)

[Dec 28, 2017](/how-i-took-a-break-from-job-searching-and-let-python-do-it-for-me-25f05c0f3dea?source=post_page-----25f05c0f3dea----------------------) · 4 min read

Another day in the Winter break. The ever looming blade of getting a full time job compels me to go to Indeed.com. I use the Advanced Search set my preferences, location, radius around the location, job title, entry level, full time, how long ago the jobs was posted (I prioritize applying to jobs no older than 15 days) the usual stuff. Hit search and the nightmare begins.

![](https://miro.medium.com/max/60/1*Ms_Ub7T5hbxxaSA_ogk1Fg.png?q=20)

<img class="dq t u ic ak" src="https://miro.medium.com/max/3116/1\*Ms\_Ub7T5hbxxaSA\_ogk1Fg.png" width="1558" height="1008" role="presentation">

Advanced Search does have good parameters.

Now, before I complain about Indeed for no reason. I consider it to be one of the best websites for job search — in fact, I got my summer internship through Indeed. It has a great collection of relevant jobs and a nice set of filtering options. But finding full time jobs is kind of a mess because of the wider range of job type that all fall under the same umbrella.

*   First, there’s almost way too many results, for this instance 375 to be precise. (which is also a good thing?)
*   Second, even though I filter for entry level jobs, the description often has a minimum work ex requirement — while It may not necessarily be entry level = 0 work experience, but having jobs with requirement of 5+ years under entry level is doing no good to anyone.
*   Third, I would eventually stumble upon Intern positions — again not what I am looking for. (So Internship ⊆ Full Time? maybe but come on..)
*   And four, it takes too much time, I’ve already filtered and filtered and I still find results that do not work for me.

If only I could do this entire chore of going through each and every job title, job description and eliminating unsuitable ones and consolidating the right ones in one place. Well, yes I can, with Python. I consider Python to be a great automation tool, with its rich set of libraries and intuitive syntax, be it data cleaning or arranging my desktop, it never lets me down.

First, task is to find out if at all the job title matches my need. But, how do I know where is what on the webpage and how will my code know that. Lucky for me, Indeed has a very well defined html page structure and I can leverage the semantic class and id tags. View the page source or simply “inspect element” on your choice of page element. And Voila!

![](https://miro.medium.com/max/60/1*Gr045Y6zJLC2wFuVyUyDNQ.png?q=20)

<img class="dq t u ic ak" src="https://miro.medium.com/max/5532/1\*Gr045Y6zJLC2wFuVyUyDNQ.png" width="2766" height="1230" role="presentation">

Its all right there.

If you look closer. All results have the class tag “result”. That’s great, something to begin coding. Lets head over to _atom._ **BeautifulSoup** is a great tool for all things HTML. Plus, it is great for nested search of elements and attributes. Grab the URL,

`url_base = “[https://www.indeed.com/jobs?q=software+engineer](https://www.indeed.com/jobs?q=software+engineer)…”`

load the page into a soup

try:  
    search\_page = ur.urlopen(url\_base+"&start="+str(pgno)).read()  
    soup = BeautifulSoup(search\_page, 'html.parser')

and lets search for that job. _(pgno is what lets me go through all the pages, but I’m leaving out the details.)_

![](https://miro.medium.com/max/60/1*g4-VRI5Q65ma7aup7dlEyg.png?q=20)

<img class="dq t u ic ak" src="https://miro.medium.com/max/4092/1\*g4-VRI5Q65ma7aup7dlEyg.png" width="2046" height="60" role="presentation">

URL for search results is where I start. This already has all my filters applied.

Now, having seen the html layout. I can get the _div_ holding the “result”.

`for job in soup.find_all(class_=’result’):`

I have access to the title, company, location, short description, salary if listed, and the URL for the job.

 link = job.find(class\_="turnstileLink").get('href')  
  job\_title = link.get('title')  
  company\_name = job.find(class\_='company').get\_text()

All kinds of checks can be applied on these, like ignore anything with the work “intern” or “senior”. After doing some more filtering from this information I use the URL to get the job description and get **regex** to find out if its good for me. The regex here checks for 2 things :

1.  The required previous experience is not more than 1 year.
2.  It should not be limited to US Citizens.

If I find either of these in a description, it is thrown out as not suitable.

p1 = re.compile('\[2-9\]\\s\*\\+?-?\\s\*\[2-9\]?\\s\*\[yY\]e?a?r\[Ss\]?')  
p2 = re.compile('\[Cc\]itizen(ship)?')

As evident, I may have played it fast and loose with the regular expressions. But based on the job descriptions I have encountered before (hundreds). This seemed to be enough to eliminate jobs which I did not fit for as well as prevent me loosing out on suitable postings.

![](https://miro.medium.com/max/60/1*zoAPwfd41yaEBHcjxtpH2A.png?q=20)

<img class="dq t u ic ak" src="https://miro.medium.com/max/3000/1\*zoAPwfd41yaEBHcjxtpH2A.png" width="1500" height="950" role="presentation">

Job title and company name with the link, stored in a text file.

So there it is a _s_ample of the process I followed. Although, I did a lot more tweaking and I was more specific about what job titles I targeted.

Here’s the github link to the code: [https://github.com/umangkshah/job-scraping-python/blob/master/job\_scraper.ipynb](https://github.com/umangkshah/job-scraping-python/blob/master/job_scraper.ipynb)

* * *

All that’s left now is to go and apply. I always make sure that I am a good fit for the job description and that my resume and cover letter has all the relevant details. Currently, I am exploring roles in Self Driving Car teams dealing with Perception, Localization, Mapping or Motion Planning and tricks like this are helping me find specific titles.

This is my first post on Medium (or ever ). I got a lot of help from other Medium articles on writing and formatting. Look forward to write more. I plan to cover some topics in AI/Self Driving Cars too. So thanks for reading, let me know how you optimize your job hunt?

![](https://miro.medium.com/max/60/1*JoUDopwxqh5qMVtnlMrxgA.png?q=20)

<img class="ds t u eq ak" src="https://miro.medium.com/max/3230/1\*JoUDopwxqh5qMVtnlMrxgA.png" width="1615" height="773" role="presentation">

Photo: [https://www.promptcloud.com/blog/scrape-twitter-data-using-python-r/](https://www.promptcloud.com/blog/scrape-twitter-data-using-python-r/)

A Serverless Pipeline to retrieve, validate, and immerse the data to Azure SQL Server from Twitter.
===================================================================================================

[

![karanpreet singh wadhwa](https://miro.medium.com/fit/c/96/96/0*_cSkznHqiWVHYgJN.jpg)

](/@ksw352?source=post_page-----1a5757b39bc8----------------------)

[karanpreet singh wadhwa](/@ksw352?source=post_page-----1a5757b39bc8----------------------)

[Follow](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Ftowardsdatascience.com%2Fa-serverless-pipeline-to-retrieve-validate-and-immerse-the-data-to-azure-sql-server-from-twitter-1a5757b39bc8&source=-4ad651423231-------------------------follow_byline-)

[Nov 2, 2019](/a-serverless-pipeline-to-retrieve-validate-and-immerse-the-data-to-azure-sql-server-from-twitter-1a5757b39bc8?source=post_page-----1a5757b39bc8----------------------) · 3 min read

* * *

> Learning how to do data science is like learning to ski. You have to do it.

* * *

Project Statement:
------------------

Given a twitter ID, get a minimum of 100 followers (Modified this to keep in Azure function 5–10 min timeout period) and for each follower gather up to 200 tweets.  
Store the tuple (twitterID,followerID,tweetID,tweet) into a table managed in Azure SQL Service.  
1) You will have to create and set up a free Azure account.  
2) Create a database and a table in that Azure account.  
3) Create a twitter account with API  
4). given twitter ID, gather follower ids of that twitter ID  
4.1) for each of the follower ID gather up to 200 original tweets  
— — exclude retweets, messages  
5) Store that into the Azure table  
6) Write a client to query that Azure table.  
6.1) List all tweets for a given twitter ID  
6.2) List follower ID for a given twitter ID

Technology Used:
----------------

1.  Python
2.  Twython library to extract tweeter data
3.  Azure Function
4.  Azure SQL server

Things I learned:
-----------------

1.  Azure SQL Server Usage from localhost as well as Azure Server-less and Azure Databricks.
2.  Azure Function.
3.  Learned [twython](https://twython.readthedocs.io/en/latest/) library usage to extract tweets.

* * *

Brief Summary of steps followed while doing the [project](https://github.com/ksw25/Extract-Data-From-Tweeter-And-Save-In-Azure-SQL-Using-Azure-ServerLess):
-----------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Created a [Tweeter Developer Account](https://developer.twitter.com/en/apply-for-access.html).
2.  Wrote a python script to extract the Follower’s ID for a given User ID.

Code for getting followers ID for a Given User ID

3\. Wrote a python script the take Followers ID extracted in the previous step and retrieve at max 200 tweets for each.

Code for getting followers Tweet

4\. Created an Azure SQL database.

5\. Wrote a python script to take the result from step 3 and save it to the Azure SQL server.

Code to Save extracted data to Azure SQL server

6\. I created an Azure function project and func. Modify script to work on Azure Function.

7\. Create 2 More Client functions for the following purpose.

*   List all tweets for a given twitter ID

List all tweets for a given twitter ID

*   List follower ID for a given twitter ID

List follower ID for a given twitter ID

* * *

Links for each Azure Functions:
-------------------------------

(These are templates for you guys to look over. I have turned off the activation of these links so that they won’t work. **I am not rich, sadly 😢 😭 .**)

Task 1: To save Followers’ ID and their Respective Tweets. (Placed in TweetWork in MyFunctionProj Directory)

*   [https://demo.azurewebsites.net/api/Tweetwork](https://demo.azurewebsites.net/api/Tweetwork)
*   for example [https://demo.azurewebsites.net/api/Tweetwork?name=25073877](https://demo.azurewebsites.net/api/Tweetwork?name=25073877)

Task 2: List all tweets for a given twitter ID. (Placed in Client1BigData in MyFunctionProj Directory)

*   [https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAKnX09CN1vrg==](https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAKnX09CN1vrg==)
*   for example [https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAK9CN1vrg==&name=979178022367461376](https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAK9CN1vrg==&name=979178022367461376)

Task 3: List follower ID for a given twitter ID. (Placed in Client2BigData in MyFunctionProj Directory)

*   [https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAK9CN1vrg==](https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAK9CN1vrg==)
*   for example [https://demo.azurewebsites.net/api/client2bigdata?code=2MO/r/Wvk5JQFsbQ1KKkA0hdWF1OCfdeyZjpENpoNkVGIS57Waw==&name=25073877](https://demo.azurewebsites.net/api/client2bigdata?code=2MO/r/Wvk5JQFsbQ1KKkA0hdWF1OCfdeyZjpENpoNkVGIS57Waw==&name=25073877)

Challenges Faced:
-----------------

*   If you are using Mac for debugging Azure function in Visual Studio, it is very hard as sometimes Visual studio does not create an exact extension/helper file to make debugging work. Personally, For me, It didn’t work at all. I had to push function online every time I wanted to check it. **But I found the solution for it now.** There are three files in .vscode then are sometimes screwed up. I would be mentioning them and what should it looks like. Namely,

1.  _task.json_

task.json

_2\. launch.json_

_launch.json_

_3\. settings.json_

_settings.json_

*   Azure Functions has its limitation as compared to AWS lambda. When I started writing it, I thought it would be the same as AWS lambda as both are serverless, but implementing it was way hard for two reasons. First, Azure function does not allow online code editing, which is provided by AWS.

Follow up:
----------

*   If I were making this for a company and had enough resources, I would have gone with Azure function Dedicated App Plan, which has a maximum time limit of 30 mins.

* * *

Github: [https://github.com/ksw25/Extract-Data-From-Tweeter-And-Save-In-Azure-SQL-Using-Azure-ServerLess](https://github.com/ksw25/Extract-Data-From-Tweeter-And-Save-In-Azure-SQL-Using-Azure-ServerLess)

* * *

Acknowledgments :
-----------------

*   I did this as part of CS6513 Big Data Tools and Techniques at the Tandon School of Engineering, NYU
*   I acknowledge the IBM Power Systems Academic initiative for underwriting computing resources.
*   I acknowledge MSFT Azure for providing free Azure access to students.

* * *

Regards,

_Karanpreet Singh Wadhwa_

**Master’s** in **Computer Science** | Class 2020

Tandon School of Engineering | New York University

Graduate Teaching Assistant — Computer Vision | New York University

[karan.wadhwa@nyu.edu](mailto:karan.wadhwa@nyu.edu)| (929) 287–9899 | [LinkedIn](https://www.linkedin.com/in/karanpreet-wadhwa-540388175/) | [Github](https://github.com/ksw25)