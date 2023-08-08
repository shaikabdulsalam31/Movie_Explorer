import { Tab, Tabs, TextField, ThemeProvider, createTheme } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";
import { useEffect, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import CustomPage from "../../components/Page/Custompage";
import MonoContent from "../../components/MonoContent/MonoContent";
import './search.css'
function Search(){

    const [type,setType]=useState(0);
    const [page,setPage]=useState(1)
    const [searchText,setSearch]=useState("");
    const[content,setContent]=useState();
    const [numofPages,setnumPage]=useState();
    
    const darkTheme=createTheme({
        palette:dark
        
       
    })
    const fetchsearch=async ()=>{
        const {data}= await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=97138bae654ccc960a1e0f0f53236938&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
        setContent(data.results)
        setnumPage(data.total_pages)
    };
    useEffect(()=>{
        window.scroll(0,0)
        fetchsearch();
    },[type,page])
    return (
        <div>
            <ThemeProvider theme={darkTheme} >
            <div style={{display:'flex',margin:'15px 0'}}>
            <TextField
            style={{flex:1}}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e)=>setSearch(e.target.value)}
            />
            <button variant="contained" style={{marginLeft:10}} onClick={fetchsearch}> <SearchIcon/></button>
            </div>
            
            <Tabs value={type}  style={{paddingBottom:5}} indicatorColor="primary" textColor="primary" onChange={(event,newValue)=>{
                setType(newValue);
                setPage(1);
            }}>
                <Tab style={{width:"50%"}} label="Search Movies" />
                <Tab style={{width:"50%"}} label="Search Series" />
            </Tabs>
            
            </ThemeProvider> 
            <div className="trend">
            {
                content && content.map((c)=><MonoContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={type?"tv":"movie"} vote_average={c.vote_average}/>)
            }
            {searchText && !content &&(type? <h2>No Series Found</h2>:<h2>No Movies Found</h2>)}
        </div>
        {numofPages>1 &&
        <CustomPage setPage={setPage} numOfPages={numofPages}/>}
        </div>

    )
}
export default Search