const Header = (props: any) => {
  return (
    <>
      <div className={`loged-in-header-container ${props.rootClassName} `}>
        <header data-role="Header" className="loged-in-header-header">
          <img
            alt="pastedImage"
            src="/playground_assets/homies-logo.png"
            className="loged-in-header-icon"
          />
          <div className="loged-in-header-nav">
            <span className="loged-in-header-home">Home</span>
            <span className="loged-in-header-events">Events</span>
            <span className="loged-in-header-tickets">Tickets</span>
          </div>
          <img
            alt="pastedImage"
            src="/playground_assets/user-icon-sample.png"
            className="loged-in-header-user-icon"
          />
        </header>
      </div>
      <style jsx>
        {`
          .loged-in-header-container {
            width: 100%;
            height: 100%;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .loged-in-header-header {
            width: 100%;
            height: 48px;
            display: flex;
            max-width: 100%;
            align-items: center;
            padding-top: 8px;
            padding-left: 32px;
            padding-right: 32px;
            padding-bottom: 8px;
            justify-content: space-between;
            background-color: rgba(9, 26, 43, 1);
            position: fixed;
            top: 0;
            z-index: 999;
          }
          .loged-in-header-icon {
            height: 100%;
          }
          .loged-in-header-nav {
            display: flex;
            position: relative;
            align-self: center;
            flex-direction: row;
            justify-content: center;
          }
          .loged-in-header-home {
            color: rgb(255, 255, 255);
            font-size: 16px;
            align-self: stretch;
            margin-right: 32px;
          }
          .loged-in-header-events {
            color: #ffffff;
            font-size: 16px;
            align-self: stretch;
            margin-right: 32px;
          }
          .loged-in-header-tickets {
            color: #ffffff;
            font-size: 16px;
            align-self: stretch;
            margin-right: 32px;
          }
          .loged-in-header-user-icon {
            width: auto;
            height: 100%;
          }
        `}
      </style>
    </>
  )
}

export default Header
