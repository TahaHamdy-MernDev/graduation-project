import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  upVoteQuestionAction,
  addAnswerAction,
  fetchQuestionsAction,
  upVoteAnswerAction,
} from "../Redux/Action/questionAction";
import moment from "moment";
import { toast } from "react-toastify";
import { currentUserAction } from "../Redux/Action/userAction";

const QuestionPreview = () => {
  const dispatch = useDispatch();
  const { id: questionId } = useParams();
  const [reply, setReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchQuestionsAction());
    dispatch(currentUserAction());
  }, [dispatch]);

  const question = useSelector((state) =>
    state.question.questions.find((question) => question._id === questionId)
  );

  const handleVoteAnswer = (id) => {
    dispatch(upVoteAnswerAction({ questionId: question._id, answerId: id }))
      .unwrap()
      .then(() => {
        dispatch(fetchQuestionsAction());
      })
      .catch((err) => {
        toast.warn(err.message);
      });
    // Implement the logic to vote for the question
  };
  const handleQuestionVote = () => {
    dispatch(upVoteQuestionAction(question._id))
      .unwrap()
      .then(() => {
        dispatch(fetchQuestionsAction());
      })
      .catch((err) => {
        toast.warn(err.message);
      });
  };
  const handleReply = () => {
    setShowReplyInput(true);
  };

  const handleReplySubmit = () => {
    if (reply.trim() !== "") {
      // Dispatch action to add the reply
      dispatch(addAnswerAction({ _id: questionId, reply })).then(() => {
        dispatch(fetchQuestionsAction());
      });

      setReply("");
      setShowReplyInput(false);
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Row className="mb-3 border p-3 rounded">
      <Col lg={6} md={12}>
        <h4 className="mt-4">السؤال</h4>
        <div>
          <p className="mb-1">{question?.text}</p>
          <p>
            {question?.answers.length} ردود | {question?.votes.length} تصويت
          </p>
          &bull; بواسطة{" "}
          <strong>
            {question?.user?.firstName || question.firstName}{" "}
            {question?.user?.lastName || question.lastName}
          </strong>{" "}
          في {new Date(question?.createdAt).toLocaleString()}
        </div>

        {currentUser && (
          <>
            <div className="mt-3">
              <Button
                color="primary"
                disabled={question.votes.some(
                  (vote) => vote.user.toString() === currentUser._id.toString()
                )}
                onClick={handleQuestionVote}
              >
                تصويت
              </Button>{" "}
              <Button color="info" onClick={handleReply}>
                رد
              </Button>
            </div>
            {showReplyInput && (
              <Form.Group className="mt-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="أكتب ردك هنا..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <Button className="mt-2" onClick={handleReplySubmit}>
                  إرسال الرد
                </Button>
              </Form.Group>
            )}
          </>
        )}
      </Col>
      <Col lg={6} md={12}>
        {question ? (
          <>
            <h4 className="mt-4">اجابات القراء</h4>
            {question.answers.length > 0 ? (
              question.answers.map((answer, index) => (
                <div key={index} className="mb-3 border p-3 rounded">
                  <span className="text-muted mb-2 d-flex justify-content-between">
                    <strong>
                      <p>
                        {answer.user.firstName} {answer.user.lastName}
                      </p>
                    </strong>{" "}
                    &bull; {formatTimeAgo(answer.createdAt)}
                  </span>
                  <p className="mb-0">{answer.text}</p>
                  <span className="d-flex justify-content-between align-items-center">
                    {currentUser && (
                      <Button
                        color="primary"
                        className="mt-2"
                        onClick={() => handleVoteAnswer(answer._id)}
                        disabled={question?.answers?.some((answer) =>
                          answer.votes?.some(
                            (vote) =>
                              vote.user?._id.toString() ===
                              currentUser?._id.toString()
                          )
                        )}
                      >
                        تصويت
                      </Button>
                    )}
                    | {answer?.votes.length} تصويت
                  </span>
                </div>
              ))
            ) : (
              <p>لا توجد اجابات حاليًا.</p>
            )}
          </>
        ) : null}
      </Col>
    </Row>
  );
};
const formatTimeAgo = (createdAt) => {
  const now = moment();
  const commentTime = moment(createdAt);
  const diffInSeconds = now.diff(commentTime, "seconds");

  if (diffInSeconds < 60) {
    return "الآن";
  } else if (diffInSeconds < 60 * 60) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes}دقيقة `;
  } else if (diffInSeconds < 24 * 60 * 60) {
    const diffInHours = Math.floor(diffInSeconds / (60 * 60));
    return `${diffInHours} ساعة${diffInHours === 1 || ""} مضت`;
  } else if (diffInSeconds < 24 * 60 * 30 * 60) {
    const diffInDays = Math.floor(diffInSeconds / (24 * 60 * 60));
    return `${diffInDays} يوم`;
  } else if (diffInSeconds < 24 * 60 * 30 * 12 * 60) {
    const diffInMonths = Math.floor(diffInSeconds / (24 * 60 * 30 * 60));
    return `${diffInMonths} شهر `;
  } else {
    const diffInYears = Math.floor(diffInSeconds / (24 * 60 * 30 * 12 * 60));
    return `${diffInYears} سنه`;
  }
};
export default QuestionPreview;
