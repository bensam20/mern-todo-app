import { BrowserRouter } from 'react-router-dom';
import Router from './routers'
import {HomeDataHandler} from "./Modules/Home/context";

function App() {
	

	return (
		<div className="App">
			<BrowserRouter>
				<HomeDataHandler>
					<Router />
				</HomeDataHandler>
			</BrowserRouter>
		</div>
	)
}

export default App;
