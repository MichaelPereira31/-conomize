if (process.env.NODE_ENV == "production"){
  module.exports = {mongoURI: 'mongodb+srv://economize:economize@cluster0.mazu5.mongodb.net/<dbname>?retryWrites=true&w=majority'};
}else{
  module.exports = {mongoURI: 'mongodb://localhost/economize'}
}
