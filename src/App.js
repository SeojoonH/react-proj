import Button from "./Button";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <h1 className={styles.title}>Welcome Back!</h1>
      <Button text={"Continue"} />
    </>
  );
}

export default App;
