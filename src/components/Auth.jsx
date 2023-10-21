import { useEffect, useState } from "react";
import { authSubscribe } from "@junobuild/core";
import { AuthContext } from "../contexts/AuthContext";
import Login from "./Login";
import Logout from "./Logout";


const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
     const sub = authSubscribe((user) => setUser(user));

    return () => sub();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {user !== undefined && user !== null ? (
        <div>
          {children}

          <Logout />
        </div>
      ) : (
        <Login />
      )}
    </AuthContext.Provider>
  );
};

export default Auth;