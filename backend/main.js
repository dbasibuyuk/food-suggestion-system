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

app.get('/', async (req, res) => {
    try{
        const query = await Recipes.find();
        res.send(query);
    }catch(e) {
        console.log(e);
        res.send('Something went wrong!');
    }
});


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
    const newRecipe = new Recipes({ name: 'yeni',
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
            let temp = JSON.parse(fs.readFileSync('scraping/fetchData/' + fileNames[i] + '.json', 'utf8'));
            
            let tempObj = []
            for (let [index, value] of Object.entries(temp)) {
                tempObj.push(value);
            }

            data.push(tempObj);
        }
        console.log('Files are read and saved.');
        return data;
    } catch(e) {
        console.log(e);
    }
}

var scrape = new scrapeData();

async function main () {
    try{
        //scrape.execCommand('./scrape.sh', () => { });
        mongoose.connect('mongodb+srv://doruk:doruk@cluster0.muxfo.mongodb.net/test');
        const connection = mongoose.connection;
        connection.once("open", function() {
            console.log("Database connection is established.");
        });

        //console.log('Trying to save a recipe..')
        //addRecipe()
    } catch(e){
        console.log(e);
    }

    const priceList = readFiles();
    for(let obj of priceList[0]) {
        //console.log(obj['name'] + ': ' + obj['price']);
    }
}


main()

