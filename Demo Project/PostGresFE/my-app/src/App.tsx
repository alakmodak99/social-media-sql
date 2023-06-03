import './App.css';
import AllPosts from './components/allPosts';
import Auth from './components/Auth';
import NavBar from './components/NavBar';
import io from "socket.io-client";
import { useState } from 'react';
function App() {
  const [open, setOpen] = useState<boolean>(false);
  const socket = io("http://localhost:8081");
  return (
    <div className="App">
      <NavBar
        onClick={() => {
          setOpen(!open);
        }}
        socket={socket}
      />
      {open && <Auth open={open} setOpen={setOpen} />}
      <AllPosts socket={socket} />
    </div>
  );
}

export default App;
