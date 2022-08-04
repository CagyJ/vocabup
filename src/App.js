import Layout from "./components/Layout";
// import Home from "./components/pages//Home";
import Singup from "./components/pages/Signup";
// import Login from "./components/pages/Login";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Layout>
        {/* <Home /> */}
        <Singup />
        {/* <Login /> */}
      </Layout>
    </div>
  );
}

export default App;
