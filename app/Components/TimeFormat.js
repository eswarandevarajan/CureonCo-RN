import moment from 'moment';

let periods = {
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};

function formatTime(timeCreated) {
  let postDate = new Date(timeCreated);
  let diff = new Date() - postDate.getTime();

  if (diff > periods.month) {
    return Math.floor(diff / periods.month) > 1
      ? Math.floor(diff / periods.month) + ' months ago'
      : Math.floor(diff / periods.month) + ' month ago';
  } else if (diff > periods.week) {
    return Math.floor(diff / periods.week) > 1
      ? Math.floor(diff / periods.week) + ' weeks ago'
      : Math.floor(diff / periods.week) + ' week ago';
  } else if (diff > periods.day) {
    return Math.floor(diff / periods.day) > 1
      ? Math.floor(diff / periods.day) + ' days ago'
      : Math.floor(diff / periods.day) + ' day ago';
  } else if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) > 1
      ? Math.floor(diff / periods.hour) + ' hours ago'
      : Math.floor(diff / periods.hour) + ' hour ago';
  } else if (diff > periods.minute) {
    return Math.floor(diff / periods.minute) > 1
      ? Math.floor(diff / periods.minute) + ' minutes ago'
      : Math.floor(diff / periods.minute) + ' minute ago';
  }
  return 'Just now';
}

function formatDate(timeCreated) {
  let postDate = new Date(timeCreated);
  var datestring =
    ('0' + (postDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + postDate.getDate()).slice(-2) +
    '-' +
    postDate.getFullYear();
  return datestring;
}

function formatDateTime(timeCreated, withoutAMPM) {
  const date = new Date(timeCreated);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  let hours = ('0' + date.getHours()).slice(-2);
  let minutes = ('0' + date.getMinutes()).slice(-2);
  let seconds = ('0' + date.getSeconds()).slice(-2);

  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 && !minutes.includes('0') ? '0' + minutes : minutes;
  seconds = seconds < 10 && !seconds.includes('0') ? '0' + seconds : seconds;

  const CreateDate = [month, day, date.getFullYear()].join('/');
  const CreatedDate = [month, day, date.getFullYear()].join('-');
  const CreateTime = [hours, minutes, seconds].join(':');
  const CreatedTime = [hours, minutes].join(':');
  const time = CreateTime + ' ' + ampm;
  if (withoutAMPM === 'time') {
    return CreatedTime + ' ' + ampm;
  }
  return withoutAMPM ? CreatedDate : CreateDate + ', ' + time;
}

function formatToTimeStamp(date) {
  return moment(date, 'YYYY-MM-DD h:mm A');
}

function formatToDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

function formatToTime(time) {
  return moment(time).format('hh:mm A');
}

function formatToDay(date, value) {
  if (value) {
    return moment(date).format('DD MMM YYYY, h:mm A');
  }
  return moment(date).format('MMMM D, YYYY . dddd');
}

export default {
  formatTime,
  formatDate,
  formatDateTime,
  formatToTimeStamp,
  formatToDate,
  formatToTime,
  formatToDay,
};
