import axios from 'axios'
import { useEffect, useState } from 'react';
import MonoContent from '../../components/MonoContent/MonoContent';
import './Trend.css'
import CustomPage from '../../components/Page/Custompage';

function Trend(){
    const [page,setPage]=useState(1)
    const [content,setContent]=useState([]);
    
    const fetchTrend=async ()=>{
        const {data}=await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=97138bae654ccc960a1e0f0f53236938&page=${page}`)
        console.log(data)
        setContent(data.results)
    }
    
    useEffect(()=>{
        fetchTrend();
    },[page]);

    return <div>
        <span className="pageTitle">Popular</span>
        <div className="trend">
            {
                content && content.map((c)=><MonoContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type} vote_average={c.vote_average}/>)
            }
        </div>
        <CustomPage setPage={setPage}/>
    </div>
}

export default Trend