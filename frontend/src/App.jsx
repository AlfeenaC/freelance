import { Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'

import TaskList from './components/TaskList'
import TaskPosting from './components/TaskPosting'
import TaskDetailPage from './components/TaskDetailPage'

function App() {
  return (
    <Routes>
      
      {/* Start with login page */}
      <Route path="/" element={<LoginPage />} />
      
      {/* Other routes */}
      <Route path="/home" element={<TaskList />} />
      <Route path="/post-task" element={<TaskPosting />} />
      <Route path="/task/:id" element={<TaskDetailPage />} />
    </Routes>
  )
}

export default App