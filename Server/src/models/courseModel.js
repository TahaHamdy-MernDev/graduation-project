const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    name: {
      type: String,
    },
    subDescription: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    instructor: {
      type: String,
    },
    whatUWillLearn: [
      {
        type: String,
      },
    ],
    image: { type: String },
    requestList: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
courseSchema.pre("find", function (next) {
  this.populate("category");
  next();
});
const Course = model("Course", courseSchema);

module.exports = Course;
