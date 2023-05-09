# from bs4 import BeautifulSoup
# import requests
# # headers = {'user-agent': 'my-app/0.0.1'}, headers=headers ( would go behind url below
# url = "https://www.architecturaldigest.com/ad-it-yourself"
# html = requests.get(url)
# doc = BeautifulSoup(html.text, 'html.parser')

# articles = doc.find_all("div", class_="SummaryItemContent-eiDYMl jpXMZX summary-item__content")

# articleList =[]
# for article in articles:
#     article = {
#         'href': article.select("a")[0].attrs['href'],
#         'title':article.select("h3")[0].text,
#         'subtitle': article.find_all("div", class_="BaseWrap-sc-gjQpdd BaseText-ewhhUZ SummaryItemDek-CRfsi iUEiRd fvXGjH foOOvF summary-item__dek")[0].text
#     }
#     articleList.append(article)
    
    
#     print(articleList)
    
 
    # print(article.select("a")[0].attrs['href'])
    # print(article.select("h3")[0].text)
    # print(article.select(".BaseWrap-sc-SJwXJ.BaseText-fEohGt.SummaryItemDek-dyrmLu.deUlYF.kCxiOh.iunqBX.summary-item__dek")[0].text)

# just the titles, practice: 
# titles = doc.select(".SummaryItemHedBase-eaxFWE")
# for title in titles:
#     print(title.contents[0].strip())
