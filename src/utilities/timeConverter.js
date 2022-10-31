export function timeConverter(date){

    // Convert epoch to GMT-3 time string
    const dateObj = new Date(date.seconds * 1000);
    const year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    let hours = dateObj.getHours();
    let mins = dateObj.getMinutes();
    let secs = dateObj.getSeconds();

    if(month < 10)  month   = '0' + month;
    if(day < 10)    day     = '0' + day;
    if(hours < 10)  hours   = '0' + hours;
    if(mins < 10)   mins    = '0' + mins;
    if(secs < 10)   secs    = '0' + secs;

    return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
    

}