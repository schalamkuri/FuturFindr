import {
    Grid,
    Card,
    Typography, 
    CardMedia,
    CardActionArea,
} from "@mui/material";

import { Link as RouterLink } from 'react-router-dom';


const CollegeCard = (props) => {

    let name = props.name
    let tuition = props.tuition
    let media = props.media
    let rank = props.rank
    let graduation_rate = props.graduation_rate
    let acceptance_rate = props.acceptance_rate
    let city = props.city

    return (
        // <Grid item xs={3}>
            <Card className='college-card' color="purple">
                <CardActionArea component={RouterLink} to= {`/colleges/${name.split(' ').join('')}`} >
                <CardMedia
                sx={{ height: 150 }}
                image={media}>
                </CardMedia>
                
               <Typography>{name}</Typography>
               <Typography>Tuition: ${tuition}</Typography>
               <Typography>Rank: {rank} </Typography>
               <Typography>Graduation Rate: {graduation_rate}% </Typography>
               <Typography>Acceptance Rate: {acceptance_rate}% </Typography>
               <Typography>City: {city} </Typography>
               </CardActionArea>
            </Card>
        // </Grid >

    );
}


export default CollegeCard;