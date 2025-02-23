import ThemeSwitch from './darkModeToggle';

import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Mate } from 'next/font/google'


const mate = Mate({ subsets: ['latin'], weight: ["400"] });

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
    <Box className="dark:bg-black bg-white" style={{position: 'fixed', bottom: 0, width: '100%', zIndex: 1000}}>
    <Toolbar variant="dense">

      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={mate.className} style={{textAlign: 'center', fontSize: '14px'}}>
        { this.state.isMobile ? (
            <>Made with &#10084;&#65039; by Em&M</>
         ) : 
          (
            <>Made with &#10084;&#65039; by Emily & Michael (w/ a little help from <a href='https://nextjs.org'>next.js</a>).</>
          )}
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