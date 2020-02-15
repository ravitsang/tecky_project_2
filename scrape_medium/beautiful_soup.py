#  del first child 

from bs4 import BeautifulSoup


# html_doc = """
# <html><head><title>The Dormouse's story</title></head>
# <body>
# <p class="title"><b>The Dormouse's story</b></p>

# <p class="story">Once upon a time there were three little sisters; and their names were
# <a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
# <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
# <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
# and they lived at the bottom of a well.</p>

# <p class="story">...</p>
# """

# with open("test2.html", "r") as content_file:

#     content = content_file.read()
  
#     soup = BeautifulSoup(content, 'html.parser')

#     img_list = soup.find_all('img')

#     index = 1
#     for img in img_list:
#         if index % 3 != 0:
#             img.decompose()
#         index += 1

#     print(len(soup.find_all('img')))
#     print(soup.prettify())


#     f = open("test3.html", "a+")
#     f.write(soup.prettify())
#     f.close()
