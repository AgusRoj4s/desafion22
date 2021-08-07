const horaFecha = () => {
    let hoy = new Date();
    let fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return fecha + " " + hora;
}
module.exports = {
    horaFecha
}