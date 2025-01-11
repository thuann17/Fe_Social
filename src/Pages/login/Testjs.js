import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState("Chưa nhấn nút");

  const handleClick = () => {
    setMessage("Bạn vừa nhấn nút!");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{message}</h1>
      <button onClick={handleClick}>Nhấn vào tôi!</button>
    </div>
  );
}

export default App;
