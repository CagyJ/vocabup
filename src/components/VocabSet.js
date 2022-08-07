import classes from "../styles/VocabSet.module.css";

const VocabSet = ({ title, id, num, times }) => {
  return (
    <div className={classes.set}>
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{num} terms</p>
        <p className={classes.revision}>Revision: {times} times</p>
      </div>
    </div>
  );
};

export default VocabSet;
