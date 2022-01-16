import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const useStyles = makeStyles({
    root: {
        marginTop: '10px',
    },
    cardBoard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        flexWrap: 'wrap',
    },

    inputDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: "50px",
    }
  });

function filterDishes(dishes, keyList) {
    let filteredList = [];
    dishes.forEach((dish) => {
        let res = hassAllItem(dish, keyList);
        if(res) {
            filteredList.push(dish);
        }
    })

    return filteredList;
}

function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	// There is no way to take e.g. sets of 5 elements from
	// a set of 4.
	if (k > set.length || k <= 0) {
		return [];
	}
	
	// K-sized set has only one K-sized subset.
	if (k === set.length) {
		return [set];
	}
	
	// There is N 1-sized subsets in a N-sized set.
	if (k === 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		// head is a list that includes only our current element.
		head = set.slice(i, i + 1);
		// We take smaller combinations from the subsequent elements
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		// For each (k-1)-combination we join it with the current
		// and store it to the set of k-combinations.
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function combinations(set) {
	var k, i, combs, k_combs;
	combs = [];
	
	// Calculate all non-empty k-combinations
	for (k = 1; k <= set.length; k++) {
		k_combs = k_combinations(set, k);
		for (i = 0; i < k_combs.length; i++) {
			combs.push(k_combs[i]);
		}
	}
	return combs;
}

function filterCombinations(allCombinations, capacity) {
    let returnLst = [];
    console.log(allCombinations);
    for(let i = 0; i < allCombinations.length; i++) {
        for(let k = 0; k < allCombinations[i].length; k++) {
        }
    }
}

function hassAllItem(dish, capacityList) {
    let counter = 0;
    for(let i = 0; i < capacityList.length; i++) {
        for(let k = 0; k < dish.item.ingredients.length; k++) {
            if(dish.item.ingredients[k].name === capacityList[i].name) {
                counter++;
            }
        }
    }
    let res;
    counter === capacityList.length ? res = true : res = false;
    return res;
}

function getOptimalDish(dishes, capacity) {
    let sortedItems = [];

    let allCombinations = combinations(dishes);
    let filteredCombinations = filterCombinations(allCombinations);
}
 
function parseVolume(vol) {
    let splited = vol.split(" ");
    if(splited[1] === 'gram') {
        return splited[0];
    }
    else if(splited[1] ===  'kg') {
        return splited[0] * 1000;
    }
}

function volumeComparison(ingredientLst, tempCapacity) {
    for(let j = 0; j < ingredientLst.length; j++) {
        for(let m = 0; m < tempCapacity.length; m++) {
            if(ingredientLst[j].name === tempCapacity[m].name) {
                tempCapacity[m].volume -= parseVolume(ingredientLst[j].volume);
                if(tempCapacity[m].volume < 0) {
                    return 0;
                }
            }
        }
    }
    
    return 1;
}

function getBestList(lst, capacityList) {
    let bestLst = [];
    for(let i = 0; i < lst.length; i++) {
        let counter = 0;
        let tempCapacity = JSON.parse(JSON.stringify(capacityList));
        for(let k = 0; k < lst[i].length; k++) {
            let ingredientLst = lst[i][k].item.ingredients;
            if(volumeComparison(ingredientLst, tempCapacity) > 0) {
                counter++;
            }
        }

        if(counter === lst[i].length) {
            bestLst.push(lst[i]);
        }
    }

    /* bestLst might have more than 1 obj */

    let size = -1;
    let price = +Infinity;
    let index = -1;

    for(let i = 0; i < bestLst.length; i++) {
        let totalPrice = 0;
        for(let k = 0; k < bestLst[i].length; k++) {
            totalPrice += bestLst[i][k].price;
        }

        if(size < bestLst[i].length) {
            size = bestLst[i].length;
            price = totalPrice;
            index = i;
        }
        else if(size === bestLst[i].length) {
            if(price > totalPrice) {
                price = totalPrice;
                index = i;
            }
        }
    }

    return bestLst[index];
}


export default function Board(props) {
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [renderedData, setRenderedData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [chosenIng, setChosenIng] = useState(null);
    const [noResult,setNoResult] = useState(false);
    const opts = ['patates', 'soğan', 'dana kıyma', 'makarna'];
    useEffect(() => {
        
        console.log("first useEffect");
        axios.get('http://127.0.0.1:3001')
            .then(response => {
                setData(response.data);
                setRenderedData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const getBestFitDishes = () => {
        if(chosenIng === null || chosenIng[0].length === 0) {
            setRenderedData(data);
        }
        else {
            let opts = chosenIng[0].map(item => { return {name: item}});
            console.log(opts);
            let dishes = data.map((item, index) =>  { return {item, price: index = 10 + index * 5}});     // prices are given by me here.


            let filteredList = filterDishes(dishes, opts);
            
            if(filteredList.length === 0) {
                setNoResult(true);
                setRenderedData(null);
            }
            else {
                let allCombinations = combinations(filteredList);
                let priceList = filteredList.map(item => item.price);
                let newData = getBestList(allCombinations, opts);
                console.log(newData);
                newData = newData.map(dish => dish.item);
                setRenderedData(newData);
            }
        }
    }

    return (
        <div className={classes.root}>
            {loading
            ?
            <CircularProgress />
            :
            <div>
                <h1>Bugün ne hazırlamak istersin?</h1>
                <div className={classes.inputDiv}>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={opts}
                        sx={{ width: '50%' }}
                        filterSelectedOptions
                        onChange={(event, newValue) =>{
                            setChosenIng([newValue]);
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Bileşenler"
                            placeholder="Bir bileşen ismi"
                        />    
                        )}
                    />
                    <Button variant="outlined" size="large" onClick={getBestFitDishes}>Ara</Button>
                </div>
                <div>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Bileşen miktarını sınırla" />
                </FormGroup>
                </div>
                {renderedData === null
                ?
                <h1>Hiçbir sonuca ulaşılamadı.</h1>
                :
                <div className={classes.cardBoard}>
                    {
                    renderedData.map((food, key = uuidv4()) => {
                        return <Card name={food.name} imagePath={food.imagePath} url={food.url} key={key}/>
                    })
                    }
                </div>
                }
            </div>
            }
        </div>
    )
}
