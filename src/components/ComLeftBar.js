import axios from 'axios'
import { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { API_URL } from '../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({ nama }) => {
    if (nama == "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if (nama == "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2" />
    if (nama == "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />
}

export default class ComLeftBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "categories")
            .then(res => {
                // console.log("Response: ", res);
                const categories = res.data;
                this.setState({ categories });

            })

            // handle success
            .catch(error => {
                console.log("Error YA");
            })
    }

    render() {
        //console.log("Response: ", this.state.categories);
        const { categories } = this.state
        const { changeCategory, categoryYangDipilih } = this.props
        return (
            <Col md={2} mt="2">
                <h4><strong>Daftar Kategori</strong></h4>
                <hr />
                <ListGroup as="ul">
                    {categories && categories.map((category) => (
                        <ListGroup.Item as="li" key={category.id} 
                        onClick={() =>changeCategory(category.nama)}
                        className={categoryYangDipilih === category.nama && "category-aktif"}
                        style={{cursor:'pointer'}}
                        >
                            <h5>
                                <Icon nama={category.nama} /> {category.nama}
                            </h5>
                        </ListGroup.Item>
                    ))}

                </ListGroup>
            </Col>
        )
    }
}

