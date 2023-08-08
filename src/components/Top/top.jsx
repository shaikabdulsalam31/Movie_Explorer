import './top.css'

function Top(){
    return (
        <div>
        <span onClick={()=>window.scroll(0,0)} className='top'>Movie Explorer 🎬 </span>
        </div>
    )
}

export default Top