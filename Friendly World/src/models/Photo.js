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
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [4, "Name should be at least 4 char"],
  },
  years: {
    type: Number,
    required: [true, "Years are required"],

  },
  kind: {
    type: String,
    required: [true, "Kind is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/^https?:\/\//, "Invalid URL"],
  },
  need: {
    type: String,
    required: [true, "Need is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
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
  donations: [
            {
                type: mongoose.Types.ObjectId,
                 ref: 'User',
            }
  ],
});

photoSchema.method('getDonators', function(){
  return this.donations.map(x => x._id);
});

const Photo = mongoose.model("Photo", photoSchema);


module.exports = Photo;
