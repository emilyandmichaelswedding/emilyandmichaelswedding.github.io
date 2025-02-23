"use client"
import FooterBar from '../components/footer';
import ButtonAppBar from '../components/navbar';
import React from 'react';

// Make Home a class
export default class Home extends React.Component<any, any> {

  // Give it state for isMobile
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    }
  }

  // Use useEffect to update isMobile on window resize
  componentDidMount() {
    this.setState({isMobile: window.innerWidth < 650});
    const handleResize = () => {
      this.setState({isMobile: window.innerWidth < 650});
    }
    window.addEventListener('resize', handleResize);
  }

  // Render the page
  render () {
    return (
      <div>
        <title>Emily and Michael's Wedding</title>
        <ButtonAppBar />
        {/* Make the width of main 85% of the page width and center it */}
        <main style={{width: this.state.isMobile ? "90%" : "75%", margin: "auto"}}>
          <h1>Emily and Michael's Wedding</h1>
          
        </main>
      {/* Pass in whether we are on mobile to the footer */}
      <FooterBar isMobile={this.state.isMobile}/>

      </div>
    );
}
}
