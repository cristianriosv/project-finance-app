import { ThemeProvider } from "@material-tailwind/react";
import ProjectsView from "./views/ProjectsView/ProjectsView";
import './styles/index.css';

const customTheme = {
  input: {
      styles: {
          base: {
              container: {
                  minWidth: 'min-w-[20px]'
              }
          }
      }
  },
  select: {
	styles: {
		base: {
			container: {
				minWidth: 'min-w-[20px]'
			}
		}
	}
  }
}

function App() {
	return (
		<ThemeProvider value={customTheme}>
			<ProjectsView />
		</ThemeProvider>
	);
}

export default App;
