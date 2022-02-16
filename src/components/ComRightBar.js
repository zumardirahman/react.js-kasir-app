import axios from 'axios'
import { Component } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { API_URL } from '../utils/constants'
import { numberWithCommas } from '../utils/utils'
import ModalKeranjang from './ModalKeranjang'
import TotalBayar from './TotalBayar'

export default class ComRightBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0
        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga,
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }
    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }

    }

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }
    
      
    handleSubmit = (event) => {
        event.preventDefault() //biar gk ke reload
        this.handleClose()

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        };
        //console.log("Menu: ", value);
        axios
            .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then(res => {
                this.props.getListKeranjang();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Sukses Updated Pesanan' + data.product.nama,
                    showConfirmButton: false,
                    timer: 1500
                })
            })


    }

    hapusPesanan = (id) => {
        this.handleClose()
        axios
            .delete(API_URL + "keranjangs/" + id)
            .then(res => {
                this.props.getListKeranjang();
                Swal.fire({
                    //position: 'top-end',
                    icon: 'error',
                    title: 'Hapus Pesanan Berhasil' + this.state.keranjangDetail.product.nama,
                    showConfirmButton: false,
                    timer: 1500
                })
            })


    }

    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} mt="2">
                <h4><strong>Hasil</strong></h4>
                <hr />

                {keranjangs.length !== 0 && (

                    <ListGroup variant='flush'>
                        {keranjangs.map((menuKeranjang) => (
                            <ListGroup.Item as="li" key={menuKeranjang.product.id} onClick={() => this.handleShow(menuKeranjang)}>
                                <Row>
                                    <Col xs='2'>
                                        <h5><Badge pill variant='success'>{menuKeranjang.jumlah}</Badge></h5>
                                    </Col>
                                    <Col>
                                        <h5>{menuKeranjang.product.nama}</h5>
                                        <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                    </Col>
                                    <Col>
                                        <p>Rp. {numberWithCommas(menuKeranjang.total_harga)}</p>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        ))}

                        <ModalKeranjang
                            handleClose={this.handleClose} {...this.state}
                            tambah={this.tambah}
                            kurang={this.kurang}
                            changeHandler={this.changeHandler}
                            handleSubmit={this.handleSubmit}
                            hapusPesanan={this.hapusPesanan}
                        />
                    </ListGroup>
                )}
                <TotalBayar keranjangs={keranjangs}  {...this.props} />
            </Col>
        )
    }
}

