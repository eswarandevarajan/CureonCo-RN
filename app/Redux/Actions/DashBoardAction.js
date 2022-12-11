import {GET_GUARD_ASSIGNMENT_SUCCESS, GET_STATION_SUCCESS, GET_SUBDIVISION_SUCCESS, GET_VILLAGE_SUCCESS} from '../../Constants/ActionConstants';

export function setVillages(response) {
  return {
    type: GET_VILLAGE_SUCCESS,
    payload: response,
  };
}

export function setStation(response) {
  return {
    type: GET_STATION_SUCCESS,
    payload: response,
  };
}

export function setGuardAssignments(response) {
  return {
    type: GET_GUARD_ASSIGNMENT_SUCCESS,
    payload: response,
  };
}
