const useGenres=(chosegenres)=>{
    if(chosegenres.length<1) return "";

    const GenreIds=chosegenres.map((g)=>g.id);
    return GenreIds.reduce((acc,curr)=>acc+','+curr);
}
export default useGenres