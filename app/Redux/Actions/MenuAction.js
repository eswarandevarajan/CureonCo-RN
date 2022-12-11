import {
  ALL_TARGETEDTHERAPY_SUCCESS,
  GETONCONEWS_SUCCESS,
  GETALLKNOWYOURDNA_SUCCESS,
  FEEDBACK_SUCCESS,
  JOURNAL_SUCCESS,
  GETALLJOURNAL_SUCCESS,
  GETFILTERJOURNAL_SUCCESS,
  WORKBOOK_SUCCESS,
  GETALLWORKBOOK_SUCCESS,
  GETFILTERWORKBOOK_SUCCESS,
  SEARCH_SUCCESS,
  GETALLSYMPTOMS_SUCCESS,
  SYMPTOM_SUCCESS,
  GETFILTERSYMPTOMS_SUCCESS,
  GETALLSYMPTOMMAIL_SUCCESS,
  GET_HASHTAG_HISTORY,
  GETSYMPTOMLIST_SUCCESS,
  GETAPPOINTMENT_QUESTIONS_SUCCESS,
  GET_VOICE_RECORDINGS,
  APPOINTMENT_BOOKINGS,
  GET_APPOINTMENT_BOOKINGS,
  GET_AVAILABILITY_DATE,
  GET_ALL_FEEDS,
  GET_POST_COMMENTS,
  CREATE_FEED,
  SET_POST_ACTIONS,
  CREATE_THERAPY_FEED,
  GET_THERAPY_FEEDS,
  SET_THERAPY_POST_ACTIONS,
} from '../../Constants/ActionConstants';

export function setTargetedTherapies(response) {
  return {
    type: ALL_TARGETEDTHERAPY_SUCCESS,
    payload: response,
  };
}

export function setOncoNews(response) {
  return {
    type: GETONCONEWS_SUCCESS,
    payload: response,
  };
}

export function setKnowYourDNA(response) {
  return {
    type: GETALLKNOWYOURDNA_SUCCESS,
    payload: response,
  };
}

export function setSubmitFeedback() {
  return {
    type: FEEDBACK_SUCCESS,
  };
}

export function setSaveJournal(response) {
  return {
    type: JOURNAL_SUCCESS,
    payload: response,
  };
}

export function setAllJounals(response) {
  return {
    type: GETALLJOURNAL_SUCCESS,
    payload: response,
  };
}

export function setFilterJournals(response) {
  return {
    type: GETFILTERJOURNAL_SUCCESS,
    payload: response,
  };
}

export function setSaveWorkBook(response) {
  return {
    type: WORKBOOK_SUCCESS,
    payload: response,
  };
}

export function setAllWorkBooks(response) {
  return {
    type: GETALLWORKBOOK_SUCCESS,
    payload: response,
  };
}

export function setAppointmentQuestions(response) {
  return {
    type: GETAPPOINTMENT_QUESTIONS_SUCCESS,
    payload: response,
  };
}

export function setFilterWorkBooks(response) {
  return {
    type: GETFILTERWORKBOOK_SUCCESS,
    payload: response,
  };
}

export function setSearch(response) {
  return {
    type: SEARCH_SUCCESS,
    payload: response,
  };
}

export function setSymptomList(response) {
  return {
    type: GETSYMPTOMLIST_SUCCESS,
    payload: response,
  };
}

export function setAllSymptoms(response) {
  return {
    type: GETALLSYMPTOMS_SUCCESS,
    payload: response,
  };
}

export function setSaveSymptom(response) {
  return {
    type: SYMPTOM_SUCCESS,
    payload: response,
  };
}

export function setFilterSymptoms(response) {
  return {
    type: GETFILTERSYMPTOMS_SUCCESS,
    payload: response,
  };
}

export function setMailStatus(response) {
  return {
    type: GETALLSYMPTOMMAIL_SUCCESS,
    payload: response,
  };
}

export function setHashTagHistory(response) {
  return {
    type: GET_HASHTAG_HISTORY,
    payload: response,
  };
}

export function setRecordings(response) {
  return {
    type: GET_VOICE_RECORDINGS,
    payload: response,
  };
}

export function setAvailabilityDate(response) {
  return {
    type: GET_AVAILABILITY_DATE,
    payload: response,
  };
}

export function setBookedAppointment(response) {
  return {
    type: APPOINTMENT_BOOKINGS,
    payload: response,
  };
}

export function setAppointment(response) {
  return {
    type: GET_APPOINTMENT_BOOKINGS,
    payload: response,
  };
}

export function createNewFeed(response) {
  return {
    type: CREATE_FEED,
    payload: response,
  };
}

export function setAllFeeds(response, id) {
  return {
    type: GET_ALL_FEEDS,
    payload: response,
    id,
  };
}

export function setPostComments(response) {
  return {
    type: GET_POST_COMMENTS,
    payload: response,
  };
}

export function setPostActions(response) {
  return {
    type: SET_POST_ACTIONS,
    payload: response,
  };
}

export function setCommentActions(response) {
  return {
    type: SET_POST_ACTIONS,
    payload: response,
  };
}

export function createNewTherapyFeed(response) {
  return {
    type: CREATE_THERAPY_FEED,
    payload: response,
  };
}

export function setThreapyFeeds(response) {
  return {
    type: GET_THERAPY_FEEDS,
    payload: response,
  };
}

export function setTherapyPostActions(response) {
  return {
    type: SET_THERAPY_POST_ACTIONS,
    payload: response,
  };
}
