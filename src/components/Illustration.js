import signupImage from "../assets/signup.svg";
import classes from "../styles/Illustration.module.css";

const Illustration = () => {
  return (
    <div className={classes.illustration}>
      <img src={signupImage} alt="Signup" />
    </div>
  );
};

export default Illustration;
