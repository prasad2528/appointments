import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFavourite: false,
  }

  toggleIsFavourite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavourite: !eachAppointment.isFavourite}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFavourite} = this.state
    this.setState({isFavourite: !isFavourite})
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFavourite} = this.state
    if (isFavourite) {
      return appointmentList.filter(each => each.isFavourite === true)
    }
    return appointmentList
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formatedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formatedDate,
      isFavourite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, isFavourite} = this.state
    const filteredClassName = isFavourite ? 'filter-Active' : 'empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="bg-container">
        <form className="card-container" onSubmit={this.onAddAppointment}>
          <div className="flex-cont">
            <div className="details-container">
              <h1>Add Appointment</h1>
              <div className="title-text">
                <label htmlFor="title" className="labels">
                  Title
                </label>
                <br />
                <input
                  type="text"
                  id="title"
                  className="input"
                  onChange={this.onChangeTitle}
                  value={titleInput}
                />
              </div>
              <div className="date-text">
                <label htmlFor="date" className="labels">
                  Date
                </label>
                <br />
                <input
                  type="date"
                  className="input"
                  id="date"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
              </div>
              <button type="submit" className="button">
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="bottom-container">
            <div className="appointments-container">
              <h1>Appointments</h1>
              <button
                type="button"
                className={`starred-button ${filteredClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsFavourite={this.toggleIsFavourite}
                />
              ))}
            </ul>
          </div>
        </form>
      </div>
    )
  }
}
export default Appointments
