import classes from "../styles/Analysis.module.css";
import Question from "./Question";

const Analysis = ({ score, noq, qna }) => {
  return (
    <div className={classes.analysis}>
      <h1>Analysis</h1>
      <h4>{(score / noq) * 10}% correct</h4>
      <Question />
    </div>
  );
};

export default Analysis;
