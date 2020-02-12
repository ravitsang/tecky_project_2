
# 100 Days of Code — Day 5 of 100

Today’s project is a web scraper! I have always been curious about what web scraping is about and how to do it.

Apparently, after hours of researching, there is an easy way to do it using Puppeteer. I followed a youtube tutorial closely and I got it done in less than an hour! Yay! Or so I thought…

My initial plan was to scrape some data then display it on a HTML page. So as usual, I attached &lt;script&gt; to my HTML but something went very wrong…

ERROR: ‘require is not defined’. Oh boy, I thought. So I researched what this error is about and apparently the keyword require cannot be used for client-side execution. In other words, no browsers. Boo.

It took me another 2 hours and more to figure out what to do from here. Am I satisfied with just this back-end but completed web scraper? Or do I want a page too? After browsing and reading about browserify, I decided to have a page! But… Oh dear. Issues after issues that I don’t understand. After researching more, I’m back to square one — which is having no page because apparently, Browserify and Puppeteer don’t like each other…

Ok, so fine, I thought. Let’s just push this to gitHub without the front-end… ERROR! File exceeded 100MB! *slaps face* Nothing seems to be going right today… It turns out that the “node_modules” folder which contains the Puppeteer module is over 145MB and I honestly have no idea why it is so large so I deleted it and put it in the README.md. The long day seems to finally come to an end.

But wait! The front-end is not complete. All I have now is some data scraped by scraper.js. I can’t let it go to waste! So I save them to the JSON file while learning about File System in Nodejs. Very handy! After saving the JSON, I load it up to a HTML page into a table dynamically (learned from [Day 3](/@victoria2666/100-days-of-code-day-3-of-100-d2141c4e7932))! BAM! Front and back now all covered and this noob feels accomplished for the day.

**The Project: **[GameScraper](https://victoria-lo.github.io/GameScraper/)

**What I Learn:**
- WEB SCRAPING!- Save data to local JSON using File System module- Using Puppeteer and how large it is in memory- GitHub’s size limit is 100MB (good to know)- There’s too much StackOverflow forums addressing the same issues/problems that my brain got overloaded
**What I Did Not Learn:**
- Browserify- How to make require() work for client-side- Why Puppeteer is so large
**Thoughts:**

Today was exhausting because it felt like I made no progress ever since I got the scraper running. The scraper is the main topic I want to learn today so actually, I could have been done within an hour but I just had to be all ambitious and research stuff. But it all ended in vain so it felt exhausting to me. Overall, I am still glad that I learnt how to scrape data from other sites.

# How to Scrape Data from Web Pages for Sentiment Analysis?

Today, Businesses can understand their customers’ reactions with the help of many available tools. They can analyze if the customers have liked the layout or not, get the existing offers, did the services please them? The increased data volume is valuable to evaluate success as well as draw insights about the future.

At [****X-Byte Enterprise Crawling****](https://www.xbyte.io/), We are a Data-as-a-Service provider, so we understand the importance of this data as well as help you get valuable insights through our Data Scraping Services. We Extract Websites and Scrape Structured Data that can be utilized to derive some insights. We provide the [****best webpage data scraping****](https://www.xbyte.io/service/web-scraping-service/) for sentiment analysis services to help your business do better with real time sentiment analysis of social media platform data.

# We Help Extract Products’ User Reviews

Being a [****web scraping service****](https://www.xbyte.io/service/web-scraping-service/) provider, we make that easier to scrape data from the web. With our professional webpage data scraping services for sentiment analysis, you just need to provide us the websites list that you want to scrape for sentiment analysis with the required fields as well as the frequency that you wish the data to. With our personalized crawlers as well as progressive computing stacks, we have retrieved the data in a format you want (generally JSON, CSV, XML,). You can ask for the data through our API or even get the data provided to your AWS or FTP location.

# How Important the Sentiment Analysis Is?

As the data scraping is really challenging, we do replicate on how the opinion mining could help our business enterprise clients do better. Sentiment Analysis or Opinion Mining copes with automatic data scanning as well as establishing its purpose or nature. Basically, it is very important to define if the text extracted and scraped from the website is helpful or not; or whether it associates with the subject which is given in the title.

# Study of Sentiment Analysis Functions

The functions of Sentiment Analysis of Twitter or Sentiment Analysis of Facebook could be to analyze records (product feedback, user reviews, services feedback forms, etc.) as well as specify feelings expressed (dissatisfaction, happiness, etc.). On the easy scale, it can be attained by creating a rating system from 1–10 where every word is usually associated with emotions. The scores of every word, as well as the entire text, is calculated to observe what the sentiments or opinions are indicated.

The added methodology is objectivity or subjectivity identification. Here, scraped data is verified for being objective or subjective. Though, this might prove to be tough as results of assessments are person-specific.

Maybe the most advanced type is Feature-Based Sentiment Analysis. Here, individuals give opinions about users that are scraped from the text about a definite service or product and then evaluate it to see if a consumer gets satisfied or not. That is where X-Byte Enterprise Crawling’s [****Web Data Scraping Services****](https://www.xbyte.io/service/web-scraping-service/) help. For instance, if you want to crawl hundreds and thousands of news, blogs, or forum websites to scrape high-level data like date, title, article URLs, content, and author, mass-scale crawls, etc. will offer the data in a well-structured format like constant feeds.

We could also filter these crawls based on a list of keywords to facilitate better sentiment analysis based on subject topic, language, and even keyword detection. Our named-entity recognition service only helps to enrich this information.

We help our clients with product sentiment analysis. The customer wanted to scrape comments about that from websites and forums, from distributors, retailers, and enthusiasts to an average customer. The customer’s use case was to get data to know how promising users found the product as well as what consumers have talked about that on the Internet.

Considering there are thousands of websites that might comprise product reviews as well as different online forums based on the consumer durables or associated topics, you get a valued collection of understandings. We set crawls to scrape reviews from highly valued websites with thousands of URLs spontaneously.

Our automated data scraping and [****Monitoring Solutions****](https://www.xbyte.io/solutions/) target sites as well as deliver exact results. Furthermore, with place normalization, we deliver analysis-ready well-structured data.

# The X-Byte Enterprise Crawling Advantage
- Our process is simple and efficient to make the crawls running.- Our site maintenance and monitoring record all the changes in structure to offer constant data coverage.- With our [****Web Data Scraping Services****](https://www.xbyte.io/service/web-scraping-service/)**,** you will get the data you want.- You will get complete and easy access.- You will get regular data feed alerts on uploads as well as a collaborative API system to request data from.
To get professional web data scraping for Sentiment Analysis, contact [****X-Byte Enterprise Crawling****](https://www.xbyte.io/)**** ****or ask for a free quote!

**Visit Us:** [**www.xbyte.io**](https://www.xbyte.io/)

# Scrapping the content of single-page application (SPA) with headless Chrome and puppeteer

# TL;DR

All the code examples from this articles you can find on a GitHub repository [https://github.com/AndrejsAbrickis/axios-cheerio-puppeteer](https://github.com/AndrejsAbrickis/axios-cheerio-puppeteer)

Axios and cheerio is a great toolset to fetch and scrape the content of a static web page. But nowadays when many of the websites are built as a single page application and gets rendered dynamically on the client it might not be possible to get the content.

Just because it’s rendered asynchronously and the content is not backed into the HTML received over the wire, doesn’t mean you cannot access it. You just need a different toolset which allows waiting for the content to appear.

Let’s have a quick look on the source HTML of a SPA application and the rendered result.

In the screenshot above, on the left, you can see a fully rendered standings table. But look at the source the browser downloaded all we can notice is a single `&lt;div id="#app"&gt;&lt;/div&gt;` and a couple of JavaScript files and NO content. So let’s try to get the HTML content of the body.

# Start with axios + cheerio

[axios](https://github.com/axios/axios) is a “Promise based HTTP client for the browser and node.js”. Because it’s an HTTP client we can use it to fetch an HTTP endpoint and receive the response with the body. We can use the HTTP client to fetch not only HTML endpoint but also JSON, images, etc. And hence we are responsible to handle the plain text response.

That’s where the cheerio comes to help. [Cheerio](https://github.com/cheeriojs/cheerio) is a “Fast, flexible &amp; lean implementation of core jQuery designed specifically for the server”. Basically, it loads and parses the HTML markup as plain text and returns a DOM model we can then access and traverse in jQuery style.

And because cheerio doesn’t interpret the markup as a browser does. It won’t apply the CSS styles and won’t run the JavaScript and the dynamically rendered content won’t be added to the DOM.

As an example let’s try to get the content of the body tag using axios and cheerio. In the following gist you can see that we are firing a GET request (L6), then parse the response data into a DOM using cheerio (L7) and finally search for the `&lt;body&gt;` element (L9) to output its HTML content.

When executed this node script we get the web apps placeholder element `&lt;div id="app"&gt;` without the dynamically rendered content.

Because of what we received over the wire was a plain text and the JavaScripts included in the HTML were not executed and this is where a headless browser comes to rescue.

# Switch to puppeteer and headless Chrome

Let me shortly explain what a [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) browser is. In a nutshell headless means it’s a browser without graphical user interface (GUI) which can be controlled programmatically. Mostly it’s useful for E2E testing as it will apply all styles, and run JavaScript to generate the DOM. And because of that, it’s a perfect tool to scrape Single Page Applications.

And as I mentioned that it’s controlled programmatically. And for that reason, we can use puppeteer to control the browser over the [DevTools](https://chromedevtools.github.io/devtools-protocol/) protocol. Let’s get hands-on and see how to get the dynamically rendered HTML.

In the example above we are using single dependancy pf puppeteer package. First, we initialize a browser instance (L5) and create a new browser page (L6). Afterward, we instruct the browser page to visit an URL (L7) and wait for an element to appear on the page (L8) before to continue. Notice that one can set the timeout in milliseconds how long the browser should wait for the element.

After we have awaited the element we are using page’s evaluate method to execute a JavaScript within the web page’s context (L10 — L12). This allows us to access the HTML document using vanilla DOM API. From this, we return the HTML of body element and output. And finally, we close the browser which kills the headless Chrome’s process.

And now the result of running this script includes the content of dynamically rendered HTML.

# Conclusion

This short post demonstrated two solutions how to scrape a website. One can use a combination of axios and cheerio to get the content of a statically rendered website. And use puppeteer to get a dynamical content which is rendered by a fully-powered and invisible (headless) browser.

I hope this article will help you to start to utilize the mentioned tools as they can be used not only to scrape the websites but also for testing your web apps (E2E or snapshot tests) or taking screenshots.

If you found this post useful and would like to read more about random web development topics, just clap for this article or drop a comment here. And as always you can find me on [Twitter@andrejsabrickis](https://twitter.com/andrejsabrickis)

This article, the content, and opinions expressed on Medium are my own. But as I work for one of the[ leading P2P loans marketplaces Mintos.com](https://www.mintos.com/en/) I would like to use this last line to promote that we are hiring. Including the Growth Engineering team, I am leading at the moment.

You can see all list of the [open positions on our Workable board](https://mintos.workable.com). And feel free to contact me directly if you find something interesting in the list or would like to recommend a person you know.

Cheers!

# Webscrape with Java, NodeJs &amp; Python

**So you need to extract data from a webpage into your application? How do you do it? Simple! Its called Webscaping and here’s how it's done.**

# What Is Web Scraping? 🤷‍♂️

> **Web scraping**, **web harvesting**, or **web data extraction** is [data scraping](https://en.wikipedia.org/wiki/Data_scraping) used for [extracting data](https://en.wikipedia.org/wiki/Data_extraction) from [websites](https://en.wikipedia.org/wiki/Website).

Webscraping software may access the World Wide Web directly using the [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) or through a web browser. While web scraping can be done manually by a software user, the term typically refers to automated processes implemented using a [bot](https://en.wikipedia.org/wiki/Internet_bot) or [web crawler](https://en.wikipedia.org/wiki/Web_crawler). It is a form of copying, in which specific data is gathered and copied from the web, typically into a central local [database](https://en.wikipedia.org/wiki/Database) or spreadsheet, for later [retrieval](https://en.wikipedia.org/wiki/Data_retrieval) or [analysis](https://en.wikipedia.org/wiki/Data_analysis).

Web scraping a web page involves fetching it and extracting from it. Fetching is the downloading of a page (which a browser does when you view the page). Therefore, web crawling is the main component of web scraping, to fetch pages for later processing. Once fetched, then extraction can take place. The content of a page may be [parsed](https://en.wikipedia.org/wiki/Parsing), searched, reformatted, its data copied into a spreadsheet, and so on. Web scrapers typically take something out of a page, to make use of it for another purpose somewhere else. An example would be to find and copy names and phone numbers, or companies, and their URLs, to a list (contact scraping).

There are, however, some web scraping software that will automatically load and extract data from multiple pages of websites based on your requirements. It is either custom-built for a specific website or is one that can be configured to work with any website. With the click of a button, you can easily save the data available on the website to a file on your computer.

Many services offer web scraping like [Scrapestorm Jp](https://medium.com/u/bbe5609206b0?source=post_page-----56117ed12b62----------------------), [Grepsr](https://medium.com/u/3b0f669c90bc?source=post_page-----56117ed12b62----------------------), and [ScrapingHub](https://medium.com/u/4d3a276154a2?source=post_page-----56117ed12b62----------------------). But today, I will be discussing how to build your own web scraper application using Java, NodeJs and Python.

# Java WebScraper ☕️

The best library to use for Java webscraping is [Jsoup](https://jsoup.org/).

> `**jsoup**` is a Java library for working with real-world HTML. It provides a very convenient API for extracting and manipulating data, using the best of DOM, CSS, and jquery-like methods.

`jsoup` implements the [WHATWG HTML5](https://whatwg.org/html) specification, and parses HTML to the same DOM as modern browsers do.
- scrape and [parse](https://jsoup.org/cookbook/input/parse-document-from-string) HTML from a URL, file, or string- [find](https://jsoup.org/cookbook/extracting-data/selector-syntax) and extract data, using DOM traversal or CSS selectors- [manipulate](https://jsoup.org/cookbook/modifying-data/set-html) the HTML elements, attributes, and text- [clean](https://jsoup.org/cookbook/cleaning-html/whitelist-sanitizer) user-submitted content against a safe white-list, to prevent XSS attacks- [output](https://jsoup.org/apidocs/org/jsoup/select/Elements.html#html--) tidy HTML
jsoup is designed to deal with all varieties of HTML found in the wild, from pristine and validating, to invalid tag-soup; jsoup will create a sensible parse tree.

Download the Jsoup JAR file from [**here**](https://jsoup.org/download) and then create a java class containing the URL that you need to scrape:

After running the java class, the webpage data should be printed out. This is the most basic way of webscraping in Java. Of course, this does not separate the data; many functions need to be placed for the application to do so. To create a more elaborate webscraping application follow [**this**](https://stackabuse.com/web-scraping-the-java-way/)**.**

# NodeJs WebScraper 🕸

By using the superb tutorial [**here**](https://pusher.com/tutorials/web-scraper-node)**, **we create a new `scraper` directory for this tutorial and initialize it with a `package.json` file by running `npm init -y` from the project root. Then run this command to install all the dependencies needed:

Here’s what each one does:
- [**Axios**](https://github.com/axios/axios): Promise-based HTTP client for Node.js and the browser- [**Cheerio**](https://cheerio.js.org/): jQuery implementation for Node.js. Cheerio makes it easy to select, edit, and view DOM elements.- [**Puppeteer**](https://github.com/GoogleChrome/puppeteer): A Node.js library for controlling Google Chrome or Chromium.
When the installation is complete, create a new `pl-scraper.js` file in the root of your project directory and populate it with the following code:

If you run the code with `**node** pl-scraper.js`, a long string of HTML will be printed to the console.

And that’s it, you just retrieved all the data from a webpage using a NodeJs webscraper. But how can you parse the HTML for the exact data you need? Continue following [Pusher](https://medium.com/u/2b9d77ff34df?source=post_page-----56117ed12b62----------------------)’s tutorial [**here**](https://pusher.com/tutorials/web-scraper-node).

# Python Webscraper 🐍

With reference to Python Docs found [**here**](https://docs.python.org/3/)**, **we start off by downloading [lxml](http://lxml.de/) that is a pretty extensive library written for parsing XML and HTML documents very quickly, even handling messed up tags in the process. We will also be using the [Requests](http://docs.python-requests.org/en/latest/) module instead of the already built-in urllib2 module due to improvements in speed and readability. You can easily install both using `**pip** **install** lxml` and `**pip** **install** requests`.

Let’s start with the imports:

Next, we will use `requests.get` to retrieve the web page with our data, parse it using the `html` module, and save the results in `tree`:

(We need to use `page.content` rather than `page.text` because `html.fromstring` implicitly expects `bytes` as input.)

`tree` now contains the whole HTML file in a nice tree structure which we can go over two different ways: XPath and CSSSelect. In this example, we will focus on the former.

XPath is a way of locating information in structured documents such as HTML or XML documents. A good introduction to XPath is on W3Schools. There are also various tools for obtaining the XPath of elements such as FireBug for Firefox or the Chrome Inspector. If you’re using Chrome, you can right-click an element, choose ‘Inspect element’, highlight the code, right-click again, and choose ‘Copy XPath’.

After a quick analysis, we see that in our page the data is contained in two elements — one is a div with title ‘buyer-name’ and the other is a span with class ‘item-price’:

Knowing this we can create the correct XPath query and use the lxml `xpath` function like this:

Let’s see what we got exactly:

Congratulations! We have successfully scraped all the data we wanted from a web page using lxml and Requests. We have it stored in memory as two lists. Now we can do all sorts of cool stuff with it: we can analyze it using Python, or we can save it to a file and share it with the world.

# Caution ⚠️

So is it legal or illegal? Web scraping and crawling aren’t illegal by themselves. After all, you could scrape or crawl your own website, without a hitch…

In 2016, the US Congress passed its first legislation specifically to target bad bots — the [Better Online Ticket Sales (BOTS) Act](https://www.congress.gov/bill/114th-congress/senate-bill/3183), which bans the use of software that circumvents security measures on ticket seller websites. Automated ticket scalping bots use several techniques to do their dirty work including web scraping that incorporates advanced business logic to identify scalping opportunities, input purchase details into shopping carts, and even resell inventory on secondary markets.

In other words, if you’re a venue, organization or ticketing software platform, it is still on you to defend against this fraudulent activity during your major on sales. But of course, this depends on where in the world you are:

The UK however, seems to have followed the US with its [Digital Economy Act 2017](https://www.gov.uk/government/news/a-better-deal-for-consumers-in-the-digital-age) which achieved Royal Assent in April. The Act seeks to protect consumers in a number of ways in an increasingly digital society, including by “cracking down on ticket touts by making it a criminal offence for those that misuse bot technology to sweep up tickets and sell them at inflated prices in the secondary market.”

You can read more about this [**here**](https://resources.distilnetworks.com/all-blog-posts/is-web-scraping-illegal-depends-on-what-the-meaning-of-the-word-is-is)**.**

To put that into perspective, companies themselves have the responsibility of protecting their own data from web scrapers as they have to invoke the law themselves. So before you go off and try to web scrape from a .gov webpage with your python program, think again!

# Use Cases 〽️

[Businesses](https://www.quora.com/What-are-examples-of-how-real-businesses-use-web-scraping-Are-there-any-types-of-businesses-which-use-this-more-than-others) use web scraping for different purposes and it varies on a case to case basis.

In **eCommerce**, Retailers/ marketplaces use web scraping to monitor their competitor prices and to improve their product attributes. Also, collect product reviews to do sentimental analysis. **Lawyers** use web scraping to see the past judgment report for their case reference. **Lead generation** companies use it to scrape the email address and phone numbers. **Recruiters** use it to collects user's profiles. Some **travel companies** collect data in real-time to provide live tracking details. **Media companies** collect trending topics and use hashtags to collect information from social media profiles. **Business directories** scrape complete information about the business profile, address, email, phone, products/services, working hours, Geocodes, etc.<br>Each business has competition in the present world, So companies scrape their competitor information regularly to monitor the movements. **Government** secret agencies also scrape for national securities purpose.

It's safe to say that webscaping is a big field, and you have just finished a brief tour of that field, using Java, NodeJs, and Python as your guide. You have also learned that it is illegal to scrape some sites, and you should check their terms and conditions before scraping. So do your webscraping wisely!

# References 📖

## Web Scraping Explained

### Web Scraping (also termed Screen Scraping, Web Data Extraction, Web Harvesting, etc.) is a technique employed to extract…

#### www.webharvy.com

Still worried about implementing applications, API’s or backends? Oracle is here to help, with industry-standard cloud applications, their team of experts will make implementation more than enjoyable.

## ☁️ Follow to get a [free 30-day trial with Oracle Cloud services](http://bit.ly/2HzFQJE) ☁️

**Thank you for taking the time to read my article, if you’re looking for more posts like this, you can find me on **[**Linkedin**](https://www.linkedin.com/in/andrei-elekes/)**, **[**Twitter**](https://twitter.com/ElekesAndrei)**, or **[**Medium**](/@aele54)**.**

# How to web scrape with Puppeteer in Google Cloud Functions

> In this article, I will use **Javascript** (**Node.js**) for the code, **Yarn** as a package manager for Node, and **apt-get** for OS dependencies.

When you need data from a source that doesn’t provide an API, you have to do web scraping. That’s why you can consider using Puppeteer combined with Google Cloud Functions. Puppeteer is a library that uses Chromium to automate browser interactions. However, this is a time-consuming process, heavy for CPU and memory. So in order to keep your app light, you may want to execute this code into a cloud environment like Google Cloud Functions (the equivalent of AWS Lambda).

# Basic configuration

Let’s start by initializing a node project:

Then, `cd` to your new project and install Puppeteer:

This will download the most recent stable version of Chromium on your machine, about ~200MB depending on your OS.

In order to test and deploy your functions, you will need to install the Google Cloud SDK and the Google Cloud Functions Emulator. To get the SDK, run the following command (on **Ubuntu**):

This SDK will allow you to deploy your functions. But before that, you will need to test them locally with the functions emulator:

The `--ignore-engines` option will very likely be required. Currently, the Google Cloud Functions Emulator is fully compatible with Node 6. If your Node version is higher than that, the dependency won’t work unless you choose to ignore it with this option.

So basically, your project only needs two files:
- `index.js` for your Javascript code- `package.json` for the Puppeteer dependency and your scripts
Here, `package.json` contains the basic scripts to test your function locally and deploy it:

This file contains the main dependency of this project, `puppeteer`, and two scripts to test and deploy your function. Both scripts rely on `scrapingExample`, the name used in the example below with `exports.scrapingExample`.
- The `deploy` script is used to put your function on a remote cloud environment. `--trigger-http` associates an HTTP verb (by default POST) to our function. `--runtime` is the runtime used here (others are available like Node 6, Go and Python). The complete list of options is available [here](https://cloud.google.com/sdk/gcloud/reference/functions/deploy).- The `start` script launches the functions emulator and locally deploys the function with the same `--trigger-http` flag described above.
The following code is a basic configuration for `index.js`:

There is a lot of boilerplate here: the only important lines are lines 38-41! However, we’ll go through the rest of the code to understand what happens.

First, we import `puppeteer` and declare its options:
- `headless` is one of the most important options. When you test your function locally, put it to `false` to see what happens in your browser. Every action of your script will be visible. Nevertheless,** you must put it to **`**true**`** before deploying it to Google Cloud Functions**. Otherwise, the execution will crash because the service cannot execute the GUI of Chromium.- `args` contains a list of useful options. Some of them are pretty explicit like `--disable-gpu` or `--timeout=30000` and some others like`--no-sandbox` are here to prevent crashes in some environments. The complete list of arguments can be found [here](https://peter.sh/experiments/chromium-command-line-switches/).
Then finally comes the code, split into 3 functions:
- `openConnection` initializes all the necessary objects to browse with Puppeteer. It also sets a few parameters like the user agent and the viewport, necessary for some websites.- `closeConnection` destroys the objects initialized before and must be called at the end of every execution, regardless of the results of the execution. I’ll explain why in the **Tips and tricks **section.- `scrapingExample` is the main function, which is going to be called by the functions emulator and deployed in Google Cloud. The `exports.` before the function name makes it available for Google Cloud Functions. In order to keep this example simple, it only does a simple thing: go to the Medium homepage, get its first article title, and return it.
# Interactions with Google Cloud Storage

At some point, you may need to have persistent data. To do that, you cannot use the execution environment of your Google Cloud Function. A storage in fact exists, but it is temporary and very limited. To store a large number of files, you can use a cloud storage service like Google Cloud Storage or AWS S3. Just know that with the Google Cloud’s Free Plan, **you cannot send data to another IP, so in this case, forget about Amazon S3, and go for Google Cloud Storage.**

There are several ways to upload files to a cloud storage. The most elegant one (not always possible), is to download your file (through **axios** for example), and pipe it to your remote bucket. This way, you never store anything in your Cloud Function environment, and avoid a lot of potential problems, like available storage or file naming. You can see an example of this method [here](https://stackoverflow.com/questions/44945376/how-to-upload-an-in-memory-file-data-to-google-cloud-storage-using-nodejs?rq=1).

But sometimes, piping directly is not possible so you need to store your files in a temporary directory before uploading them. There is a simple way to initialize and use Google Cloud Storage with Puppeteer:

Here, we do several things:
1. We import Puppeteer and Google Cloud Storage.1. We initialize our bucket and Puppeteer.1. We allow Puppeteer to download files and we define the storage location. In the context of a Google Cloud Function, you would only be able to write in the `/tmp/` directory.1. We scrape our file: Puppeteer goes to the page, clicks the link (which will download the file to `/tmp/`) and upload it to Google Cloud Storage.
# Handling bad website design

As a programmer, it’s a common thing to say it’s someone else’s fault. And when you do web scraping… this may be true! In fact, a website can be very poorly designed at several levels, making it difficult to scrape.

One problem you may encounter is related to page loading. Puppeteer provides several functions to wait for events. For example, if you need to navigate to a page and get an element from it, you can use the following function: `await page.waitForNavigation({ waitUntil: 'load' })`. However, bad website design can make this instruction crash if you try to get an unexisting HTML element on the new page. Some websites trigger the `load` event when the new page is loaded, but it only contains a loader element. You have to be careful, and it’s sometimes preferable to use `await page.waitForSelector('.mySelector')`. The good thing about these two functions is that they have an optional `timeout` argument. This can be useful on websites with a long loading time: the default timeout is 500ms.

You also need to be careful with navigation links. Sometimes the information you want to scrape won’t be on a page directly accessible by URL. Some websites load data as you navigate, and you may need to reproduce a full “human” browsing to get the information you need.

Finally, be very precise with your CSS selectors! Some websites use the same id on several elements. This can make you select the wrong element in your code. When possible, use the `&gt;` selector (or other selectors) to prevent any ambiguity.

# Tips and tricks

## Memory management

Your Google Cloud Function can run out of memory if you are not careful. Puppeteer launches Chromium, and you need to instantiate big objects (like `browser` or `page`) to use it. In the example above titled **Basic configuration**, you can see that `closeConnection` is called in the `finally` block. This is to destroy the objects and clean up the memory as you exit the function. In many Puppeteer examples, you don’t destroy anything in case of error. After several executions, your environment memory can then become full, and the first instruction `puppeteer.launch(PUPPETEER_OPTIONS)` will crash.

## Debugging

In the Google Cloud Management Console, you have access to logs that give you information about the remote execution of your functions. But for your local logs, you can use:

To clear them, just execute (`sudo` may be required here):

## DOM interactions

In order to get information on DOM elements, you can use the Puppeteer function `page.evaluate()`. Inside its callback, you have access to DOM elements (through CSS selectors for example), but the rest of your code is not accessible. As a second argument after the callback, you can pass it a serializable object. This means that **a function defined outside **`**evaluate()**`** cannot be used inside of it.**

Another problem with `page.evaluate()` is that it’s hard to debug. In fact, if you try to use `console.log` inside of it, you won’t see anything in your local logs. To solve this issue, add the following instruction just after you initialize the `page` object:

## Using headless

When you test your function locally, you almost always put the `headless` option to `false` to see what happens in your browser. But when you deploy your function, you want the `headless` option to be set to `true` (otherwise it won’t work). So here is the perfect place to use an environment variable as the value of `headless`.

## Optimization

Finally, a very easy way to reduce the execution time of your cloud function is to parallelize text inputs in forms. If you have forms to fill, instead of doing several `await page.type('.selector', fieldValue)`, parallelize them in a `Promise.all`. Of course, the submitting of the form must be done outside of this `Promise.all` to have valid field values.

# Sources
- [Puppeteer documentation](https://pptr.dev/)- [Google Cloud SDK documentation](https://cloud.google.com/sdk/docs/)- [Google Cloud Functions Quickstart](https://cloud.google.com/functions/docs/quickstart)- [Github Puppeteer issues](https://github.com/GoogleChrome/puppeteer/issues): sometimes better than the documentation!- [A list of 30 useful CSS selectors](https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048), good to have precise DOM selectors- [Yarn documentation](https://yarnpkg.com/en/docs/install)- [Node documentation](https://nodejs.org/dist/latest-v11.x/docs/api/)- Two other great articles about the Puppeteer and Google Cloud Functions : [here](https://rominirani.com/using-puppeteer-in-google-cloud-functions-809a14856e14) and [here](/@ebidel/puppeteering-in-firebase-google-cloud-functions-76145c7662bd)- [My personal gist](https://gist.github.com/Alezco), containing the code examples of this article
I hope you found this article useful! Feel free to give me your feedback and ask any questions :)

# How to get the next page on Beautiful Soup

It is easy to scrape a simple page, but how do we get the next page on Beautiful Soup? What can we do to crawl all the pages until we reach the end?

Today, we are going to learn how to fetch all the items while Web Scraping by reaching to the next pages.

# Getting Started

As the topic of this post is what to do to crawl next pages, instead of coding a Beautiful Soup script again, we are going to take the one we did previously.

If you are a beginner, please, do the ‘[Your first Web Scraping script with Python and Beautiful Soup](https://letslearnabout.net/python/beautiful-soup/your-first-web-scraping-script-with-python-beautiful-soup/)‘ tutorial first.

If you know how to use Beautiful Soup, use this starting code in [repl.it.](https://repl.it/@DavidMM1707/Best-CD-Price)

This code fetches us the albums from the band the user asks for. All of them? No, just the first 10 ones that are displayed on the first page. By now.

Open a new repl.it file or copy-paste the code in your code editor: Now it’s time to code!

# Refactoring — Getting rid of the clutter

Before adding features, we need to clean the clutter by refactoring.

We are going to take blocks of code and placing them in their own functions, then calling that functions where the code was.

Go to the end of the code and take the lines where we create the table:

Cut them and create a function, for example, export_table_and_print, and put it after base_url and search_url:

We also added a ‘clean_band_name’ so the filename where we store the data doesn’t have empty spaces and it is all lowercase, so “ThE BeAtLES” search stores a ‘the_beatles_albums.csv’ file.

Now, where the old code was, call the function, just at the end of the file:

The first part is done. Run the code and check it is still working.

Go to the ‘for loop’ at around line 45. Take everything that involves in extracting values and adding them to ‘data’ (so, the whole code) and replace it with the ‘get_cd_attributes(cd)’.

After the last function, create that function and paste the code:

Again, run the code and check it is still working. If it is not, compare your code with mine:

t is working? Cool. Time to get ALL the albums!

# Recursive function — The trick to get the next page

Ok, here’s the trick to get the job done: Recursiveness.

We are going to create a “parse_page’ function. That function will fetch the 10 albums the page will have.

After the function it is done, it is going to call itself again, with the next page, to parse it, over and over again until we have everything.

Let me simplify it for you:

I hope it is clear: As we keep having a ‘next page’ to parse, we are going to call the same function again and again to fetch all the data. When there is no more, we stop. As simple as that.

## Step 1: Create the function

Grab this code, create another function called ‘parse_page(url)’ and call that function at the last line.

The data object is going to be used in different places, take it out and put it after the search_url.

We took the main code and created a parse_page function, called it using the ‘search_url’ as parameter and took the ‘data’ object out so we can use it globally.

In case you are dizzy, here’s what your code should look like now:

Please check this line:

Now we are not fetching the ‘search_url’ (the first one) but the URL that we pass as an argument. This is very important.

## Step 2: Add recursion

Run the code again. It should fetch the 10 first albums as always.

That’s why because we haven’t used recursion. Let’s write the code that will:
- Get all the pagination links- From all the links, grab the last one- Check if the last one has a ‘Next’ text- If it has it, get the relative (partial) url- Build the next page url by adding base_url and the relative_url- Call parse_page again with the next page url- If doesn’t has the ‘Next’ text, just export the table and print it
Once we have fetched all the cd attributes (that’s it, after the ‘for cd in list_all_cd’ loop), add this line:

We are getting all the ‘list item’ (or ‘li’) elements inside the ‘unordered list’ with the ‘SearchBreadcrumbs’ class. That’s the pagination list.

Then, we go to the last one and get the text. Add this after the last code:

Now we check if ‘next_page_text’ has ‘Next’ as text. If it does, we take the partial url, we add it to the base to build the next_page_url. If it does not, there is no more pages, so we can create the file and print it.

That’s all we need. Run the code, and now you are getting dozens, if not hundreds of items!

## Step 3: Fixing a small bug

But we can still improve the code. Add this 4 lines after parsing the page with Beautiful Soup:

Sometimes there is a ‘Next’ page when the numbers of albums are multiple of 10 (10, 20, 30, 40 and so on) but there is no album there. That makes the code to end without creating the file.

With this code, it is fixed.

Your coding is done! Congratulations!

# Conclusion

Let me summarize what we have done:
- We moved blocks of code with the same functionality to functions- We put the scraping code inside a function and we call it passing the initial search_url- Inside the function, we scrap the code- After it is done, we check for the next URL- If there is a ‘next url‘, we call the function with the next page URL- If not, we end the scraping and create the .csv file
Now it seems simpler, right?

I want to keep doing tutorials like this one, but I want to ask you what do you want to see:
- Do you want more Web Scraping with Beautiful Soup or Scrapy?- Do you want me to teach how to make a Flask web app or a Django one?- Or do you want to learn more Front-End things like Vue.js?
Please, leave me a comment with what do you want to see in future posts.

And if this tutorial has been useful to you, share it with your friends, on Twitter, Facebook or where you can help others.

[Final code on Repl.it](https://repl.it/@DavidMM1707/Best-CD-Price-Next-Page)

[Reach to me on Twitter](https://twitter.com/DavidMM1707)

[My Youtube tutorial videos](https://www.youtube.com/channel/UC9OLm6YFRzr4yjlw4xNWYvg?sub_confirmation=1)

[My Github](https://github.com/david1707)

Contact me: DavidMM1707@gmail.com

Keep reading [more tutorials](https://letslearnabout.net/category/tutorial/)

# How to do web scraping with Cheerio

This past weekend (13 August 2017) I started on a quest to get some data from a cinema website here in Accra, Ghana. I thought this would have been easy, since the data is available publicly. I immediately opened the Chrome web inspector to see some markup like I have not seen in years.

# The Problem

There was no structure to this data, the listings were just a bunch of `&lt;p&gt;` tags with some nested `&lt;span&gt;` and `&lt;br&gt;` tags inside. This to me was a sign of a no go, I even went on to state that there was no way of getting this data in the [DevCongress](http://slack.devcongress.org/) (you might be wondering what DevCongress is, more to come soon) slack group, along with a solution I wasn’t too sure would work.

# The Old Solution

After a few minutes of thinking it through, I realised there was a pattern even in the `&lt;p&gt;` tags, when I did a count I noticed that each movie has around **12** nodes of `&lt;p&gt;` which contained the data I would need for the movie. So now I could do a loop over the `&lt;p&gt;` tags and count down from **12**, then reset the counter once we hit **0**.

# The Actual Solution

Just when I finished writing this post, the data I was scraping changed and broke my solution, so I had to go back to the drawing board and come up with a new solution, which I think in turn has worked out to be a better and more robust solution.

Instead of counting the `&lt;p&gt;` tags, I have decided to use the `&lt;hr&gt;` tags on the page as the breaking point between each movie, I have also decided to not use the method I was before by counting down from **12** to get the movie information. I have instead opted for checking the actual string I am looping over to test if it contains a certain word where possible. In other places I am using some crazy thinking to get the information I need.

Its now a bit clearer to me as to how to approach the problem, I then decided its time to start writing some code, I was thinking of doing this in Python as I had used [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) in the past to do this sort of thing, but lately I have been doing more work in JavaScript and Node. So I did a quick search and I found [this article](https://hackernoon.com/cheerio-node-nodejs-tutorial-web-html-scraping-note-a4ceb37d9cbb) using [Cheerio](https://cheerio.js.org/) and the Request library, I quickly started writing some code and couldn’t believe how easy the API was to use.

# Getting started with the necessary tooling

Lets start by installing the libraries we will need, also note I am using Node 8, so will be using new features of JavaScript where I see fit.

# Requirements

For this tutorial you will need the following libraries. At the time of writing these are the versions I used.
- Cheerio (1.0.0-rc.2)- Request (2.81.0)
Now lets start requiring the libraries we need in order to get some data from the webpage.

You will notice I am also requiring the `fs` library, we are doing this so that later on we don’t hit the API more times than necessary, we can cache the data and easily read from cache and do our scraping from that data.

Now lets define a few variables to store the URL of the website we want to scrape and the name of the cache files.

# Lets Go!

We can now start defining our data structure that we want to deliver to our end user.

Here we have defined the properties our output data will conform to, so in the `movieListings` structure, we are currently only storing the **address** of the cinema and a list of **movies**. While in the `newMovieObj` we are storing all the attributes of the movie that we need.

Lets start writing our code to make a request to get the `apiUrl` and then cache it to the file system using the `fs` library. We will start off by wrapping the function so we can reuse it later on.

Lets look at some of this code, we start off by defining our function called `requestPage`, which requires two parameters, one for the `url` we are making the request to and another for the `cachePath` we wish to save the response data to. We know what we are requesting is html so we will save it as html as defined in the `cacheFile` variable we set earlier. We call the `request` library with the `url` and a callback function with the parameters of `err, response, html`, with these we can determine the state of the request we’ve made. If there is an error, we just log it to the console for now, otherwise we can move on to starting to write to the filesystem. We now have some data, so lets move on to writing it to the filesystem for now with `fs.writeFile`, in this we will also check for error and log them to the console again.

Now that we have our function to request and write data to the filesystem, lets move on to reading the cache file we saved.

We start by checking if the `cacheFile` exists, if it doesn’t we send a request and create one, otherwise we just read it using the `fs.readFile` function.

Inside our `fs.readFile` callback, lets start loading up the data (which we know is an html page) into cheerio so we can crawl the DOM (Document Object Model) and select the data we need.

Lets take a look at this line by line.

You might be wondering why are we assigning a `$` variable to the loading of the DOM data, we are using the `$` for no specific reason, except that its what jQuery uses and it became universal amongst most developers to represent the DOM.

We assign the `numLines` variable to **10**, because this is what we will use to figure out where our movie title is. So each time the `numLines` is reduced to **10** we know its the node of a movie title.

The `movie` variable is assigned to a new copy of the `newMovieObj` to get all the properties in that object.

This `synopsisNext` variable is to make sure that we know when the synopsis information is coming up, since the actual information and the title word **SYNOPSIS** are stored in different `&lt;p&gt;` tags.

The code above is plenty, but lets break it down as to what each part is doing.

We will start off on line 1 which loops through all the `p` tags inside of a `div` with the **id** of `content`.

On line 2 and 3 we are assigning the text of each `p` tag into a variable called `text` and a variable called `html`.

From line 4 we are then checking if the current `p` tag is situated in the first 3, as we have figured this is where the address for the cinema is located. We then append that text to the `address` property of the `movieListings` object. At this point we do some cleanup on the text with the `replace` string method.

Next we can see that the actual movie listings start from line 9 onwards, this is because we know that after 12 `p` tags we have the movie listings starting.

On line 10 to 16, we check if `html` is empty and reset `numLines` to 11, you might be wondering why 11 instead of 10, this is because we have to offset by 1 in order to get any subsequent title after the first time, now we add the current `movie` to the `movieListings.movies`. We then move on to creating a new `movie` object to make sure that our next loop is not updating an existing movie reference.

On line 19 to 56, we use multiple `if` statements to decide which piece of movie information we are currently accessing. Here you will notice we are using different methods to check the data against. When we find the information we need, we are doing some manipulation and cleanup in order to create a format we are happy with. In this particular area we created a helper function to get the showtimes, by check a string to see if it contains any of the days in the week. That helper function is the `checkDaysOfWeek` function, which looks like the below.

The rest of the code below is just working out how best to find a particular piece of movie information.

Once we hit line 57, we reduce by 1 the `numLines` left.

You can view the full source code and working copy on [Glitch](https://glitch.com/edit/#!/sunrise-alloy).

And this is how I went about scraping the movie data I needed from the cinema website. In the code there are a lot of places that can be refactored and simplified. I might write another post on refactoring the current codebase.

Thanks to [Wendy Smith](https://twitter.com/micheallshair), [Edmond Mensah](https://twitter.com/Eddy_mens), [Emmanuel Lartey](https://twitter.com/elartey) and [David Oddoye](https://twitter.com/theRealBraZee) for reviewing this post and giving feedback to improve it. If you need Front-end/NodeJS/PHP development done, please visit [https://www.donielsmith.com](https://www.donielsmith.com/) and check out some of my work. Feel free to get in-touch with me on Twitter [@silentworks](https://twitter.com/silentworks) with questions.

**Originally published at **[**www.donielsmith.com**](https://www.donielsmith.com/blog/2017/08/29/how-to-do-web-scraping-with-cheerio/)** on August 29, 2017.**

# Scalable do-it-yourself scraping — How to build and run scrapers on a large scale

Businesses that don’t rely on data have a very low chance of success in a data driven world.

One of the best sources of data is the data available publicly online on various websites and to get this data you have to employ the technique called Web Scraping or Data Scraping.

You can use full service professionals such [ScrapeHero ](http://scrapehero.com/)to do all this for you or if you feel brave enough, you can tackle this yourself.

The purpose of this article is to walk you through some of the things you need to do and the issues you need to be cognizant of when you do decide to do it yourself.

When you decide to do this yourself, you will most likely be hiring a few developers who know how to build scrapers and setting up some servers and related infrastructure to run these scrapers without interruption, and integrating the data you extract into your business process.

Building and maintaining a large number of web scrapers is a very complex process so proceed with caution.

Here are the high level steps involved in this process and we will go through each of these in detail in this article.
1. Build Scrapers1. Run the Scrapers1. Store the data1. IP Rotation, Proxies and Blacklisting1. Quality Checks on Data1. Maintenance
# Build Scrapers and Set up the servers

The first thing to do is build the scrapers.

It may be best to choose an open-source framework for building your scrapers, like Scrapy or PySpider. These are excellent frameworks with a large community of developers. Both these frameworks are based on Python. You won’t run into the risk of your developer(s) disappearing in a day, and no one to maintain your scrapers because Python is popular and the community is really supportive.

There is also a massive difference between writing and running one scraper that scrapes 100 pages to a large scale distributed scraping infrastructure that can scrape thousands of websites and millions of pages a day.

If you are scraping a large number of big websites, you might need lot of servers to get the data in a reasonable time frame. We would suggest using Scrapy Redis or Run PySpider in scaled mode, across multiple servers.

Once you have chosen a framework, hire some good developers to build these scrapers, and set up the servers required to run them and to store the data.

# Run Scrapers

If you need the data to be refreshed periodically, you’ll either have to **run it manually or automate** it using some tool or process.

If you are using Scrapy,scrapyd + cron can schedule the spiders for you, and it will update the data the way you need it. PySpider also has a UI to do that

# Store your data

Once you have this massive data trove, you need a place to store it. We would suggest using a NoSQL database like MongoDB, Cassandra or HBase to store this data, depending upon the frequency and speed of scraping.

You can then extract this data from this database/datastore and integrate it with your business process. But before you do that, you should setup some Quality Assurance tests for your data (more on that later)

# IP Rotation, Proxies and Blacklisting

Large scale scraping comes with a multitude of problems and one of the big ones is anti-scraping measures by the websites that you are trying to scrape.

If any of the target websites has any kind of **IP based blocking** involved, your servers’ IP address will be black listed in no time and the site won’t respond to requests from your servers. You’ll be left with very few options after getting blacklisted.

So, how do you bypass that? You’ll have to get some **Proxies or Rotating IP solutions** to use these for making requests from the scraper.

[Here are few tips to prevent getting blacklisted](http://learn.scrapehero.com/how-to-prevent-getting-blacklisted-while-scraping/)

# Quality Assurance

The data you scrape is only as good as its quality. To ensure the data that you scraped in accurate and complete, you need to run a variety of QA tests on it right after it is scraped.

Having a set of **Tests **for the integrity of the data is essential. Some of it can be automated by using Regular Expressions, to check if the data follows a predefined pattern and if it doesn’t then generate some alerts so that it can be manually inspected.

# Maintenance

## Scrapers

**Every website will change** their structure now and then, and so should your scrapers. Scrapers usually need adjustments every few weeks, as a minor change in the target website affecting the fields you scrape might either give you incomplete data or even crash the scraper, depending on the logic of the scraper.

You have to be smart and detect this change and fix it before this ruins the data you are collecting.

## Database &amp; Servers

Depending upon the size of data, you will have to clean up your database of outdated data to save space and money. You might also have to scale up your systems if you still need the old data. Sharding and Replication of databases can be of help.

Server logs should also be cleaned periodically.

# Know when to ask for help

This whole process is expensive and time consuming and you need to be ready to take on this challenge.

You also need to know when to stop and ask for help. [ScrapeHero ](http://scrapehero.com/)has been doing all this and more for many years now, so let us know if you need any help.

# Related

**Originally published at **[**learn.scrapehero.com**](http://learn.scrapehero.com/scalable-do-it-yourself-scraping-how-to-build-and-run-scrapers-on-a-large-scale/)** on December 1, 2015.**

# How to do web scraping with python

Hey, [web scraping](http://bit.ly/Web-scraping) is easy with python 3.7 —the way I was doing it before this tutorial was overly complex and extremely inefficient.

> I wrote this blog in July/2018, when I was still learning how to program in Python. This particular version is not as complete or easy as my future version on web scraping.It was not my best blog but it does show a quick way to do some web scraping basics, like grabbing numbers off a website. However, I reblogged this topic in a more straight forward example.Please — if you’re interested in [learning web scraping with python](/@itylergarrett.tag/learning-web-scraping-with-python-requests-beautifulsoup-936e6445312), check out the blog I released on Dec.25,2018!

## Learning Web Scraping with Python, Requests, &amp; BeautifulSoup

### Did you know learning web scraping w/ Python, Requests, and Beautiful Soup is easy...

#### medium.com

I was trying to make an a drag and drop ETL handle web scraping but it isn’t designed for parsing HTML.

Meet Python, lxml, requests, beautifulsoup4, etc… throw away the paid for services, throw away third party vendors, start web scraping on your own, on your computer, now!

Share this with your friends: [http://tinyurl.com/yaupbwv8](http://tinyurl.com/yaupbwv8)

# Web scraping is easy in Python….

Web scrapping is easy in python but you need to ramp up. It won’t take long, and let me know if you get stuck, I sure as hell did a lot.

So above, Python, lxml, requests, etc… Speaking gibberish, well I explain everything in tutorials/blogs, without a single funnel or recommendation to buy anything! You’re welcome.

# Using Pip to install Requests and lxml on python 3.7 — MAC OS

Found a blog about web [scraping](http://docs.python-guide.org/en/latest/scenarios/scrape/) and it had a little bit of python, not much explanation, per the usual programmer blog, a bunch of short hand written stuff as if we speak this language… Hours of troubleshooting, digging through SEO’ed websites, and finally…. I think we have some cool content. Btw, the blog mentioned about scraping — it also has a bit of an incomplete tutorial surrounding this process/method. I will continue to clean this up, and maybe reblog it on my website at [tylergarret.com](http://tylergarrett.com).

Python is extremely efficient at handling web parsing, I’m blown away. I was trying to do this in softwares and it was a massive work-around/waste of time… This is exciting, but what is it.

Did you miss that? In 6 lines of code, we are getting prices…

And boom prices… from a website…

One more line of code, and boom, buyers + prices… Now we are looking at prices online, instantly, loop this and you have price analysis… Push into a database, you have prices over time… Here we go…

Python… What is it though?

# Setting up pip to install requests and lxml

Below I’m going to show you how to setup your requests and lxml on python 3.7 on mac os. [Trying to learn python from scratch](/@tyler_48883/trying-to-learn-python-from-scratch-6ab60bf08907) is a lot of fun, appears to be a bit of a ramp up, **but that’s why I’m blogging about it every day**.

It’s easy, fun, and user friendly, don’t be discouraged trying to figure out how to get it working, keep it up, maybe give [pycharm](https://www.jetbrains.com/pycharm/download/) a visit too.

## Installing python is important for any data related guru.

[Learning how to install python](/@tyler_48883/how-to-install-python-blogged-by-a-technical-non-developer-38e90347bc89) seems to be critical for the future of my career, I’m tired of spending countless hours making a software do what code has done for decades… Time to grow a pair. I don’t know if homebrew helped me but I wrote about [how to setup homebrew for python](/@tyler_48883/my-miserable-path-to-python-expertise-continues-on-the-macbook-homebrew-for-dumbies-f414768c1dbf) too.

A quick video on setting up pip on your mac. And I cover [how to setup pip on your windows 10](/@itylergarrett.tag/setting-up-python-3-7-on-windows-10-a-non-developer-tutorial-e836639ca16) too. Be sure to catch up, and install python, etc… Let me know if you get stuck, I’m still learning myself and want to know if I’m getting you past the point that I was stuck, trying to dig through….

## Learning how to do web scraping with python!

When I first started learning about web scraping, no one wanted to help me and I was stuck figuring out how to parse HTML with a tool 100% not designed to handle the task… So, when you hit this bridge, I hope more than anything my blog ranks half decent and you don’t waste any time trying to do web scraping with random tools, paid services, or third part vendors.

So, here we go! Web scraping is fun, you need to dig through a bunch of tabs if you ignore my blogs.

If you made it this far… You’re clearly really intelligent and enjoy learning. Please follow along below, so you don’t have to open 20 tabs and spin your mother flipping wheels off. This should be easy! It’s just a bunch of junk in google searches right now.

Follow along w/ this video to get pip working on your mac, before you begin.

Let’s start with the imports:

Well these imports will not just work out of the box. Sorry. Which throws a big loop in the ramp up, also there’s some syntax that’s incorrect [here](http://docs.python-guide.org/en/latest/scenarios/scrape/), that I will update below.

First you need to install requests. Below ensures you’re installing pip installs in python3, VS other python installs on your mac. Like 2.7, which comes with your mac, don’t uninstall or break that too… [leave it alone](https://stackoverflow.com/questions/3819449/how-to-uninstall-python-2-7-on-a-mac-os-x-10-6-4). Or reinstall everything.

Install requests with this code in your terminal, ensure pip is function on this machine by typing “pip” in your CMD/terminal.

Above code offers access to pushing a new installation. You can learn a little more about some of these pieces of code [here](https://packaging.python.org/tutorials/installing-packages/#ensure-you-can-run-pip-from-the-command-line).

Python3 has another install called lxml, make sure you install it to python3 if you want to use the 3.7 python install.

Installing lxml took me a little bit because I kept typing xmlx. Be sure you’re not installing weird stuff.

Now we want to “get” the HTML, and parse through looking for buyers and prices.

After a quick analysis, we see that in our page the data is contained in two elements — one is a div with title ‘buyer-name’ and the other is a span with class ‘item-price’:

HTML looks like this:

Knowing this we can create the correct XPath query and use the lxml `xpath` function like this:

Here’s the code to capture the values in the html.

Let’s see what we got exactly:

Boom.

Now you have your next step, time to start learning how to push this into a database!

Oh you’re still here…

DO you want to [automate building tinyurls](/@itylergarrett.tag/how-to-build-shortlinks-with-python-on-mac-ef6fec7cc1b1)? It’s super important for SEO, so head over here.

typos by [tyler garrett](http://tylergarrett.com)

## Pip install on python2 break python3? Here’s a solution to pip install version problems.

### I rushed ahead, broke shit, here’s the explanation…If you kick your python off in your CMD or terminal, you will want…

#### medium.com

## Setting up Pip on Python 3.7 in Windows 10 — A non-developer version

### Install python, or do my how to install python 3.7 windows 10. This can be accomplished using the python installer at…

#### medium.com

## {zomg} Doing basic math in Python, or jump in and do HTTPS requests — mac users. #imnotadeveloper

### Python is finally moving a bit now, I’ve been blogging about this randomly from both PC and MAC… Finally made some…

#### medium.com

## How to install python 3.7 on windows 10 PC , The non-developer version.

### Installing python on windows 10 PC is the end goal, the long term project is to learn python, to build an app that…

#### medium.com

## My miserable path to python expertise, continues, on the Macbook — Homebrew for dumbies.

### After digging around trying to understand what was the next step, everything leads me to setting up Homebrew. Thanks…

#### medium.com

## How to Install Python — Blogged by a technical non-developer.

### What’s up, let’s talk about how to install python, blogged by a technical non-developer. I can dabble in code, have…

#### medium.com

## Trying to learn python from scratch

### We can only imagine trying to learn python from scratch is not something anyone will be able to do without a nice…

#### medium.com

Cheers.

# How to scrape websites with Python and BeautifulSoup

What do you do when you can’t download a website’s information? You do it by hand? Wow, you’re brave!

I’m a web developer, so I’m way too lazy to do things manually 🙂

If you’re about to scrape data for the first time, go ahead and read [How To Scrape A Website](https://captaindata.co/blog/how-scrape-website/). You can also read a small intro about [web scraping](https://captaindata.co/web-scraping).

Today, let’s say that you need to enrich your CRM with company data.

To make it interesting for you, we will scrape [Angel List](https://angel.co/).

More specifically, we’ll scrape [Uber’s company profile](https://angel.co/uber).

> **Please scrape responsibly!**

# Getting started

Before starting to code, be sure to have **Python 3** installed, as we won’t cover it here. Chances are you already have it installed.

You also need `pip`, a package management tool for Python.

The full code and dependencies are [available here](https://github.com/captaindatatech/scraping-examples/blob/master/scripts/Angel%20List%20Company%20Info.py).

We’ll be using BeautifulSoup, a standard Python scraping library.

You could also create a [virtual environment](https://realpython.com/python-virtual-environments-a-primer/) and install all the dependencies inside the requirements.txt file:

# Inspecting Content

Open [https://angel.co/uber](https://angel.co/uber) in your web browser (I recommend using Chrome).

Right-click and open your browser’s inspector.

Hover your cursor on the description.

This example is pretty straightforward: you want the `**&lt;h2&gt;**` tag with the **js-startup_high_concept** class.

This would be the unique location of our data thanks to the `class` tags.

# Extracting Data

Let’s dive right in with a bit of code:

Let’s get into the details:
- We create a variable ****headers**** (more on this very soon)- The ****company_page**** variable is the page we’re targeting- Then we build our request. We inject the ****company_page**** and ****headers**** variable inside the **Request** object. Then we open the url with the parameterized request.- We parse the HTML response with BeautifulSoup- We look for our text content with the ****find()**** method- We print our result!
Save this as [script.py](http://script.py/) and run it in your shell, like this `python script.py`.

You should get the following:

Oh 🙁 What happened?

Well, it seems that AngelList has detected that we are a bot. Clever people!

Okay, so change the ****headers**** variable for this one:

Run the code with `python script.py`. Now it should be good:

Yeah! Our first piece of data 😀

Want to find the website? Easy:

And you get:

Ok, but how do I get the **value** of the website?

Easy. Tell the program to extract the **href**:

Make sure to use the **strip()** method, otherwise you’ll have big spaces:

I won’t cover in detail all the elements you could extract. If you’re having issues, you can always check [this amazing XPath cheatsheet](https://devhints.io/xpath).

# Save results to CSV

Pretty useless to print data, right? We should definitely save it!

The Comma-Separated Values format is really a standard for this purpose. You can import it very easily in Excel or Google Sheets.

Add the following lines:

What you get is a single line of data. Since we told the program to append every result, new lines won’t erase previous results.

# Check out the whole script

The script is [available here](https://github.com/captaindatatech/scraping-examples/blob/master/scripts/Angel%20List%20Company%20Info.py).

## captaindatatech/scraping-examples

### Various Web Scraping Examples. Checkout how to scrape Angel List Company Info in our github.

# Conclusion

It wasn’t that hard, right?

We covered a very basic example. You could also add multiple pages and parse them inside a for loop.

Remember how we got blocked by the website’s security and resolved this by adding a custom User-Agent? We wrote a small paper about [anti-scraping](https://captaindata.co/blog/anti-scraping/) techniques. It’ll help you understand how websites try to block bots.

If you feel like web scraping is too difficult for you or you’re getting blocked, you can always [contact us](https://captaindata.co/contact)!

[You can also use a more advanced version of this script on our platform](https://captaindata.co/api/angellist-company-profile/).

**Originally published at **[**captaindata.co**](https://captaindata.co/blog/how-scrape-websites-python-beautifulsoup/)** on November 8, 2018.**

# How to do Web Scraping with Ruby?

Web scraping is a popular method of automatically collecting the information from different websites. It allows you to quickly obtain the data without the necessity to browse through the numerous pages and copy and paste the data. Later, it is outputted into a CSV file with structured information. Scraping tools are also capable of actualizing the changing information.

There are numerous applications, websites, and browser plugins allowing you to parse the information quickly and efficiently. It is also possible to create your own web scraper — this is not as hard as it may seem.

In this article, you will learn more about web scraping, its types, and possible applications. We will also tell you how to scrape websites with Ruby.

# Ways of collecting the information

There are two ways to automatically collect the information: web scraping and web crawling. They are both used for extracting the content from websites, but the areas of work are different.

**Web scraping** refers to collecting the data from a particular source (website, database) or a local machine. It does not involve working with large datasets, and a simple download of the web page is considered to be a sort of data scraping.

**Web crawling** implements processing large sets of data on numerous resources. The crawler attends the main page of the website and gradually scans the entire resource. Generally, the bot is programmed to attend numerous sites of the same type (for example, internet furniture shops).

Both processes result in presenting the output of the collected information. Since the Internet is an open network, and the same content can be reposted on different resources, the output can contain lots of duplicated information. Data crawling involves processing the output and removing the duplicates. This can also be done while scraping the information, but it is not necessarily part of it.

# How web scraping works and how to choose the tool

The scraping scripts are executed according to the following algorithm: the program attends the web page and selects the necessary HTML-elements according to the settled CSS- or XPath-selectors. The necessary information is processed, and the result is saved in the document.

The web provides quite a lot of out-of-box scraping tools like online and desktop applications, browser extensions, etc. They provide different functionalities that are suitable for different needs. That is why choosing a web scraper requires a bit of market research. Let’s have a look at the key features to consider when choosing a web scraping tool.

The different scrapers process different types of information: articles, blog and forum comments, internet shop databases, tables, dropdowns, Javascript elements, etc. The result can also be presented in different formats, like XML or CSV, or be written right into a database.

The out-of-box scrapers can provide a free and commercial license. The free tools generally have fewer options for customization, less capacity, and less thorough scraping. The paid scrapers offer wider functionality and efficiency of work and are perfectly suited for professional usage.
- **Technical background for usage**
Some of the tools can be used just via the visual interface, without writing any lines of code. The other ones require a basic technical background. There are also tools for advanced computer users. The difference between them is in the customization options.

It is also possible to develop a custom web scraper from scratch. The application can be written on any of the existing programming languages, including Ruby. The custom Ruby parser will have all the necessary functionality and the output information will be pre-processed exactly the way you need it.

Having considered the existing types of web scraping tools, let’s see how to choose a scraper according to your needs:
- A **free out-of-box tool** will be sufficient for processing small amounts of information for personal use.- A scraper with a **paid license** is necessary for users collecting large, yet similar sets for information for business and scientific needs (e.g. collecting financial statistics).- A **customized tool **for scraping the web with Ruby is suitable for users who need a fully customized tool for professional scraping tasks on a regular basis.
# The application of web scraping

Data scraping and crawling are used for processing sets of unstructured information and logically presenting them as a database or a spreadsheet. The output is valuable information for analysts and researchers, and it can be applied in many different areas.

The Ruby web crawler can collect the information from different resources, and output the dynamics of market changes (such as changes of currency rates, prices for securities, oil, gold, estate, etc). The output can then be used for predictive analytics and training of artificial intelligence.
- **Collecting product characteristics and prices**
Web scraping is widely used by aggregators — they collect the information about the goods in different internet shops, and later present it on their websites. This gives the users the opportunity to compare the prices and characteristics of the necessary item on different platforms without having to browse through numerous sites.
- **Collecting contact details**
Web scraping can be useful for establishing both B2B and B2C relationships. With the help of scraping tools, companies can create lists of suppliers, partners, etc., and collect the databases of existing and potential clients. In other words, web scraping can help to obtain the lists of any individuals of interests.
- **Collecting job opportunities**
Recruitment companies can extract the contact details of potential applicants for different vacancies, and vice versa — the information about job opportunities in different companies can be collected as well. This output is a good base not only for finding the necessary specialists and jobs, but also for market analysis, creating statistics about the demand and requirements for the different specialists, their salary rates, etc.
- **Collecting information on a topic**
With the help of scraping, you can download all the necessary information in bulk and then use it offline. For example, it is possible to extract all the questions and answers on a particular topic from Quora or any other service for questions and answers. You can also collect blog posts or the results of internet searches.
- **Conducting market research**
Data scraping can be applied by marketing specialists for conducting research on a target audience, collecting the email base for newsletters, etc. It helps to monitor competitors’ activities and track if they are changing their catalogs. SEO specialists can also scrape the web pages of competitors in order to analyze the semantics of the website.

# How to do web scraping using Ruby

Having considered the variety of web scraping tools and the possible ways to apply the scraped data, now let’s talk about creating your own custom tool. We are going to present you with a brief guide covering the basic stages of web scraping in Ruby.

# Useful tools

This language provides a wide range of ready-made tools for performing typical operations. They allow developers to use official and reliable solutions instead of reinventing the wheel. For Ruby web scraping, you will need to install the following gems on your computer:
- [NokoGiri](https://rubygems.org/gems/nokogiri/versions/1.6.6.2) is an HTML, SAX and RSS parser providing access to the elements based on XPath and CSS3-selectors. This gem can be applied not only for web parsing but also for processing different types of XML files.- [HTTParty](https://rubygems.org/gems/httparty) is a client for RESTful services, sending HTTP queries to the scrapped pages and automatic parsing of JSON and XML files to your Ruby storage.- [Pry](https://rubygems.org/gems/pry) is a tool used for debugging. It will help us to parse the code from the scrapped pages.
Web scraping is quite a simple operation and, generally, there is no need to install the Rails framework for this. However, it does make sense if the scraper is part of a more complicated service.

Having installed the necessary gems, you are now ready to learn how to make a web scraper. Let’s proceed!

# Step 1. Creating the scraping file

Create the directory where the application data will be stored. Then add a blank text file named after the application and save it to the folder. Let’s call it “web_scraper.rb”.

In the file, integrate the Nokogiri, HTTParty and Pry gems by running these commands:

**require ‘nokogiri’**

**require ‘httparty’**

**require ‘pry’**

# Step 2. Sending the HTTP-queries

Create a variable and send the HTTP-request to the page you are going to scrape:

**page = HTTParty.get(‘https://www.iana.org/domains/reserved’)**

# Step 3. Launching NokoGiri

The aim of this stage is to convert the list items into Nokogiri objects for further parsing. Set a new variable named “parsed_page” and make it equal to the Nokogiri method of converting the HTML data to objects — you will use it throughout the process.

**parsed_page = Nokogiri::HTML(page)**

**Pry.start(binding)**

Save your file and launch it once again. Execute a “parsed_page” variable for retrieving the necessary page as the set of Nokogiri objects.

In the same folder, create an HTML file (let’s call it “output”), and save the result of “parse page command” there. You will be able to refer to this document later.

Before proceeding, exit from Pry in the terminal.

# Step 4. Parsing

Now you need to extract all the needed list items. To do this, select the necessary CSS item and enter it to the Nokogiri output. You can locate the selector by viewing the page’s source code:

**array = parsed_page.css(‘h2’).map(&amp;:text)**

Once the parsing is complete, it is necessary to export the parsed data to the CSV file so it won’t get lost.

# Step 5. Export

Having parsed the information, you need to complete the scraping and convert the data into a structured table. Return to the terminal and execute the commands:

**require ‘csv’**

**CSV.open(‘reserved.csv’, ‘w’) { |csv| csv &lt;&lt; array }**

You will receive a new CSV file with all the parsed data inside.

# Conclusion

We have covered the process of web scraping, its types, benefits, and possible applications. You are now aware of the basic features of the existing tools and know how to choose right one. If your business needs a customized solution, drop us a line. Our developers will create an application for web scraping on Ruby on Rails that will perfectly satisfy your needs.

**Originally published at **[**sloboda-studio.com**](https://sloboda-studio.com/blog/how-to-do-web-scraping-with-ruby/)** on August 20, 2018.**

# How to Crawl the Web Politely with Scrapy

The first rule of web crawling is you do not harm the website. The second rule of web crawling is you do **NOT** harm the website. We’re supporters of the democratization of web data, but not at the expense of the website’s owners.

In this post we’re sharing a few tips for [Scrapy](https://scrapy.org/) users (Scrapy is a 100% open source web crawling framework) who want polite and considerate web crawlers.

Whether you call them spiders, crawlers, or robots, let’s work together to create a world of Baymaxs, WALL-Es, and R2-D2s rather than an apocalyptic wasteland of HAL 9000s, T-1000s, and Megatrons.

# What Makes a Crawler Polite?

> A polite crawler respects robots.txt<br>A polite crawler never degrades a website’s performance<br>A polite crawler identifies its creator with contact information<br>A polite crawler is not a pain in the buttocks of system administrators

# robots.txt

Always make sure that your crawler follows the rules defined in the website’s robots.txt file. This file is usually available at the root of a website (www.example.com/robots.txt) and it describes what a crawler should or shouldn’t crawl according to the [Robots Exclusion Standard](https://support.google.com/webmasters/answer/6062608?hl=en). Some websites even use the crawlers’ user agent to specify separate rules for different web crawlers:

# Crawl-Delay

Mission critical to having a polite crawler is making sure your crawler doesn’t hit a website too hard. Respect the delay that crawlers should wait between requests by following the robots.txt Crawl-Delay directive.

When a website gets overloaded with more requests that the web server can handle, they might become unresponsive. Don’t be that guy or girl that causes a headache for the website administrators.

# User-Agent

However, if you have ignored the cardinal rules above (or your crawler has achieved aggressive sentience), there needs to be a way for the website owners to contact you. You can do this by including your company name and an email address or website in the request’s User-Agent header. For example, Google’s crawler user agent is “Googlebot”.

# How to be Polite using Scrapy

[Scrapy](https://scrapy.org/) is a bit like Optimus Prime: friendly, fast, and capable of getting the job done no matter what. However, much like Optimus Prime and his fellow Autobots, Scrapy occasionally needs to be [kept in check](https://youtu.be/DgQHgy7Nmkk?t=8s). So here’s the nitty gritty for ensuring that Scrapy is as polite as can be.

# Robots.txt

Crawlers created using Scrapy 1.1+ already respect robots.txt by default. If your crawlers have been generated using a previous version of Scrapy, you can enable this feature by adding this in the project’s settings.py:

Then, every time your crawler tries to download a page from a disallowed URL, you’ll see a message like this:

# Identifying your Crawler

It’s important to provide a way for sysadmins to easily contact you if they have any trouble with your crawler. If you don’t, they’ll have to dig into their logs and look for the offending IPs.

Be nice to the friendly sysadmins in your life and identify your crawler via the Scrapy USER_AGENT setting. Share your crawler name, company name and a contact email:

# Introducing Delays

Scrapy spiders are blazingly fast. They can handle many concurrent requests and they make the most of your bandwidth and computing power. However, with great power comes great responsibility.

To avoid hitting the web servers too frequently, you need to use the [DOWNLOAD_DELAY](http://doc.scrapy.org/en/latest/topics/settings.html?highlight=download_delay#download-delay) setting in your project (or in your spiders). Scrapy will then introduce a random delay ranging from 0.5 * DOWNLOAD_DELAY to 1.5 * DOWNLOAD_DELAY seconds between consecutive requests to the same domain. If you want to stick to the exact DOWNLOAD_DELAY that you defined, you have to disable [RANDOMIZE_DOWNLOAD_DELAY](http://doc.scrapy.org/en/latest/topics/settings.html?highlight=download_delay#randomize-download-delay).

By default, DOWNLOAD_DELAY is set to 0. To introduce a 5 second delay between requests from your crawler, add this to your settings.py:

If you have a multi-spider project crawling multiple sites, you can define a different delay for each spider with the download_delay (yes, it’s lowercase) spider attribute:

# Concurrent Requests Per Domain

Another setting you might want to tweak to make your spider more polite is the number of concurrent requests it will do for each domain. By default, Scrapy will dispatch at most 8 requests simultaneously to any given domain, but you can change this value by updating the [CONCURRENT_REQUESTS_PER_DOMAIN](http://doc.scrapy.org/en/latest/topics/settings.html#concurrent-requests-per-domain) setting.

Heads up, the [CONCURRENT_REQUESTS](http://doc.scrapy.org/en/latest/topics/settings.html?highlight=download_delay#concurrent-requests) setting defines the maximum amount of simultaneous requests that Scrapy’s downloader will do for all your spiders. Tweaking this setting is more about your own server performance / bandwidth than your target’s when you’re crawling multiple domains at the same time.

# AutoThrottle to Save the Day

Websites vary drastically in the number of requests they can handle. Adjusting this manually for every website that you are crawling is about as much fun as watching paint dry. To save your sanity, Scrapy provides an extension called [AutoThrottle](http://doc.scrapy.org/en/latest/topics/autothrottle.html).

AutoThrottle automatically adjusts the delays between requests according to the current web server load. It first calculates the latency from one request. Then it will adjust the delay between requests for the same domain in a way that no more than [AUTOTHROTTLE_TARGET_CONCURRENCY](http://doc.scrapy.org/en/latest/topics/autothrottle.html#std:setting-AUTOTHROTTLE_TARGET_CONCURRENCY) requests will be simultaneously active. It also ensures that requests are evenly distributed in a given time span.

To enable AutoThrottle, just include this in your project’s settings.py:

[Scrapy Cloud](https://scrapinghub.com/scrapy-cloud/) users don’t have to worry about enabling it because it’s already enabled by default.

There’s a [wide range of settings](http://doc.scrapy.org/en/latest/topics/autothrottle.html#settings) to help you tweak the throttle mechanism, so have fun playing around!

# Use an HTTP Cache for Development

Developing a web crawler is an iterative process. However, running a crawler to check if it’s working means hitting the server multiple times for each test. To help you to avoid this impolite activity, Scrapy provides a built-in middleware called [HttpCacheMiddleware](http://doc.scrapy.org/en/latest/topics/downloader-middleware.html#module-scrapy.downloadermiddlewares.httpcache). You can enable it by including this in your project’s settings.py:

Once enabled, it caches every request made by your spider along with the related response. So the next time you run your spider, it will not hit the server for requests already done. It’s a win-win: your tests will run much faster and the website will save resources.

# Don’t Crawl, use the API

Many websites provide HTTP APIs so that third parties can consume their data without having to crawl their web pages. Before building a web scraper, check if the target website already provides an HTTP API that you can use. If it does, go with the API. Again, it’s a win-win: you avoid digging into the page’s HTML and your crawler gets more robust because it doesn’t need to depend on the website’s layout.

# Scrapinghub Abuse Report Form

Hey folks using our [Scrapy Cloud](https://scrapinghub.com/scrapy-cloud/) platform! We trust you will crawl responsibly, but to support website administrators, we provide an [abuse report form](https://scrapinghub.com/abuse-report/) where they can report any misbehaviour from crawlers running on our platform. We’ll kindly pass the message along so that you can modify your crawls and avoid ruining a sysadmin’s day. If your crawler’s are turning into Skynet and [running roughshod over human law](https://scrapinghub.com/tos/), we reserve the right to halt their crawling activities and thus avert the robot apocalypse.

# Wrap Up

Let’s all do our part to keep the peace between sysadmins, website owners, and developers by making sure that our web crawling projects are as noninvasive as possible. Remember, we need to band together to delay the rise of our robot overlords, so let’s keep our crawlers, spiders, and bots polite.

To all website owners, help a crawler out and ensure your site has an HTTP API.

[Scrapy Cloud is forever free](https://scrapinghub.com/platform/) and is the peanut butter to Scrapy’s jelly. Hopefully you learned a few tips for how to both speed up your crawls and prevent abuse complaints.

This post was written by Valdir Stumm( [@stummjr](https://twitter.com/stummjr)), a developer at Scrapinghub.

Please heart the “Recommend” so that others can learn more about how to use Scrapy politely.

[**Learn more about what web scraping and web data can do for you**](https://scrapinghub.com/data-services/)**.**

Originally published on the [Scrapinghub blog](https://blog.scrapinghub.com/2016/08/25/how-to-crawl-the-web-politely-with-scrapy/).

> [Hacker Noon](http://bit.ly/Hackernoon) is how hackers start their afternoons. We’re a part of the [@AMI](http://bit.ly/atAMIatAMI) family. We are now [accepting submissions](http://bit.ly/hackernoonsubmission) and happy to [discuss advertising &amp; sponsorship](mailto:partners@amipublications.com) opportunities.If you enjoyed this story, we recommend reading our [latest tech stories](http://bit.ly/hackernoonlatestt) and [trending tech stories](https://hackernoon.com/trending). Until next time, don’t take the realities of the world for granted!

# Visual Web Scraping Tools: What to Do When They Are No Longer Fit For Purpose?

Visual web scraping tools are great. They allow people with little to no technical know-how to extract data from websites with only a couple hours of upskilling, making them great for simple lead generation, market intelligence and competitor monitoring projects. Removing countless hours of manual entry work for sales and marketing teams, researchers, and business intelligence team in the process.

However, no matter how sophisticated the creators of these tools say their visual web scraping tools are, users often run into issues when trying to scrape mission-critical data from complex websites or when scraping the web at scale.

In this article, we’re going to talk about the biggest issues companies face when using visual web scraping tools like Mozenda, Import.io and Dexi.io, and what they should do when they are no longer fit for purpose.

First, let’s use a commonly known comparison to help explain the pros and cons of visual web scraping tools versus manually coding your own web crawlers.

# The Visual Website Builders of Web Scraping

If you have any experience of developing a website for your own business, hobby or client projects, odds are you have come across one of the many online tools that say you can create visually stunning and fully featured websites using a simple-to-use visual interface.

When we see their promotional videos and the example websites their users have “created” on their platforms we believe we have hit the jackpot. With a few clicks of a button, we can design a beautiful website ourselves at a fraction of the cost of hiring a web developer to do it for us. Unfortunately, in most cases these tools never meet our expectations.

No matter how much they try, visual point and click website builders can never replicate the functionality, design and performance of a custom website created by a web developer. Websites created by visual website builder tools are often slow, inefficient, have poor SEO and severely limit the translation of design requirements into the desired website. As a result, outside of very small business websites and rapid prototyping of marketing landing pages, companies overwhelming have professional web developers design and develop custom websites for their businesses.

The same is true of visual point and click web scraping tools. Although the promotional material of many of these tools make it look like you can extract any data from any website at any scale, in reality this is often never true.

Like visual website builder tools, visual web scraping tools are great for small and simple data extraction projects where lapses in data quality or delivery aren’t critical, however, when scraping mission critical data from complex websites at scale then they quickly suffer some serious issues often making them a bottleneck in companies data extraction pipelines and a burden on their teams.

With that in mind we will look at some of these performance issues in a bit more detail…

# Efficiency When Scraping At Scale

Visual point and click web scraping tools suffer from similar issues that visual website builders encounter. Because the crawler design needs to be able to handle a huge variety of website types/formats and isn’t being custom developed by an experienced developer, the underlying code can sometimes be clunky and inefficient. Impacting the speed at which visual crawlers can extract the target data and make them more prone to breaking.

Oftentimes, these crawlers make additional requests that aren’t required, render JavaScript when there is no need, and increase the footprint of the crawler increasing the likelihood of your crawlers being detected by anti-bot countermeasures.

These issues often have little noticeable impact on small scale and infrequent web scraping projects, however, as the volume of data being extracted increases, users of visual web scrapers often notice significant performance issues in comparison to custom developed crawlers.

Unnecessarily, putting more strain on the target websites servers, increasing the load on your web scraping infrastructure and make extracting data within tight time windows unviable.

# Increased Data Quality &amp; Reliability Issues

Visual web scraping tools also suffer from increased data quality and reliability issues due to the technical limitations described above along with their inherent rigidity, lack of quality assurance layers and the fact their opaque nature makes it harder to identify and fix the root causes of data quality issues.
- **Flexibility **— Due to the automated and rigid nature of visual web scraping tools, the crawlers they develop may be overly specific in extracting data from a website. This means that if there is even a small change in the website’s structure, the crawler could break. In comparison, experienced crawl engineers can design their crawlers from the outset to be much more flexible to website changes etc. making them much more reliable.- **Limited Visibility of Crawlers Inner Workings **— With visual web scraping tools you have limited visibility of precisely how it is crawling the target website making it harder to identify and fix the root causes of data quality issues.- **Quality Assurance Layers **— With visual web scraping tools you have less control over how your crawlers and data feeds are being monitored and checked for data quality issues. Making it harder to maintain data quality and troubleshoot any issues that inevitably will arise.
These issues combine to reduce the overall data quality and reliability of data extracted with visual web scraping tools and increase the maintenance burden.

# Complex Websites

Another drawback of visual web scraping tools is the fact that they often struggle to handle modern websites that make extensive use of JavaScript and AJAX. These limitations can make it difficult to extract all the data you need and simulate user behaviour adequately.

It can often also be complex to next to impossible to extract data from certain types of fields on websites, for example: hidden elements, XHR requests and other non-HTML elements (for example PDF or XLS files embedded on the page).

For simple web scraping projects these drawbacks might not be an issue, but for certain use cases and sites they can make extracting the data you need virtually impossible.

# Anti-Bot Countermeasures

Oftentimes, the technical issues described above aren’t that evident for smaller scale web scraping projects, however, they can quickly become debilitating as you scale up your crawls. Not only do they make your web scraping processes more inefficient and buggy, they can stop you from extracting your target data entirely.

Increasingly, large websites are using anti-bot countermeasures to control the way automated bots access their websites. However, due to the inefficiency of their code, web crawlers designed by visual web scraping tools are often easier to detect than properly optimised custom spiders.

Custom spiders can be designed to better simulate user behaviour, minimise their digital footprint and counteract the detection methods of anti-bot countermeasures to avoid any disruption to their data feeds.

In contrast, the same degree of customisation is often impossible to replicate with crawlers built using visual web scraping tools without getting access to and modifying the underlying source code of the crawlers. Which can be difficult to do as it is often proprietary to the visual website builder.

As a result, often the only step you can take is to increase the size of your proxy pool to cope with the increasing frequency of bans, etc. as you scale.

# Experiencing Issues Your Visual Web Scraping Tool?

If you are using a visual web scraping tool with zero issues and have no plans to scale your web scraping projects then you might as well just keep using your current web scraping tool. You likely won’t get any performance boost from switching to custom designed tools.

Although current visual web scraping tools have come along way, currently they often can’t replicate the accuracy and performance of custom designed crawlers, especially when scraping at scale.

In the coming years, with the continued advancements in artificial intelligence these crawlers may be able to match their performance. However for the time being, if your web scraping projects are suffering from poor data quality, crawlers breaking, difficulties scaling, or want to cut your reliance on your current providers support team then you should seriously consider building a custom web scraping infrastructure for your data extraction requirements.

In cases like these, it is very common for companies to contact Scrapinghub to migrate their web scraping projects from a visual web scraping tool to a custom web scraping infrastructure.

Not only are they able to significantly increase the scale and performance of your web scraping projects, they no longer have to rely on proprietary technologies, have no vendor lock-in, and have more flexibility to get the exact data they need with no data quality or reliability issues.

Removing all of the bottlenecks and headaches companies normally face when using visual web scraping tools.

If you think it is time for you to take this approach with your web scraping, then you have two options:
1. Build it yourself; or,1. Partner with an experienced web scraping provider
At Scrapinghub, we can help you with both options. We have a [comprehensive suite of web scraping tools](https://scrapinghub.com/compare-products) to help development teams build, scale and manage their spiders without all the headaches of managing the underlying infrastructure. Along with a range of [data extraction services](https://scrapinghub.com/data-services) where we develop and manage your custom high performance web scraping infrastructure for you.

If you have a need to start or scale your web scraping projects then our [Solution Architecture team](http://bit.ly/2Vm96rO) is available for a free consultation, where we will evaluate and develop the architecture for a data extraction solution to meet your data and compliance requirements.

At Scrapinghub we always love to hear what our readers think of our content and would be more than interested in any questions you may have. So please, leave a comment below with your thoughts and perhaps consider sharing what you are working on right now!

**Originally published at **[**https://blog.scrapinghub.com**](https://blog.scrapinghub.com/visual-web-scraping-tools-what-to-do-when-they-are-no-longer-fit-for-purpose)** on May 30, 2019.**

# Web Scraping with Python and BeautifulSoup

# I am back with another tutorial on how to do Web Scraping with Python and [BeautifulSoup](https://en.wikipedia.org/wiki/Beautiful_Soup_(HTML_parser)).

# What you’ll learn
- What is Web Scraping- Why we need Web Scraping- At last, how to do Web Scraping using Python and BeautifulSoup
When performing data science tasks, it’s common to want to use data found on the internet. You’ll usually be able to access this data in **CSV format**, or via an [Application Programming Interface](https://en.wikipedia.org/wiki/Application_programming_interface) (API). However, there are times when the data you want can only be accessed as part of a web page. In cases like this, you’ll want to use a technique called **web scraping** to get the data from the web page into a format you can work within your analysis.

Today, I’ll show you how to perform Web Scraping using Python3 and BeautifulSoup library.

> Before moving forward, I would like to share some of the basic components of a Web page

Whenever you visit a website or web page, your web browser makes a request to a web server. This request is called a `GET` request, since we’re getting files from the server. The server then sends back files that tell our browser how to render the page for us. The files fall into a few main types:
- [HTML](https://www.w3.org/TR/html/) — contain the main content of the page.- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) — add styling to make the page look nicer.- [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — Javascript files add interactivity to web pages.- Images — image formats, such as [JPG](https://en.wikipedia.org/wiki/JPEG) and [PNG](https://en.wikipedia.org/wiki/Portable_Network_Graphics) allow web pages to show pictures.
After our browser receives all the files, it renders the page and displays it to us. There’s a lot that happens behind the scenes to render a page nicely, but we don’t need to worry about most of it when we’re web scraping. When we perform web scraping, we’re interested in the main content of the web page, so we look at the HTML.

# HTML

# HTML is the standard markup language for creating Web pages.
- HTML stands for Hyper Text Markup Language- HTML describes the structure of Web pages using markup- HTML elements are the building blocks of HTML pages- HTML elements are represented by tags- HTML tags label pieces of content such as “heading”, “paragraph”, “table”, and so on- Browsers do not display the HTML tags, but use them to render the content of the page
# A Simple HTML Document

# Example

&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br>&lt;head&gt;<br>&lt;title&gt;Page Title&lt;/title&gt;<br>&lt;/head&gt;<br>&lt;body&gt;&lt;h1&gt;My First Heading&lt;/h1&gt;<br>&lt;p&gt;My first paragraph.&lt;/p&gt;

&lt;/body&gt;<br>&lt;/html&gt;

[Try it Yourself »](https://www.w3schools.com/htmL/tryit.asp?filename=tryhtml_intro)

# Example Explained
- The `&lt;!DOCTYPE html&gt;` declaration defines this document to be HTML5- The `&lt;html&gt;` element is the root element of an HTML page- The `&lt;head&gt;` element contains meta information about the document- The `&lt;title&gt;` element specifies a title for the document- The `&lt;body&gt;` element contains the visible page content- The `&lt;h1&gt;` element defines a large heading- The `&lt;p&gt;` element defines a paragraph
> More Details refer to this [HTML Tutorials](https://www.w3schools.com/html/default.asp)

**What is Web Scraping?**

**Web scraping**, **web harvesting**, or **web data extraction** is [data scraping](https://en.wikipedia.org/wiki/Data_scraping) used for [extracting data](https://en.wikipedia.org/wiki/Data_extraction) from [websites](https://en.wikipedia.org/wiki/Website).[[1]](https://en.wikipedia.org/wiki/Web_scraping#cite_note-Boeing2016JPER-1) Web scraping software may access the World Wide Web directly using the [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), or through a web browser. While web scraping can be done manually by a software user, the term typically refers to automated processes implemented using a [bot](https://en.wikipedia.org/wiki/Internet_bot) or [web crawler](https://en.wikipedia.org/wiki/Web_crawler). It is a form of copying, in which specific data is gathered and copied from the web, typically into a central local [database](https://en.wikipedia.org/wiki/Database) or spreadsheet, for later [retrieval](https://en.wikipedia.org/wiki/Data_retrieval) or [analysis](https://en.wikipedia.org/wiki/Data_analysis).

More details refer to [Wikipedia](https://en.wikipedia.org/wiki/Web_scraping)

**Why we need Web Scraping?**

A large organization will need to keep itself updated with the information changes occurring in multitudes of websites. An intelligent web scraper will find new websites from which it needs to scrap the data. Intelligent approaches identify the changed data, extract it without extracting the unnecessary links present within and navigate between websites to monitor and extract information on a real-time basis efficiently and effectively. You can easily monitor several websites simultaneously while keeping up with the frequency of updates.

You will observe, as has been mentioned earlier, that data across the websites constantly changes. How will know if a key change has been made by an organization? Let’s say there has been a personnel change in the organization, how will you find out about that? That’s where the alerts feature in web scraping comes to play. The intelligent web scraping techniques will alert you to the data changes that have occurred on a particular website, thus helping you keep an eye on opportunities and issues.

# Web Scraping using Python and BeautifulSoup

Firstly, I will demonstrate you with very basic HTML web page. And later on, show you how to do web scraping on the real-world web pages.

The first thing we’ll need to do to scrape a web page is to download the page. We can download pages using the Python [requests](http://docs.python-requests.org/en/master/) library. The requests library will make a `GET` request to a web server, which will download the HTML contents of a given web page for us. There are several different types of requests we can make using `requests`, of which `GET` is just one.

Let’s try downloading a simple sample website, `[http://dataquestio.github.io/web-scraping-pages/simple.html](http://dataquestio.github.io/web-scraping-pages/simple.html)`. We’ll need to first download it using the [requests.get ](http://docs.python-requests.org/en/master/user/quickstart/#make-a-request)method.

After running our request, we get a [Response](http://docs.python-requests.org/en/master/user/quickstart/#response-content) object. This object has a `status_code`property, which indicates if the page was downloaded successfully.

We can print out the HTML content of the page using the `content` property:

# BeautifulSoup

We can use the [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) library to parse this document, and extract the text from the `p` tag. We first have to import the library, and create an instance of the `BeautifulSoup` class to parse our document:

We can now print out the HTML content of the page, formatted nicely, using the `prettify` method on the `BeautifulSoup` object:

As all the tags are nested, we can move through the structure one level at a time. We can first select all the elements at the top level of the page using the `children` property of `soup`. Note that `children` returns a list generator, so we need to call the `list`function on it.

As you can see above, there are two tags here, `head`, and `body`. We want to extract the text inside the `p` tag, so we’ll dive into the body(Refer to just above, under html.children).

Now, we can get the `p` tag by finding the children of the body tag

we can use the `get_text` method to extract all of the text inside the tag.

# Finding all instances of a tag at once

What we did above was useful for figuring out how to navigate a page, but it took a lot of commands to do something fairly simple. If we want to extract a single tag, we can instead use the `find_all` method, which will find all the instances of a tag on a page.

If you instead only want to find the first instance of a tag, you can use the `find`method, which will return a single `BeautifulSoup` object.

If you want to fork this notebook go to [Web Scraping Tutorial.](https://github.com/mohitsharma44official/Python-Web-Scraping-/blob/master/Web%20Scraping%20Tutorial.ipynb)

> **Now, I’ll show you how to perform web scraping using **[**Python 3**](https://www.python.org/downloads/release/python-350/)** and the **[**BeautifulSoup**](https://www.crummy.com/software/BeautifulSoup/)** library. We’ll be scraping weather forecasts from the **[**National Weather Service**](http://www.weather.gov/)**, and then analyzing them using the **[**Pandas**](http://pandas.pydata.org/)** library.**

We now know enough to proceed with extracting information about the local weather from the National Weather Service website. The first step is to find the page we want to scrape. We’ll extract weather information about downtown San Francisco from [this page](http://forecast.weather.gov/MapClick.php?lat=37.7772&amp;lon=-122.4168).

Once you open this page then use **CRTL+SHIFT+I **to inspect the element, but here we are interested in this particular column (San Francisco CA).

So, by right-clicking on the page near where it says “Extended Forecast”, then clicking “Inspect”, we’ll open up the tag that contains the text “Extended Forecast” in the elements panel.

We can then scroll up in the elements panel to find the “outermost” element that contains all of the text that corresponds to the extended forecasts. In this case, it’s a `div` tag with the id `seven-day-forecast.`

Explore the div, you’ll discover that each forecast item (like “Tonight”, “Thursday”, and “Thursday Night”) is contained in a `div`with the class `tombstone-container`.

We now know enough to download the page and start parsing it. In the below code, we:
- Download the web page containing the forecast.- Create a `BeautifulSoup` class to parse the page.- Find the `div` with id `seven-day-forecast`, and assign to `seven_day`- Inside `seven_day`, find each individual forecast item.- Extract and print the first forecast item.
**Extract and print the first forecast item**

As you can see, inside the forecast item `tonight` is all the information we want. There are `4` pieces of information we can extract:
- The name of the forecast item — in this case, `Today`.- The description of the conditions — this is stored in the `title` property of `img`.- A short description of the conditions — in this case, `Sunny`.- The temperature low — in this case, `69**°F**`.
Now that we know how to extract each individual piece of information, we can combine our knowledge with CSS selectors and list comprehensions to extract everything at once.

**In the below code**:

Select all items with the class `period-name` inside an item with the class `tombstone-container` in `seven_day`.

Use a list comprehension to call the `get_text` method on each `BeautifulSoup`object.

**Combining our data into Pandas DataFrame**

**We can use a regular expression and the **[**Series.str.extract**](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.Series.str.extract.html)** method to pull out the numeric temperature values.**

If you want to fork this notebook go to [Web Scraping](https://github.com/mohitsharma44official/Python-Web-Scraping-/blob/master/Web%20Scraping.ipynb) and [GitHub](https://github.com/mohitsharma44official/Python-Web-Scraping-)

I hope now you have a good understanding of how to Scrape the data from web pages. In the coming weeks, I’ll do web scraping on
- News articles- Sports scores- Weather forecasts- Stock prices- Online retailer price etc.
Hope you like this article!! Don’t forget to like this blog and share with others.

> **Thank You****Go Subscribe **[**THEMENYOUWANTTOBE**](https://themenyouwanttobe.wordpress.com)**Show Some Love ❤**

# Learn web app development while solving a real world problem

In this series, we will learn creating a web application from scratch, web scraping and storing the scraped data. All this while solving a real world problem.

This is going to be a fun practical series divided into 3 part:

1. Scrape the data

2. Store it

3. Create a web application

> Note: I am not sure if web scraping is illegal or not. It’s a complex topic to discuss. This series does not discuss the legal aspects of web scraping. However, I believe web scraping done ethically (debatable what is ethical) should not be a problem for the websites being scrapped.

# **The problem we are going to solve**

Assume that you are living in the USA and want to send some money to your friend or family in India. You would first google USD to INR rate, then you look for a money transfer service that allows you to send money from USD to INR. But, there are a lots of different services that provide different exchange rates, different service charges. First, you collect a list of such money transfer services and then you visit their websites to check what is the rate that they are providing. This takes a lot of time and effort.

In this tutorial we are going solve this problem by creating a web-application that will show the exchange rates provided by these services at one place only. So that, you have to open only one website to decide which service to use.

**Lets solve the problem by breaking it into three parts:**
1. Collect data from various services1. Store the data1. Create web app using the data
**This article is going to cover the #1.**

Sounds interesting?

We have a lot to cover, so without wasting a moment, let’s get started.

## Requirements

1.[ Python (web scraping)](https://www.python.org/downloads/)

2. [BeautifulSoup (Python library for webscraping)](https://pypi.org/project/beautifulsoup4/)

3. [urllib.request (Python library for opening URLs)](https://docs.python.org/3/library/urllib.html)

In this part, we will cover the web scraping section.

# **Basics**

In a typical client server scenario, client (eg. web browsers) sends a request to server. Server responds with data. For eg. When we open google.com in any web browser, the browser sends the request to google’s server to get the google search page. The google server returns the data in HTML and then browser renders the HTML and display beautiful UI to the user. The same thing happens when we open any other website. Web-Scraping is to read the HTML and get the required data/information from that HTML.

Lets understand this while solving our problem at hand. Follow the below steps:

## Step 1: Select the target

As we are going to create an application where users can view the USD to INR exchange rate offered by various services that lets users send money from USA to India. The obvious requirement is the list of such services. We are going to use Remitly and Transferwise (randomly selected).

## Step 2: Find the element to scrape in the website

We learned in the basics that all websites are in HTML(Hyper Text Markup Language). Underlying HTML of the website opened in commonly used browsers (chrome, safari, edge, firefox) can be easily seen by right clicking on the page and selecting **Inspect** option.

We want to get the USD to INR, so open the first website ([Remitly](https://www.remitly.com/us/en/india/pricing)), right click on the place where it shows INR rate that you would like to scrape. In the developer console that gets opened, right click on the selected element and copy -&gt; Copy Selector.

The **selector** is copied to the clipboard, save it for now (!important), we will use it later. Similarly, open the second website ([Tranferwise](https://transferwise.com/us/currency-converter/usd-to-inr-rate)) and do the same.

Now we have the selectors (which is the CSS path to the element that displays the INR rate in the DOM). We will write Python script to [programmatically](https://go.skimresources.com/?id=126542X1588076&amp;xs=1&amp;url=https://en.wiktionary.org/wiki/programmatically) make request (using urllib) to Remitly and Tranferwise web pages and read the HTML response (using BeautifulSoup library) and extract the INR rate using the selectors (obtained in previous step).

The above script contains all the comments to explain what each line is doing. If it needs more explanation, let me know in comments section :). In short, the above script is performing the below steps:

1. Call the page(url) that shows the exchange rate from USD to INR.

2. Get the HTML.

3. Create a BeautifulSoup object to navigate the html easily.

4. Extract the rate using the selectors we got in step2.

# Execute

Copy the above script in a file and save it with **.py** extension (e.g. scrapper.py).

Run the script by executing below command in terminal/cmd (python3 should be installed already)

Now, we have the nice script that scrapes the exchange rate from two money exchange services (Remitly &amp; Transferwise). This script can be easily extended to include more services without much changes in the code. Simply create new class for a new service and include the name of the service in the MONEY_TRANSER_SERVICES array. That’s it.

# Conclusion

In this part, we saw how to extract the information from a web-page. In the next part we will see how to structure the data and store in MongoDB for long term storage. Stay tuned!

# How to do data scraping EFFICIENTLY?

For many people, data scraping or web scraping is to write some programs that click websites and copy information from them. While this is a legitimate way to do scraping, it is the least efficient method.

In this article, I will list a few methods I used in scraping data from less efficient ones to more efficient ones.

# Understanding the Request Response Cycle

Put it in a very simple way, the web is a place where a lot of requests and responses happening. A client (user) requests information from a server (which is just another computer). And the server serves the information (response) back to the client.

What you see as a client on a browser is just a bunch of data parsed and formatted in a pretty and presentable way, thanks to HTML, CSS, and JavaScript. The key here is the line: “just a bunch of data” which means we may be able to scrape it.

There is a subtle detail which may affect the technique to scrape data. Sometimes, the whole webpage is rendered in the server side which means the server sends the complete HTML, CSS and JavaScript to the client and the client’s browser displays it. The other way is that the server returns the data and the client browser is responsible for parsing it. For the websites which is rendered in server side, we can only scrape by HTML elements . For the websites which is rendered in the client side, we can scrape by a more efficient method.

Actually, the key to efficient scraping is to find a place where data is rendered in the client side. For example, you may find that in a website, the data is rendered in server. But you also find that the company provides an android app. It is very likely that for an android app, the data is rendered in the client side. This enable us to use a more efficient method.

Don’t underestimate the difference. Scraping HTML elements are usually very slow!

# Server Side: Scraping HTML elements

A script will send a request to the server. Server responses with the HTML file. Then the script find the location of information and extract it.

## Pros:
- Easy to implement- Straight-forward
## Cons:
- Slow for scraping large amount of webpages- Not robust. Webpages change- Development time is long. You need to hard code the location of information.
## Tools:
- [Scrapy](https://scrapy.org/)- [Selenium](https://www.seleniumhq.org/)
# Client Side: Scraping the responded data

A script will send a request to the server. Server responses with data, usually JSON, XML. Then the script extracts the useful information or store the responded data directly.

Usually people we look at the Network Tab in the developer tool (Firefox) to inspect the traffic. [Mitmproxy ](https://mitmproxy.org/)may also be used for more detail analysis.

## Pros:
- Fast for scraping large amount of webpage- Robust. Usually the request endpoints will not change.- Fast development. Less code to write.
## Cons:
- Take some experience to find it.- Authentication issue. Sometimes the webpage is protected by password. You need to understand the authentication mechanism to get in.
## Tools:
- [Scrapy](https://scrapy.org/)- [Requests](https://pypi.org/project/requests/)
# Special Tricks: Scraping APPs

This is a special tricks I used to scrape webpage that renders in server side. But it only works if the company provides an Android app (Haven’t tried it on IOS app).

The steps go like this:
1. Download the APK file and add security exception to APK. Since Android 7.0, google introduced changed to Certificate Authorities (CA) settings which prevents third-parties listening to network requests. Luckily you can find a script to add the exception automatically [here](https://github.com/levyitay/AddSecurityExceptionAndroid).1. Install the modified APK to your phone1. Set up the man-in-the-middle proxy (MitmProxy) and your phone. You can refer to this [article](/testvagrant/intercept-ios-android-network-calls-using-mitmproxy-4d3c94831f62).1. Inspect the traffic and look for the data you want.
For example, I want to scrape Centaline Property Website. After inspecting the webpage, I found that it seems like data is rendered in the server side.

But, they provided an android app. After using the above steps, I managed to find the data which is requested (POST) using

[https://hkapi.centanet.com/api/FindProperty/MapV2.json?postType=s&amp;order=desc&amp;page=1&amp;pageSize=20&amp;pixelHeight=2220&amp;pixelWidth=1080&amp;points[0].lat=22.705635288642362&amp;points[0].lng=113.85844465345144&amp;points[1].lat=22.705635288642362&amp;points[1].lng=114.38281349837781&amp;points[2].lat=21.993328259196705&amp;points[2].lng=114.38281349837781&amp;points[3].lat=21.993328259196705&amp;points[3].lng=113.85844465345144&amp;sort=score&amp;zoom=9.745128631591797&amp;platform=android](https://hkapi.centanet.com/api/FindProperty/MapV2.json?postType=s&amp;order=desc&amp;page=1&amp;pageSize=20&amp;pixelHeight=2220&amp;pixelWidth=1080&amp;points%5B0%5D.lat=22.705635288642362&amp;points%5B0%5D.lng=113.85844465345144&amp;points%5B1%5D.lat=22.705635288642362&amp;points%5B1%5D.lng=114.38281349837781&amp;points%5B2%5D.lat=21.993328259196705&amp;points%5B2%5D.lng=114.38281349837781&amp;points%5B3%5D.lat=21.993328259196705&amp;points%5B3%5D.lng=113.85844465345144&amp;sort=score&amp;zoom=9.745128631591797&amp;platform=android)

# Conclusion

I cannot go into very detail in the steps. The article is quite long already. The message here is that try not to use HTML element in the first place. Always look for client side render service. This will improve your scraping efficiency greatly.

However, something that is working is always better than nothing. If you really can’t find a better way at this moment, just use HTML element and keep looking for better solution!

# Hands-On Web Scraping With Python

Web scraping is inherently useful for many people, in particular those who do not know how to do it. I have written many web scraping scripts for friends. None of them had any programming or computer science related background. This tutorial is for all the Sociologists, Business Analysts, Literature Researcher and all other people sometimes need to automatically collect data from the web.

At the end of this tutorial we will have a little script, which if you run it automatically collects an article from medium.com which you could for instance store in a .csv file. You then can process with another software of your choice. The goal is also to teach fundamentals you need in order to do simple website scraping. This guide will not make you a web developer or anything close to that, but I provide some references in the last section, if you are interested in deeper knowledge. For the sake of making this guide understandable for readers without technical background, I decided to oversimplify in some parts as well as I did not use exact terminology.

# The Things That I Will Not Explain

Here are listed the things which you need to know in order to follow this guide. In the scope of this tutorial there in no space to explain them, but I will add some resources so you can learn them beforehand.
1. What is Python and how do I use it?1. How do I install Python packages?
# Basics 1: See Websites From A Different Perspective

The first thing we have to understand in order to perform web scraping is the function of the browser. In order to do so, press F12 on the keyboard. If you are using Firefox or Chrome you see the developer tools popping up. One of the things you can see in the developer tools is the plain HTML text which your browser interprets into a website (see Fig. 1). We will need the developer tools later, in order to locate the data that we want to extract in the HTML text of the website. For now, close the developer tools again and lets discuss where the HTML text comes from in first place.

The browser requests the data that it needs to display a website from a web server via a HTTP request. Such a requests gets then answered from a web server via a HTTP response (See Fig. 2). All this happens in the background while you are clicking through the web. For this guide, we are mostly interested in the body of the response, this is where the HTML text is located.

# Basics 2: HTML

HTML is a language which allows to structure the content of a website. It is part of what we get as a response from the HTTP request. The HTML code consists of tags and content in between the tags. The tags are like markers for content on the website. The browser then knows in which style sheet (CSS) it has to look to into in order to display the content correctly.<br>A tag **&lt;h1&gt;Something&lt;/h1&gt; **for instance is interpreted by the browser as a heading of type 1. In the corresponding Style Sheet, it could for instance be noted that h1 heading have to be displayed in blue or a certain font.

We will use such tags later in order to find the information we want to extract. It is important to note that the &lt;h1&gt; tag for instance is in between the body tag. The tags have an hierarchical order, the inner tags are called children and the outer ones are called parents. In our case the &lt;body&gt; tag is the parent of the &lt;h1&gt; and the &lt;p&gt; tag. Later, when extracting a link from a heading we will come back to this concept.

We learned about interpretation of the HTML into a beautiful website and the request of the HTML text from the web server are two different things, that the browser does for us. Therefor, we can conclude, that we can write our own file containing only HTML text and have the browser interpret it. And this is what we are going to do now.

Create an empty text file on your desktop. Open the file and copy the text from (Code 1) into the file and save it. Right click on the file, click on **Open with **with any browser of your choice. If everything worked out, you should now see only the text in between the tags formatted in two different ways.

After we got the basics we can now start to use Python to replace the browser. First we are going to make the HTTP request with the help of Python and then we are going to use also Python to actually extract the information from the webserver’s response.

# Get the request

For this tutorial, our job will be to extract the headings from medium.com and put them into a .csv file. Then select one article and also save the text of the article.

We start to use Python in order to make a HTTP request without using the browser. Therefor, we will use the Python package called[** **requests](https://2.python-requests.org/en/master/). Requests allows us in a very simple manner to formulate an HTTP request and store the response so we can use it later for the extraction of our data.

In code to we first make a request with the** get()** function and we store the response into the variable **r**. Then we print the HTML text of the response which is located in the attribute **text **of the response object.

# Find the data on the website

We will work with the non personalized version of the medium.com start page. The easiest way to see how it looks is to open a browser window in [incognito mode](https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history) and go to medium.com. Then open the developer tools again with F12. And use the inspection tool to find the corresponding HTML part for the headings you want to extract. In our case click with the inspection tool activated onto the main heading. The developer tools will now jump to the part of the HTML text which is responsible for the main heading.

We can identify which HTML tag medium has used for the main heading, by looking into the blue marked part and check for the tag which is written in the smaller and larger signs **&lt;&gt;** . As we can see in Fig. 3 medium.com has used an **&lt;h1&gt;** tag for the main heading. In the next step we will find all** &lt;h1&gt;** tags used on the website and extract the heading itself.

# Extract the data from the website

To extract the heading we have to first find it in the response, that we got from the HTTP request and secondly we have to remove the surrounding HTML structures. The package we are going to use for this job is called [beautiful soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/).

Beautiful Soup makes it possible to search through the the different HTML tags, but before we extract certain HTML tags we have to decide which tags we are interested in. The biggest helper here will be the developer tools of your browser, which we have seen before.

In order to extract the first heading we will

**Make a request (1), **which we learned before. The response of the server will be stores in a variable called **r**. The HTML text of the response will be **parsed (2) **the into a Beautiful Soup object, we called it **soup** here. The parsing basically means that the whole website will be stored in a structure which makes it easy to search through. The BeautifulSoup object additionally gives us some new functions which makes our life easier such as removes the tags from the content. The** search for all &lt;h1&gt; tags in the response (3)** is performed by calling the function [find_all() ](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#searching-the-tree)function on the BeautifulSoup object **soup. **You can find out how find_all() works in detail by clicking on the link, but for now it is enough to know that it returns a [list ](https://www.w3schools.com/python/python_lists.asp)of all tags which match the search condition. The first element of the list is our heading. For better understanding, we will **display the whole list (4) **first and then we only print out the first element without the HTML tags by accessing its .text attribute.

The next step is to open the link behind the text and to extract the content. In Code 4 we can see how this is done. The new line here is line 8, we formulate a new HTTP get request as we have learned before, but this time we will use the link behind the heading in order to get the request. In Fig. 3 we can see that the link is a parent of the heading node, this means we can acces the link by accesing the parent of the heading. In line 8, we acces the first element of the list containing all headings by using **headings[0]**, then we acces its parent tag **headings[0].parent** and lastly we get what is written in between the **&lt;href&gt;** tag. [**&lt;href&gt;**](https://www.w3schools.com/tags/att_a_href.asp) stands for hyper reference and is basically a link as you know it.

As before, we make a Beautiful Soup object from the response (line 9) and then we are going to find the text of the article which is placed in a couple of &lt;p&gt; tags, but how do we know, that the articles main text is located in &lt;p&gt; tags. We again checked this with the help of the developer tools of the browser. We first click on the link and then mark the text body with the inspection tool.

Since the text is written in different paragraphs .find_all() returns a list of all &lt;p&gt; tags. In line 12 we remove the tags from the elements so that only the plain text is which we put back into a list. In line 13 we use the [reduce function,](https://thepythonguru.com/python-builtin-functions/reduce/) which makes it easy for us to combine the different paragraphs into one single string.

# And what can we do now?

Probably you have some application with scraped data in mind. Either you just want to save it, because the website you are looking at in your work tends to go offline from time to time or you want to to analytics.

One great case is to observe changes in the content of a newspaper over time [(David Kriesel, CCC, 2017)](https://www.youtube.com/watch?v=-YpwsdRKt8Q). If we have scraped a couple of articles from, e.g. a news site, we could search for certain key words or [count their appearance](https://www.w3resource.com/python-exercises/string/python-data-type-string-exercise-12.php). We could use also different Machine Learning tools to classify text, which I will cover in a different article.

# Further reading

[HTTP](https://www.w3schools.com/tags/ref_httpmethods.asp)

[Beautiful Soup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

[requests Documentation](https://requests.kennethreitz.org/en/master/)

# How to Do Price Monitoring from Car Dealers Sites?

The automobile business is booming in all countries including the USA. According to **NADA**, since the year 2018, the USA’s 16,794 franchised dealers had sold over 8.6 million light-duty vehicles. The sale of new vehicles has touched the figure of more than $500 billion. Altogether, the dealerships had ordered 155 million repairs, whereas and services sales have reached $58 billion.

However, there are no location-wise automobile dealer directories available and mostly, the information needs to be collected either using personal contacts or a location-specific Google search. If you want to try and scrape data about [**Price Monitoring**](https://www.xbyte.io/solution/price-monitoring/) from the car dealers sites, you can use Google itself as well as use the keywords that should comprise- “car dealer”, together with the location as well as the car’s company name. You can try the initial few links which are not endorsed by Google and scrape data from them. It can be reiterated for different locations as well as car companies through an excel sheet. Although, the efficiency and scale of manually scraping car dealers data are particularly limited.

For scraping data in an automated manner, you can use professional Web Crawling Services of X-Byte Enterprise Crawling, once you get the website list ready. As a professional [**Web and Data Scraping Service**](https://www.xbyte.io/service/web-scraping-service/) provider, X-Byte Enterprise Crawling can provide this data in the plug-and-use format. Provided that you have collected the resources with required persistence, your data will be clean and dependable. However, if you are unaware of which cars are more accepted in which states or countries, you can only scrape data for getting that information and for that [**X-Byte Enterprise Crawling**](https://www.xbyte.io/) is the finest option.

All the car dealers around the world promote themselves heavily to get more customers. [**Data scraping from social media websites**](https://www.xbyte.io/solution/social-media-monitoring/) and online communities can help you collect information on all the popular auto dealers. Besides that, there are many other resources to scrape price monitoring data from car dealers sites on the web.

As the web is growing exponentially, it doesn’t matter what research you are doing or applications you are creating, the web is the finest place to collect data and the same applies to scrape data on car dealers. Whether you are creating an application that will utilize your location as well as get you your nearest car dealer or if you want to create a ranking or reviewing site for car dealers, data scraping will assist you to create your data source and fill your website or app with information.

[**Scraping price monitoring data**](https://www.xbyte.io/solution/price-monitoring/) from the car dealers are extremely difficult and that’s where X-Byte Enterprise Crawling has an important role to play.

Many dealerships work in both new and used cars and they provide vehicles that fit everyone’s requirements. They offer wonderful customer service with the help of friendly salespeople. They have a lot of used cars to select from. These dealers offer cars of different brands.

Scraping data from all these car dealers is difficult and that’s what [**X-Byte Enterprise Crawling**](https://www.xbyte.io/) does easily! At X-Byte Enterprise Crawling, we scrape price monitoring data from car dealers’ sites as well as do car inventory scraping and used cars inventory scraping.

# What Data We Extract from Car Dealers Websites?
- Car Name- Pricing- Seller Name- Seller’s Address- Ratings- Number of Reviews- Contact Details
# Additional Car Information

You can also get addition car information like:
- Fuel Type- City MPG- Highway MPG- Drivetrain- Engine- Mileage- Interior Color- External Color- Stock- Transmission- VIN
The dealers usually have online inventories that are amongst the key reasons why these dealerships are a brilliant source for different car companies. All the drivers can approach their sales associates and let their customer service specify how they make used or new car procedure, hassle-free!

# Why Should You Hire a Professional Like X-Byte Enterprise Crawling for Price Monitoring from Car Dealers Sites?
- Our car dealer site [**Price Monitoring Services**](https://www.xbyte.io/solution/price-monitoring/) can save your invaluable time &amp; money. We can find information in only some hours that might take some days or weeks in case, you perform that manually!- Our expert team realizes how to change unstructured data into a structured one. Our car dealer site price monitoring scrapers keep track of all the pages of directed websites to get all the required results.- Our expert [**Consumer Support**](https://www.xbyte.io/resources/faqs/) team always helps you if you face any problem whereas using our car dealer site price monitoring service. Our car dealer site price monitoring services are reliable, skillful, and offer faster results without any mistakes.
Contact [**X-Byte Enterprise Crawling**](https://www.xbyte.io/) for all your car dealer site price monitoring services requirements or ask for a free quote!

**Visit Our Site :** [www.xbyte.io](https://www.xbyte.io/)

# 6 Tips on How to Do Data Scraping of Unstructured Data

Data scraping, data extraction or web scraping is an automatic web method to fetch or do data collection from your web. It converts unstructured data into structured one which can warehouse to the database.

**6 Tips on How to Do Data Scraping of Unstructured Data**

## 1. Find a reliable solution for unstructured data scraping

Conventional technical approaches of unstructured data scraping isolate the moving parts of the results to make that easier for the programmers resolve the issues.

They are unapproachable from the real time usage setups. However, while the non-programmatic method builds a code, this opens the chances of accepting indications regarding proposed use of the extracted data.

**Any automated data scraping software and checking solution can do this, for example:**

• Avoid worthless links and attain projected data quickly<br> • Build a responsive load footprint for the targeted websites<br> • Use lesser hardware resources

It will help in the data mining of unstructured data using the unstructured data scraping tools.

Besides, non-programmatic method, it will capture knowledge regarding targeted websites better and influence that to promptness of learning using multiple websites, adding up to the ability of scaling proficiently and brilliantly while extracting the unstructured data.

## 2. Be capable enough to work for the unstructured data

All the web scraping software depend on the HTML delimiters that breakdown while the main HTML changes as well as the requirement for fixing problems need to be tracked manually.

Any automated data scraping and tracing solution identify additions and changes with accuracy, offering only the ideal data using techniques of unstructured data examination.

## 3. Efficiently produce and manage scripts for unstructured data

Any automatic **web data scraping solution**, particularly for the data extraction tools for retailer, can help in rationalizing the workflows and processes at scale, smoothly generates productivity gains. They consist of:

• Automatic load handling and deployment<br> • Bulk operations to complete the jobs and task preparation<br> • Consistent testing for superior quality assurance<br> • Data mining techniques and tools for the unstructured data<br> • Shared request lists and schemas for handling different projects having dependable team practices<br> • Tools which effortlessly increase the mass regulation activities<br> • User subscriptions and agent migrations among the systems

## 4. Alteration of Unstructured Data into Useful Structured Data

Unstructured data can be used for the human eyes whereas well-structured can be used for computers.

A conventional data scraper as well as an automated **data scraping solution**, both can [**transform the unstructured data into structured data**](http://www.3idatascraping.com/services.php), offering analysis to take superior business decisions.

Nevertheless, the automated data scraping solutions integrate and use data normalization techniques to ensure that your structured data is effortlessly converted into main data insights.

## 5. Reduce the errors through automation in collecting structured data

Visual abstraction is the method to use machine learning for creating well-organized codes. Visual abstraction recognizes each and every web page just like a human examines a page visually.

However, an automated **data mining and extraction solution** can help you better with a superior level of visual abstraction without utilizing the HTML structures. This doesn’t break while it gets page variations.

## 6. Combine data mining results with business operations and procedures

In the existing data-obsessed business environment, many teams frequently interrelate with the data collection as well as analysis procedures.

Business organizations searching for the web scraping about unstructured data have to talk about and support all the data necessities, for different purposes.

As the business requirements are different, built-in aspects supportive to different requirements are the key for ranging higher frequencies and volumes of the data collection.

Find out more about accurate, result-oriented and better accessible data scraping solutions.

You can [**contact us**](http://www.3idatascraping.com/contact-us.php) to discover how the automated data intelligence and data extraction solution can improve your organization’s productivity, efficiency, and general workflow.

**Originally published at **[**www.3idatascraping.com**](http://www.3idatascraping.com/6-tips-on-how-to-do-data-scraping-of-unstructured-data.php)** on June 30, 2017.**

# Natural Language Processing

I recently became familiar with the process of using website API’s and/or how to do web scraping, to extract words or tables from websites, to become a source of data for machine learning purposes. That in itself was pretty interesting, but what you can do with all that information, particularly with words, is fascinating. Welcome to the world of Natural Language Processing (NLP).

NLP has become on of my favorite subjects I have learned in my Data Science learning. Being able to take a post from Reddit, or comments from Amazon, or an article from a webpage, and to create a predictive model from that blows my mind. I mean, how can words be treated like numerical values?! But if start thinking about it, certain words can define who wrote/said in a statement, and if you can identify that, you now have a feature you can help predict on. Finding the occurence of the number of times a word shows up can hold a lot of power.

For instance, the phrase “Make America Great Again” is President Trump’s slogan. If I am trying to predict if an article or post is written by a democrat or republican, and those words show up in that record, with some tuning, the model would probably predict if a republican wrote that post, or if there are ties to the Republican party, or even Trump himself.

At the time I was learning this, there was the big news of someone close in Trump’s cabinet that wrote a very incriminating letter of Trump’s alleged missteps as President. Nobody knew who wrote it, but I came across several news reports and articles, where Data Scientists were using NLP to try and find who wrote the article, comparing how certain words were used, compared to a number of other published articles from Trump’s cabinet over the years. Talk about relevant and an exciting use of techniques! It is like being a data detective! That just increased my excitement more and more to dive into the NLP process further.

I also had an opportunity to talk with a Data Science company, and they had just finished a project using NLP to look for gender discrimination in employee reviews, and they were successful at building a model that helped find these type of discriminatory reviews. Words hold power and can have equal weight, if applied right, to predicting outcomes. The old saying “Sticks and stones can break my bones but words will never hurt me” is something we all know is not true, but apply the concepts of NLP to words, and words might actually be more of a threat than a feature of just rocks and sticks!

# Asynchronous Web Scraping in Python using concurrent module.

Ever felt frustrated at how long your web scraping script takes to complete the task? Have you ever wished there was a faster way to do your web scraping?

Well, there is. And I’m going to show you today how you can increase the performance of your scraper in a very beginner friendly way.

In this post we will also talk about asynchronous programming in Python. And then apply that knowledge to optimize web scraping.

Let’s dive in!

## **What is Asynchronous execution? And why would you want it?**

If you’re a beginner in web scraping, then I assume you’ve worked with `requests` and `BeautifulSoup` modules in python. And what you generally do while writing your scraper is as follows —

Or you might use a different structure than this. But the end result is same. The way you code your scraper is in a **synchronous** fashion.

What it means is that your program goes through the target URLs one by one, in a synchronized way. You send a GET request to the server and the server takes some time to send a response. But what do you suppose is happening while your program is waiting for a response from the server?

**Nothing!**

That’s right. The network request is the instruction that takes the most time in your script. And when you’re doing it in a synchronous way, your script remains idle a large amount of time which is spent waiting for the server response. How would you make use of that free time?

It’s quite obvious. We do not want our program to remain idle while one of the GET requests is waiting for server’s response. We want our program to move ahead with other URLS and their processing without being blocked due to one sluggish network request.

> A<!-- -->synchronous programming is simply executing multiple instructions simultaneously.

So we need a way to process multiple URLs simultaneously and independent of one another. Let’s see how we can achieve this in Python.

## How asynchronous execution is achieved?

In this section, I will discuss different strategies of asynchronous execution. If you’re just interested in the asynchronous python code, you can skip this part.

There are many ways in which asynchronous execution is implemented. Three broad categories of multi-processing can be given as —
- Process level multi-processing.- Thread level multi-processing.- Application level multi-processing.
If you have some background in Unix operating system, you would be familiar with these concepts. Still, I will do my best to explain them as concisely and cogently as possible.

In Process level multi-processing, you can achieve asynchronous execution by dividing the total work across separate processes. Each process running on a different processor core. In this way, your original task is divided into number of chunks and all of these chunks are being processed simultaneously. This level of multi-processing is in-built in an OS. So all you have to do is utilize this and let the kernel worry about process scheduling.

Thread level multi-processing is almost same as the previous one. Except in this case, we are dividing the task across multiple threads. A thread is like a process but a lightweight process. And we can add multiple threads under a single process context. So all of these thread would belong to the same process. This feature is also implemented in the OS itself. We just need to utilize this using Python and we will see how it is done.

Application level multi-processing is somewhat different than the previous two. Here the OS is under the impression that it is executing only one process with a single thread. But our application itself schedules different tasks on that thread for execution. So the asynchronous nature of execution is implemented in our application program itself.

These are the main ways to handle parallel execution on a traditional Unix system. Now we will see how we can use the `concurrent` module in Python to utilize these concepts and to boost our scraping speed.

## Implementing asynchronous execution:

Okay, so you must be itching to get started. Let’s start coding —

So we first import the things we require. You will observe that we imported `ProcessPoolExecutor` and `ThreadPoolExecutor.` Both of these classes correspond to Process level and Thread level multi-processing respectively. We only need to use one of these. And for our use case i.e web scraping, both of these will be effective.

So the multi-processing features in the OS are abstracted and we can directly do parallel processing using the above classes.

> The `[concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html#module-concurrent.futures)` module provides a high-level interface for asynchronously executing callables.The asynchronous execution can be performed with threads, using `[ThreadPoolExecutor](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor)`, or separate processes, using `[ProcessPoolExecutor](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor)`.

The way it works is that we have a **pool **of threads or processes. And we can assign some task to each of them and they will start executing independently of each other.

We can create a pool —

Now we can `submit` or `map` different tasks to each individual thread or process.

Suppose we have a list of 100 URLs and we want to download the HTML page for each URL and do some post-processing and extract data.

We have a function `download_and_extract` which will gather our data and we want to gather data from the 100 URLs previously mentioned.

If we were to do this synchronously, it would take 100 multiplied by average time for one GET request ( assuming post-processing time is trivial ). But instead if we divide the 100 URLs on 4 separate threads/processes, then the time required would be 1/4th the original time, at least theoretically.

So let us try this —

Here we have slightly modified the Pool initialization to suit our use case but it does the same thing when we initialized it previously.

`executor.submit` function takes two parameters in our code. The first one is the task we want to perform Or more technically, the function we want to execute and the parameters for the execution of our function. The executor will distribute the work across 4 different processes with each process executing one instance of `download_and_extract` for the given URL.

But how do we know when the tasks are done? And what about the data that we wanted?

`executor.submit` returns a `Future` object.

> (Future) Encapsulates the asynchronous execution of a callable.

This object represents the asynchronous execution of a specific function. You can read more about its properties in the [documentation](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.Future). We will only focus on two main functions for this object that we will require viz. `done` and `result.`

`done()` function returns the bool value `True` if the function has finished executing or if there was some exception in it. And when it has finished execution, we can retrieve the result using the `result()` function.

Here’s another new thing — `as_completed().`

The function `as_completed()` simply determines the order of the results that are returned by the future. Using this function, we avoid having to write a block of code where we keep checking whether a given `Future` is `done()` or not.

The function will start generating results as soon as any one of the functions being executed yields some result. And then we simply append that result to our main collection of data.

And that’s it! Using these simple concepts you can make your program multi-processing capable. Web scraping is just a simple example to illustrate the concept. You can apply this concept anywhere you want.

We will look at a fully coded and working example below —

You can now experiment using this example with URLs of your choice and different degrees of parallelization. See what conclusions you can draw from this.

## What next?

In this post, I demonstrated how to divide a particular task across multiple threads and process. And we achieved asynchronous execution of a specific task in this way.

But think about this, the task we are doing i.e downloading data from the network, it is admittedly being done across multiple processes but on any one process the task is still being done synchronously.

What I mean is that we are simply performing the task in a parallel fashion. So in any one of the threads/processes, that one process or thread still remains idle for some time until server responds.

There is a way in which we can overcome this and make our scraping truly asynchronous. We would have to use Application level multi-processing to accomplish this.

We want our program to send a GET request and while the server is processing that request, we want our program to suspend that request and move on to next requests. When the server finally responds, we want that data to be mapped to the correct request. In this way, we do not allow our program to remain idle at all. It is always doing something.

This is possible in python using `asyncio` and `aiohttp` modules. I will explore both of those modules in the context of web scraping in a future post.

So stay tuned!

# How to Run JavaScript in Python | Web Scraping | Web Testing

When we develop web application sometimes **we need to test the UX**. Most of the time we do it manually. For example, after a form submission what happen, which a person check it manually. In future, if another coder wrongly modified the form code it may creates a bug which may be skipped by manual tester.

Sometimes **we want to scrap some webpage’s information** but which is fully loaded by JavaScript framework. In normal scraping techniques it’s not possible to scrap data as the data is loaded lazily.

We **can solve both webpage testing and dynamic web page scraping** by running **JavaScript code using **[**Selenium**](https://www.seleniumhq.org/)** library. **Which is called automate the web browser.

In this post I will discuss about:
1. Installing [Selenium library in Mac and Windows](http://selenium-python.readthedocs.io/getting-started.html)1. Install Headless [Google Chrome driver](https://sites.google.com/a/chromium.org/chromedriver/downloads) in Mac and Windows1. A Python script to run [github.com](https://github.com/) site in headless browser1. Using Python selenium library to run JavaScript code1. Scraping [**github.com**](http://github.com/)** webpage data** after it loaded1. **Filling** the [**github.com**](http://github.com/)** search form** and **submit by code**1. Finally **taking the invisible browsers screenshot programmatically**
We have a Bangla narrated video tutorial for this solution:

# Setup

We need [pipenv](https://thinkdiff.net/python/python-official-pipenv-packaging-tool-for-virtualenv-and-pip-in-mac-and-windows/) to install Selenium library for this project. **If you don’t know how to install Pipenv then please **[**check my other tutorial**](https://thinkdiff.net/python/python-official-pipenv-packaging-tool-for-virtualenv-and-pip-in-mac-and-windows/)**.**

# 1. Installing Selenium library in Mac and Windows

First in terminal go to a directory. In my case I am in this directory:

`/Users/mahmud/Desktop/demo/sel1`

Now open the Terminal in Mac or PowerShell in Windows and run the following commands:

`pipenv install selenium`

It will create 2 files, Pipfile and Pipfile.lock

Now run the following command to activate sel1 project’s virtualenv.

# 2. Install Headless Google Chrome driver

To automate web browser, which is done in invisible way, we need to install Google Chrome driver. Please visit [the following website](https://sites.google.com/a/chromium.org/chromedriver/downloads) and download the latest released driver for your mac or windows or linux operating system.

Now **unzip the downloaded file**, and c**opy the chromedriver.exe file** in our project directory **sel1**.

# 3. Run the python script

Now in the sel1 directory, create a python script named **chapter9.py** and paste the following codes. [Github Source](https://git.io/vpCuV)

# 4. Run the program

In macOS terminal run the following command:

In windows 10 power shell run the following command. Just use Python instead of Python3

After successfully run the program, you will get a png file named python-github.png.

# 5. Python script analysis

It is a very simple script. At first we import python selenium libraries in our script. Then we create a webdriver object based on some options we provided also we mentioned the google chrome browser driver location via **chrome_driver** object.

Then by **driver.get()** method we load [github.com](http://github.com/) website.

In the **#scrap info section **we **scrap HTML h1 tag data** and **print it in the console**. **This is how we scrap** via selenium and headless web driver.

In the #scrap info section we scrap HTML h1 tag data and print it in the console. This is how we scrap via selenium and headless web driver.

We see “Built for developers” is printed in the terminal.

Finally we fill and submit the form by code. To select the search form in the webpage by javascript, we use Google Chrome Browser’s Inspect code option to check the form element name.

This is the code that automates search and submit the form:

To take screenshot of the final page we write the following code:

This is one of the way we can use selenium library in Python to execute JavaScript to test webpage or scrap dynamic or static website information.

**Reference:**
1. Selenium: [https://www.seleniumhq.org](https://www.seleniumhq.org/)
2. Selenium Python Docs: [http://selenium-python.readthedocs.io/getting-started.html](http://selenium-python.readthedocs.io/getting-started.html)

3. Google Chrome Web Driver: [https://sites.google.com/a/chromium.org/chromedriver/downloads](https://sites.google.com/a/chromium.org/chromedriver/downloads)

Source:[ Thinkdiff.net](http://thinkdiff.net/python/how-to-run-javascript-in-python-web-scraping-testing/)

# master web scraping : understand the big picture

In this post we will explain how to do web scraping with beautiful soup and selenium.

# selenium web driver

Any data scraping task start with a url to page which contain data need to be scraped. Selenium web driver will take input url and produce content in html.

Some people will ask, why we need selenium ? because we could simply use package like `requests` to download html from input url.

First reason is now a day, a lot of modern web page is dynamic meain contain javascript. Actual html content only be created when javascript code running through browser.

For example if you run following code, console will print out only js code due to `requests` could not handle js

Second reason to use selenium is some time in order to go to page contain needed information, we need to do some action on browser like login, click to access some where.

# beautiful soup

After html content is render with selenium web driver, we need `beautiful soup` to parse this html to pull out target data.

Before use beautiful soup we need to know where our data located inside html structure. Normally we will use chrome developer tool to do this. Then finally we could pull out texts or links from html.

Access my full course on [master web scraping with python](https://www.datamadeeasy.co/courses/master-web-scraping-with-python-do-16-projects)

# EZ Web Scraping

Before I actually learned how to do it the concept of web scraping seemed like something extremely complicated and advanced. Using a few simple packages in python, however, it turns out its something that can be learned in an afternoon.

To accomplish some basic web scraping tasks, all you really need is requests and BeautifulSoup.

From there, you can simply request a url (after checking that the website allows you to do so, of course) to get the html:

From there you can use BeautifulSoup to organize the content in a manageable way and search through it by element.

The above will return all of the ‘td’ elements with the class ‘title’ which you can then further refine.

Using the above basic skills and something like Chrome’s developer tools, you can learn to scrape almost any basic information off of a website.

# Coupling Web Scraping with Functional programming in R for Scale

In this article, we will see how to do web scraping with R while doing so, we’ll leverage functional programming in R to scale it up. The nature of the article is more like a cookbook-format rather than a documentation/tutorial-type, because the objective here is to explain how effectively web scraping can be coupled with Functional Programming

## **Web Scraping in R**

Web scraping needs no introduction among Data enthusiasts. It’s one of the most viable and most essential ways of collecting Data when the data itself isn’t available.

Knowing web scraping comes very handy when you are in shortage of data or in need of Macroeconomics indicators or simply no data available for a particular project like a Word2vec / Language with a custom text dataset.

`rvest` a beautiful (like BeautifulSoup in Python) package in R for web scraping. It also goes very well with the universe of `tidyverse` and the super-handy `%&gt;%` pipe operator.

## **Sample Use-case**

Text Analysis of how customers feel about Etsy.com. For this, we are going to extract reviews data from [trustpilot.com](http://trustpilot.com).

Below is the R code for scraping reviews from the first page of Trustpilot’s Etsy page. [URL: https://www.trustpilot.com/review/www.etsy.com?page=1](https://www.trustpilot.com/review/www.etsy.com?page=1)

This is fairly a straightforward code where we pass on the URL to read the html content. Once the content is read, we use `html_nodes` function to get the reviews text based on its `css selector property` and finally just taking the text out of it `html_text()` and assigning it to the R object `reviews` .

Below is the sample output of `reviews`:

Well and Good. We’ve successfully scraped the reviews we wanted for our Analysis.

But the catch is the amount of reviews we’ve got is just 20 reviews — in that as we can see in the screenshot we’ve already got a non-English review that we might have to exclude in the data cleaning process.

This all puts us in a situation to collect more data to compensate the above mentioned data loss and make the analysis more effective.

## Need for Scale

With the above code, we had scraped only from the first page (which is the most recent). So, Due to the need for more data, we have to expand our search to further pages, let’s say 10 other pages which will give us 200 raw reviews to work with before data processing.

## Conventional Way

The very conventional way of doing this is to use a loop — typically `for`loop to iterate the URL from 1 to 20 to create 20 different URLs (String Concatenation at work) based on a base url. As we all know that’s more computationally intensive and the code wouldn’t be compact either.

## **The Functional Programming way**

This is where we are going to use R’s functional programming support from the package `purrr` to perform the same iteration but quite in R’s `tidy` way within the same data pipeline as the above code. We’re going to use two functions from `purrr` ,
1. `map()` is the typical map from the functional programming paradigm, that takes a function and maps onto a series of values.1. `map2_chr()` is the evolution of map that takes additional arguments for the function and formats the output as a character.
**Below is our Functional Programming Code**

As you can see, this code is very similar to the above single-page code and hence it makes it easier for anyone who understand the previous code to read this through with minimal prior knowledge.

The additional operations in this code is that we build 20 new URLs (by changing the query value of the URL) and pass on those 20 URLs one-by-one for web scraping and finally as we’d get a list in return, we use `unlist` to save all the reviews whose count must be 200 (20 reviews per page x 10 pages).

Let’s check how the output looks:

Yes, 200 reviews it is. That fulfills our goal of collecting (fairly) sufficient data for performing the text analysis use-case we mentioned above.

But the point of this article is to introduce you to the world of functional programming in R and to show how easily it fits in with the existing data pipeline / workflow and how compact it is and with a pinch of doubt, how efficient it is (than a typical for-loop). Hope, the article served its purpose.
- **If you are more interested, Check out this **[**Datacamp course on Functional Programming with purrr**](https://www.datacamp.com/courses/foundations-of-functional-programming-with-purrr?tap_a=5644-dce66f&amp;tap_s=210728-e54afe)- The complete code used here is available [here on github](https://github.com/amrrs/blogpost_codes/blob/master/rvest_purrr_scraping_at_scale.R)
**Thanks: This entire article and code was inspired by the Session that Saurav Ghosh took in the Bengaluru R user group meetup**

# How can Competitive Business Intelligence (BI) escalate your Success?

You wish to ace it, but is it so easy to do so? You recognize your market; however, do they recognize you as well? You have a massive variety of items for your customers; however, are they of real worth to your clients or consumers? How to really defeat your competition at this game?

A universal answer to all these questions is [**Competitive Business Intelligence obtained from web data scraping**](http://www.3idatascraping.com/business-intelligence-web-scraping-services.php)!!! If you typically aren’t leveraging big information to your benefit, then you are missing out on those instrumental data mining benefits that your competitors are already doing. You need to understand that there are rivals keeping a competitive eye on you.

## What can Big Information deliver to a business?

For beginners, it could aid you to snoop your competitors. Considering that today’s economic situation has become a lot fiercer, businesses, as well as vendors have actually been aiming to ace the race. Currently, [big data](https://en.wikipedia.org/wiki/Big_data) simply makes it all that easier. With the right tools in place, you not just understand exactly what your rivals do daily, weekly, monthly, or yearly; but even discover exactly what they are doing now.

## Big data analytics offers actual real-time understandings on Market Intelligence, which gives the capability to:
- Determine successful prices that could help you get an edge over others- Projection of future strategies by determining the influence of cost modifications- Automate the prices to guarantee uniformity of costs while removing error-prone jobs- Carry out product positioning while optimizing revenue possibilities- Mimic real-time “what-if” circumstances for forecasting alternative method results- Localize rates based upon consumer needs as well as affordable habits
Regardless of this, 75% sellers do not make use of real-time affordable analytics.

## What is more than likely to be exposed after evaluation of such details?
- **Action-Based Insights**: Knowledge about the kind of activities that must be undertaken.- **Anticipative Insights**: Circumstances that may take place.- **Analytical Insights**: What occurred in the past, and why?- **Detailed Insights**: A ‘what’s taking place currently’ perspective based on real-time information.
## How it’s done?

There is a remarkable quantity of understandings that big information could discover, yet to be able to utilize it to your advantage needs a framework. Below are a couple of points to watch out for:
- **Automation Possibilities need to be scrutinized**
Constantly inspect that the procedures you are preparing to use could be automated or not. In spite of the fact that today everything could be automated, it’s best to be assured. You do not wish to end up doing such a stressful job manually.
- **Resources need to be Validated**
Be specific that the details you are placing for evaluation is exact and also from a qualified resource. Guarantee that you feed the appropriate kind of information for the most precise outcomes.
- **Insights need to be Immediate**
Produce applications that make it simpler for team members to draw out real-time details while placing the same for evaluation. When dealing with challenging clients, this could be extremely useful.
- **Collect Responses for both Performing &amp; Non-Performing Locations**
The most effective feature of competitive business intelligence is the location-specific understandings. These kinds of understandings could be several of one of the most important little bits of information you will certainly stumble upon.
- **Identify Violations taking place within your Approach**
Make your approaches smarter. Your approach can not be as easy as decreasing the cost each time your rival does. Your method needs to make it possible for constant growth as well as most valuable activities based on your sales technique.
- **Develop plans leading to advance preparation for Longer Terms**
Constantly think of long-term preparation for cost reduction by matching your rival’s activities. You require taking into consideration whether decreasing the cost of a provided product diminish inventory too rapidly or not.

Want Competitive Business Intelligence (BI) solutions at cost-effective or cheaper rates to leverage your company growth? See us at [3i Data Scraping](http://www.3idatascraping.com/), your ultimate Big Data outsourcing partners.

**Originally published at **[**www.3idatascraping.com**](http://www.3idatascraping.com/how-can-competitive-business-intelligence-bi-escalate-your-success.php)** on November 16, 2017.**

# Web scraping with Python(using BeautifulSoup)

As usual the first set of questions always go like this, what is web scraping? What is the usefulness? And how do I do it? Now, to answer the first two questions with the simplest of words, web scraping is simply the collection of specific data or information from a web site or a simple web page, to which this information or data could be used for analysis or whatever the web scraper needs such information for. Several programming languages can be used for web scraping, but as stated above we would be using the python programming language to scrape a web site. How do I do it? lets get right to it with a simple example. First, it would be a good thing to note that one of the languages used in building a website is the Hyper Text Mark-up Language(HTML). HTML contains large amount of data in text form. To scrape data from a web site, we would use the beautifulsoup4 from the bs4 python library and the lxml parser( there are other types of parsers but we would be using ‘lxml’ for this example). These tools are way more preferable, very helpful and easy to use when it comes to web scraping.

**Getting Started:**

You would need to create a folder, after which you create a virtual environment in that folder, then install these tools and libraries in the virtual environment. All these steps would be done in the command prompt using pip.

I will assume that most of the readers have an idea even if it’s a little knowledge on HTML, but if you have none, you could always skim through a good free source website, in which I will recommend “w3schools.com”.

Now if you are using sublime text, all you have to do is drag your folder named “work’’ into the sublime text application and you are ready to code. If you have a well downloaded anaconda application, jupyter notebook has all these installed, so you would not have to go through the ‘Getting started’ phase.

Our task is really simple, we are to get the name of movies from ‘[http://toxicwap.com/New_Movies/](http://toxicwap.com/New_Movies/)’ and their links. In your already set compiler, you import the libraries.

**Importing Libraries:**

**Getting the raw data:**

After importing the libraries, you get the information in text format from the web page using requests.get().text

**Parsing:**

Now, you have gotten the information needed, so you parse through the text using lxml, you make it clean and readable using prettify().

**Inspecting the web page:**

Go back to the web page and inspect it( you right click and and select inspect), you then navigate the web page from the source code seen, you navigate to the point you are able to highlight the part you want to scrape. When you have gotten all you need, you go back to your code then look through your “prettified” text. When going through your cleaned up data(prettified text) you would see the code you highlighted from the web page, depending on the site you are scraping you may have to dig a lot deeper before getting to what you want.

**Digging(navigating) through the text data:**

To explain the code. First, if you are doing exactly what I am doing, when you inspect the web page you would notice the tags are mostly “div”, now line 1 selects the particular div that holds the content you want to scrape. Line 2 digs deeper into the div to the ul(unordered list) and line 3 digs into the ul to the li(list). Well, We all know what line 4 does( it displays the list).

Note: some sources online use ‘class_=()’ when trying to get to a particular div, but you would notice that in this particular case the prettified text did not display the class of the div, hence resulting to the use of ‘attrs ={}’.

Now, the first line says put in the variable named title the text which can be found in the ‘a’ tag(&lt;a&gt;: link tag in HTML), which is also found in the ‘li’ tag. It is literally just digging from ‘li’ into ‘a’ to the ‘text’. From what I have said, you should be able to interpret the third line. Basically, you are already done, but this written code will get you just the first title and the first link, to get all the titles and links you use a for loop.

**Displaying the whole output:**

Notice how .find() changed to .find_all()? That’s what you do when you want to get all the data needed. It is good practice to use .find() first when trying to navigate, then when the code format is gotten you use the .find_all() to get the data remaining. So now the whole code should look like this.

**Complete code:**

You are done, but if you want to save the scrapped data into a text file or csv file, you can. I’ll be saving this into a csv file.

**Saving in a format:**

I would like to add that some websites make it really hard to scrape their page and for some it is illegal to scrape their page.

That is it. It is all done. I guess I could say you just learnt how to scrape a website.

# Scraping Data from Website to Excel

You probably know how to use basic functions in Excel. It’s easy to do things like sorting, applying filters, making charts, and outlining data with Excel. You even can perform advanced data analysis using pivot and regression models. It becomes an easy job when the live data turns into a structured format. The problem is, how can we extract scalable data and put it into Excel? This can be tedious if you doing it manually by typing, searching, copying and pasting repetitively. Instead, you can achieve automated data scraping from websites to excel.

In this article, I will introduce several ways to save your time and energy to scrape web data into Excel.

**Disclaimer**: There many other ways to scrape from websites using programming languages like PHP, Python, Perl, Ruby and etc. Here we just talk about how to scrape data from websites into excel for non-coders.

# **Getting web data using Excel Web Queries**

Except for transforming data from a web page manually by copying and pasting, Excel Web Queries is used to quickly retrieve data from a standard web page into an Excel worksheet. It can automatically detect tables embedded in the web page’s HTML. Excel Web queries can also be used in situations where a standard ODBC(Open Database Connectivity) connection gets hard to create or maintain. You can directly scrape a table from any website using Excel Web Queries.

The process boils down to several simple steps (Check out [this article](http://www.excel-university.com/pull-external-data-into-excel/)):

1. Go to Data &gt; Get External Data &gt; From Web

2. A browser window named “New Web Query” will appear

3. In the address bar, write the web address

(picture from excel-university.com)

4. The page will load and will show yellow icons against data/tables.

5. Select the appropriate one

6. Press the Import button.

Now you have the web data scraped into the Excel Worksheet — perfectly arranged in rows and columns as you like.

# **Getting web data using Excel VBA**

Most of us would use formula’s in Excel(e.g. =avg(…), =sum(…), =if(…), etc.) a lot, but less familiar with the built-in language — Visual Basic for Application a.k.a VBA. It’s commonly known as “Macros” and such Excel files are saved as a **.xlsm. Before using it, you need to first enable the Developer tab in the ribbon (right click File -&gt; Customize Ribbon -&gt; check Developer tab). Then set up your layout. In this developer interface, you can write VBA code attached to various events. Click HERE (https://msdn.microsoft.com/en-us/library/office/ee814737(v=office.14).aspx) to getting started with VBA in excel 2010.

Using Excel VBA is going to be a bit technical — this is not very friendly for non-programmers among us. VBA works by running macros, step-by-step procedures written in Excel Visual Basic. To scrape data from websites to Excel using VBA, we need to build or get some VBA script to send some request to web pages and get returned data from these web pages. It’s common to use VBA with XMLHTTP and regular expressions to parse the web pages. For Windows, you can use VBA with WinHTTP or InternetExplorer to scrape data from websites to Excel.

With some patience and some practice, you would find it worthwhile to learn some Excel VBA code and some HTML knowledge to make your web scraping into Excel much easier and more efficient for automating the repetitive work. There’s a plentiful amount of material and forums for you to learn how to write VBA code.

# **Automated Web Scraping Tools**

For someone who is looking for a quick tool to scrape data off pages to Excel and doesn’t want to set up the VBA code yourself, I strongly recommend automated web scraping tools [(https://www.octoparse.com/) ](http://www.octoparse.com)to scrape data for your Excel Worksheet directly or via API. There is no need to learn programming. You can pick one of those web scraping freeware from the list, and get started with extracting data from websites immediately and exporting the scraped data into Excel. Different web scraping tool has its pros and cons and you can choose the perfect one to fit your needs.

Check out [this post](https://www.octoparse.com/blog/top-30-free-web-scraping-software/) and try out these TOP 30 free web scraping tools

# **Outsource Your Web Scraping Project**

If time is your most valuable asset and you want to focus on your core businesses, outsourcing such complicated web scraping work to a proficient web scraping team that has experience and expertise would be the best option. It’s difficult to scrape data from websites due to the fact that the presence of anti-scraping bots will restrain the practice of web scraping. A proficient web scraping team would help you get data from websites in a proper way and deliver structured data to you in an Excel sheet, or in any format you need.

**Don’t hesitate if you have things to say. I am a passionate web scraper. **Welcome to read more articles, and learn web scraping at [**Octoparse**](http://www.octoparse.com)**.**

# A Serverless Pipeline to retrieve, validate, and immerse the data to Azure SQL Server from Twitter.

> Learning how to do data science is like learning to ski. You have to do it.

## Project Statement:

Given a twitter ID, get a minimum of 100 followers (Modified this to keep in Azure function 5–10 min timeout period) and for each follower gather up to 200 tweets.<br>Store the tuple (twitterID,followerID,tweetID,tweet) into a table managed in Azure SQL Service.<br>1) You will have to create and set up a free Azure account.<br>2) Create a database and a table in that Azure account.<br>3) Create a twitter account with API <br>4). given twitter ID, gather follower ids of that twitter ID<br>4.1) for each of the follower ID gather up to 200 original tweets <br> — — exclude retweets, messages <br>5) Store that into the Azure table<br>6) Write a client to query that Azure table.<br>6.1) List all tweets for a given twitter ID<br>6.2) List follower ID for a given twitter ID

## Technology Used:
1. Python1. Twython library to extract tweeter data1. Azure Function1. Azure SQL server
## Things I learned:
1. Azure SQL Server Usage from localhost as well as Azure Server-less and Azure Databricks.1. Azure Function.1. Learned [twython](https://twython.readthedocs.io/en/latest/) library usage to extract tweets.
## Brief Summary of steps followed while doing the [project](https://github.com/ksw25/Extract-Data-From-Tweeter-And-Save-In-Azure-SQL-Using-Azure-ServerLess):
1. Created a [Tweeter Developer Account](https://developer.twitter.com/en/apply-for-access.html).1. Wrote a python script to extract the Follower’s ID for a given User ID.
3. Wrote a python script the take Followers ID extracted in the previous step and retrieve at max 200 tweets for each.

4. Created an Azure SQL database.

5. Wrote a python script to take the result from step 3 and save it to the Azure SQL server.

6. I created an Azure function project and func. Modify script to work on Azure Function.

7. Create 2 More Client functions for the following purpose.
- List all tweets for a given twitter ID- List follower ID for a given twitter ID
## Links for each Azure Functions:

(These are templates for you guys to look over. I have turned off the activation of these links so that they won’t work. **I am not rich, sadly 😢 😭 .**)

Task 1: To save Followers’ ID and their Respective Tweets. (Placed in TweetWork in MyFunctionProj Directory)
- [https://demo.azurewebsites.net/api/Tweetwork](https://demo.azurewebsites.net/api/Tweetwork)- for example [https://demo.azurewebsites.net/api/Tweetwork?name=25073877](https://demo.azurewebsites.net/api/Tweetwork?name=25073877)
Task 2: List all tweets for a given twitter ID. (Placed in Client1BigData in MyFunctionProj Directory)
- [https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAKnX09CN1vrg==](https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAKnX09CN1vrg==)- for example [https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAK9CN1vrg==&amp;name=979178022367461376](https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAK9CN1vrg==&amp;name=979178022367461376)
Task 3: List follower ID for a given twitter ID. (Placed in Client2BigData in MyFunctionProj Directory)
- [https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAK9CN1vrg==](https://demo.azurewebsites.net/api/Client1BigData?code=NyhLElXnjBz08QButk1jkbaYLVdJE9vAK9CN1vrg==)- for example [https://demo.azurewebsites.net/api/client2bigdata?code=2MO/r/Wvk5JQFsbQ1KKkA0hdWF1OCfdeyZjpENpoNkVGIS57Waw==&amp;name=25073877](https://demo.azurewebsites.net/api/client2bigdata?code=2MO/r/Wvk5JQFsbQ1KKkA0hdWF1OCfdeyZjpENpoNkVGIS57Waw==&amp;name=25073877)
## Challenges Faced:
- If you are using Mac for debugging Azure function in Visual Studio, it is very hard as sometimes Visual studio does not create an exact extension/helper file to make debugging work. Personally, For me, It didn’t work at all. I had to push function online every time I wanted to check it. **But I found the solution for it now. **There are three files in .vscode then are sometimes screwed up. I would be mentioning them and what should it looks like. Namely,1. **task.json**
**2. launch.json**

**3. settings.json**
- Azure Functions has its limitation as compared to AWS lambda. When I started writing it, I thought it would be the same as AWS lambda as both are serverless, but implementing it was way hard for two reasons. First, Azure function does not allow online code editing, which is provided by AWS.
## Follow up:
- If I were making this for a company and had enough resources, I would have gone with Azure function Dedicated App Plan, which has a maximum time limit of 30 mins.
Github: [https://github.com/ksw25/Extract-Data-From-Tweeter-And-Save-In-Azure-SQL-Using-Azure-ServerLess](https://github.com/ksw25/Extract-Data-From-Tweeter-And-Save-In-Azure-SQL-Using-Azure-ServerLess)

## Acknowledgments :
- I did this as part of CS6513 Big Data Tools and Techniques at the Tandon School of Engineering, NYU- I acknowledge the IBM Power Systems Academic initiative for underwriting computing resources.- I acknowledge MSFT Azure for providing free Azure access to students.
Regards,

**Karanpreet Singh Wadhwa**

**Master’s** in **Computer Science** | Class 2020

Tandon School of Engineering | New York University

Graduate Teaching Assistant — Computer Vision | New York University

[karan.wadhwa@nyu.edu](mailto:karan.wadhwa@nyu.edu)| (929) 287–9899 | [LinkedIn](https://www.linkedin.com/in/karanpreet-wadhwa-540388175/) | [Github](https://github.com/ksw25)

# ReactJS Examples

I’m writing some ReactJS examples to demonstrate how we use React as the view rendering library. It also shows how we do data-view separation.

You can find the examples in the following CodePen collection:

[http://codepen.io/collection/XwaeGM/](http://codepen.io/collection/XwaeGM/)

# Web Crawling? eh.. What is it?

Hey folks! This post is for all those who have always wondered what web crawling is, how do you do it but have never been able to understand it. Lo and behold! your search stops here..:) In layman’s terms, Web crawling is the art of extracting vast amounts of **information** from the world wide web.

Hey so what.. what’s so different about it? Extracting data was done years ago(large data sheets, hand-written bank records, all people staying at a hotel, etc). Ahem!.. wait! Imagine the online register at the entrance of a hotel that was built a few years ago. Now, imagine one million such registers containing the exact same information of people who have visited the hotel since that time. You are the new supervisor and are supposed to draw out the details of all those people. That’s tough! right? A hard working guy would take a paper and a pen and manually do all the hard work. A smart guy would write a code that automatically does this for him. That’s one kind of web scraping and crawling.

**Web crawlers** are also known as ****spiders**** because of the their very nature to walk through the ****world wide**** ****web****. Yes, they are the soul of online search engines that help you with relevant pages in barely a fraction of a second! How? These silent warriors pack their tools and tricks up their sleeves and go around the world downloading bulk of information from the online document store(i.e. WWW). Just to generate more interest among you guys I am sharing another link [here](http://bostinno.streetwise.co/2015/04/16/recorded-future-has-raised-12m-for-its-cyber-threat-web-crawling-service/). Just read it and think about it. If you want to further try out something, then [y](https://sidlearnstocrawl.wordpress.com/2015/06/27/first-chapter-learning-basics/)ou can get your [feet wet here](/@siddharthalibra13/first-chapter-learning-basics-c14ef98230f3).

**Originally published at **[**sidlearnstocrawl.wordpress.com**](https://sidlearnstocrawl.wordpress.com/2015/04/17/web-crawling-eh-what-is-it/)** on April 17, 2015.**

# How Xpath Plays Vital Role In Web Scraping Part 2

To read the first part of this blog do read:

## How Xpath Plays Vital Role In Web Scraping - Data hut

### XPath is a language for finding information in structured documents like XML or HTML. You can say that XPath is (sort…

#### blog.datahut.co

Here is a piece of content on Xpaths which is the follow up of [How Xpath Plays Vital Role In Web Scraping](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping/)

Let’s dive into a real-world example of scraping amazon website for getting information about deals of the day. Deals of the day in amazon can be found at this . So navigate to the (deals of the day) in Firefox and find the XPath selectors. Right click on the deal you like and select “Inspect Element with Firebug”:

If you observe the image below keenly, there you can find the source of the image(deal) and the name of the deal in src, alt attribute’s respectively. So now let’s write a generic XPath which gathers the name and image source of the product(deal). //img[@role=”img”]/@src ## for image source //img[@role=”img”]/@alt ## for product name

In this post, I’ll show you some tips we found valuable when using XPath in the trenches.

If you have an interest in Python and web scraping, you may have already played with the nice [requests library ](http://docs.python-requests.org/)to get the content of pages from the Web. Maybe you have toyed around using [Scrapy selector ](http://doc.scrapy.org/en/latest/topics/selectors.html)or to make the content extraction easier. Well, now I’m going to show you some tips I found valuable when using XPath in the trenches and we are going to use both and [Scrapy selector ](http://doc.scrapy.org/en/latest/topics/selectors.html)for HTML parsing.

Avoid using expressions which contains(.//text(), ‘search text’) in your XPath conditions. Use contains(., ‘search text’) instead.

Here is why: the expression .//text() yields a collection of text elements — a node-set(collection of nodes).and when a node-set is converted to a string, which happens when it is passed as argument to a string function like contains() or starts-with(), results in the text for the first element only.

**Scrapy Code:**

from scrapy import Selector<br> html_code = “””&lt;a href=”#”&gt;Click here to go to the &lt;strong&gt;Next Page&lt;/strong&gt;&lt;/a&gt;”””<br> sel = Selector(text=html_code)<br> print xp(‘//a//text()’)<br> xp = lambda x: sel.xpath(x).extract() # Let’s type this only once # Take a peek at the node-set<br> [u’Click here to go to the ‘, u’Next Page’] # output of above command<br> print xp(‘string(//a//text())’) # convert it to a string # output of the above command<br> [u’Click here to go to the ‘]

Let’s do the above one by using lxml then you can implement XPath by both lxml or Scrapy selector as XPath expression is same for both methods.

**lxml code:**

from lxml import html <br> html_code = “””&lt;a href=”#”&gt;Click here to go to the &lt;strong&gt;Next Page&lt;/strong&gt;&lt;/a&gt;””” # Parse the text into a tree<br> parsed_body = html.fromstring(html_code) # Perform xpaths on the tree<br> print parsed_body(‘//a//text()’) # take a peek at the node-set<br> [u’Click here to go to the ‘, u’Next Page’] # output<br> print parsed_body(‘string(//a//text())’) # convert it to a string<br> [u’Click here to go to the ‘] # output

A node converted to a string, however, puts together the text of itself plus of all its descendants:

&gt;&gt;&gt; xp(‘//a[1]’) # selects the first a node<br> [u’&lt;a href=”#”&gt;Click here to go to the &lt;strong&gt;Next Page&lt;/strong&gt;&lt;/a&gt;’]

&gt;&gt;&gt; xp(‘string(//a[1])’) # converts it to string<br> [u’Click here to go to the Next Page’]

Beware of the difference between //node[1] and (//node)[1]//node[1] selects all the nodes occurring first under their respective parents and (//node)[1] selects all the nodes in the document, and then gets only the first of them.

from scrapy import Selector

sel = Selector(text=html_code) <br> xp = lambda x: sel.xpath(x).extract()

xp(“//li[1]”) # get all first LI elements under whatever it is its parent

xp(“(//li)[1]”) # get the first LI element in the whole document

xp(“//ul/li[1]”) # get all first LI elements under an UL parent

xp(“(//ul/li)[1]”) # get the first LI element under an UL parent in the document

//a[starts-with(@href, ‘#’)][1] gets a collection of the local anchors that occur first under their respective parents and (//a[starts-with(@href, ‘#’)])[1] gets the first local anchor in the document.

When selecting by class, be as specific as necessary.

If you want to select elements by a CSS class, the XPath way to do the same job is the rather verbose:

***[contains(concat(‘ ‘, normalize-space(@class), ‘ ‘), ‘ someclass ‘)]**

Let’s cook up some examples:

&gt;&gt;&gt; sel = Selector(text=’&lt;p class=”content-author”&gt;Someone&lt;/p&gt;&lt;p class=”content text-wrap”&gt;Some content&lt;/p&gt;’)

&gt;&gt;&gt; xp = lambda x: sel.xpath(x).extract()

BAD: because there are multiple classes in the attribute

[]

BAD: gets more content than we need

&gt;&gt;&gt; xp(“//*[contains(@class,’content’)]”)

[u’&lt;p class=”content-author”&gt;Someone&lt;/p&gt;’, u’&lt;p class=”content text-wrap”&gt;Some content&lt;/p&gt;’]

&gt;&gt;&gt; xp(“//*[contains(concat(‘ ‘, normalize-space(@class), ‘ ‘), ‘ content ‘)]”) <br> [u’&lt;p class=”content text-wrap”&gt;Some content&lt;/p&gt;’]

And many times, you can just use a CSS selector instead, and even combine the two of them if needed:

&gt;&gt;&gt; sel.css(“.content”).extract() <br> [u’&lt;p class=”content text-wrap”&gt;Some content&lt;/p&gt;’]

&gt;&gt;&gt; sel.css(‘.content’).xpath(‘@class’).extract() <br> [u’content text-wrap’]

Learn to use all the different axes.

It is handy to know how to use the axes, you can follow through these examples .

In particular, you should note that following and following-sibling are not the same thing, this is a common source of confusion. The same goes for preceding and preceding-sibling, and also ancestor and parent.

**Useful trick to get text content**

Here is another XPath trick that you may use to get the interesting text contents:

//*[not(self::script or self::style)]/text()[normalize-space(.)]

This excludes the content from the script and style tags and also skip whitespace-only text nodes.

Tools &amp; Libraries Used:

Firefox<br> Firefox inspect element with firebug<br> Scrapy : 1.1.1<br> Python : 2.7.12<br> Requests : 2.11.0

Have questions? Comment below. Please share if you found this helpful.

Read the original article here: [https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping-part-2/](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping-part-2/)

**Originally published at **[**https://blog.datahut.co**](https://blog.datahut.co/how-xpath-plays-vital-role-in-web-scraping-part-2/)** on August 26, 2016.**

# Need to know about the scrapping a car

## Get to know where to sell your car with no difficulty

### Selling a car can be such a pain if you do not explore the web and not find out what to do with the car, how to sell it…

#### buycarstoday.blogspot.com

Selling a car can be such a pain if you do not explore the web and not find out what to do with the car, how to sell it and what price to demand the car itself.

# How do we find daily good deals online, automatically?

## Basic web content scraping with R to automate boring tasks

> Background

As defined [here](https://discuss.analyticsvidhya.com/t/what-are-different-paths-in-data-sciences/302), “a data scientist is someone who is better at statistics than any software engineer and better at software engineering than any statistician.” Therefore, this blog post focuses on the practice of web content scrapping, which is an essential skill for data scientists to acquire information outside of structured databases, and when APIs are unavailable.

When looking for good deals online, we often go on to a few eCommerce websites frequently to check the prices on the items we want. After a while, this becomes a tedious task. Inspired by [**The Programmer’s Guide to Booking a Plane**](https://hackernoon.com/the-programmers-guide-to-booking-a-plane-11e37d610045#.z50j983vh), in which Zeke wrote a script in Node to automate the process of finding cheap plane tickets, we would like to replicate his method on good MacBook deals, using a few packages in R.

> Objective

The objective is to receive automatic email alerts when the MacBook price drops to below a certain point.

> Approach
1. **Scrap the product information from the eCommerce website**
We need to load the html structure of the website first, in order to retrieve the information we need. The R package we will be using is **rvest**.

After saving the URL html, we need to find the section of information that we need, by inspecting the page source. We will search a price to navigate to product related information, as shown below.

We noticed that product related information is under <br>**&lt;div class=”b-content”&gt;**<br>and therefore we will extract this part only.

An excellent Chrome add on called **SelectorGadget** can be downloaded [here](https://chrome.google.com/webstore/detail/selectorgadget/mhjhnkcfbdhnjickkkdbjoemdmbfginb?hl=en). This tool allows us to intuitively select the specific content we want.

When we select the name of the product, the content will be highlighted in green, as shown below. The tool also guesses that we also want other product names as well, and therefore it will highlight other product names in yellow. For any content that we do not need, we can click on it and it will be removed (the color will turn red).

We found that product name can be extracted using **.product-name**, as shown on the bottom of the page.

Next we will repeat the process to find price and save it in numeric format.

After we are done, we can save name and price in a dataframe.

We will also need to scrap multiple pages to extract all the information.

The final result is stored below in dataframe format.

**2. Create rules to send out email alerts**

Next, we will set up the rules to receive email alerts. Say we only wish to receive alerts on products with price between NT$25,000 and NT$30,000.

Next we will use the** mailR** package to send out the email, if there is at least one alert, as shown below.

**3. Automate the process by scheduling the task regularly**

This can be done with the **taskscheduleR** package, but currently only available in Windows. Click [here](https://github.com/bnosac/taskscheduleR) for more details. We can schedule the Rscript to run at desired frequency and receive automatic alerts accordingly.

This sums up the short blog on how to scrap content for websites with static content, however, dynamic websites are more complicated and may require additional code to simulate real browsing behaviors, such as member login and form submits. Alternatively, similar task can also be performed in Python with **scrapy** and **BeautifulSoup**.

> R Code

Questions, comments, or concerns?<br>jchen6912@gmail.com

# Theory vs. The World: How Retrieving Links from Google Is not t**hat Easy**

> Do you want to prove a bit of coding helps in the Humanities? Easy!

We all use Google a lot in our research, what if you can store the links you get from search results? This looks like a super-easy task. It takes a second to figure out the steps you need to perform **by hand**: access Google, perform the search, get results, save data, move to the next page, iterate if needed.

Plus the “extract the link” is quite a popular feature in variaty of packages that perform webscraping, you there should be a lot of documentation annd tutorials out there. Even better: the script we want to build is helpful for some colleagues (we’ll work with **Python** here).

It looks like that’s an eay task to learn some new features of a library by putting it in practice. Further, it proves the point of **coding helps in the humanities**.

Cool, so just go. It won’t take long, right? Spoiler: it was not that easy (hence the post).

# The Basic Idea: Requests and BeautifulSoup

The project outline is easy to map and close to what we would do by hand:
1. reach a search engine;1. query it;1. get the results of the query;1. extract all the links;1. save them;1. move to the next page;1. rinse and repeat.
Step 4 looks like the most scary one. We’ll have to inspect the html and get the right tag. But that’s part of the fun. Ok, there are issues lurking here like “how do I find out when I run out of results?”. But we can agree to have a fixed set of pages scraped or even stop a the first one.

Armed with **requests** and **BeautifulSoup** library (if you don’t have them, get the instruction for installation [here](https://2.python-requests.org/en/master/user/install/) and [here](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#installing-beautiful-soup), respectively) we begin our journey with some standard imports:

Next, we build our request to a search engige (Google here). To do that we note that all queries on Google have the url that goes as: ‘[**https://www.google.com/search?q=**](https://www.google.com/search?q=)’ + ‘something to query’.

As we don’t want to keep typing our query as an input, we’ll hard code it, i.e. search ‘Goofy’. Then, we check the status of our request to make sure everything is ok when we access the page.

If you want to input a different query everytime (i.e. not to hard code it) you may go with something like this:

# Getting the Links

We have done tasks 1, 2 and 3 from our sketch. Now comes the tricky part. We need to isolate the links that Google gives us. This means we need to create a BeautifulSoup object for each page returning the search results (i.e. what we called **searchreq**) and process them with BeautifulSoup.

We follow the standard practice and call this object ‘soup’. We also specify it’s html that we want to parse. Then in ‘results’ we are going to use our soup object to return what we need and print it. That’s what we add to our code:

# Scraping the Links

To scrape the links we need to tell BeautifulSoup what we need it to extract. To find this out, we call the inspector mode from our web browser on one of the search results (right click and select inspect on Chrome).

From there we play a game of:
1. finding the items we need;1. extracting patterns or regularities for the items we care about (i.e. the links);1. catch them all.
Our first choice might be something like ‘http’, but this is going to catch a lot of extra stuff as well like links that are **not** search results.

You have to think about HTML patterns and tags. If you look at it (or Google around like crazy), you’ll find out that there’s a nice thing called **div class=“r”** that seems to have what you are looking for.

After a few extra minutes with the BeautifulSoup documentation page, we learn to get them from the soup with: **soup.select(‘.r a’)**.

So we put all together:

We are ready to try this out!

# Stuck: The World Strikes Back

**[]**

Exactly, watch that again. A pair of square brackets. That’s our output.

**[], i.e. **an empty list.

That’s our result. This is disappointing. Why is that? What’s happening? Let’s check what’s going on.

The first we do is try to print our soup object (if you have Ipython, use the shell). Once we have the soup object printed, we try to search our beloved “r” class, the one we are trying to select with out soup object.

**It’s not there!**

This is: **the world getting back on us**. In practice, theory is not enough. So, well, **now we can panic**. What’s going on? This was supposed to be an easy task.

# Ways Out

We start googling more. I went out on Twitter and ask Al Sweigart (the author of [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/), a book you should check if you are starting out with Python) about it. In fact, one of the programs in the book discusses the task of getting links.

Al was kind enough to let me know that’s common practice for Google to obscure its results. That’s why the soup doesn’t match what we looked at. He briefly reminded me there’s life out of Google, so there are chances to be better off searching on different search engines (he suggested duckduckgo).

That’s **reeeeally** important (hence the extra **Es**). Now we know the cause of the problem: **the HTML we see on the Google is not the same we get with our request**. And we already have a hint towards a solution: try asking to different search engines.

We can use these new knowledge to build alternative ways.

# Rethinking the Issue

We have a new problem. The HTML that delivers our search results is partly out of our control. What can we do? Can we get it like we see? Are there ways around it? This depends on how we want to fight.

# 1. Ways Around: Different Search Engines

The first option is to circumvent the problem: we pick a different search engine. In practice, we go on **Wikipedia** and asks for search engines names. We then figure out how the query is asked and hope that the links extraction phase stays the same.

Assuming this, that doesn’t look as a costly option. And we hope one of the engines gives us the same html we can inspect.

# 2. No Way(s): We Fight!

We know what we want to get. Despite the HTML tags being different, we know the links are still there. What about extracting them through [**regular expressions**](https://docs.python.org/3/howto/regex.html)? It will be difficult and maybe sub-optmial, but rather than risking to fight again with HTML obfuscation, etc. we can tackle the issue once and forever.

We’ll write a regular expression extracting all that **http-something**. We can predict we will:
- have double results or even more copies (which we’ll exclude by way of making a **set** out of our results)- have some bad results (like links to you Google account; or extra non-search related links).
Assuming you can identify the bad links, more links than required might be better than the [empty list] we got before.

# 3. Rebuilding: from BeutifulSoup to Selenium

Maybe we can get around the HTML obfuscation and get the search results in a different way. **Selenium** is another popular Python library that allows us to automate our browsing.

Selenium will open the browser for us and then we’ll have a look at the HTML. Should this fail, we may have Selenium inspect the page for us and copy and paste the inspected html.

This seems something that can work **in theory**. But requires extra efforts.

# 4. Download the HTML in Different Ways

We know that obfuscation happens but we do not know how and when. Maybe we can try to download the page and save it on our desktop and operate from there.

This sounds both simple and complicated. Saving a file, easy. Still, we need to access it properly… Is request the way to go? This requires some extra efforts.

# To Do:

Ok, there’s still a problem but the field looks clearer:
- the different ways need exploring;- code should grow and make it to GitHub.
(This is an improved and reviewed version of a previous post that appeared here: [http://www.thegui.eu/blog/scraping-links-from-google-part-1.htm](http://www.thegui.eu/blog/scraping-links-from-google-part-1.htm)).

This work is carried out as part of a **CAS Fellowship** as **CAS-SEE Rijeka**. See more about the Fellowship [here.](http://cas.uniri.hr/cas-see-fellowship-application/)

# How to link preview like Facebook, Twitter, Slack, and WhatsApp

Have you ever wondered how do web applications preview a link once you’ve posted it on your timeline or send a message ?, I’ve been to the sun and back multiple times trying to figure it out.

I had many questions that needed to be answered, but it was either no one understood what I asked or I was asking the wrong questions.

Worrest answers I’ve received were “you can use a web scraper API tool to achieve it, that’s what I used in my project”.

Services like
- [Linkpreview](https://www.linkpreview.net/)- [Scraperapi](https://www.scraperapi.com/)- [Scrapesimple](https://www.scrapesimple.com/)- [Guteurls](https://guteurls.de/)
A few more…..

Until one day I met a guardian angel and I was introduced to [open graph protocol](https://ogp.me/).

Thank you, Emma 🤗.

FYI — The correct word for what we are doing is called web scraping

# What is open graph protocol ?

> The Open Graph protocol enables any web page to become a rich object in a social graph. For instance, this is used on Facebook to allow any web page to have the same functionality as any other object on Facebook.~ Someone from [https://ogp.me/](https://ogp.me/)

In short, it describes a website with objects like title, description, images, and more with `&lt;meta&gt;` tags.

I’m not here to talk about open graph protocol, I’m here to show you how to fetch those data to make your own link preview, so if you want to know more about OGP, here are a couple of links.

FYI — Twitter has its own meta tag, but they use the “twitter” prefix instead of “og”

## What is Open Graph?

### Open Graph is a technology first introduced by Facebook in 2010 that allows integration between Facebook and its user…

#### www.computerhope.com

## Getting Meta: Why Does My Social Post Not Show an Image When I Share a Link?

### How to fix this with The Open Graph protocol

#### medium.com

## Open Graph protocol

### The Open Graph protocol enables any web page to become a rich object in a social graph. For instance, this is used on…

#### ogp.me

## The Essential Meta Tags for Social Media | CSS-Tricks

### These days, almost every website encourages visitors to share its pages on social media. We’ve all seen the ubiquitous…

#### css-tricks.com

# How do we do it ?

It’s a simple process and doesn’t require much work, we will fetch the web page as text in our Node.js application. Then we will select the HTML elements we need and get the data/text it holds, save it to a JSON file then send the data back.

“But how can we select the dom from the back end Adel ?”

Easy, with the help of cheerio and other modules like it, cheerio is a **Fast, flexible, and lean implementation of core jQuery designed specifically for the server.**

# Can we do it on the front end ?

As far as I know, you cant, this cant be done in the front end script, when you try to fetch eg my portfolio or any other site in chrome’s console, it will throw a cors (Cross-Origin Resource Sharing) error.

To bypass this issue, we will send the URL to the back end server, process the request then send back the data we scrapped.

# Prerequisite
- JQuery, if you know how to select an element and get its values, your good.- Async/Await- NodeJS/ExpressJS
# OK LETS CODE!!!

If you want to tag along, I’ve got starter files you can clone/download, and I’ll be adding the completed files too.

## Adel-ak/web-scraping-101

### You can’t perform that action at this time. You signed in with another tab or window. You signed out in another tab or…

#### github.com

**1 — Get to know the front end script**

In our front end script located in the public/javascript folder has a fairly small amount of code in it, we have a click event listener on our add button, which will
- prepend a loading preview card with an id.- send a post request to the backend with the URL link and the card id which was added to the page.- await for the data to come back, then add the data to the correct preview card but searching the id of the card.
This function accepts an id and will add the loading preview to the unordered list,

This function will receive an object, it will get the loading list by its id which was previously added, remove the loading class name then append the data

This function removes a preview card

The UUID CDN was making the app load super slow, thanks to [broofa](https://stackoverflow.com/users/109538) who came up with this function, it will be creating our unique id for each preview card

**2 — Installing modules**

We need to install a few modules.

**Cheerio **to** **load the source code of the webpage we want to crawl.

**ExpressJS** to create our HTTP server.

**Express-handlebars** a template engine that makes writing HTML code easier and renders out page.

**Node-fetch **to make our HTTP request in node.js.

I’ve added these modules to the dependencies, simply install them by running `npm i` in the command line.

**3 — Creating our server**

Over at app.js, we have requested all our modules, set up our view engine and middlewares.

We can start by creating the home route, which will render the home temple and passing it the data in `data.json` (currently, `data,json`is empty).

Open up a command line and run npm start, then in your browser open up localhost://3000.

You should get an empty home page, with just an input filed.

Now we work on fetching the metadata we want to get from a web page, let’s create a post route to receive the id and URL from the front end once the add button is clicked.

In the request body, we are expecting a value from previewUrl and id

Let’s work on fetching the HTML page from my last medium post.

Make the anonymous function into an async/await function, and use the fetch API from the node-fetch module, then create a variable called html and give it the value of the fetch method (make sure you use the await keyword, to wait for a result from the fetch), pass it the previewUrl value from the request body, then chain a `.then(res =&gt; res.text())` to it.

Next, we use cheerio, remember cheerio is an **implementation of **core jquery for the server side.

Create a variable with the $ sign and give it the value of `cheerio.load(), `pass the html variable to the load method, you can now try and select an html element using the $ sign.

We can now start getting the meta tags we want, create a variable named `metaTagData` which will hold an object of the data,

**id** — we will pass in the id from `req.body` to the object,

**url** — the web site url to the url key.

**domain** — For the domain we just need the domain name of the previewUrl, we can use the url module from nodejs to get the hostname.

**title** — use cheerio to select the meta tag with the attribute of `name="title"`

**img**— use cheerio to select the meta tag with the attribute of `name="title"`

**description**— use cheerio to select the meta tag with the attribute of `name="description"` and get the attribute of `content` .

The meta tags have another attribute called `content` that's where the values are stored, to get the values, you need to chain the cheerio selectors with the `attr` method and pass it the string of `content` .

You should end with an object like this.

Now, this should do it, but some web pages use a basic html meta tag, some use open graph, some use twitter cards, some use the property attribute instead of the name attribute, some don't add a image meta tag, we can basically end up with missing data or no data at all.

**Solution**

Creating a function which will return the first thing it finds

We can now change the value of title, img and description of our metaTagData object to the getMetaTag function and pass it a the meta tag name as a string.

And what if a web page doesn't use meta tags at all ?

We add a fallback value on our title, img and description keys.

**title** — will fall back to the first h1 tag on the page

**img** — will fall back to an image in the public/images folder

**description** — will fall back to the first paragraph tag on the page

Some descriptions can get a bit lengthy, I decided to keep all descriptions at a max of 200 character count.

Next, we push the data to the beginning of the data array, using the unshift array method, then write it to the `data.json` file using the `writeFile` from the fs (file system) nodejs module.

The first parameter of the `writeFile` method takes in the file location, the second parameter we pass in the data we want to write to the file, since its a JSON file we need to stringify the data using the`JSON.stringify` method, the third parameter takes in a call back function, where we respond back with JSON and passing it the data using the shift array method and also set the HTTP status to 201.

**Test Run!**

If you start your app, and past a link of any web page then click on add, you should end up with this.

**Deleting the card**

To remove a card, create another post route which will accept an ID from the URL parameter, create a variable named indexOfId and the value you map over the data json array and return the just the id of each object, then chaining the array method `indexOf()` to the map, will give you the exact position of the id you want to remove from the array (make sure you pass in the id from the url parameter to the indexOf method).

Next, we use the splice array method to remove the data from the data json array and passing the first parameter the `indexOfId` variable and second parameter the value `1` , indicating we want to remove just the object from the array.

Then we use the fs nodejs module to rewrite the new edited data to the `data.json` file, and respond back with a status of 200 and using the respond `end()` to end the request.

**Test Run!**

If you try and remove a card, then refresh the page, the removed cards will it will no longer be there.

## End Of The Road!!

## Conclusion

We learned how to create a link preview by web scraping meta tags, but with the power of web scraping, you can do more than scrap meta tags.

Take Adidas as an example, they don't prove an API for their product, images, prices, etc…, and you want to create an eCommerce side project.

You can go to their web page and start scraping the products, but if a web page like adidas.com uses react, angular or vue, it can get complicated to web scrap.

You will need to use a headless browser to get around scraping that kind of web sites.

****!!! Watch out though, it is illegal to scrap some web sites !!!****

## Headless browser resources

## An Introduction to Web Scraping with Puppeteer

### Learn Puppeteer with me in this article.

#### medium.com

## A Guide to Automating &amp; Scraping the Web with JavaScript (Chrome + Puppeteer + Node JS)

### Learn to Automate and Scrape the web with Headless Chrome

#### codeburst.io

## Scraping using zombie.js

### I’m using zombie for testing and want to pull back a list of anchor tags (so not really scraping but a common thing you…

#### medium.com

> Got any questions ?<br>DM me in twitter @Adel_xoxo and I’ll answer to the best of my knowledge~Adel ak

# How I took a break from Job Searching and let Python do it for me.

Another day in the Winter break. The ever looming blade of getting a full time job compels me to go to Indeed.com. I use the Advanced Search set my preferences, location, radius around the location, job title, entry level, full time, how long ago the jobs was posted (I prioritize applying to jobs no older than 15 days) the usual stuff. Hit search and the nightmare begins.

Now, before I complain about Indeed for no reason. I consider it to be one of the best websites for job search — in fact, I got my summer internship through Indeed. It has a great collection of relevant jobs and a nice set of filtering options. But finding full time jobs is kind of a mess because of the wider range of job type that all fall under the same umbrella.
- First, there’s almost way too many results, for this instance 375 to be precise. (which is also a good thing?)- Second, even though I filter for entry level jobs, the description often has a minimum work ex requirement — while It may not necessarily be entry level = 0 work experience, but having jobs with requirement of 5+ years under entry level is doing no good to anyone.- Third, I would eventually stumble upon Intern positions — again not what I am looking for. (So Internship ⊆ Full Time? maybe but come on..)- And four, it takes too much time, I’ve already filtered and filtered and I still find results that do not work for me.
If only I could do this entire chore of going through each and every job title, job description and eliminating unsuitable ones and consolidating the right ones in one place. Well, yes I can, with Python. I consider Python to be a great automation tool, with its rich set of libraries and intuitive syntax, be it data cleaning or arranging my desktop, it never lets me down.

First, task is to find out if at all the job title matches my need. But, how do I know where is what on the webpage and how will my code know that. Lucky for me, Indeed has a very well defined html page structure and I can leverage the semantic class and id tags. View the page source or simply “inspect element” on your choice of page element. And Voila!

If you look closer. All results have the class tag “result”. That’s great, something to begin coding. Lets head over to **atom. ****BeautifulSoup** is a great tool for all things HTML. Plus, it is great for nested search of elements and attributes. Grab the URL,

`url_base = “[https://www.indeed.com/jobs?q=software+engineer](https://www.indeed.com/jobs?q=software+engineer)…”`

load the page into a soup

and lets search for that job. **(pgno is what lets me go through all the pages, but I’m leaving out the details.)**

Now, having seen the html layout. I can get the **div **holding the “result”.

`for job in soup.find_all(class_=’result’):`

I have access to the title, company, location, short description, salary if listed, and the URL for the job.

All kinds of checks can be applied on these, like ignore anything with the work “intern” or “senior”. After doing some more filtering from this information I use the URL to get the job description and get **regex **to find out if its good for me. The regex here checks for 2 things :
1. The required previous experience is not more than 1 year.1. It should not be limited to US Citizens.
If I find either of these in a description, it is thrown out as not suitable.

As evident, I may have played it fast and loose with the regular expressions. But based on the job descriptions I have encountered before (hundreds). This seemed to be enough to eliminate jobs which I did not fit for as well as prevent me loosing out on suitable postings.

So there it is a **s**ample of the process I followed. Although, I did a lot more tweaking and I was more specific about what job titles I targeted.

Here’s the github link to the code: [https://github.com/umangkshah/job-scraping-python/blob/master/job_scraper.ipynb](https://github.com/umangkshah/job-scraping-python/blob/master/job_scraper.ipynb)

All that’s left now is to go and apply. I always make sure that I am a good fit for the job description and that my resume and cover letter has all the relevant details. Currently, I am exploring roles in Self Driving Car teams dealing with Perception, Localization, Mapping or Motion Planning and tricks like this are helping me find specific titles.

This is my first post on Medium (or ever ). I got a lot of help from other Medium articles on writing and formatting. Look forward to write more. I plan to cover some topics in AI/Self Driving Cars too. So thanks for reading, let me know how you optimize your job hunt?
