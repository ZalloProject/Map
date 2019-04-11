const mongoose = require('mongoose');
const request = require('request');
const fs = require('fs');
mongoose.connect(
  'mongodb+srv://zalloSimHomes:zalloPass@zallocluster0-89hrd.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true }
);
const similarHomesSchema = mongoose.Schema({
  address: {
    type: String,
    index: {
      unique: true,
      dropDups: true
    }
  },
  city: String,
  zip: String,
  state: String,
  price: Number,
  beds: Number,
  baths: Number,
  size: Number,
  listingType: String,
  createdAt: { type: Date, required: true, default: Date.now },
  pictureURL: String,
  lat: Number,
  lng: Number,
  homeType: String
});
let types = ['houses', 'houses', 'houses', 'houses', 'apts', 'condos', 'townHomes'];
const SimilarHome = mongoose.model('SimilarHome', similarHomesSchema);
SimilarHome.find({}, (err, docs) => {
  if (err) {
    cb(err);
  } else {
    for (let doc of docs) {
      SimilarHome.findOneAndUpdate(
        { _id: doc._id },
        { homeType: types[Math.floor(Math.random() * types.length)] },
        (err, doc) => {
          console.log(err, doc);
        }
      );
    }
  }
});
const getAllHomes = cb => {
  SimilarHome.find({}, (err, docs) => {
    if (err) {
      cb(err);
    } else {
      cb(null, docs);
    }
  });
};
module.exports = getAllHomes;
