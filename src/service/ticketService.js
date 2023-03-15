
import axios from 'axios'

const assigneTickets = ({id, assigne, }) => {
    return axios.put(`https://ticket-backend-eqk1.onrender.com/api/ticket/assigne/${id}`, { assigne })
}

const ticketCompleted = ({id}) => {
    return axios.put(`https://ticket-backend-eqk1.onrender.com/api/ticket/completed/${id}` )
}

const ticketUncompleted = ({id}) => {
    return axios.put(`https://ticket-backend-eqk1.onrender.com/api/ticket/uncompleted/${id}` )
}

const deletedTicket = ({id, authState}) => {
    console.log(authState.token)
    return axios.delete(`https://ticket-backend-eqk1.onrender.com/api/ticket/${id}`,  {
        headers: {
            "Content-Type": "application/json",
            "Authorization": authState.token
        } 
    })
}

export {assigneTickets, ticketCompleted, ticketUncompleted, deletedTicket};