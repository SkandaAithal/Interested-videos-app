import { GlobalAction, GlobalStateType } from "@/types/globalStateTypes";

export default function reducerFunction(
  state: GlobalStateType,
  action: GlobalAction
): GlobalStateType {
  switch (action.type) {
    case "LOGOUT":
      return {
        ...state,
        isLoggedin: false,
      };

    case "LOGIN":
      return {
        ...state,
        isLoggedin: true,
      };

    case "NOTIFY":
      return {
        ...state,
        isNotification: true,
        notifyMessage: action.payload,
      };
    case "CLOSE_NOTIFY":
      return {
        ...state,
        isNotification: false,
      };

    case "ADD_INTEREST":
      if ([...state.searchInterests, action.payload].length > 5) {
        return {
          ...state,
          interestsLimitFlag: true,
        };
      } else {
        return {
          ...state,
          searchInterests: [...state.searchInterests, action.payload],
          interestsLimitFlag: false,
        };
      }

    case "REMOVE_INTEREST":
      const filteredSearch = state.searchInterests.filter(
        (text) => text !== action.payload
      );

      return {
        ...state,
        searchInterests: filteredSearch,
        interestsLimitFlag: false,
      };

    case "OPEN_FILTER":
      return {
        ...state,
        filterButton: true,
      };
    case "CLOSE_FILTER":
      return {
        ...state,
        filterButton: false,
      };
    case "CLEAR_LIST":
      return {
        ...state,
        youtubeVideosArray: [],
        nextPageToken: "",
        filterButton: false,
      };
    case "APPLY_FILTER":
      return {
        ...state,
        nextPageToken: action.payload.nextPageToken,
        youtubeVideosArray: [
          ...state.youtubeVideosArray,
          ...action.payload.items,
        ],
        isLoading: false,
        totalResults: action.payload.pageInfo.totalResults,
      };

    case "IS_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "END_LOADING":
      return { ...state, isLoading: false };
  }

  return state;
}
