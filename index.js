const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connections[0].name}"`);
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: 'Chocolate City',
      level: 'Easy Peasy',
      ingredients: ['Chocolate', 'Vanilla Ice-cream', 'Waffles', 'Cookies'],
      cuisine: 'American Junk',
      duration: 25,
      creator: 'Big Burts'
    });
  })
  .then(recipe => {
    //console.log(recipe);
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })

  .then(() => {
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })

  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  .then(recipes => {
    console.log('added all', recipes);
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

mongoose.connection.close();
