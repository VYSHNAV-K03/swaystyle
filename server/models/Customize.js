const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customizeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming you have a 'User' model
      required: true,
    },
    imgpath: {
      type: String,
    },
  },
  { timestamps: true }
); // Adding timestamps to track when an item is added

const Customize = mongoose.model("Customize", customizeSchema);

module.exports = Customize;
