"use client"
import FooterBar from '../components/footer';
import ButtonAppBar from '../components/navbar';
import React from 'react';
import { RowsPhotoAlbum, ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { useTheme } from "next-themes";

// Make Home a class
class HomeComponent extends React.Component<any, any> {

  // Sample photos data - replace with actual photo URLs and dimensions
  photos = [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&crop=faces",
      width: 800,
      height: 600,
      alt: "Our Engagement Photo"
    },
    {
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&h=800&fit=crop&crop=faces",
      width: 1200,
      height: 800,
      alt: "First Date"
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&h=600&fit=crop&crop=faces",
      width: 900,
      height: 600,
      alt: "Adventure Together"
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&h=900&fit=crop&crop=faces",
      width: 700,
      height: 900,
      alt: "Happy Moments"
    },
    {
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1000&h=667&fit=crop&crop=faces",
      width: 1000,
      height: 667,
      alt: "Love & Laughter"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop&crop=faces",
      width: 800,
      height: 1000,
      alt: "Building Dreams"
    },
    {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1100&h=733&fit=crop&crop=faces",
      width: 1100,
      height: 733,
      alt: "Sweet Memories"
    },
    {
      src: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=900&h=1200&fit=crop&crop=faces",
      width: 900,
      height: 1200,
      alt: "Together Forever"
    }
  ];

  // Give it state for isMobile
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    }
  }

  // Helper function to get frame colors based on theme
  getFrameColors = (isDark) => {
    if (isDark) {
      return {
        background: "#2a2a2a", // Dark frame background
        borderColor: "#404040", // Dark border
        insetColor: "#2a2a2a", // Dark inner frame
        shadowColor: "rgba(255, 255, 255, 0.1)", // Light shadow for contrast
        hoverShadowColor: "rgba(255, 255, 255, 0.2)"
      };
    } else {
      return {
        background: "white", // Light frame background
        borderColor: "rgba(255, 255, 255, 0.9)", // Light border
        insetColor: "rgba(255, 255, 255, 1)", // Light inner frame
        shadowColor: "rgba(0, 0, 0, 0.1)", // Dark shadow
        hoverShadowColor: "rgba(0, 0, 0, 0.2)"
      };
    }
  };

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
    const isDark = this.props.isDark;
    const frameColors = this.getFrameColors(isDark);
    
    return (
      <div>
        <title>Emily and Michael's Wedding</title>
        <ButtonAppBar isMobile={this.state.isMobile} />
        {/* If mobile, make the main width 90%, else 75% */}
        <main style={{width: this.state.isMobile ? "90%" : "75%", margin: "auto"}}>
          <h1 style={{textAlign: "center"}}>Welcome to Our Life Together</h1>
          <h2 style={{textAlign: "center"}}>The Wedding of Xinlan Emily Hu and Michael John Cooper</h2>
          <h2 style={{textAlign: "center"}}>June 27, 2026 &nbsp;|&nbsp; Victoria, British Columbia, Canada</h2>
          
          {/* Photo Gallery */}
          <div style={{marginTop: "3rem", marginBottom: "3rem"}}>

            
            {/* React Photo Album Gallery */}
            <div style={{margin: "2rem 0"}}>
              {this.state.isMobile ? (
                // Mobile: Custom vertical stack - one photo above another
                <div style={{display: "flex", flexDirection: "column", gap: "15px", width: "90%", margin: "0 auto"}}>
                  {this.photos.map((photo, index) => (
                    <div
                      key={index}
                      style={{
                        borderRadius: "8px",
                        boxShadow: `0 4px 8px ${frameColors.shadowColor}, 0 0 0 1px ${frameColors.borderColor}, inset 0 0 0 8px ${frameColors.insetColor}`,
                        background: frameColors.background,
                        padding: "12px",
                        transition: "all 0.3s ease",
                        width: "100%"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px) rotate(0deg)";
                        e.currentTarget.style.boxShadow = `0 12px 24px ${frameColors.hoverShadowColor}, 0 0 0 1px ${frameColors.borderColor}, inset 0 0 0 8px ${frameColors.insetColor}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0px)";
                        e.currentTarget.style.boxShadow = `0 4px 8px ${frameColors.shadowColor}, 0 0 0 1px ${frameColors.borderColor}, inset 0 0 0 8px ${frameColors.insetColor}`;
                      }}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "4px",
                          display: "block"
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Desktop: Rows layout with frames
                <RowsPhotoAlbum 
                  photos={this.photos}
                  targetRowHeight={300}
                  defaultContainerWidth={1200}
                  sizes={{
                    size: "75vw"
                  }}
                  spacing={15}
                  padding={0}
                  render={{
                    wrapper: ({ style, ...rest }) => (
                      <div
                        style={{
                          ...style,
                          borderRadius: "8px",
                          boxShadow: `0 4px 8px ${frameColors.shadowColor}, 0 0 0 1px ${frameColors.borderColor}, inset 0 0 0 8px ${frameColors.insetColor}`,
                          background: frameColors.background,
                          padding: "12px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-5px) rotate(0deg)";
                          e.currentTarget.style.boxShadow = `0 12px 24px ${frameColors.hoverShadowColor}, 0 0 0 1px ${frameColors.borderColor}, inset 0 0 0 8px ${frameColors.insetColor}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0px)";
                          e.currentTarget.style.boxShadow = `0 4px 8px ${frameColors.shadowColor}, 0 0 0 1px ${frameColors.borderColor}, inset 0 0 0 8px ${frameColors.insetColor}`;
                        }}
                        {...rest}
                      />
                    ),
                  }}
                />
              )}
            </div>

            {/* Decorative elements */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
              gap: "1rem"
            }}>
              <div style={{
                width: "50px",
                height: "2px",
                background: "linear-gradient(90deg, transparent, #667eea, transparent)"
              }}></div>
              <div style={{
                fontSize: "1.5rem",
                color: "#667eea"
              }}>♥</div>
              <div style={{
                width: "50px",
                height: "2px",
                background: "linear-gradient(90deg, transparent, #667eea, transparent)"
              }}></div>
            </div>
          </div>

        </main>
      {/* Pass in whether we are on mobile to the footer */}
      <FooterBar isMobile={this.state.isMobile}/>

      </div>
    );
}
}

// Wrapper component to handle theme
export default function Home() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  return <HomeComponent isDark={isDark} />;
}
