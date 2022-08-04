import classes from "../styles/Filter.module.css";
import Selector from "./Selector";

const items = ["Reading", "Listening", "Writing", "Speaking"];
const Filter = () => {
  return (
    <div className={classes.filter}>
      <Selector holder="sort by" items={items} />
    </div>
  );
};

export default Filter;
