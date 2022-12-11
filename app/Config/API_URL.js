export const COMMON_URL = {
  GETCOUNTRYLIST: '/api/v1/geo/countries',
  GETSTATELIST: '/api/v1/geo/states',
  GETDIAGNOSISMUTATION: '/api/v1/diagnosisMutation',
  GETSTAGE: '/api/v1/dashboard',
  GETHASHTAGS: '/api/v1/hashtags',
};

export const AUTH_URL = {
  LOGIN: '/api/v1/auth/login',
  LOGOUT: '/api/v1/auth/logout',
  GETACCESSTOKEN: '/api/v1/users/refreshtoken',
  REGISTER: '/api/v1/auth/signup',
  BANKDETAILS: '/api/v1/bankdetails',
  GENERATEOTP: '/api/v1/auth/sendresetcode',
  RESETPASSWORD: '/api/v1/auth/resetpassword',
};

export const USERPROFILE_URL = {
  GETPROFILE: '/api/v1/profile/',
  CREATEPROFILE: '/api/medappprofile/update',
  GETPROFILEID: '/api/v1/users/',
  FOLLOWUSER: '/api/v1/profile/follow/',
  GETALLPROFILE: '/api/v1/users',
  PROFILEUPLOAD: '/api/v1/users/imageupload',
  NOTIFYTOKEN: '/api/medappprofile/notifytoken/',
  GETUSERPOSTS: '/api/v1/users/posts/',
};

export const TARGETEDTHERAPY = {
  ALLTARGETEDTHERAPY: '/api/v1/targetedTherapy',
  FEED: '/api/v1/feed/targetTherapy/',
};

export const ONCONEWS = {
  GETONCONEWS: '/api/v1/onCoNews',
};

export const KNOWYOURDNA = {
  GETLINKS: '/api/medapppm/alllinks',
  GETPRECISION: '/api/v1/precision',
};

export const FEEDBACK = {
  SUBMITFEEDBACK: '/api/v1/feedback',
};

export const JOURNALS = {
  SAVEJOURNAL: '/api/v1/journals',
  ALLJOURNALS: '/api/v1/journals',
  FILTERJOURNALS: '/api/v1/journals/range',
};

export const WORKBOOK = {
  SAVEWORKBOOK: '/api/v1/workbook',
  ALLWORKBOOK: '/api/v1/workbook',
  GETQUESTIONS: '/api/v1/admin/questions',
  FILTERWORKBOOKS: '/api/v1/workbook/range',
};

export const SEARCHRESULT = {
  SEARCH: '/api/v1/search',
};

export const SYMPTOMS = {
  GETSYMPTOMLIST: '/api/v1/symptom/symptomList',
  SAVESYMPTOM: '/api/v1/symptom',
  ALLSYMPTOM: '/api/v1/symptom',
  FILTERSYMPTOMS: '/api/v1/symptom/range',
  SENDEMAIL: '/api/v1/symptom/sendMail',
};

export const DOCUMENTS = {
  GETFOLDERNAMES: '/api/v1/files/folderlist',
  GETUSERFILES: '/api/v1/users/getfiles',
  GETDOCTORS: '/api/v1/users/getDoctorsList',
  GETUSERSHAREDFILES: '/api/v1/users/sharefiles',
  UPLOADFILES: '/api/v1/users/uploadFiles',
  QRCODELOGIN: '/api/v1/auth/qrLogin',
  GETPATIENTFILES: '/api/v1/users/recievedfiles',
};

export const VOICERECORDING = {
  GETRECORDINGS: '/api/v1/users/recordAudio',
  UPLOADRECORDINGS: '/api/v1/users/recordAudio',
};

export const APPOINTMENTBOOKING = {
  GETAPPOINTMENTS: '/api/v1/appointments',
  GETAVAILABILITYDATE: '/api/v1/appointments/getTimeSlots',
  SENDAPPOINTMENT: '/api/v1/appointments',
};

export const APPOINTMENTS = {
  SENDAPPOINTMENTS: '/api/v1/appointments',
};

export const POST = {
  FEED: '/api/v1/feed',
  POSTCOMMENT: '/api/v1/comments/',
  UPLOADFEEDIMAGES: '/api/v1/feed/uploadFiles',
  FEEDACTION: '/api/v1/feed/action',
  COMMENTACTION: '/api/v1/comments/action',
};
