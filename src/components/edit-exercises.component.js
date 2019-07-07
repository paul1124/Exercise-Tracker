import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function EditExercises({ match }) {
  const [ username, setUsername ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ duration, setDuration ] = useState(0);
  const [ date, setDate ] = useState(new Date());
  const [ users, setUsers ] = useState([]);

  // console.log(match);

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/' + match.params.id)
      .then(res => {
        console.log(res.data);
          // console.log(res.data);
          setUsername(res.data.username);
          setDescription(res.data.description);
          setDuration(res.data.duration);
          setDate(new Date(res.data.date));
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/users/')
      .then(res => {
        // setUsers(res.data);
        setUsers(res.data.map(user => user.username));
        setUsername(res.data[0].username);
        // console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <h3>Edit Exercise Log</h3> 
      <form onSubmit={onSubmit} >
        <div className="form-group">
          <label>Username:</label>
          <select 
            // ref="userInput"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}>
              {
                users.map(user => {
                  // console.log(user.);
                  return <option
                    key={user}
                    value={user}>
                      {user}
                    </option>
                })
              }
          </select>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input 
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>

        <div className="form-group">
          <label>Duration:</label>
          <input
            type="text"
            required
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <div>
            <DatePicker
              selected={date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }
  function onChangeDuration(e) {
    setDuration(e.target.value);
  }
  function onChangeDate(date) {
    setDate(date);
  }

  function onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/'+ match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }
} 