// eslint-disable-next-line no-unused-vars
import logo from '../logo.svg';
import '../App.css';
import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ComLeftBar, ComRightBar, Menus } from '../components/Index'
import { API_URL } from '../utils/constants'
import axios from 'axios'
import Swal from 'sweetalert2';


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      categoryYangDipilih: 'Makanan',
      keranjangs: [],
    }
  }



  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then(res => {
        // console.log("Response: ", res);
        const menus = res.data;
        this.setState({ menus: menus });

      })
      .catch(error => {
        console.log("Error YA");
      });

this.getListKeranjang();


  }

  // componentDidUpdate(prevState) { //untuk refresh data state pada keranjang diupdate
  //   if (this.state.keranjangs !== prevState.keranjangs) { //jika diupdate maka lakukan pengmabilan ulang
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then(res => {
  //         // console.log("Response: ", res);
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs: keranjangs });

  //       })
  //       .catch(error => {
  //         console.log("Error YA");
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then(res => {
        // console.log("Response: ", res);
        const keranjangs = res.data;
        this.setState({ keranjangs: keranjangs });

      })
      .catch(error => {
        console.log("Error YA");
      });
  }

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: []
    })
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then(res => {
        // console.log("Response: ", res);
        const menus = res.data;
        this.setState({ menus: menus });

      })

      // handle success
      .catch(error => {
        console.log("Error YA");
      })
  }


  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then(res => {
        //console.log("Keranjang: ",value.id);
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          };
          //console.log("Menu: ", value);
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then(res => {
              this.getListKeranjang()
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: keranjang.product.nama + ' Sukses, Masuk Keranjang',
                showConfirmButton: false,
                timer: 1500
              })
            })


        } else {

          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then(res => {
              this.getListKeranjang()
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: keranjang.product.nama + ' Sukses, Masuk Keranjang Lagi',
                showConfirmButton: false,
                timer: 1500
              })
            })
        }
      })
      // handle success
      .catch(error => {
        console.log("Error YA");
      })

  }


  render() {
    const { menus, categoryYangDipilih, keranjangs } = this.state
    return (
        <div className='mt-3'>
          <Container fluid>
            <Row>
              <ComLeftBar changeCategory={this.changeCategory} categoryYangDipilih={categoryYangDipilih} />
              <Col className='mt-3'>
                <h4><strong>Daftar Produk</strong></h4>
                <hr />
                <Row className='overflow-auto menu'>
                  {menus && menus.map((menu) => (
                    // <h4>{menu.nama}</h4>
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
                </Row>
              </Col>
              <ComRightBar keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
            </Row>
          </Container>
        </div>
    )
  }
}
