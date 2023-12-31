const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  text: {
    type: String,
    required: true,
  },
  votes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
},{timestamps:true});

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String},
  email: { type: String },
  answers: [AnswerSchema],
  votes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
},{
  timestamps:true});


QuestionSchema.pre('find', function (next) {
  this.populate('user').populate('answers.user').populate('answers.votes.user')
  next();
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
