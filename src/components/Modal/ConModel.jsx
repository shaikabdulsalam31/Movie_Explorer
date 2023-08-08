import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Button from '@mui/material/Button';
import './ConModal.css'
import axios from 'axios';
import { Fade } from '@mui/material';
import { useEffect } from 'react';
import { img_500, unavailable ,unavailableLandscape} from '../../Linker/link';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Gallery from '../Carousel/Carousel';

const style = {width:"90%",height:"80%",
            backgroundColor:"#39445a",border:"1px solid #282c34",
            borderRadius:5,color:"white",marginTop:"5px"};

export default function ConModal({children,media_type,id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

   const fetchapi=async()=>{
      const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=97138bae654ccc960a1e0f0f53236938&language=en-US`)
      setContent(data);
    }
   const fetchVideo=async()=>{
       const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=97138bae654ccc960a1e0f0f53236938&language=en-US`)
       console.log(data);
       setVideo(data.results[0]?.key);
      }
      useEffect(()=>{
        fetchVideo()
        fetchapi()
      },[])
      return (
        <>
          <Button className="media"
            style={{ cursor: "pointer" }}
            color="inherit"
            onClick={handleOpen}>{children}</Button>
          <Modal
          
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            open={open}
            onClose={handleClose}
            closeAfterTransition
          >
            <Fade in={open}>
            <Box sx={style}>
              {content && (
                
                  <div className="ContentModal">
                    <img
                      src={
                        content.poster_path
                          ? `${img_500}/${content.poster_path}`
                          : unavailable
                      }
                      alt={content.name || content.title}
                      className="ContentModal__portrait"
                    />
                    <img
                      src={
                        content.backdrop_path
                          ? `${img_500}/${content.backdrop_path}`
                          : unavailableLandscape
                      }
                      alt={content.name || content.title}
                      className="ContentModal__landscape"
                      style={{borderRadius:"5px",marginTop:'5px'}}
                    />
                    <div className="ContentModal__about">
                      <span className="ContentModal__title">
                        {content.name || content.title} (
                        {(
                          content.first_air_date ||
                          content.release_date ||
                          "-----"
                        ).substring(0, 4)}
                        )
                      </span>
                      {content.tagline && (
                        <i className="tagline">{content.tagline}</i>
                      )}
    
                      <span className="ContentModal__description">
                        {content.overview}
                      </span>
    
                      <div>
                        <Gallery id={id} media_type={media_type} />
                      </div>
    
                      <Button
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch the Trailer
                      </Button>
                    </div>
                  </div>
                
              )}
              </Box>
            </Fade>
          </Modal>
        </>
  );
}