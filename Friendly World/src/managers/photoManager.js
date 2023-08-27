const Photo = require('../models/Photo');

exports.getAll = () => Photo.find().populate('owner');

exports.getOne = (photoId) => Photo.findById(photoId).populate('owner');

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.create = (photoData) => Photo.create(photoData);

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);

// exports.addComment = async (photoId, commentData) => {
//     const photo = await Photo.findById(photoId);

//     photo.comments.push(commentData);

//     return photo.save();
// };

exports.addBought = async (photoId, user) => {
    const photo = await Photo.findById(photoId);

    photo.donations.push(user);
    return photo.save();
};

exports.getByOwner = (userId) => Photo.find({owner: userId});

exports.search = (photoText, photoPlat) => {
    if (photoText) {
        return (Photos.find({ name: { $regex: photoText, $options: 'i' } }).lean());
    }

    if (!photoText && photoPlat) {
        return (Photos.find({ platform: photoPlat }).lean());
    }

}