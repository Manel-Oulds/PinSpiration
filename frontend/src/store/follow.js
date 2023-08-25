import csrfFetch from "./csrf";

export const followUser = (followerId, followeeId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/follows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        follower_id: followerId,
        followee_id: followeeId,
      }),
    });

    if (response.ok) {
      dispatch({ type: "FOLLOW_USER", payload: { followeeId } });
    }
  } catch (error) {
    // Handle error
  }
};

export const fetchFollowers = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${userId}/followers`);
    const data = await response.json();
    dispatch({ type: "FETCH_FOLLOWERS", payload: data });
  } catch (error) {
    console.error("Error fetching followers:", error);
  }
};

export const fetchFollowees = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${userId}/followees`);
    const data = await response.json();
    dispatch({ type: "FETCH_FOLLOWEES", payload: data });
  } catch (error) {
    console.error("Error fetching followees:", error);
  }
};

export const deleteFollow = (followerId, followeeId) => async (dispatch) => {
  try {
    await csrfFetch(`/api/follows/${followeeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        follower_id: followerId,
        followee_id: followeeId,
      }),
    });
    dispatch({ type: "DELETE_FOLLOW", payload: followeeId });
  } catch (error) {
    console.error("Error deleting follow:", error);
  }
};

const initialState = {
  followers: [],
  followees: [],
};

function followReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_FOLLOWERS":
      return { ...state, followers: action.payload };
    case "FETCH_FOLLOWEES":
      return { ...state, followees: action.payload };
    case "DELETE_FOLLOW":
      return {
        ...state,
        followees: state.followees.filter(
          (followee) => followee !== action.payload
        ),
      };
    case "FOLLOW_USER":
      return {
        ...state,
        followees: [...state.followees, action.payload.followeeId],
      };

    default:
      return state;
  }
}

export default followReducer;
