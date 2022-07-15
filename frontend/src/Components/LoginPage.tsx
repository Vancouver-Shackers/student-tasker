import axios from "axios";

export const LoginPage = (props: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fetchData = async () => {
    // ?
    const results = await axios.get("http://localhost:5000/getAssignments");

    props.setLoggedIn(true);
    return results;
  };

  return (
    <div className="loginParent">
      <div className="loginChild mainBG">
        <img
          src="/student-tasker/studentTasker2.png"
          alt=""
          className="loginIcon"
        />
        {/*         <button
          className="button ascend secondaryBG"
          onClick={() => fetchData()}
        >
          {" "}
          Connect student account{" "}
        </button> */}
        <a
          className="button ascend secondaryBG"
          target="blank"
          href="https://go.microsoft.com/fwlink/p/?LinkID=2123761&amp;lm=deeplink&amp;lmsrc=NeutralHomePageWeb&amp;cmpid=FreemiumSignUpHero-Experiment&amp;tfloptin=true&amp;clcid=0x1009&amp;culture=en-ca&amp;country=ca"
        >
          {" "}
          Connect student account{" "}
        </a>
        <button
          className="button ascend secondaryBG"
          onClick={() => props.setLoggedIn(true)}
        >
          {" "}
          Continue as guest{" "}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
