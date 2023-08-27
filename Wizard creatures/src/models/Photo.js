const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [2, "Name should be at least 2 char"],
  },
  species: {
    type: String,
    required: [true, "species is required"],
    minLength: [3, "species should be at least 3 char"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/^https?:\/\//, "Invalid URL"],
  },
  skin: {
    type: String,
    required: [true, "skin color should be a positive number"],
    minLength: [3, "skin color should be at least 3 char"],
  },
  eye: {
    type: String,
    required: [true, "eye color is required"],
    minLength: [3, "eye color should be at least 2 char"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [5, "Write longer desc"],
    maxLength: [500, 'Write shorter desc'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  buyer: [
            {
                type: mongoose.Types.ObjectId,
                 ref: 'User',
            }
  ],

});

photoSchema.method('getBuyers', function(){
  return this.buyer.map(x => x._id);
});

const Photo = mongoose.model("Photo", photoSchema);


module.exports = Photo;
