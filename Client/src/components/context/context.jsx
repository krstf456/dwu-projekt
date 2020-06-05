import React from "react";
import axios from "axios";
import { Box, Button } from "grommet";
import { Link } from "react-router-dom";
import style from "./Context.css";
//import AddtoCartButton from "../checkout/AddToCart";

const Context = React.createContext();

export class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      updateProducts: this.updateProducts,
      shippingAlternatives: [],
      selectedShipping: [],
      addToCart: this.addToCart,
      shoppingCart : [],
      getOneProduct: this.getOneProduct,
      //displayOneProduct: this.displayOneProduct,
      getAllShipping: this.getAllShipping,
      setSelectedShipping: this.setSelectedShipping,
    };
  }

  updateProducts = (genre) => {
    axios.get("http://localhost:5000/products/" + genre).then((response) => {
      this.setState({ products: response.data });
    });
  };


  componentDidMount = () => {
    this.setState({
      shoppingCart: JSON.parse(localStorage.getItem("cart"))
    })
  }



 
  getOneProduct = async (id) => {
    const response = await axios.get(`http://localhost:5000/product/${id}`)
   const product = response.data
   console.log(product)
    return product
  };


  addToCart = (product) => {
    const alreadyInCart = this.state.shoppingCart.some((element) => element.product._id === product._id)
    const cloneShoppingCart = Object.assign([], this.state.shoppingCart);
    console.log(alreadyInCart)
    if(alreadyInCart) {
      
      console.log('test')
      const existingItem = cloneShoppingCart.find((element) => element.product._id === product._id)
      existingItem.quantity = existingItem.quantity + 1

      
    } else {
      const itemInCart = {product: product, quantity: 1}

      cloneShoppingCart.push(itemInCart)
    }
    
    alert("Item added to cart")
    console.log("shoppingcart", cloneShoppingCart)
    
    this.setState({ shoppingCart: cloneShoppingCart})
    localStorage.setItem("cart" , JSON.stringify(this.state.shoppingCart))
    
 }

 itemQuantity = () => {
  let itemQuantity = 0
  let itemInCart = this.state.shoppingCart


};


  getAllShipping = () => {
    axios.get("http://localhost:5000/shipping").then((response) => {
      this.setState({ shippingAlternatives: response.data });
      this.state.shippingAlternatives.map(shipping => {
        return shipping.shipping_time
      })
    });
  };

  setSelectedShipping = (shipping) => {
    this.setState({ selectedShipping: shipping})
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;

export const Consumer = Context.Consumer;
