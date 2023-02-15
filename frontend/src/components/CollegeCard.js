import {
    Grid,
    Card,
    Typography,
    CardMedia,
} from "@mui/material";


const CollegeCard = (props) => {

    let name = props.name
    let tuition = props.tuition
    let media = props.media


    return (
        <Grid item xs={3}>
            <Card className='college-card' color="purple">
                <CardMedia
                sx={{ height: 140 }}
                image={media}>
                </CardMedia>
               <Typography>{name}</Typography>
               <Typography>Tuition: ${tuition}</Typography>
            </Card>
        </Grid >

    );
}


export default CollegeCard;