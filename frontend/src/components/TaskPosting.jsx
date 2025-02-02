import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TaskPosting() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ title, description, budget })
    navigate('/')
  }

  return (
    <div className="form-container">
      <h2>Post a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Budget (₹)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Post Task</button>
      </form>
    </div>
  )
}