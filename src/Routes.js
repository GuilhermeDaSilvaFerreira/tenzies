import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import App from './App'

export default function AppRoutes() {
    return(
        <Router basename="/tenzies">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/tenzies" element={<App />} />
            </Routes>
        </Router>
    )
}