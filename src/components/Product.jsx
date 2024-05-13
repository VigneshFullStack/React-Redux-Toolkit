import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { getProducts } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';
import '../App.css';

const Product = () => {

    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products);

    useEffect(() => {
        // dispatch an action for fetchProducts
        dispatch(getProducts());

        // api
        // fetch('https://fakestoreapi.com/products')
        //     .then(data => data.json())
        //     .then(result => setProducts(result))
    }, [dispatch]);

    const addToCart = (product) => {
        // dispatch an add action
        dispatch(add(product));
    }

    if (status === StatusCode.LOADING) {
        return <div className="loader">
            <div>
                <div className="loader-circle"></div>
                <span className="loader-text">Loading...</span>
            </div>
        </div>
    }

    if (status === StatusCode.ERROR) {
        return <div id="container">
            <p id="text">404 ERROR</p>
            <p id="shadow">
                <span id="glow">40</span><span id="blink">4 E</span><span id="glow">RR</span><span id="blink">OR</span>
            </p>
        </div>
    }

    const cards = products.map(product => (
        <div key={product.id} className='col-md-3' style={{ marginBottom: '10px' }}>
            <Card className='h-100'>
                <div className="text-center">
                    <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px' }} />
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        INR: {product.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{ background: 'white' }}>
                    <Button variant="primary" onClick={() => addToCart(product)}>Add To Cart</Button>
                </Card.Footer>
            </Card>
        </div>
    ))

    return (
        <>
            <h1 className="my-3">Product Dashboard</h1>
            <div className="row">
                {cards}
            </div>
        </>
    )
}

export default Product;
