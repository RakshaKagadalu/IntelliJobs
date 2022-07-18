import React from 'react'
import Modal from 'react-modal';

const Addevent = () =>{
    const[title, setTitle] = useState("");
    const[start, setStart] = useState(new Date());
    const[end, setEnd] = useState(new Date());
    
    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            title,
            start,
            end
        })
        onClose();
    }

    return(
        <Modal isOPen={isOpen} onRequestClose={onClose}>
            <form on Submit={onSubmit}>
                <input placeholder="Title" value ={title} onChange={date => setTitle(e.target.value)} />

            </form>
        </Modal>
    )
}