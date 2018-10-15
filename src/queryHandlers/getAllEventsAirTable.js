const base = require('../controllers/database/db_connection');

console.log('getAllEventsAirTable');

exports.get = (request, response) => {
  let allRecords = [];
  // const getAllEventsAirTable = new Promise( (resolve, reject) => {
  base('social_action_events').select({
    fields: [
      'event_id', 'event_name', 'event_description', 'event_location', 'event_date_time', 'categories', 'Photo', 'fullname_event_organiser', 'email_event_organiser', 'telephone_event_organiser'
    ]   //photos left
  }).eachPage((records, fetchNextPage) => {
    allRecords = [...allRecords, ...records];
    // allRecords.forEach( (record) => console.log(record.fields));
    fetchNextPage();
  }, (err) => {
    if (err) {
      response.status(500).send("something Broke");
    }
    else {
      response.send(allRecords);
    }
  }

  );

};


// module.exports = getAllEventsAirTable;


// getAllEventsAirTable
//   .then(res => { //res is an array of objects
//     res.forEach((val) => console.log(val.fields));
//   })
//   .catch(err => console.log(err)); 
