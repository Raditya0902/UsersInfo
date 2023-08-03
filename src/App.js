import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFetch = () => {
    setIsLoading(true);
    fetch("https://reqres.in/api/users?page=1")
      .then((response) => response.json())
      .then((response) => {
        // setUsers(response.data);
        // setIsLoading(false);
        setTimeout(() => {
          setUsers(response.data);
          setIsLoading(false);
        }, 2000);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch users info.");
        setIsLoading(false);
      });
  };

  const renderUser = (
    <div className="users-container">
      {users.map((user, index) => (
        <div className="card" key={index}>
          <img
            className="avatar"
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <div className="data">
            <div>
              <h3>{`${user.first_name} ${user.last_name}`} </h3>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <header className="header">
        <h1 className="logo">Users info</h1>
        <button onClick={() => handleFetch()} disabled={isLoading}>
          Get Info
        </button>
      </header>
      {isLoading ? <LoadingSpinner /> : renderUser}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  );
}

export default App;
