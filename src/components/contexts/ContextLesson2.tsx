import { createContext, useContext, useState, type ReactNode } from "react";

export interface CurrentUser {
  name: string;
}

export interface CurrentUserContextType {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
}

const currentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

export default function MyApp2() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ name: "" });
  return (
    <currentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <Form />
    </currentUserContext.Provider>
  );
}

export function UseCustomHook() {
  const context = useContext(currentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
}

function Form() {
  return (
    <>
      <Panel title="Welcome">
        <LoginButton />
      </Panel>
    </>
  );
}

function LoginButton() {
  const { currentUser, setCurrentUser } = UseCustomHook();

  if (currentUser.name !== "") {
    return <p>You logged in as {currentUser.name}</p>;
  }
  return (
    <Button
      onClick={() => {
        setCurrentUser({ name: "Advika" });
      }}
    >
      Login in as Advika
    </Button>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel">
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
