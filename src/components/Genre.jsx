import { useEffect } from "react";
import axios from "axios";
import { Chip, ThemeProvider ,createTheme } from "@mui/material";
import { dark } from '@mui/material/styles/createPalette';

const darkTheme=createTheme({
     palette:dark
})

const Genre=({
    chosegenres,
    setchoseGenres,
    genres,
    setGenres,
    type,
    setPage
})=>{

    const handleadd=(genre)=>{
        setchoseGenres([...chosegenres,genre])
        setGenres(genres.filter((g)=> g.id!=genre.id))
        setPage(1);
        
    }
    const handled=(genre)=>{
           setchoseGenres(chosegenres.filter((select)=>select.id!=genre.id)) 
           setGenres([...genres,genre])
           setPage(1);
    }
    const fetchGenres=async()=>{
        const {data}=await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=97138bae654ccc960a1e0f0f53236938&language=en-US`)
        setGenres(data.genres);
    }
    console.log(genres)
    useEffect(()=>{
        fetchGenres();

       
    },[]);
    return (
        <div style={{padding:"6px 0" }}>
            <ThemeProvider theme={darkTheme}>
            {chosegenres && chosegenres.map((genre)=><Chip onDelete={()=>handled(genre)} label={genre.name} style={{margin:2} } color="primary" size="small" clickable/>)}
            {genres && genres.map((genre)=><Chip label={genre.name} style={{margin:2} } size="small" key={genre.id} clickable onClick={()=>handleadd(genre)}/>)}
            </ThemeProvider>
        </div>
    )
}

export default Genre