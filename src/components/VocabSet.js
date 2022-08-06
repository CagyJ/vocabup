import { Link } from "react-router-dom";
import classes from "../styles/VocabSet.module.css";

const VocabSet = () => {
  return (
    <Link to="/quiz">
      <div className={classes.set}>
        <p>Reading 1</p>
        <div className={classes.qmeta}>
          <p>30 terms</p>
          <p className={classes.revision}>Revision: 5 times</p>
        </div>
      </div>
    </Link>
  );
};

export default VocabSet;
