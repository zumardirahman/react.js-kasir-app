import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
                total_harga: totalBayar,
                menus: this.props.keranjangs
        }

        axios
        .post(API_URL+"pesanans",pesanan)
        .then((res) =>{
            this.props.history.push('/sukses')
        })
    }

    render() {

        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);

        return (
            <div className='fixed-bottom'>
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className='px-4 py-3 d-grid gap-2'>
                        <h4>Total Harga : <strong className='float-right mr-2' >Rp.{numberWithCommas(totalBayar)}</strong></h4>
                        <Button 
                        variant='primary'
                        onClick={() => this.submitTotalBayar(totalBayar)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} /><strong> Bayar</strong>
                        </Button>
                    </Col>
                </Row>

            </div>
        )
    }
}
