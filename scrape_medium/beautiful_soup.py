#  del first child 

from bs4 import BeautifulSoup




with open("test2.html", "r") as content_file:

    content = content_file.read()
  
    soup = BeautifulSoup(content, 'html.parser')

    img_list = soup.find_all('img')

    index = 1
    for img in img_list:
        if index % 2 != 0:
            img.decompose()
        index += 1

    # noscript_list = soup.find_all('noscript')

    # for noscript in noscript_list:
    #     print(noscript)

    f = open("test3.html", "w+")
    f.write(soup.prettify())
    f.close()


