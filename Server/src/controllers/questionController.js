const Question = require("../models/questionsModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");

exports.askQuestion = asyncHandler(async (req, res) => {
  let data = { ...req.body, user: req.user._id };
  const question = await dbService.create(Question, data);
  res.success({ data: question });
});
exports.unRegisterUserAskQuestion = asyncHandler(async(req,res)=>{
  let data ={ text : req.body.content, firstName:req.body.firstName, lastName:req.body.lastName ,email :req.body.email}
  const question = await dbService.create(Question, data);
  res.success({ data: question });
})
exports.getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await dbService.findMany(Question, {});
  res.success({ data: questions });
});

exports.getQuestionById = asyncHandler(async (req, res) => {
  const question = await dbService.findOne(Question, { _id: req.params.id });
  if (!question) {
    return res.recordNotFound({ message: "Question not found" });
  }
  res.success({ data: question });
});

exports.addAnswer = asyncHandler(async (req, res) => {
  const question = await dbService.findOne(Question, { _id: req.params.id });
  if (!question) {
    return res.recordNotFound({ message: "Question not found" });
  }
  const answer = {
    user: req.user._id,
    ...req.body,
    votes: [],
  };
  question.answers.push(answer);
  await question.save();
  res.success({ data: answer });
});
exports.upvoteQuestion = asyncHandler(async (req, res) => {
  const question = await dbService.findOne(Question, { _id: req.params.id });
  if (!question) {
    return res.recordNotFound({ message: "Question not found" });
  }
  if (
    question.votes.some(
      (vote) => vote.user.toString() === req.user._id.toString()
    )
  ) {
    return res.badRequest({ message: "لقد قمت بالتصويت بالفعل" });
  }
  question.votes.push({ user: req.user._id });
  await question.save();
  res.success({ data: question });
})
exports.upvoteAnswer = asyncHandler(async (req, res) => {
  const question = await dbService.findOne(Question, { _id: req.params.questionId });

  if (!question) {
    return res.recordNotFound({ message: "Question not found" });
  }
  const answer = question.answers.find(
    (answer) => answer._id.toString() === req.params.answerId
  );
  if (!answer) {
    return res.recordNotFound({ message: "Answer not found" });
  }
  if (
    answer.votes.some(
      (vote) => vote.user.toString() === req.user._id.toString()
    )
  ) {
    return res.badRequest({ message: "لقد قمت بالتصويت بالفعل" })
  }
  answer.votes.push({ user: req.user._id });
  await question.save();
  res.success({ data: answer });
});
