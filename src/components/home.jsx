//import components
import NavBar from "../routes/navBar";
import SigninForm from "./signIn";

export default function Home() {
  return (
    <div className="container">
      <NavBar />
      <SigninForm />
    </div>
  );
}
