import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import CardContent from '@mui/material/CardContent';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
    title: {
        textTransform: 'capitalize'
    },
    root: {
        margin: '5px',
    },
    span1: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
    },
    spanDiv: {
        display: 'flex',
        flexDirection: 'row',
        height: '170px',
        alignItems: 'center',
    },
    h3tag: {
        margin: '5px 0px',
        fontSize: '17px',
    },
    button: {
        position: 'relative',
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
                <Typography variant="body2" color="text.secondary" component="div">
                    <div className={classes.spanDiv}>
                        <div className={classes.span1}>{props.ingredients.map((ingredient, i, key = uuidv4()) => i < props.ingredients.length / 2 ? <div className={classes.h3tag}><FiberManualRecordIcon key={key} sx={{ fontSize: 10 }}/>{ingredient.name}</div> : "")}</div>
                        <div className={classes.span1}>{props.ingredients.map((ingredient, i, key = uuidv4()) => i >= props.ingredients.length / 2 ? <div className={classes.h3tag}><FiberManualRecordIcon key={key} sx={{ fontSize: 10 }}/>{ingredient.name}</div> : "")}</div>
                    </div>
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" target="_blank" className={classes.button} href={props.url}>Tarife Git <KeyboardArrowRightIcon /></Button>
            </CardActions>
        </Card>
    )
}