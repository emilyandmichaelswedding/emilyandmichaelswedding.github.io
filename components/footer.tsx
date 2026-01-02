import ThemeSwitch from './darkModeToggle';

import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function obfuscate( domain, em_name ) { 
    // Credit to Dan Jurafsky for this function.
    return em_name + '@' + domain;
}

export default class FooterBar extends React.Component<any, any> {

    // Give it state for isMobile
    constructor(props) {
      super(props);
      this.state = {
        isMobile: props.isMobile
      };
    }

    componentDidMount() {
      this.setState({isMobile: this.props.isMobile});
    }

    componentDidUpdate(prevProps) {
      if (prevProps.isMobile !== this.props.isMobile) {
        this.setState({isMobile: this.props.isMobile});
      }
    }

  render( ) {

  return (
    <>
    {/* Apply tailwind styling to the box */}
    <Box className="dark:bg-black bg-white" style={{position: 'fixed', bottom: 0, width: '100%', zIndex: 1000, fontFamily: 'inherit'}}>
    <Toolbar variant="dense" style={{fontFamily: 'inherit'}}>

      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign: 'center', fontSize: '14px', fontFamily: 'inherit'}}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <div style={{
            width: "30px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #667eea, transparent)"
          }}></div>
          { this.state.isMobile ? (
              <>Made with <span style={{fontSize: '1.2rem', color: '#667eea'}}>♥</span> by Em&M</>
           ) : 
            (
              <>Made with <span style={{fontSize: '1.2rem', color: '#667eea'}}>♥</span> by Emily & Michael (w/ a little help from <a href='https://nextjs.org'>next.js</a>).</>
            )}
          <div style={{
            width: "30px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #667eea, transparent)"
          }}></div>
        </div>
      </Typography>

      <ThemeSwitch />
    </Toolbar>
    </Box>
    <style jsx>{`
    #heart {
        font-size: 14px;
        text-decoration: none;
        cursor: text;
    }
      `}</style>
    </>
  );
}
}