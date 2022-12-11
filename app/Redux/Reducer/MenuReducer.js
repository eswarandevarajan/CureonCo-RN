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
  GETFILTERSYMPTOMS_SUCCESS,
  SYMPTOM_SUCCESS,
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
  USER_LOGGED_OUT,
} from '../../Constants/ActionConstants';
const INITIAL_STATE = {
  targetedTherapyList: [],
  oncoNewsList: null,
  DNALinks: null,
  showModal: false,
  journalList: [],
  journalFilterList: [],
  workbookList: [],
  appointmentQuestions: [],
  workbookFilterList: [],
  searchResult: null,
  symptoms: [],
  symptomList: [],
  symptomFilterlist: [],
  recordingList: [],
  appointments: [],
  availabilityDates: [],
  mailStatus: null,
  hashTag: null,
  feedSuccess: false,
  feeds: [],
  postComments: [],
  therapyFeeds: [],
};

export default function (state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case ALL_TARGETEDTHERAPY_SUCCESS:
      return {
        ...state,
        targetedTherapyList: payload,
      };
    case GETONCONEWS_SUCCESS:
      return {
        ...state,
        oncoNewsList: payload,
      };
    case GETALLKNOWYOURDNA_SUCCESS:
      return {
        ...state,
        DNALinks: payload,
      };
    case FEEDBACK_SUCCESS:
      return {
        ...state,
        showModal: true,
      };
    case JOURNAL_SUCCESS:
      return {
        ...state,
        loading: false,
        journalList: [...state.journalList, payload],
      };
    case GETFILTERJOURNAL_SUCCESS:
      return {
        ...state,
        loading: false,
        journalFilterList: payload,
      };
    case GETALLJOURNAL_SUCCESS:
      return {
        ...state,
        loading: false,
        journalList: payload,
      };
    case WORKBOOK_SUCCESS:
      return {
        ...state,
        workbookList: [...state.workbookList, payload],
      };
    case GETFILTERWORKBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        workbookFilterList: payload,
      };
    case GETALLWORKBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        workbookList: payload,
      };
    case GETAPPOINTMENT_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        appointmentQuestions: payload,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: payload,
      };
    case GETSYMPTOMLIST_SUCCESS:
      return {
        ...state,
        symptoms: payload,
      };
    case GETALLSYMPTOMS_SUCCESS:
      return {
        ...state,
        symptomList: payload,
      };
    case GETFILTERSYMPTOMS_SUCCESS:
      return {
        ...state,
        symptomFilterlist: payload,
      };
    case SYMPTOM_SUCCESS:
      return {
        ...state,
        symptomList: [...state.symptomList, payload],
      };
    case GETALLSYMPTOMMAIL_SUCCESS:
      return {
        ...state,
        mailStatus: payload,
      };
    case GET_HASHTAG_HISTORY:
      return {
        ...state,
        hashTag: payload,
      };
    case GET_VOICE_RECORDINGS:
      return {
        ...state,
        recordingList: payload,
      };

    case APPOINTMENT_BOOKINGS:
      return {
        ...state,
        appointments: [...state.appointments, payload],
      };
    case GET_APPOINTMENT_BOOKINGS:
      return {
        ...state,
        appointments: payload,
      };
    case GET_AVAILABILITY_DATE:
      return {
        ...state,
        availabilityDates: payload,
      };
    case CREATE_FEED:
      return {
        ...state,
        feeds: [...state.feeds, payload],
      };
    case GET_ALL_FEEDS:
    case SET_POST_ACTIONS:
      return {
        ...state,
        feeds: updateResponse(state.feeds, payload),
      };
    case GET_POST_COMMENTS:
      return {
        ...state,
        postComments: updateResponse(state.postComments, payload),
      };
    case CREATE_THERAPY_FEED:
      return {
        ...state,
        therapyFeeds: [...state.therapyFeeds, payload],
      };
    case GET_THERAPY_FEEDS:
    case SET_THERAPY_POST_ACTIONS:
      return {
        ...state,
        therapyFeeds: updateResponse(state.therapyFeeds, payload),
      };
    case USER_LOGGED_OUT:
      return {...INITIAL_STATE};
    default:
      return {
        ...state,
      };
  }
}

const updateResponse = (response, newResponse) => {
  const index = response.findIndex(feed => feed._id === newResponse._id);
  console.log('index', index);
  if (index === -1) {
    console.log('response', response);
    return newResponse;
  }
  response[index] = newResponse;
  return response;
};
