import React from "react";

function Home() {
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src="/code-sync.png" alt="code-sync-logo" />
        <h4 className="mainLabel">Paste invitation Room Id</h4>
        <div className="inputGroup">
          <input type="text" className="inputBox" placeholder="Room Id" />
          <input type="text" className="inputBox" placeholder="User Name" />
          <button className="btn joinBtn">Join</button>
          <span className="createInfo">
            If you dont have a invite then create &nbsp;
            <a href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>

      <footer>
        Built with ❤️ by <a href="">Nimish Shinde </a>
      </footer>
    </div>
  );
}

export default Home;
