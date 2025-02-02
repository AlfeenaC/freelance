


// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// //import "./App.css";

// const socket = io("http://localhost:5000");

// const Free = () => {
//   const [projects, setProjects] = useState([]);
//   const [bids, setBids] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [newBid, setNewBid] = useState("");
//   const [newMessage, setNewMessage] = useState("");
//   const [userId] = useState(1); // Example user ID
//   const [notifications, setNotifications] = useState([]);
//   const [typing, setTyping] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/projects")
//       .then((res) => res.json())
//       .then((data) => setProjects(data));

//     socket.on("update_bids", (bidData) => {
//       setBids((prevBids) => [...prevBids, bidData]);
//       setNotifications((prev) => [...prev, `New bid placed on project ${bidData.projectId}`]);
//     });

//     socket.on("receive_message", (messageData) => {
//       setMessages((prevMessages) => [...prevMessages, messageData]);
//       setNotifications((prev) => [...prev, `New message from User ${messageData.senderId}`]);
//     });

//     socket.on("user_typing", ({ senderId }) => {
//       setTyping(true);
//       setTimeout(() => setTyping(false), 2000);
//     });
//   }, []);

//   const handleBidSubmit = (projectId) => {
//     const bidData = { projectId, amount: newBid, freelancerId: userId };
//     socket.emit("new_bid", bidData);
//     setNewBid("");
//   };

//   const handleSendMessage = (receiverId) => {
//     const messageData = { senderId: userId, receiverId, message: newMessage };
//     socket.emit("send_message", messageData);
//     setNewMessage("");
//   };

//   return (
//     <div className="container">
//       <h1>Freelancer Auction Platform</h1>
//       <h2>Projects</h2>
//       {projects.map((project) => (
//         <div key={project.id} className="card">
//           <h3>{project.title}</h3>
//           <p>{project.description}</p>
//           <input
//             type="number"
//             placeholder="Enter your bid"
//             value={newBid}
//             onChange={(e) => setNewBid(e.target.value)}
//           />
//           <button onClick={() => handleBidSubmit(project.id)}>Bid</button>
//         </div>
//       ))}

//       <h2>Messages</h2>
//       {messages.map((msg, index) => (
//         <p key={index}><strong>{msg.senderId}</strong>: {msg.message}</p>
//       ))}
//       {typing && <p>Someone is typing...</p>}
//       <input
//         type="text"
//         placeholder="Type a message"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//       />
//       <button onClick={() => handleSendMessage(2)}>Send Message</button>

//       <h2>Notifications</h2>
//       <ul>
//         {notifications.map((note, index) => (
//           <li key={index}>{note}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Free;
