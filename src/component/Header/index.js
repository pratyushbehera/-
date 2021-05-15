import React from "react";
const STYLE = {
  loadingText: {
    fontSize: '1rem', color: '#fff'
  },
  width100: {
    width: '100%'
  },
  moveTop: {
    backgroundColor: ' #14a76c', height: '15em', position: 'relative', top: '0px', padding: '1rem' 
  }
}

const Header = (props) => {
  return (
    <div className="row" style={STYLE.moveTop}>
      <div className="col" style={STYLE.width100}>
        <div className="left logo">
          Weather Forecast
        </div>
      </div>
      <div className="container center-align">
        {props.isLoading &&
          <span className="loading" style={STYLE.loadingText}>...</span>
        }
        {!props.isLoading &&
          <span style={STYLE.loadingText}>
            {props.currentPlace}
          </span>
        }

      </div>
    </div>
  );
}

export default Header;
