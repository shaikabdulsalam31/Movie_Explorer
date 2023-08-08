import {Pagination} from '@mui/lab'
import { createTheme,ThemeProvider} from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';

const darkTheme=createTheme({
     palette:dark
})
const CustomPage=({setPage,numOfPages=10})=>{

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
      };
    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}>
        <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
          shape='rounded'
          
        />
        </ThemeProvider>
        </div>
    )
}

export default CustomPage