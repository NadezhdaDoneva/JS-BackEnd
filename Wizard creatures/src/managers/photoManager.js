const Photo = require('../models/Photo');

exports.getAll = () => Photo.find().populate('owner');

exports.getOne = (photoId) => Photo.findById(photoId).populate('owner');

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.create = (photoData) => Photo.create(photoData);

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);


exports.addBought = async (photoId, user) => {
    const photo = await Photo.findById(photoId);

    photo.boughtBy.push(user);
    return photo.save();
};

exports.getByOwner = (userId) => Photo.find({owner: userId});

