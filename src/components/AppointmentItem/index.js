import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggleStar} = props
  const {name, date, isLiked, id} = appointmentDetails

  const onClickStar = () => {
    onToggleStar(id)
  }

  const imageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  return (
    <li className="appointment-item">
      <div className="title-star-container">
        <p className="name">{name}</p>
        <button
          type="button"
          data-testid="star"
          className="starButton"
          onClick={onClickStar}
        >
          <img src={imageUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="appointmentDate">Date:{formatedDate}</p>
    </li>
  )
}

export default AppointmentItem