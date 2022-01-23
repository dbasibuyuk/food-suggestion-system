const http = require('http')
const mongoose = require('mongoose')
const hostname = '127.0.0.1'
const port = 3001
const exec = require('child_process').exec
const fs = require('fs')
const express = require('express')
const app = express()
const router = express.Router()

const ingredients = new mongoose.Schema({
    name: String, 
    quantity: String,
    volume: String
});


const recipesSchema = new mongoose.Schema({
    name: String,
    imagePath: String,
    ingredients: [ingredients],
    url: String,
});

const Recipes = mongoose.model('Recipes', recipesSchema);
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });


global.query = []
global.prices = []

app.get('/', async (req, res) => {
    try{
        if(query.length === 0) {
            query = await Recipes.find();
            const priceList = readFiles();
            for(let i = 0; i < query.length; i++) {
                prices.push(getPrice(query[i].ingredients, priceList));
            }
            console.log("reading files..");
        }

        res.send([query, prices]);
    }catch(e) {
        console.log(e);
        res.send('Something went wrong!');
    }
});

function getPrice(item, prices) {
    let totalPrice = 0;
    for(let c = 0; c < item.length; c++) {
        let total = 100000000;
        for(let i = 0; i < prices.length; i++) {
            for(let k = 0; k < prices[i].length; k++) {
                if(prices[i][k].name != null && prices[i][k].name != 'null') {
                    if(prices[i][k].name.toLowerCase().includes(item[c].name)) {
                        let getPricePerVol = getItemPricePerVolume(prices[i][k], item[c]);

                        if(getPricePerVol != -1) {
                            if(total > getPricePerVol) {
                                total = getPricePerVol;
                            }
                        }
                    }
                }
            }
        }

        if(total === 100000000) {
            totalPrice += 2;
        }else {
            totalPrice += total;
        }
    }

    return totalPrice;
}

function getItemPricePerVolume(price, item) {
    let coefficient = 1;
    const parsedItem = price.name.split(' ');
    let parsedIngredientVolume = item.volume.split(' ');
    for(let i = 0; i < parsedItem.length; i++) {
        if((parsedItem[i].toLowerCase() === 'kg' 
            || parsedItem[i].toLowerCase() === 'l') 
            || parsedItem[i].toLowerCase() === 'lt') { // will multiply by 1000
                coefficient *= 1000;
                let tempCoefficient =parseInt(parsedItem[i - 1]);
                if(!isNaN(tempCoefficient)) {
                    coefficient *= tempCoefficient;
                }
        }
        else if((parsedItem[i].toLowerCase() === 'g' || parsedItem[i].toLowerCase() === 'gr')
             || (parsedItem[i].toLowerCase() === 'gram' || parsedItem[i].toLowerCase() === 'ml')) {
                let tempCoefficient =parseInt(parsedItem[i - 1]);
                if(!isNaN(tempCoefficient)) {
                    coefficient *= tempCoefficient;
                }
        }
    }

    let productPrice = price.price.split(' ');

    if(coefficient >= parsedIngredientVolume[0]) {
        let parseComma = productPrice[0].split(',');

        let part1 = parseComma[0];
        let part2 = parseComma[1] * 0.01;
        let part3 = part1 * 1 + part2;
        part3 = part3 * parsedIngredientVolume[0] / coefficient;
        return part3;
    }
    else {
        return -1;
    }
}

function scrapeData () {
    this.execCommand = function(cmd, callback) {
        exec('./scrape.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            callback(stdout);
        });

        console.log('scraping is done..');
    }
}


async function addRecipe() {
    const newRecipe = new Recipes({ name: 'yeni6',
                                    imagePath: 'null',
                                    ingredients: [
                                        {name: 'zeytin yağı', quantity: '1 su bardağı', volume: 'null'},
                                        {name: 'soğan', quantity: '1 adet', volume: 'null'},
                                        {name: 'patates', quantity: '1 adet', volume: 'null'},
                                        {name: 'havuç', quantity: '1 adet', volume: 'null'},
                                        {name: 'bezelye', quantity: '1 su bardağı', volume: 'null'},
                                        {name: 'enginar', quantity: '8 adet', volume: 'null'},
                                        {name: 'limon', quantity: '2 adet', volume: 'null'},
                                        {name: 'tusz', quantity: '1 çay kaşığı', volume: 'null'},
                                        {name: 'tuaz', quantity: '1 çay kaşığı', volume: 'null'},
                                        {name: 'tudz', quantity: '1 çay kaşığı', volume: 'null'},
                                    ],
                                    url: 'null',
                                });

    try{ 
        await newRecipe.save();
        console.log('Recipe saved.');
    } catch(e){
        console.log(e);
    }
}

function readFiles(){
    let fileNames = ['bakery', 'breakfast', 'butter', 'canned', 'cheese', 'creme', 'egg', 'legume', 'meat-fish-hencoop', 'milk',
                     'oil', 'olive', 'pickle', 'sauce', 'spices', 'tomatopaste', 'vegetable-fruit', 'yeast', 'yogurt'];
    try {
        let data = []

        for(let i = 0; i < 18; i++) {
            let temp = JSON.parse(fs.readFileSync('scraping2/supermarkets/' + fileNames[i] + '.json', 'utf8'));
            
            let tempObj = []
            for (let [index, value] of Object.entries(temp)) {
                tempObj.push(value);
            }

            data.push(tempObj);
        }
        return data;
    } catch(e) {
        console.log(e);
    }
}

var scrape = new scrapeData();

async function main () {
    try{
        scrape.execCommand('./scrape.sh', () => { });
        mongoose.connect('mongodb+srv://doruk:doruk@cluster0.muxfo.mongodb.net/test');
        const connection = mongoose.connection;
        connection.once("open", function() {
            console.log("Database connection is established.");
        });

        //addRecipe()
    } catch(e){
        console.log(e);
    }

}


main()

