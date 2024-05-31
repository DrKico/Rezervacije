const socket = new WebSocket('ws://localhost:5000');

socket.onopen = () => {
  console.log('WebSocket connection established');
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

const sendWebSocketMessage = (message) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify(message));
    });
  }
};

const subscribeToMessages = (callback) => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received data from server:', data); // Add logging here
    callback(data);
  };
};

export { sendWebSocketMessage, subscribeToMessages };
