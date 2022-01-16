#! /bin/sh
cd scraping/env
source bin/activate
cd ../fetchData
scrapy crawl vegfruit -O vegetable-fruit.json
scrapy crawl meatfishencoop -O meat-fish-hencoop.json
scrapy crawl breakfast -O breakfast.json
scrapy crawl creme -O creme.json
scrapy crawl cheese -O cheese.json
scrapy crawl milk -O milk.json
scrapy crawl butter -O butter.json
scrapy crawl yogurt -O yogurt.json
scrapy crawl egg -O egg.json
scrapy crawl olive -O olive.json
scrapy crawl yeast -O yeast.json
scrapy crawl canned -O canned.json
scrapy crawl legume -O legume.json
scrapy crawl oil -O oil.json
scrapy crawl pickle -O pickle.json
scrapy crawl spices -O spices.json
scrapy crawl bakery -O bakery.json
scrapy crawl sauce -O sauce.json
scrapy crawl tomatopaste -O tomatopaste.json 