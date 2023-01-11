// create a canvas element and append it to the document body
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// set the width and height of the canvas
canvas.width = 800;
canvas.height = 600;

// get the canvas 2d context 
const ctx = canvas.getContext('2d');


// define a Point class that takes in latitude and longitude
class Point {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }

    computeXY() {
        // example formula , the ideal way to convert it is to use a projectin algorithm for example Mercator projection
        const x = 400 + this.lng * 2;
        const y = 300 - this.lat * 2;
        return [x, y]
    }

    plot() {
        const [x, y] = this.computeXY()
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }

    // method to draw a text label at the point
    label(text) {
        const [x, y] = this.computeXY()
        ctx.font = '12px Arial';
        ctx.strokeText(text, x, y);
    }
}

// define a function to calculate the distance between two points in kilometers
// using the Haversine formula
function getDistance(p1, p2) {
    const R = 6371; // radius of the Earth in km
    const dLat = (p2.lat - p1.lat) * (Math.PI / 180);
    const dLng = (p2.lng - p1.lng) * (Math.PI / 180);
    const lat1 = p1.lat * (Math.PI / 180);
    const lat2 = p2.lat * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}



// create two Point instances
const london = new Point(51.5074, -0.1278);
london.plot();
london.label('London');

const ny = new Point(40.7128, -74.0060);
ny.plot();

const beijing = new Point(39.9042, 116.4074);
beijing.plot();

const sydney = new Point(-33.8668, 151.2093);
sydney.plot();

const d = getDistance(london, ny);
