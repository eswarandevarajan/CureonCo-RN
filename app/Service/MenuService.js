import {CommonService} from './CommonService';
import {
  createNewFeed,
  createNewTherapyFeed,
  setAllFeeds,
  setAllJounals,
  setAllSymptoms,
  setAllWorkBooks,
  setAppointment,
  setAppointmentQuestions,
  setAvailabilityDate,
  setBookedAppointment,
  setCommentActions,
  setFilterJournals,
  setFilterSymptoms,
  setFilterWorkBooks,
  setKnowYourDNA,
  setMailStatus,
  setOncoNews,
  setPostActions,
  setPostComments,
  setRecordings,
  setSaveJournal,
  setSaveSymptom,
  setSaveWorkBook,
  setSearch,
  setSubmitFeedback,
  setSymptomList,
  setTargetedTherapies,
  setTherapyPostActions,
  setThreapyFeeds,
} from '../Redux/Actions/MenuAction';
import {
  TARGETEDTHERAPY,
  ONCONEWS,
  KNOWYOURDNA,
  FEEDBACK,
  JOURNALS,
  WORKBOOK,
  SEARCHRESULT,
  SYMPTOMS,
  VOICERECORDING,
  APPOINTMENTBOOKING,
  APPOINTMENTS,
  POST,
} from '../Config/API_URL';
import ToastMessage from '../Components/ToastMessage';
import {hideLoader, showLoader} from '../Redux/Actions/LoaderAction';
import {setAPIError, setErrorCode} from '../Redux/Actions/ErrorAction';

export const GET_ONCONEWS = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(ONCONEWS.GETONCONEWS, dispatch)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        dispatch(setOncoNews(response.data));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
    });
};

export const GET_TARGETEDTHERAPY = () => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.GETMETHOD(
    TARGETEDTHERAPY.ALLTARGETEDTHERAPY,
  )
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        dispatch(setTargetedTherapies(response.data));
        return true;
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
  return success;
};

export const GET_KNOWYOURDNA = () => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.GETMETHOD(KNOWYOURDNA.GETPRECISION)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        dispatch(setKnowYourDNA(response.data));
        return true;
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        // ToastMessage.error(response.message);
      }
    })
    .catch(() => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
  return success;
};

export const SUBMIT_FEEDBACK = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(FEEDBACK.SUBMITFEEDBACK, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 201) {
        ToastMessage.success(response.message);
        dispatch(setSubmitFeedback());
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const SAVE_JOURNAL = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(JOURNALS.SAVEJOURNAL, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 201) {
        ToastMessage.success(response.message);
        dispatch(setSaveJournal(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_JOURNALS = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(JOURNALS.ALLJOURNALS)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setAllJounals(response.data));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
    });
};

export const GET_FILTER_JOURNALS = range => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(JOURNALS.FILTERJOURNALS, range)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setFilterJournals(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_APPOINTEMNT_QUESTIONS = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(WORKBOOK.GETQUESTIONS)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setAppointmentQuestions(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const SAVE_WORKBOOK = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(WORKBOOK.SAVEWORKBOOK, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 201) {
        ToastMessage.success(response.message);
        dispatch(setSaveWorkBook(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_WORKBOOKS = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(WORKBOOK.ALLWORKBOOK)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setAllWorkBooks(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_FILTER_WORKBOOKS = range => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(WORKBOOK.FILTERWORKBOOKS, range)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setFilterWorkBooks(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const SEARCHALL = val => async dispatch => {
  dispatch(showLoader());
  let inputData = {searchstring: val};
  await CommonService.POSTMETHOD(SEARCHRESULT.SEARCH, inputData)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        // const responsePosts = res.data.posts.filter(Boolean);
        // const responseUsers = res.data.users.filter(Boolean);
        // res.data.posts = responsePosts;
        // res.data.users = responseUsers;
        // dispatch(setSearch(res.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};
//Symptoms Screen
export const GET_SYMPTOMLIST = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(SYMPTOMS.GETSYMPTOMLIST)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 201) {
        dispatch(setSymptomList(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const SAVE_SYMPTOM = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(SYMPTOMS.SAVESYMPTOM, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        ToastMessage.success(response.message);
        dispatch(setSaveSymptom(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const SEND_PDF_EMAIL = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(SYMPTOMS.SENDEMAIL, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setMailStatus(response.data));
        ToastMessage.success(response.message);
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_SYMPTOMS = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(SYMPTOMS.ALLSYMPTOM)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setAllSymptoms(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_FILTER_SYMPTOMS = range => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(SYMPTOMS.FILTERSYMPTOMS, range)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setFilterSymptoms(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_RECORDINGS = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(VOICERECORDING.GETRECORDINGS)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setRecordings(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const UPLOAD_RECORDINGS = formData => async dispatch => {
  dispatch(showLoader());
  const records = await CommonService.IMAGEUPLOADMETHOD(
    VOICERECORDING.UPLOADRECORDINGS,
    formData,
  )
    .then(response => {
      dispatch(hideLoader());
      return {data: response.data, success: true};
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
  return records;
};

export const GET_APPOINTMENTS = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(APPOINTMENTBOOKING.GETAPPOINTMENTS)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setAppointment(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_AVAILABILITY_DATE = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(APPOINTMENTBOOKING.GETAVAILABILITYDATE, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setAvailabilityDate(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const SEND_APPOINTMENT_BOOKING = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(APPOINTMENTBOOKING.SENDAPPOINTMENT, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 201) {
        dispatch(setBookedAppointment(response.data));
        dispatch(GET_APPOINTMENTS());
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const RESCHEDULE_APPOINTMENT = (val, id) => async dispatch => {
  dispatch(showLoader());
  await CommonService.PUTMETHOD(APPOINTMENTS.SENDAPPOINTMENTS + '/' + id, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(GET_APPOINTMENTS());
        ToastMessage.success(response.message);
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};
//Patient Forum
export const UPLOAD_FEED_IMAGES = formData => async dispatch => {
  dispatch(showLoader());
  const media = await CommonService.IMAGEUPLOADMETHOD(
    POST.UPLOADFEEDIMAGES,
    formData,
  )
    .then(response => {
      dispatch(hideLoader());
      return {data: response.data, success: true};
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
  return media;
};

export const CREATE_NEW_FEED = val => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.POSTMETHOD(POST.FEED, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 201) {
        if (val.targetTherapyId !== '' && val.targetTherapyId !== undefined) {
          dispatch(createNewTherapyFeed(response.data));
        } else {
          dispatch(createNewFeed(response.data));
        }
        return true;
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });

  return success;
};

export const GET_ALLFEEDS = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(POST.FEED)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        dispatch(setAllFeeds(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_POST_COMMENTS = id => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(POST.POSTCOMMENT + id)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setPostComments(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const ADD_POST_COMMENT = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(POST.POSTCOMMENT, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setPostComments(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const POST_ACTION = (id, val, removeHugs) => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(POST.FEEDACTION, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        if (removeHugs) {
          dispatch(setTherapyPostActions(response.data, removeHugs));
        } else {
          dispatch(setPostActions(response.data));
        }
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const COMMENT_ACTION = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(POST.COMMENTACTION, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setPostComments(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_THERAPY_FEEDS = id => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(TARGETEDTHERAPY.FEED + id)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setThreapyFeeds(response.data));
      } else if (response.status >= 400) {
        dispatch(setErrorCode(429));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};
