const mongoose = require('mongoose');
const User = mongoose.model('users')

exports.get = async() => {
    const response = await User.find({}, 'id name surname email')
    return response
}

exports.getById = async(id) => {
    const response = await User.findById(id, 'id name surname email');
    return response
}

exports.create = async(data) => {
    var user = new User(data);

    user.name    = data.name;
    user.surname = data.surname;
    user.email   = data.email;

    await user.save()
}

exports.update = async(id, data) => {
    await User.findByIdAndUpdate(id, {
        $set: {
            name:    data.name,
            surname: data.surname,
            email:   data.email
        }
    })
}

exports.delete = async(id) => {
    await User.findByIdAndDelete(id)
}