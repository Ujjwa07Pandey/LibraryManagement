import { Box, Typography } from "@material-ui/core";
import Layout from "../components/navigation/Layout";
const NotFoundPage = () => {
    return ( 
<Layout>
    <Box display="flex" style={{ minHeight: '82vh' , justifyContent:"center" , alignItems:"center" }}>
    <Typography variant="h3" align="center">
     Error: 404 <br/>  
     Oops... Sorry... Page Not Found.
        </Typography>
    </Box>
</Layout>

     );
}
 
export default NotFoundPage;