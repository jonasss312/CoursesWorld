import { React, Component } from 'react';
import axios from 'axios'
import { Card, Col, Row, Button } from 'react-bootstrap'
import jwt_decode from "jwt-decode"
import { useLocation } from 'react-router-dom';

import { AddCourseModal } from './AddCourseModal';
import { EditCourseModal } from './EditCourseModal';
import { CourseDetailsModal } from './CourseDetailsModal';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

class CoursesPage extends Component {
    catid = window.location.pathname.split("/")[2]

    token = sessionStorage.getItem('accessToken')
    roles = sessionStorage.getItem('roles')
    userId = sessionStorage.getItem('userId')

    state = {
        courses: [],
        addModalShow: false,
        editModalShow: false,
        detailModalShow: false
    }

    constructor(props) {
        super(props);
        this.getCourses();
    }

    getCourses = async () => {
        try {
            let data = await api.get(`/categories/${this.catid}/courses`)
                .then(({ data }) => data)
            this.setState({ courses: data })
        } catch (err) {
            console.log(err)
        }
    }

    deleteCourse = async (id) => {
        let data = await api.delete(`/categories/${this.catid}/courses/${id}`,
            {
                headers: {
                    'authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        this.getCourses();
        alert("Course deleted")
    }

    checkRoleAdmin() {
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

    checkRolePremium() {
        let role = "PremiumUser"
        if (typeof this.roles === 'String') {
            if (this.roles === role)
                return true
            return false
        } else if (this.roles !== undefined && this.roles !== null && this.roles.length > 0) {
            if (this.roles.indexOf(role) > -1)
                return true
            return false
        }
        return false
    }

    checkSameUser(courseUserId) {
        if (this.userId !== undefined && this.userId !== null && this.userId.length > 0) {
            if (this.userId.split('"')[1] === courseUserId)
                return true
            return false
        }
        return false
    }

    render() {
        const { courseid, coursename, coursedesc } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        let detailModalClose = () => this.setState({ detailModalShow: false });
        return (
            <div style={{ width: '30rem', margin: 'nonce', padding: '20px', color: "white", width: "80%", backgroundColor: "#1E1F21", minHeight: "700px" }}
                class="container">
                <div>
                    <div style={{ paddingLeft: "30px" }}>
                        {this.checkRoleAdmin() || this.checkRolePremium() ? <>
                            <Button style={{ background: "#222222" }}
                                onClick={() => this.setState({ addModalShow: true })}>
                                Add Course</Button>
                            <br /></> : <></>}
                    </div>

                    <AddCourseModal show={this.state.addModalShow}
                        onHide={addModalClose}
                        catid={this.catid} />
                    <EditCourseModal show={this.state.editModalShow}
                        onHide={editModalClose}
                        catid={this.catid}
                        courseid={courseid}
                        coursename={coursename}
                        coursedesc={coursedesc} />
                    <CourseDetailsModal show={this.state.detailModalShow}
                        onHide={detailModalClose}
                        catid={this.catid}
                        courseid={courseid}
                        coursename={coursename}
                        coursedesc={coursedesc} />
                    {this.state.courses.length > 0 ?
                        <Row xs={1} md={1} className="g-4" style={{ padding: "30px" }}>
                            {this.state.courses.map(cat => (
                                <Col key={cat.id}>
                                    <Card>
                                        <button style={{ background: "#131415", border: "none", margin: "none", outline: "none" }}
                                            onClick={() => this.setState({
                                                detailModalShow: true,
                                                catid: cat.categoryId, courseid: cat.id, coursename: cat.name, coursedesc: cat.description, refresh: true
                                            })}>
                                            <Card.Body>
                                                <Card.Title class="text-uppercase font-weight-bold text-white">{cat.name}</Card.Title>
                                                <Card.Text class="text-light">{cat.description}</Card.Text>
                                            </Card.Body>
                                        </button>
                                        {this.checkRoleAdmin() || this.checkSameUser(cat.userId) ?
                                            <Button style={{ background: "#222222" }} onClick={() => { if (window.confirm('Delete the item?')) this.deleteCourse(cat.id) }}>Delete</Button>
                                            : <></>}
                                        {this.checkRoleAdmin() || this.checkSameUser(cat.userId) ?
                                            <Button style={{ background: "#222222" }}
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    catid: cat.categoryId, courseid: cat.id, coursename: cat.name, coursedesc: cat.description
                                                })}>
                                                Edit
                                            </Button>
                                            : <></>}
                                    </Card>
                                </Col>
                            ))}
                        </Row> : <h3 style={{ paddingLeft: "30px", paddingTop:"30px" }}>No courses yet.</h3>}
                </div>
            </div>
        )
    }
}

//export default withRouter(CoursesPage);
export default CoursesPage;