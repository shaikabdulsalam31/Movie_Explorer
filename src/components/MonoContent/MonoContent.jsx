import { img_300, unavailable } from "../../Linker/link";
import ConModal from "../Modal/ConModel";
import './MonoContent.css'
import { Badge } from "@mui/material";
const MonoContent=({
    id,poster,title,date,media_type,vote_average
})=>{
    return (
        
        <ConModal media_type={media_type} id={id}>
            <div className="media">
            <Badge badgeContent={vote_average} color={vote_average>6?"primary":"secondary"}/>
            <img className="poster" src={poster?`${img_300}/${poster}`:unavailable} alt={title}/>
            <b className="title">{title}</b>
            <span className="stitle">
                {media_type==='tv'?"Series":"Movie"}
                <span className="stitle">{date}</span>
            </span>
            </div>
        </ConModal>
       
    )
}

export default MonoContent;
