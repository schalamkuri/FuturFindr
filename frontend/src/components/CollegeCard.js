import {
    Grid,
    Card,
    Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";

const CollegeCard = (props) => {

    let name = props.name
    let tuition = props.tuition

    return (
        <Grid item xs={3}>
            <Card className='college-card' color="purple">
               <Typography>{name}</Typography>
               <Typography>{tuition}</Typography>
            </Card>
        </Grid >

    );
}


export default CollegeCard;