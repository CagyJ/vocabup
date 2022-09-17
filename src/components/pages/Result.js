import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

const Result = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { qna } = state;

  const { loading, error, answers } = useAnswers(id);

  const calculate = () => {
    var score = 0;

    answers.forEach((ans, idx) => {
      const answer = qna[idx].options.find((o) => o.checked);

      if (!!answer && answer["title"] === ans) {
        score = score + 1;
      }
    });

    return score;
  };

  const userScore = calculate();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}

      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis score={userScore} noq={answers.length} qna={qna} />
        </>
      )}
    </>
  );
};

export default Result;
