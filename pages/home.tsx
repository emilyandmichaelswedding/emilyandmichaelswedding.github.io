"use client"
import FooterBar from '../components/footer';
import ButtonAppBar from '../components/navbar';
import React from 'react';
import { RowsPhotoAlbum, ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { useTheme } from "next-themes";

// Make Home a class
class HomeComponent extends React.Component<any, any> {

  // Photo URLs - dimensions will be detected dynamically
  photoSources = [
      {
        src: "/coverPhotos/2022-graduation-85.jpg",
        alt: "Graduating from Stanford"
      },
      {
        src: "/coverPhotos/cape-cod.jpg",
        alt: "Together at Cape Cod"
      },
      {
        src: "/coverPhotos/tahoe-ski.jpg",
        alt: "Skiing together in Tahoe"
      },
      {
        src: "/coverPhotos/love-sf-moma.jpg",
        alt: "Valentine's Date in SF MoMa"
      },
      {
        src: "/coverPhotos/engagement-1.JPEG",
        alt: "The moment we got engaged!"
      },
      {
        src: "/coverPhotos/great-wall.jpg",
        alt: "Climbing the Great Wall of China Together"
      },
      {
        src: "/coverPhotos/toronto-keg.jpg",
        alt: "Michael's birthday dinner at The Keg"
      },
      {
        src: "/coverPhotos/vball-yr2.JPG",
        alt: "Viennese Ball Year 2"
      }
  ];

  // Give it state for isMobile and photos
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      photos: [], // Will be populated with dimensions
      photosLoaded: false
    }
  }

  // Function to get image dimensions
  getImageDimensions = (src: string): Promise<{width: number, height: number}> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      img.onerror = () => {
        // Fallback dimensions if image fails to load
        resolve({
          width: 800,
          height: 600
        });
      };
      img.src = src;
    });
  };

  // Load all images and get their dimensions
  loadPhotosWithDimensions = async () => {
    const photosWithDimensions = await Promise.all(
      this.photoSources.map(async (photo) => {
        const dimensions = await this.getImageDimensions(photo.src);
        return {
          ...photo,
          width: dimensions.width,
          height: dimensions.height
        };
      })
    );
    
    this.setState({ 
      photos: photosWithDimensions,
      photosLoaded: true 
    });
  };

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

  // Use useEffect to update isMobile on window resize and load photos
  componentDidMount() {
    this.setState({isMobile: window.innerWidth < 650});
    const handleResize = () => {
      this.setState({isMobile: window.innerWidth < 650});
    }
    window.addEventListener('resize', handleResize);
    
    // Load photos with their actual dimensions
    this.loadPhotosWithDimensions();
  }

  // Render the page
  render () {
    const isDark = this.props.isDark;
    const frameColors = this.getFrameColors(isDark);
    
    return (
      <div>
        <title>Emily and Michael's Wedding</title>
        <ButtonAppBar />
        {/* If mobile, make the main width 90%, else 75% */}
        <main style={{width: this.state.isMobile ? "90%" : "75%", margin: "auto"}}>
          <h1 style={{textAlign: "center"}}>Welcome to Our Life Together</h1>
          <h2 style={{textAlign: "center"}}>The Wedding of Xinlan Emily Hu and Michael John Cooper</h2>
          <h2 style={{textAlign: "center"}}>June 27, 2026 &nbsp;|&nbsp; Victoria, British Columbia, Canada</h2>
          
          {/* Photo Gallery */}
          <div style={{marginTop: "3rem", marginBottom: "3rem"}}>

            
            {/* React Photo Album Gallery */}
            <div style={{margin: "2rem 0"}}>
              {!this.state.photosLoaded ? (
                // Loading state
                <div style={{textAlign: "center", padding: "2rem"}}>
                  <p>Loading photos...</p>
                </div>
              ) : this.state.isMobile ? (
                // Mobile: Custom vertical stack - one photo above another
                <div style={{display: "flex", flexDirection: "column", gap: "15px", width: "90%", margin: "0 auto"}}>
                  {this.state.photos.map((photo, index) => (
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
                  photos={this.state.photos}
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
