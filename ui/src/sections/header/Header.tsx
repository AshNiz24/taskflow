import "./Header.css";

const Header = () => {
  return (
     <div className="header">
        <div className="title-and-logo">
          <div className="logo">
            <img src="/list.png" alt="" />
          </div>
          <div className="title-and-subtitle">
          <div className="title">TaskFlow</div>
          <div className="subtitle">YOUR PERSONAL TASK MANAGER</div>
          </div>
        </div>
        <div className="title-chip">
          Workspace
        </div>
      </div>
  )
}

export default Header