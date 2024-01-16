
function convertPhotosIds(events){
  for(let i = 0; i<events.length; i++){
      if(events[i].photos_ids){
          if(!events[i].photos_ids.includes(",")){
              events[i].photos_ids = new Array(events[i].photos_ids);
          }else{
              events[i].photos_ids = events[i].photos_ids.split(",");
          }

          if(!events[i].event_photos.includes(",")){
              events[i].event_photos = new Array(events[i].event_photos);
          }else{
              events[i].event_photos = events[i].event_photos.split(",");
          }
      }
  }
}

module.exports = convertPhotosIds