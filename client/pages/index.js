import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  return currentUser ? <h1>you are signed in</h1> : <h1>you are signed out</h1>;
};

Landing.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default Landing;
