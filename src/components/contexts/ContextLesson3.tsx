import { createContext, useContext, useState, type ReactNode } from "react";
import {
  type CurrentUser,
  type CurrentUserContextType,
} from "./ContextLesson2";

const ThemeContext = createContext<string | undefined>(undefined);
const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

export function UseCustomHook() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
}

export default function MyApp3() {
  const [theme, setTheme] = useState<string>("light");
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ name: "" });
  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <WelcomePanel />
        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
          use dark mode
        </label>
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
}

function WelcomePanel() {
  const { currentUser } = UseCustomHook();
  return (
    <Panel title="welcome">
      {currentUser.name ? <Greetings /> : <LoginForm />}
    </Panel>
  );
}

function Greetings() {
  const { currentUser } = UseCustomHook();
  console.log(currentUser.name);
  return <p>you are logged as {currentUser.name}</p>;
}

function LoginForm() {
  const { setCurrentUser } = UseCustomHook();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const canLogin = firstName!.trim() !== "" && lastName.trim() !== "";
  return (
    <>
      <label>
        First name{": "}
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{": "}
        <input
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          setCurrentUser({ name: firstName + " " + lastName });
        }}
      >
        Log in
      </Button>
      {!canLogin && <p>please fill in both fields</p>}
    </>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
