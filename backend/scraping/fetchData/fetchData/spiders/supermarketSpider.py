import scrapy


class vegfruitSpider(scrapy.Spider):
    name = 'vegfruit'
    start_urls = ['https://www.carrefoursa.com/meyve-sebze/c/1014?show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(),
            }


class meatFishHencoop(scrapy.Spider):
    name = 'meatfishencoop'
    start_urls = ['https://www.carrefoursa.com/et-balik-kumes/c/1044?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class breakfast(scrapy.Spider):
    name = 'breakfast'
    start_urls = ['https://www.carrefoursa.com/kahvaltiliklar/c/1390?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class creme(scrapy.Spider):
    name = 'creme'
    start_urls = ['https://www.carrefoursa.com/krema-ve-kaymak/c/1385']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class cheese(scrapy.Spider):
    name = 'cheese'
    start_urls = ['https://www.carrefoursa.com/peynir/c/1318?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class milk(scrapy.Spider):
    name = 'milk'
    start_urls = ['https://www.carrefoursa.com/sut/c/1311?q=%3AbestSeller&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class butter(scrapy.Spider):
    name = 'butter'
    start_urls = ['https://www.carrefoursa.com/tereyag-ve-margarin/c/1348?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class yogurt(scrapy.Spider):
    name = 'yogurt'
    start_urls = ['https://www.carrefoursa.com/yogurt/c/1389?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class egg(scrapy.Spider):
    name = 'egg'
    start_urls = ['https://www.carrefoursa.com/yumurta/c/1349?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class olive(scrapy.Spider):
    name = 'olive'
    start_urls = ['https://www.carrefoursa.com/zeytin/c/1356?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class yeast(scrapy.Spider):
    name = 'yeast'
    start_urls = ['https://www.carrefoursa.com/yogurt-kefir-mayasi/c/1038']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class pickle(scrapy.Spider):
    name = 'pickle'
    start_urls = ['https://www.carrefoursa.com/tursular-ve-salamuralar/c/1234?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class oil(scrapy.Spider):
    name = 'oil'
    start_urls = ['https://www.carrefoursa.com/sivi-yaglar/c/1111?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class legume(scrapy.Spider):
    name = 'legume'
    start_urls = ['https://www.carrefoursa.com/makarna-pirinc-ve-bakliyat/c/1121?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class canned(scrapy.Spider):
    name = 'canned'
    start_urls = ['https://www.carrefoursa.com/konserveler/c/1186?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class spices(scrapy.Spider):
    name = 'spices'
    start_urls = ['https://www.carrefoursa.com/seker-tuz-ve-baharat/c/1159?q=%3Arelevance&show=All']
    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class bakery(scrapy.Spider):
    name = 'bakery'
    start_urls = ['https://www.carrefoursa.com/unlu-mamuller-ve-tatlilar/c/1275?sort=bestSeller&sortingOption=bestSeller&q=%3Arelevance#']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class sauce(scrapy.Spider):
    name = 'sauce'
    start_urls = ['https://www.carrefoursa.com/ketcap-mayonez-ve-soslar/c/1209?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }

class tomatopaste(scrapy.Spider):
    name = 'tomatopaste'
    start_urls = ['https://www.carrefoursa.com/salca-harc-ve-bulyon/c/1174?q=%3Arelevance&show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(), 
            }






"""
class breakfast(scrapy.Spider):
    name = 'breakfast'
    start_urls = ['https://www.carrefoursa.com/kahvaltiliklar/c/1390?show=All']

    def parse(self, response):
        for products in response.css('div.pl-inner'):
            yield {
                'name': products.css('span.item-name::text').get(),
                'price': products.css('span.item-price::text').get(),
            }
"""

class fruit(scrapy.Spider):
    name = 'fruit'
    start_urls = ['https://shop.supervalu.ie/shopping/meat-poultry/c-150100015']

    def parse(self, response):
        for product in response.css('div.product-list-item'):
            yield {
                'name': product.css('h4.product-list-item-details-title::text').get(),
                'price': product.css('span.product-details-price-per-kg::text').get(),
            }


class soket(scrapy.Spider):
    name = 'soket'
    start_urls = ['https://www.sokmarket.com.tr/salam-jambon-fume-c-1875']

    def parse(self, response):
        for product in response.css('li.list-item'):
            yield {
                'name': product.css('strong.content-title::text').get(),
            }