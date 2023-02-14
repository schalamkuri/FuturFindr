import {
    Grid,
    Card,
    Typography,
} from "@mui/material";

const CollegeCard = (props) => {

    let name = props.name
    let tuition = props.tuition

    return (
        <Grid item xs={3}>
            <Card className='college-card'>
               <Typography>{name}</Typography>
               <Typography>{tuition}</Typography>
            </Card>
        </Grid >

    );
}


export default CollegeCard;