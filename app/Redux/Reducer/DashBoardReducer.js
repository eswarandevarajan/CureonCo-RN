import {
  GET_GUARD_ASSIGNMENT_SUCCESS,
  GET_STATION_SUCCESS,
  GET_SUBDIVISION_SUCCESS,
  GET_VILLAGE_SUCCESS,
} from '../../Constants/ActionConstants';
const INITIAL_STATE = {
  villages: [],
  station: {},
  guardAssignments: [],
};

export default function (state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_VILLAGE_SUCCESS:
      return {
        ...state,
        villages: payload,
      };
    case GET_STATION_SUCCESS:
      return {
        ...state,
        station: payload,
      };
    case GET_GUARD_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        guardAssignments: payload,
      };

    default:
      return {
        ...state,
      };
  }
}

const updateResponse = (response, newResponse) => {
  const index = response.findIndex(feed => feed._id == newResponse._id);
  if (index === -1) {
    return newResponse;
  }
  response[index] = newResponse;
  return response;
};
