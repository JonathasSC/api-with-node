const mongoose = require('mongoose');
const User = mongoose.model('users')

exports.get = () => {
    return User.find({}, 'id name surname email')
}

exports.getById = (id) => {
    return User.findById(id, 'id name surname email');
}

exports.create = (data) => {
    var user = new User(data);

    user.name    = data.name;
    user.surname = data.surname;
    user.email   = data.email;

    return user.save()
}

exports.update = (id, data) => {
    return User.findByIdAndUpdate(id, {
        $set: {
            name:    data.name,
            surname: data.surname,
            email:   data.email
        }
    })
}