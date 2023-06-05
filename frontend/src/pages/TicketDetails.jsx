import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTicketDetails, reset, closeTicket } from "../features/tickets/ticketSlice"
import { useParams, useNavigate } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"


function TicketDetails() {
    const {ticket, isLoading, isSuccss, isError, message} = useSelector((state) => state.tickets)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const {ticketId} = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicketDetails(ticketId))
        // eslint-disable-next-line
    }, [message, isError, ticketId])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')
        navigate('/tickets')
    }

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>Something went wrong</h3>
    }
  return (
    <div className="ticket-page">
        <header className="ticket-header">
            <BackButton url='/tickets' />
            <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>{ticket.status}</span>
            </h2>
            <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-UK')}</h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className="ticket-desc">
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
            </div>
        </header>
        {ticket.state !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
            close ticket
        </button>)}
    </div>
  )
}

export default TicketDetails