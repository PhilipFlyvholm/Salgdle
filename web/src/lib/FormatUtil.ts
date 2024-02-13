export function formatCurrency(val: number) {
    return new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
        maximumFractionDigits: 0
    }).format(val);
}

export function getCurrentDate(){
    return new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Paris"}))
}

export function formatDate(date:Date) {
    const d = new Date(date), year = d.getFullYear()
    let month = '' + (d.getMonth() + 1), day = '' + d.getDate();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}