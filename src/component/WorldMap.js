import React, { Component } from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {numberToColorRgb, arrayCountries} from '../helpers';
var countries = require('country-list')();

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class WorldMapWrap extends Component {
    constructor(props){
        super(props)
        console.log(arrayCountries)
        let countries = arrayCountries.map((item)=>{
            return {
                "id": item[0],
                "showAsSelected": false,
                "images": [{}]
            }
        })
        this.state = {
            targetSVG: "M-50,0a50,50 0 1,0 100,0a50,50 0 1,0 -100,0",
            areas: countries,
            selectedCountry: ''
        }
    }

    state = {
        open: false,
    };

    handleClickOpen = (id) => {
        var transform = countries.getName(id)
        this.setState({
            selectedCountry: transform,
            open: true
        })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidUpdate(){

    }

    highlightCountrie(e) {
        if(typeof e.mapObject.id !== 'undefined'){
            // alert('render modal with info for country: ' + e.mapObject.id)
            this.handleClickOpen(e.mapObject.id)
        } else {
            let areas = e.mapObject.partners.map(function(item){
                return {
                    id: item.id,
                    showAsSelected: true,
                    selectedColor: numberToColorRgb(item.commitment),
                    selectable: true
                }
            });
            this.setState({
                areas: areas
            })
        }

    }
    render(){
        const { classes } = this.props;

        //config as same as yours but inside const
        const config = {
            "type": "map",
            "theme": "light",
            "projection": "miller",
            "imagesSettings": {
                "rollOverColor": "#fff",
                "selectedColor": "red",
                "color": "#fff",
                "labelPosition": "bottom",
                "labelSelectedColor": "green"
            },
            "dataProvider": {
                "map": "worldLow",
                "areas": this.state.areas,
                "images": [
                    {
                        "latitude": -28.7676591056912,
                        "longitude": -14.94140625,
                        "label": "Atlantic North",
                        // "svgPath": this.state.targetSVG,
                        accessibleTitle:true,
                        "labelColor":"#e78200",
                        "alpha": 0.5,
                        "scale": 0.1,
                        "selectable": true,
                        "partners":[{
                            id: 'US',
                            commitment: 0
                        },{
                            id: 'BR',
                            commitment: 80
                        }],

                    },{
                        "latitude": [34.6693585452454],
                        "longitude": -40.78125,
                        "label": "Atlantic North",
                        "labelColor":"#e78200",
                        // "svgPath": this.state.targetSVG,
                        'accessibleTitle':true,
                        'fontSize':38,
                        "color":"#fff",
                        "alpha": 0.5,
                        "scale": 0.1,
                        "selectable": true,
                        "partners":[{
                            id: 'CA',
                            commitment: 100
                        }],

                    }]
            },
            "areasSettings": {
                "autoZoom": false,
                "selectedColor": "#8bebcc"
            },
            "listeners": [
                {
                    "event": "clickMapObject",
                    "method": (e) => this.highlightCountrie(e)
                }],

        };

            return (
                <div>
                    <AmCharts.React style={{ width: "100%", height: "500px" }} options={config} />
                    <Dialog
                        fullScreen
                        open={this.state.open}
                        onClose={this.handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit" className={classes.flex}>
                                    {this.state.selectedCountry}
                                </Typography>
                                <Button color="inherit" onClick={this.handleClose}>
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            Put here some nice Charts for {this.state.selectedCountry}!
                        </Typography>
                    </Dialog>
                </div>
            );
        }
}

const WorldMap = withStyles(styles)(WorldMapWrap);

export default WorldMap;