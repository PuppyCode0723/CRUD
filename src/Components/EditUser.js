import React, { useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, Table, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const EditUser = (props) => {
    const history = useHistory();
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        history.goBack();
    }
    return (
        <Modal
            className="row justify-content-center"
            show={show}
            // backdrop="static"
            onHide={() => { handleClose() }}
            centered
        >

        </Modal>
    );
};

export default EditUser;