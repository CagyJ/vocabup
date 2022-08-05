import classes from "../styles/Question.module.css";
import Answers from "./Answers";

const Question = () => {
  return (
    <div className={classes.question}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        Check it out here
      </div>
      <Answers />
    </div>
  );
};
export default Question;
