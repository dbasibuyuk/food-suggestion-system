const http = require('http');
const mongoose = require('mongoose');
const hostname = '127.0.0.1';
const port = 3000;
const exec = require('child_process').exec
const schema = new mongoose.Schema({ name: 'string', size: 'string' });


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//exec('./scrape.sh', (err, stdout, stderr) => console.log(stdout))

async function main (){
    try{
        await mongoose.connect('mongodb+srv://doruk:doruk@cluster0.muxfo.mongodb.net/test');
        console.log('Db connection is successful')
    } catch(e){
        console.log(e);
    }

    const ingredients = new mongoose.Schema({
        name: String, 
        quantity: String
    });

    const recipesSchema = new mongoose.Schema({
        name: String,
        imagePath: String,
        ingredients: [ingredients]
      });

    const Recipes = mongoose.model('Recipes', recipesSchema);
    const newRecipe = new Recipes({ name: 'köri soslu makarna',
                                    imagePath: null,
                                    ingredients: [
                                        {name: 'zeytin yağı', quantity: '1 su bardağı'},
                                        {name: 'soğan', quantity: '1 adet'},
                                        {name: 'patates', quantity: '1 adet'},
                                        {name: 'havuç', quantity: '1 adet'},
                                        {name: 'bezelye', quantity: '1 su bardağı'},
                                        {name: 'enginar', quantity: '8 adet'},
                                        {name: 'limon', quantity: '2 adet'},
                                        {name: 'tuz', quantity: '1 çay kaşığı'},
                                    ]});
    try{
        await newRecipe.save();
    } catch(e){
        console.log(e);
    }
}


main()

