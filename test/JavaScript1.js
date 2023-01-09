const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';

class Point {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.x = (this.lng + 180) * (canvas.width / 360);
        this.y = (90 - this.lat) * (canvas.width / 180);
    }

    plot() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    }

    label(text) {
        ctx.font = '12px sans-serif';
        ctx.fillText(text, this.x, this.y);
    }

    static distance(p1, p2) {
        const R = 6371;
        const dLat = (p2.lat - p1.lat) * (Math.PI / 180);
        const dLng = (p2.lng - p1.lng) * (Math.PI / 180);
        const lat1 = p1.lat * (Math.PI / 180);
        const lat2 = p2.lat * (Math.PI / 180);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
}

const point1 = new Point(51.5074, 0.1278);
point1.plot();
point1.label('London');