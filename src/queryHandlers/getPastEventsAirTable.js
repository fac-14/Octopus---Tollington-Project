const base = require('../controllers/database/db_connection');


exports.get = (request, response) => {
  let allRecords = [];
  base('social_action_events').select({
    filterByFormula:' IS_BEFORE({event_date_time}, TODAY())',
    sort:[{field:'event_date_time', direction:'desc'}],
    fields: [
      'event_id', 'event_name', 'event_description', 'event_location', 'event_date_time', 'categories', 'Photo', 'fullname_event_organiser', 'email_event_organiser', 'telephone_event_organiser'
    ]  
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
