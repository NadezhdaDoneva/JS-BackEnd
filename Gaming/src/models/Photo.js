const mongoose = require("mongoose");

// const photoSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: [true, 'Name is required'],
//         minLength: [2, 'Name should be at least 2 char'],
//     },
//     image:{
//         type: String,
//         required: [true, 'Image is required'],
//         match: [/^https?:\/\//, 'Invalid URL']
//     },
//     age:{
//         type: Number,
//         required: [true, 'Age is required'],
//         min:1,
//         max: 100,
//     },
//     description:{
//         type: String,
//         required: [true, 'Description is required'],
//         minLength: [5, 'Write longer desc'],
//         maxLength: [50, 'Write shorter desc'],
//     },
//     location:{
//         type: String,
//         required: [true, 'Location is required'],
//         minLength: [5, 'Write longer desc'],
//         maxLength: [50, 'Write shorter desc'],
//     },
//     owner:{
//         type: mongoose.Types.ObjectId,
//         ref: 'User',
//     },
//     comments: [
//         {
//             user:
//             {
//                 type: mongoose.Types.ObjectId,
//                 required: true,
//                 ref: 'User'
//             },
//             message: {
//                 type: String,
//                 required: [true, 'Message is required'],
//             },
//         }
//     ],
// });

const photoSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: [true, "Platform is required"],
    enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [4, "Name should be at least 4 char"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/^https?:\/\//, "Invalid URL"],
  },
  price: {
    type: Number,
    required: [true, "Price should be a positive number"],
    min: 1,
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
    minLength: [2, "Name should be at least 2 char"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [10, "Write longer desc"],
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
