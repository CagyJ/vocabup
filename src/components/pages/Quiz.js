import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useWords from "../../hooks/useWords";
import Answers from "../Answers";
import ProgressBar from "../ProgressBar";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "question":
      action.value.forEach((q) => {
        q.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

const Quiz = () => {
  const { id } = useParams();
  const { loading, error, words } = useWords(id);
  const [currentWord, setCurrentWord] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "question",
      value: words,
    });
  }, [words]);

  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currentWord,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  const nextQuestion = () => {
    if (currentWord + 1 < words.length) {
      setCurrentWord((prevCurrent) => prevCurrent + 1);
    }
  };

  const prevQuestion = () => {
    if (currentWord >= 1 && currentWord <= words.length) {
      setCurrentWord((prevCurrent) => prevCurrent - 1);
    }
  };

  const submit = async () => {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    console.log(qna);
    navigate(`/result/${id}`, { state: { qna } });
  };

  const percentOfProgress =
    words.length > 0 ? ((currentWord + 1) / words.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentWord].title}</h1>
          <Answers
            options={qna[currentWord].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={submit}
            progress={percentOfProgress}
          />
        </>
      )}
    </>
  );
};

export default Quiz;
