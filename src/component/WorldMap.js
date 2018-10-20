import React, { Component } from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import { numberToColorRgb} from "../helpers";

class WorldMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            targetSVG: "M-50,0a50,50 0 1,0 100,0a50,50 0 1,0 -100,0",
            areas: [{
                "id": "US",
                "showAsSelected": false,
                "images": [{}]
            },{
                "id": "CA",
                "showAsSelected": false,
                "images": [{}]
            },{
                "id": "BR",
                "showAsSelected": false,
                "images": [{}]
            }]
        }
    }

    componentDidUpdate(){
        // this.setState({
        //     areas:
        // })
    }


    highlightCountrie(e) {
        if(typeof e.mapObject.id !== 'undefined'){
            alert('render modal with info for country: ' + e.mapObject.id)
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


        //config as same as yours but inside const
        const config = {
            "type": "map",
            "theme": "light",
            "projection": "miller",
            "imagesSettings": {
                "rollOverColor": "#ccc",
                "selectedColor": "red",
                "color": "#fff"
            },
            "dataProvider": {
                "map": "worldLow",
                "areas": this.state.areas,
                "images": [
                    {
                        "latitude": -28.7676591056912,
                        "longitude": -14.94140625,
                        "title": "Atlantic South",
                        "svgPath": this.state.targetSVG,
                        "color":"red",
                        "alpha": 0.7,
                        "scale": 0.5,
                        "selectable": true,
                        "partners":[{
                            id: 'US',
                            commitment: 50
                        },{
                            id: 'BR',
                            commitment: 60
                        }],

                    },{
                        "latitude": [34.6693585452454],
                        "longitude": -40.78125,
                        "title": "Atlantic North",
                        "svgPath": this.state.targetSVG,
                        "color":"red",
                        "alpha": 0.7,
                        "scale": 0.5,
                        "selectable": true,
                        "partners":[{
                            id: 'CA',
                            commitment: 100
                        }],

                    }]
            },
            "areasSettings": {
                "autoZoom": false,
                "selectedColor": "#CC0000"
            },
            "listeners": [
                {
                    "event": "clickMapObject",
                    "method": (e) => this.highlightCountrie(e)
                }],

        };

        return (
            <div className="App">
                <AmCharts.React style={{ width: "100%", height: "500px" }} options={config} />
            </div>);
    }
}

export default WorldMap;