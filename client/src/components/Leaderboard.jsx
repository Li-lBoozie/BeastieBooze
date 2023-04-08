import React, { useState, useEffect, useContext } from 'react'
import players from '../../fakePlayers';
import { UserContext } from '../userContext';
import axios from 'axios';


/*
NOTES for leaderboard

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Part 1:
axios GET request will be inside of useEffect so that we are rendering on refresh?

Handle a get request from database to capture =>
username: "Teddy"

This username will be used to dynamically update the database.

We also want to somehow capture the score at the end of the player playing the game 
(POINTS TO PART 2)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Part 2:
Send a post request at the end of the user playing the quiz =>

This will be a function that runs at the end of playing the quiz, on reset

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

DATABASE IDEAs:
* might want to capture the google profile image on login, so that we can add it to leaderboard *

* want to display the top 10 high scores of users* => requires AMENDING MODELS

*/

export default function LeaderBoard() {

  const { userInfo } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/routes/quiz/user/${userInfo.googleId}`);
      setUsers([data]);
    };

    fetchUser();
  }, [userInfo.googleId]);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Image</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>
                <img src={user.imageUrl} alt={user.username} />
              </td>
              <td>{user.scores[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
