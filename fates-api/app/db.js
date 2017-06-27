/**
 * Created by aknauss on 6/21/17.
 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = () => {
    mongoose.connect('mongodb://localhost/fates');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    return {
        mongoose: mongoose,
        db: db,
        save: (model) => {
            console.log(model);
            model.save((err) => {
               if (err) {
                   throw err;
               } else {
                   console.log("saved");
               }
            });
        }
    };
}
