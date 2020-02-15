
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
