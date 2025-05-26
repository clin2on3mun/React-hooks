import { useContext, createContext, useState, type ReactNode } from "react";

const ThemeContext = createContext<string | undefined>(undefined);
export default function MyApp() {
  const [theme, setTheme] = useState<string>("light");
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <label>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
        use dark mode
      </label>
    </ThemeContext.Provider>
  );
}

function Form() {
  return (
    <Panel title={"Welcome"}>
      <Button>sign up</Button>
      <Button>log in</Button>
    </Panel>
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

function Button({ children }: { children: ReactNode }) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return <button className={className}>{children}</button>;
}
