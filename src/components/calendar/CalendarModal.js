import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseMOdal } from '../../actions/ui';
import { eventAddNew, eventClearActiveAction, eventUpdatedAction } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  Modal.setAppElement('#root');

  const now = moment().minute(0).seconds(0).add(1,'hours');
  const nowPlus1 = now.clone().add(1,'hours');

  const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
  }

export const CalendarModal = () => {
   const { modalOpen } = useSelector(state => state.ui);
   const { activeEvent } = useSelector(state => state.calendar);
   const dispatch = useDispatch();

   const [formValues, setFormValues] = useState(initEvent);
   const {notes, title, start, end } = formValues;

   useEffect(() => {
       if ( activeEvent) {
           setFormValues(activeEvent);
       } else {
           setFormValues(initEvent);
       }
   }, [activeEvent,setFormValues]);

   const handlerInputChange = ({ target }) => {
       setFormValues({
           ...formValues,
           [target.name]: target.value
       })
   }

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [isValid, setisValid] = useState(true)
    const closeModal = () => {
        
        dispatch(uiCloseMOdal());
        dispatch(eventClearActiveAction())
        setFormValues(initEvent);
    }
    const handlerStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handlerEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })

    }
    const handlerSubmitForm = (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha 2 debe ser mayor', 'error');
            
        }
        setisValid(true);
        if( title.trim().length < 2) {
          setisValid(false)
        }

        // realizar gurdar en base de datos
        if ( activeEvent) {
            dispatch( eventUpdatedAction(formValues));
        } else {
            dispatch( eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '1234',
                    name: 'Benny'
    
                }
            }));
        }
        
        closeModal();
    }
    return (
        <Modal
          isOpen={ modalOpen }
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          className="modal"
          overlayClassName="modal-fondo"
          closeTimeoutMS={200}
        >
             <h1> { (activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h1>
                <hr />
                <form className="container"
                        onSubmit={handlerSubmitForm}>

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={handlerStartDateChange}
                            value={dateStart}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={handlerEndDateChange}
                            value={dateEnd}
                            className="form-control"
                            minDate={ dateStart }
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input 
                            type="text" 
                            className={ `form-control ${ !isValid && 'is-invalid'}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={ title }
                            onChange={ handlerInputChange }
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea 
                            type="text" 
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={ notes }
                            onChange={ handlerInputChange }
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
        </Modal>
    )
}