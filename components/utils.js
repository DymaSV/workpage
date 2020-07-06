function image64toCanvasRef(canvasRef, image64, pixelCrop) {
    let canvas = canvasRef;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    let ctx = canvas.getContext('2d');
    let image = new Image()
    image.src = image64
    image.onload = function () {
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )   
    }
}

function getForatedDate() {
    let current_datetime = new Date()
    let formatted_date = current_datetime.getDate()
        + "-" + (current_datetime.getMonth() + 1)
        + "-" + current_datetime.getFullYear()
        + "_" + current_datetime.getHours()
        + current_datetime.getMinutes()
        + current_datetime.getSeconds();
    return formatted_date;
}

function sortByDate() {
    return (a, b) => {
        var dateA = new Date(a.timeCreated);
        var dateB = new Date(b.timeCreated);
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    };
}

export { image64toCanvasRef, sortByDate, getForatedDate }