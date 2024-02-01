function convertTimestamptoTime(unixTimestamp) {
 
    // let unixTimestamp = 10637282;
 
    // Convert to milliseconds and
    // then create a new Date object
    let dateObj = new Date(unixTimestamp * 1000);
    let utcString = dateObj.toUTCString();
 
    let time = utcString.slice(-11, -4);
 
    console.log(time);
}
 
convertTimestamptoTime(1706762891);
convertTimestamptoTime(1706802611);

