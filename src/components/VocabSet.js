import classes from "../styles/VocabSet.module.css";

const VocabSet = () => {
  return (
    <a href="quiz.html">
      <div className={classes.set}>
        <p>Reading 1</p>
        <div className={classes.qmeta}>
          <p>30 terms</p>
          <p>Review times: 5 times</p>
        </div>
      </div>
    </a>
  );
};

export default VocabSet;
