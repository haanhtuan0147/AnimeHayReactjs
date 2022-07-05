export default function TinhTime(timehientai,timecantinh){
    if(timehientai-timecantinh>2678400000)
    return (Math.ceil((timehientai-timecantinh)/(1000*60*60*24*30)))+" Tháng";
    if((timehientai-timecantinh<=2678400000)&&(timehientai-timecantinh>=86400000))
    return (Math.ceil((timehientai-timecantinh)/(1000*60*60*24)))+" Ngày";
    if((timehientai-timecantinh<86400000)&&(timehientai-timecantinh>=3600000))
    return (Math.ceil((timehientai-timecantinh)/(1000*60*60)))+" Giờ";
    if(timehientai-timecantinh<3600000)
    return (Math.ceil((timehientai-timecantinh)/(1000*60)))+" Phút";
}