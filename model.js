//data layer ( database) of the application
const mongoose = require("mongoose"); //cooks my order. Mongo will be my single source of truth
const bcrypt = require("bcryptjs");

const cutSchema = mongoose.Schema({
  style: String,
  weight: Number
});

cutSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    style: this.style,
    weight: this.weight
  };
};

const orderSchema = mongoose.Schema({
  delivery: Date,
  price: Number,
  //additionalInstructions: [String],
  cutId: String,
  userId: String,
  quantity: Number
});

orderSchema.methods.apiRepr = function() {
  //what I show to the user
  return {
    id: this._id,
    delivery: this.delivery,
    price: this.price,
    cutId: this.cutId,
    userId: this.userId,
    quantity: this.quantity
  };
};

// {
//   delivery: new Date("March 4, 2017"),
//   price: 1234, // $12.24 everything is handles in cents, format for user in the front end
//   additionalInstructions: [
//     "please drop it off at my house",
//     "other information here"
//   ]
// }

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, unique: true }
});

userSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    email: this.email
  };
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const Cut = mongoose.model("Cut", cutSchema);
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Cut, Order, User };
