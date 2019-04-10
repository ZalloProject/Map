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
  lng: Number
});

const SimilarHome = mongoose.model('SimilarHome', similarHomesSchema);

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
