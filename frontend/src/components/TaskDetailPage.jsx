import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PayPalButtons } from "@paypal/react-paypal-js";

const TaskDetailPage = () => {
  const { id } = useParams()
  const [bidAmount, setBidAmount] = useState('')
  const [comment, setComment] = useState('')
  const [bids, setBids] = useState([])
  const [selectedBid, setSelectedBid] = useState(null);

  const handleBidSubmit = (e) => {
    e.preventDefault()
    const newBid = {
      id: crypto.randomUUID(),
      amount: Number(bidAmount),
      comment,
    }
    setBids([...bids, newBid])
    setBidAmount('')
    setComment('')
  }

  const handleBidSelect = async (bid) => {
    setSelectedBid(bid);
  };

  const createOrder = async () => {
    try {
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ bidId: selectedBid.id })
      });
      const data = await response.json();
      return data.orderId;
    } catch (err) {
      console.error(err);
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await fetch('/api/payments/capture-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          orderID: data.orderID,
          bidId: selectedBid.id
        })
      });
      const responseData = await response.json();
      if (responseData.success) {
        // Handle successful payment
        alert('Payment successful!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="task-detail-container">
      <div className="task-info">
        <h2>Task Details</h2>
        <div className="task-card">
          <h3>Fix Kitchen Sink</h3>
          <p className="description">Leaking pipe under sink needs replacement</p>
          <p className="budget">Budget: ₹150</p>
        </div>
      </div>

      <div className="bid-section">
        <h3>Submit Bid</h3>
        <form onSubmit={handleBidSubmit} className="bid-form">
          <div className="form-group">
            <label>Bid Amount (₹)</label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Place Bid</button>
        </form>

        <div className="bids-list">
          <h3>Current Bids</h3>
          {bids.map((bid) => (
            <div key={bid.id} className="bid-card">
              <p><strong>Amount:</strong> ${bid.amount}</p>
              <p><strong>Comment:</strong> {bid.comment}</p>
              <button
                onClick={() => handleBidSelect(bid)}
                className="btn btn-secondary"
              >
                Select Bid
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedBid && (
        <div className="payment-section">
          <h3>Complete Payment</h3>
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </div>
      )}
    </div>
  )
}

export default TaskDetailPage