import CustomPage from "../../components/Page/Custompage"
import MonoContent from "../../components/MonoContent/MonoContent"
import Genre from "../../components/Genre";
import { useState,useEffect } from "react";
import useGenres from "../../Hooks/useGenre";
import axios from "axios";
function Series(){
    const [page,setPage]=useState(1);
    const [content,setContent]=useState([]);
    const [numofPages,setnumPage]=useState();
    const [chosegenres,setchoseGenres]=useState([]);
    const [genres,setGenres]=useState([]);
    const genreforURL=useGenres(chosegenres)

    const fetchMovie=async ()=>{
        const {data}=await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=97138bae654ccc960a1e0f0f53236938&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
        console.log(data)
        setContent(data.results)
        setnumPage(data.total_pages)
    }
    useEffect(()=>{
        window.scroll(0,0)
        fetchMovie()
    },[page,genreforURL]);

    return (
        <div>
            <span className="pageTitle">Series</span>
            <Genre
              type='tv'
              chosegenres={chosegenres}
              genres={genres}
              setGenres={setGenres}
              setchoseGenres={setchoseGenres}
              setPage={setPage}
            />
            <div className="trend">
            {
                content && content.map((c)=><MonoContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type='tv'vote_average={c.vote_average}/>)
            }
        </div>
        <CustomPage setPage={setPage} numOfPages={numofPages}/>
        </div>
    )
}
export default Series