import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export class EditCourseModal extends Component {
    token = sessionStorage.getItem('accessToken')

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        try {
            await api.patch(`/categories/${this.props.catid}/courses/${this.props.courseid}`,{
                name: event.target.Name.value,
                description: event.target.Description.value
                },
                {
                    headers: {
                        'authorization': 'Bearer ' + this.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(alert("Category updated!"))
            } catch (err) {
                alert("Failed to update category")
            }
    }

    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header style={{background:"#222222", border:"none", color:"white"}} clooseButton>
                        <Modal.Title  id="contained-modal-title-vcenter">
                            Edit Category
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{background:"#222222", border:"none", color:"white"}}>
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="Name" required
                                            disabled
                                            defaultValue={this.props.coursename}
                                            placeholder="Category name" />
                                        <Form.Label>Description</Form.Label>
                                        <textarea class="form-control" name="Description" defaultValue={this.props.coursedesc} rows="6" cols="10rem" required placeholder="Description" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Button variant="primary" type="submit">Update</Button>
                                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}