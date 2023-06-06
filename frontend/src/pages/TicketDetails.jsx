import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTicketDetails, closeTicket } from "../features/tickets/ticketSlice"
import { createNote, getNotes } from "../features/notes/noteSlice"
import { useParams, useNavigate } from "react-router-dom"
import Modal from 'react-modal'
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import NoteItem from "../components/NoteItem"
import { FaPlus } from "react-icons/fa"

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  }
  

Modal.setAppElement('#root')

function TicketDetails() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const {ticket, isLoading, isError, message} = useSelector((state) => state.tickets)
    console.log(ticket, "fdfdfd")
    const {notes, isLoading: notesIsLoading,} = useSelector((state) => state.notes)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const {ticketId} = useParams()
    

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicketDetails(ticketId))
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line
    }, [message, isError, ticketId])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')
        navigate('/tickets')
    }

    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({noteText, ticketId}))
        closeModal()
    }


    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    if (isLoading || notesIsLoading) {
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
            <h2>Notes</h2>

        </header>
        {ticket.status !== 'closed' && (<button className="btn" onClick={openModal}><FaPlus /> Add Note</button>)}

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
            <h2>Add Note</h2>
            <button className="btn-close" onClick={closeModal}>X</button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea name="noteText" id="noteText" className="form-control" placeholder="Note text" value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </Modal>

        {notes.map((note) => (<NoteItem key={note._id} note={note}/>))}

        {ticket.state !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
            close ticket
        </button>)}
    </div>
  )
}

export default TicketDetails