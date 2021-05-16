import React from "react";
const STYLE = {
  text: {
    fontSize: '1rem', color: '#fff', marginTop:'10px'
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
        <br/>
        {props.isLoading &&
          <span className="loading" style={STYLE.text}>...</span>
        }
        {!props.isLoading &&
          <span style={STYLE.text}>
            {props.currentPlace}
          </span>
          
        }

      </div>
    </div>
  );
}

export default Header;
