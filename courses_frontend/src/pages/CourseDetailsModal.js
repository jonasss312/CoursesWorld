import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios'
import Moment from 'react-moment';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export class CourseDetailsModal extends Component {
    token = sessionStorage.getItem('accessToken')
    roles = sessionStorage.getItem('roles')
    userId = sessionStorage.getItem('userId')

    state = {
        comments: [],
        refresh: false,
        editComment: false
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getComments = this.getComments.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.getComments();
    }

    async handleSubmit(event) {
        event.preventDefault()
        try {
            await api.post(`/categories/${this.props.catid}/courses/${this.props.courseid}/comments`, {
                text: event.target.RecommendOptions.value + event.target.Text.value
            },
                {
                    headers: {
                        'authorization': 'Bearer ' + this.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(alert("Comment submitted!"))
        } catch (err) {
            alert("Failed submit comment")
        }
        this.getComments()
    }

    getComments = async () => {
        try {
            let data = await api.get(`/categories/${this.props.catid}/courses/${this.props.courseid}/comments`)
                .then(({ data }) => data)
            this.setState({ comments: data })
        } catch (err) {
            console.log(err)
        }
    }

    getRecommend = (text) => {
        var result = ""
        var pieces = text.split("#")
        return pieces[0]
    }

    getText = (text) => {
        var result = ""
        var pieces = text.split("#")
        return pieces[1]
    }

    deleteComment = async (id) => {
        let data = await api.delete(`/categories/${this.props.catid}/courses/${this.props.courseid}/comments/${id}`,
            {
                headers: {
                    'authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        alert("Comment deleted")
        this.getComments();
    }

    async handleEdit(event) {
        event.preventDefault()
        try {
            await api.patch(`/categories/${this.props.catid}/courses/${this.props.courseid}/comments/${event.target.commentId.value}`, {
                text: event.target.Text.value
            },
                {
                    headers: {
                        'authorization': 'Bearer ' + this.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(alert("Comment edited!"))
        } catch (err) {
            alert("Failed to edit comment")
        }
        this.setState({ editComment: false })
        this.getComments()
    }

    componentDidUpdate() {
        this.getComments();
    }

    checkRoleAdmin() {
        //console.log(this.roles)
        let role = "Admin"
        if (typeof this.roles === 'String') {
            if (this.roles === "Admin")
                return true
            return false
        } else if (this.roles !== undefined && this.roles !== null && this.roles.length > 0) {
            if (this.roles.indexOf(role) > -1)
                return true
            return false
        }
        return false
    }

    checkRoleUser() {
        let role = "User"
        if (typeof this.roles === 'String') {
            if (this.roles === role)
                return true
            return false
        } else if (this.roles !== undefined && this.roles !== null && this.roles.length > -1) {
            if (this.roles.indexOf(role) > -1)
                return true
            return false
        }
        return false
    }

    checkSameUser(commentUserId) {
        //console.log(this.userId.split('"')[1])
        //console.log("im in user")
        //console.log("haha im inbetween")
        //console.log(commentUserId)
        if (this.userId !== undefined && this.userId !== null && this.userId.length > 0) {
            if (this.userId.split('"')[1] === commentUserId)
                return true
            return false
        }
        return false
    }

    checkRoleAdmin() {
        //console.log("im in admin")
        let role = "Admin"
        if (typeof this.roles === 'String') {
            if (this.roles === "Admin")
                return true
            return false
        } else if (this.roles !== undefined && this.roles !== null && this.roles.length > 0) {
            if (this.roles.indexOf(role) > -1)
                return true
            return false
        }
        return false
    }
    //onClick={() => this.setState({ editComment: true })} class="danger"
    render() {
        return (
            <div className="container">
                {this.props.refresh ? <>{this.setState({ refresh: true, editComment: false })}</> : <></>}
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton style={{ background: "#222222", border: "none", color: "white" }}>
                        <Modal.Title id="contained-modal-title-vcenter" class="text-uppercase">
                            {this.props.coursename}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: "#222222", border: "none", color: "white" }}>
                        <Row>
                            <Col>
                                <p>Description</p>
                                <textarea rows="10" readonly style={{ width: "100%", border: "none", resize: "none" }}>{this.props.coursedesc}</textarea>
                                <br />
                                {this.state.comments.length > 0 ?
                                    <>
                                        <p>Comments</p>
                                        <ul class="list-group" style={{ height: "200px", overflow: "hidden", overflowY: "scroll" }}>
                                            {this.state.comments.map(comment => (
                                                <li class="list-group-item">
                                                    <p class="d-flex justify-content-between ">{comment.userName} <Moment format="YYYY/MM/DD">{comment.date}</Moment></p>
                                                    <p>{this.getRecommend(comment.text)}</p>
                                                    <p>{this.getText(comment.text)}</p>
                                                    {this.checkRoleAdmin() || this.checkSameUser(comment.userId) ? 
                                                    <>
                                                            {this.state.editComment === true ? (
                                                                <Form onSubmit={this.handleEdit}>
                                                                    <input type="hidden" id="commentId" name="commentId" value={comment.id} />
                                                                    <Form.Label>Edit</Form.Label>
                                                                    <textarea class="form-control" name="Text" rows="2" required defaultValue={comment.text} placeholder="Comment" />
                                                                    <button type="submit">Update</button>
                                                                    <button onClick={() => this.setState({ editComment: false })} class="danger">Cancel</button>
                                                                </Form>
                                                                ) : (<><button onClick={() => this.setState({ editComment: true })} class="danger">Edit</button></>)}
                                                            <button onClick={() => this.deleteComment(comment.id)} class="danger">Delete</button>
                                                            </>:<>{console.log("wtf")}</>}
                                                </li>))}
                                        </ul>
                                    </> : <>
                                        <p>No Comments</p>
                                    </>}
                                {this.checkRoleUser() ?
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group>
                                            <Form.Label>Comment</Form.Label>
                                        </Form.Group>
                                        <Form.Group>
                                            <textarea class="form-control" name="Text" rows="2" required placeholder="Comment" />
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="RecommendOptions" id="ido" value="I recommend this#" required />
                                                <label class="form-check-label" for="ido">I recommend this</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="RecommendOptions" id="idk" value="I do not know#" required />
                                                <label class="form-check-label" for="idk">I do not know</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="RecommendOptions" id="idont" value="I do not recommend this#" required />
                                                <label class="form-check-label" for="idont">I do not recommend this</label>
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant="primary" type="submit">Submit</Button>
                                            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                                        </Form.Group>
                                    </Form> : <p>Only registered users can comment.</p>}
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}
/*
                                            {moment(comment.creationTime).format("YYYY/MM/DD")}*/