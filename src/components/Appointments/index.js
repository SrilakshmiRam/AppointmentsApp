import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isACtiveFilter: false,
  }

  StarredBtn = () => {
    this.setState({
      isACtiveFilter: true,
    })
  }

  getFilteredList = () => {
    const {isACtiveFilter, appointmentsList} = this.state
    if (isACtiveFilter === true) {
      return appointmentsList.filter(eachItem => eachItem.isLiked === true)
    }
    return appointmentsList
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  renderAppointmentsList = () => {
    const filteredAppointmentsList = this.getFilteredList()

    return (
      <ul className="appointments-list">
        {filteredAppointmentsList.map(eachItem => (
          <AppointmentItem
            appointmentDetails={eachItem}
            key={eachItem.id}
            onToggleStar={this.onToggleStar}
          />
        ))}
      </ul>
    )
  }

  addAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: uuidv4(),
      name: titleInput,
      date: dateInput,
      isLiked: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
    }))

    this.setState({
      titleInput: '',
      dateInput: '',
    })
  }

  render() {
    const {titleInput, dateInput} = this.state

    return (
      <div className="add-appointments-container">
        <div className="appointment-card-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="form-image-container">
            <form className="form-container" onSubmit={this.addAppointment}>
              <div className="title-container">
                <label htmlFor="title" className="labelText">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  className="inputText"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="title-container">
                <label htmlFor="date" className="labelText">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="inputText"
                  placeholder="dd/mm/yy"
                  value={dateInput}
                  onChange={this.onChangeDate}
                />
              </div>
              <button type="submit" className="addButton">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr className="hr-rule" />
          <div className="appointments">
            <div className="startbtn-container">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className="startButton"
                onClick={this.StarredBtn}
              >
                Starred
              </button>
            </div>
            {this.renderAppointmentsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments