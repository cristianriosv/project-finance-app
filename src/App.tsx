import { ThemeProvider } from "@material-tailwind/react";
import ProjectsView from "./views/ProjectsView/ProjectsView";
import './styles/index.css';

function App() {
  return (
    <ThemeProvider>
      <ProjectsView />
    </ThemeProvider>
  );
}

export default App;
