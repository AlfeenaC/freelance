import { Link } from 'react-router-dom'

const mockTasks = [
  { id: '1', title: 'Fix Kitchen Sink', description: 'Leaking pipe under sink', budget: 150 },
  { id: '2', title: 'Install Light Fixtures', description: '5 ceiling lights installation', budget: 300 },
]

export default function TaskList() {
  return (
    <div className="task-list-container">
      <div className="header">
        <h1>Home Alligned Services</h1>
        <Link to="/post-task" className="btn btn-primary">Post New Task</Link>
      </div>

      <div className="tasks-grid">
        {mockTasks.map((task) => (
          <Link key={task.id} to={`/task/${task.id}`} className="task-card">
            <h3>{task.title}</h3>
            <p className="description">{task.description}</p>
            <p className="budget">Budget: ₹{task.budget}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}