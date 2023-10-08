import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavourite} = props
  const {id, title, date, isFavourite} = appointmentDetails
  const starImage = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsFavourite(id)
  }

  return (
    <li className="appointment-item">
      <div className="item">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          onClick={onClickStar}
          className="star-button"
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="date">Date : {date}</p>
    </li>
  )
}
export default AppointmentItem
