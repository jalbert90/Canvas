const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Point {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.x = (this.lng + 180);
        this.y = (90 - this.lat);
    }

    //method to plot the points
    plot() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
    // method to draw a Label 
    label(text) {
        ctx.font = '14px serif';
        ctx.fillText(text, this.x, this.y);
    }

}
function getDistance(pointA, pointB) {
    const Lat = ((pointA["lat"] - pointB["lat"]) * Math.PI) / 180;
    const Lng = ((pointA["lng"] - pointB["lng"]) * Math.PI) / 180;
    const Radius = 6378.137;
    const hav = ((Math.sin(Lat / 2) * (Math.sin(Lat / 2)))
        + (Math.cos((pointB.lat * Math.PI) / 180) * Math.cos((pointA.lat * Math.PI) / 180) *
            (Math.sin(Lng / 2)) * (Math.sin(Lng / 2))));

    const Dist = 2 * Radius * Math.asin(Math.sqrt(hav));
    return Dist.toFixed(2);
}

// test for the New york and london
// const london = new Point(-74.0060, 40.7128);
const london = new Point(51.5072, -0.1276);
// const newYork = new Point(0.1278, 51.5074);
const newYork = new Point(40.7128, -74.0060);

london.plot();
london.label("New York");

newYork.plot();
newYork.label("London");

const beijing = new Point(39.9042, 116.4074);
beijing.plot();

const sydney = new Point(-33.8668, 151.2093);
sydney.plot();

const distance = getDistance(newYork, london);