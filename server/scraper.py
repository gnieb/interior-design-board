# from bs4 import BeautifulSoup
# import requests
# # headers = {'user-agent': 'my-app/0.0.1'}, headers=headers ( would go behind url below
# url = "https://www.architecturaldigest.com/ad-it-yourself"
# html = requests.get(url)
# doc = BeautifulSoup(html.text, 'html.parser')

# articles = doc.find_all("a", class_="SummaryItemHedLink-ciaMYZ cRxRdq summary-item-tracking__hed-link summary-item__hed-link")
# # print(articles)


# articleList =[]
# for article in articles:
#     article = {
#         'href': article.attrs['href'],
#         'title':article.select("h3")[0].text
#     }
#     articleList.append(article)
    
    
# print(articleList)
    
    
    
    # print(article.attrs['href'])
    # print(article.select("h3")[0].text)

# just the titles, practice: 
# titles = doc.select(".SummaryItemHedBase-eaxFWE")
# for title in titles:
#     print(title.contents[0].strip())