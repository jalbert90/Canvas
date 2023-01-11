// Create a canvas element, and set the width and height
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
// Append the canvas to the document
document.body.appendChild(canvas);

// Get the canvas 2d context, and set the stroke style
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'gray';

class Point {
    constructor(lat, lng, label) {
        this.lat = lat;
        this.lng = lng;
        // Converts the range of 'lng' from [-180, 180] to [0, canvas.width] and the range of 'lat' from [-90, 90] to [0, canvas.height]
        this.x = (this.lng + 180) * (canvas.width / 360);
        this.y = (90 - this.lat) * (canvas.height / 180);
        // Plot and label the point
        this.plot();
        this.label(label);
    }

    // Method to plot a Point object
    plot() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Method to label a Point object
    label(text) {
        ctx.font = '12px sans-serif';
        ctx.fillText(text, this.x, this.y - 3);
    }

    // Class method to create an arbitrary label
    static label(text, x, y) {
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(text, x, y);
    }

    // Class method to calculate the distance between two Point objects in km
    static distance(p, q) {
        // Radius of the earth in km
        const R = 6371;
        // Convert the latitude and longitude into radians
        const plat = p.lat * (Math.PI / 180);
        const plong = p.lng * (Math.PI / 180);
        const qlat = q.lat * (Math.PI / 180);
        const qlong = q.lng * (Math.PI / 180);
        // Calculate the absolute difference in longitude between two points
        const dLong = Math.abs(plong - qlong);
        // Calculate the central angle between the two points using the spherical law of cosines
        const dSigma = Math.acos(Math.sin(plat) * Math.sin(qlat) + Math.cos(plat) * Math.cos(qlat) * Math.cos(dLong));
        // Calculate the arc length on the sphere
        var dist = R * dSigma;
        // Round the answer to two decimal places
        dist = (Math.round(dist * 100) / 100).toFixed(2);
        return dist;
    }

    // Class method to draw a line segment between two points, and place a label containing the distance between the two points at the midpoint
    static drawLine(p, q) {
        // Draw a line segment
        ctx.beginPath();
        // From here:
        ctx.moveTo(p.x, p.y);
        // To here:
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
        // Call the distance method to find the distance between p and q
        const dist = Point.distance(p, q);
        // Label the midpoint of the line segment with the distance between p and q
        Point.label(dist + " km", (p.x + q.x) / 2, (p.y + q.y) / 2);

    }
}

// Construct Point objects here:
const london = new Point(51.5072, -0.1276, 'London');
const newYork = new Point(40.7128, -74.0060, 'New York');
const beijing = new Point(39.9042, 116.4074, 'Beijing');
const sydney = new Point(-33.8668, 151.2093, 'Sydney');

// Call the drawLine method to add a line segment between two points labeled with distance
Point.drawLine(london, newYork);
Point.drawLine(london, beijing);
Point.drawLine(newYork, sydney);