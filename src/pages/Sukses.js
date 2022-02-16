import axios from 'axios';
import React, { Component } from 'react'
import { Button, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { API_URL } from '../utils/constants';

export default class Sukses extends Component {

    componentDidMount(){
        axios
        .get(API_URL + "keranjangs")
        .then(res => {
          // console.log("Response: ", res);
          const keranjangs = res.data;
         keranjangs.map(function(item){
             return axios
                    .delete(API_URL+"keranjangs/"+item.id)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error))
         })
  
        })
        .catch(error => {
          console.log("Error YA");
        });
    }
  render() {
    return (
      <div className='mt-4 text-center'>
          <Image src='assets/images/confirmed.png' width='400' />
        <h2>Pemesanan Berhasil Dibuat</h2>
        <p>Terimkasih Sudah Memesan</p>
        <Button variant="primary" as={Link} to='/'>
            Kembali
        </Button>
      </div>
    )
  }
}
