import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import CardContent from '@mui/material/CardContent';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const useStyles = makeStyles({
    title: {
        textTransform: 'capitalize'
    },
    root: {
        margin: '5px',
    }
  });

export default function FoodCard(props) {
    const classes = useStyles();
    return (
        <Card sx={{ minWidth: 250, maxWidth: 250}} className={classes.root}>
            <CardMedia
                component="img"
                height="140"
                image={props.imagePath}
                alt={props.imagePath}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className={classes.title}>
                {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button className={classes.button} href={props.url}>Tarife Git <KeyboardArrowRightIcon /></Button>
            </CardActions>
        </Card>
    )
}