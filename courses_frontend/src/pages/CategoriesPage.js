import { React, Component } from 'react';
import axios from 'axios'
import { Card, Col, Row, Button } from 'react-bootstrap'
import jwt_decode from "jwt-decode"
import { Link } from 'react-router-dom';

import { AddCategoryModal } from './AddCategoryModal';
import { EditCategoryModal } from './EditCategoryModal';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

class CategoriesPage extends Component {
    token = sessionStorage.getItem('accessToken')
    roles = sessionStorage.getItem('roles')

    state = {
        categories: [],
        addModalShow: false,
        editModalShow: false,
        getToken: true,
        decoded: null
    }

    constructor() {
        super();
        this.getCategories();
    }

    getCategories = async () => {
        try {
            let data = await api.get('/categories')
                .then(({ data }) => data)
            this.setState({ categories: data })
        } catch (err) {
            console.log(err)
        }
    }

    deleteCategory = async (id) => {
        let data = await api.delete(`/categories/${id}`,
            {
                headers: {
                    'authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        this.getCategories();
        alert("Category deleted")
    }

    handleCheck() {
        return this.state.decoded.roles.some(item => "Admin" === item);
    }

    componentWillUnmount() {
        this.setState({ getToken: false })
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

    render() {
        const { catid, catname, catdesc } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        //{this.state.getToken === true ? <>{this.decodeToken()}</> : <></>}
        return (
            <div style={{ width: '30rem', margin: 'nonce', padding: '20px', color: "white", width: "80%", backgroundColor: "#1E1F21", minHeight: "700px" }}
                class="container d-flex aligns-items-center justify-content-center">
                {console.log(JSON.parse(sessionStorage.getItem('decoded')))}
                <div>
                    <div style={{ paddingLeft: "30px" }}>
                        {this.checkRoleAdmin() ? <>
                            <Button style={{ background: "#222222" }}
                                onClick={() => this.setState({ addModalShow: true })}>
                                Add category</Button>
                        </> : <></>}
                    </div>
                    <AddCategoryModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                    <EditCategoryModal show={this.state.editModalShow}
                        onHide={editModalClose}
                        catid={catid}
                        catname={catname}
                        catdesc={catdesc} />
                    {this.state.categories.length > 0 ?
                        <Row xs={1} md={3} className="g-4" style={{ padding: "30px" }}>
                            {this.state.categories.map(cat => (
                                <Col key={cat.id}>
                                    <Card style={{ backgroundColor: "#131415" }}>
                                        <Link className="text-center text-decoration-none text-white" to={{ pathname: `/categories/${cat.id}`, state: { id: cat.id } }}>
                                            <Card.Body>
                                                <Card.Title class="text-uppercase font-weight-bold ">{cat.name}</Card.Title>
                                                <Card.Text style={{ color: "#BEBEBE" }}>{cat.description}</Card.Text>
                                            </Card.Body>
                                        </Link>
                                        {this.checkRoleAdmin() ?
                                            <Button style={{ background: "#222222" }}
                                                onClick={() => {
                                                    if (window.confirm('Delete the item?'))
                                                        this.deleteCategory(cat.id)
                                                }}>
                                                Delete</Button> : <></>}
                                        {this.checkRoleAdmin() ?
                                            <Button style={{ background: "#222222" }} className="mr-2"
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    catid: cat.id, catname: cat.name, catdesc: cat.description
                                                })}>
                                                Edit
                                            </Button> : <></>}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        : <h3 style={{ paddingLeft: "30px", paddingTop:"30px" }}>No categories yet.</h3>}
                </div>
            </div>
        )
    }
}

export default CategoriesPage;

/*[
    "Admin",
    "User",
    "PremiumUser"
]*/