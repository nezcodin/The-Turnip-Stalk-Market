export const Home = (props) => {

  return (
    <div>
      {props.username ? (
        <p>Hi, {props.username}!</p>
      ) : (
        <p>You are not logged in!</p>
      )}
    </div>
  );

}
