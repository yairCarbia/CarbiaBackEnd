export const formatDateToMysql = (recievedDate) => { // DD/MM/YYYY, hh:mm:ss
  const date = recievedDate.split('/');
  let time = recievedDate.split(',');
  time = time[1];
  const formatedDate = `${date[2].slice(0,4)}-${date[1]}-${date[0]}${time}`;
  return formatedDate; // YYYY-MM-DD hh:mm:ss 
} 
