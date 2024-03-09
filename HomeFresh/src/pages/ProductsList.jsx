
import React from 'react'
import useApi from '../Components/AxiosInstance/Axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Loader from '../../General/loader';





function ProductsList() {
    const [isLoading, setIsLoading] = useState(false);

    const api = useApi()

    const [courses, setCourses] = useState([])
    // const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const products = [
        {
            id: 1,
            image: 'https://th.bing.com/th/id/R.717cc0aacdc643eb001436c3ee3520a6?rik=ACYgsJGr64avsg&riu=http%3a%2f%2fwww.wicklowpartnership.ie%2fwp-content%2fuploads%2f2013%2f06%2fHealthy-Foods.jpeg&ehk=uYXnYdv9899BOucywAt460QFbW884y%2bpcFGBUftqJHw%3d&risl=&pid=ImgRaw&r=0',
            title: 'Product 1',
            description: 'Description of Product 1',
            price: 10.99
        },
        {
            id: 2,
            image: 'https://th.bing.com/th/id/R.90047461f21530eb4c95d954c44ad8c9?rik=uTZDT2TxG9WVnw&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f8%2fb%2fc%2f1183994-cool-healthy-food-wallpaper-1920x1200-for-samsung-galaxy.jpg&ehk=OyjFXnsEV29wgMIwoJRb7ypHhIGQTpSjqkMRTKmhKtg%3d&risl=&pid=ImgRaw&r=0',
            title: 'Product 2',
            description: 'Description of Product 2',
            price: 19.99
        },
        // Add more products here as needed
    ];


    useEffect(() => {
        // setIsLoading(true)
        // async function fetchProducts() {
        //     try {
        //         const response = await api.get('courses-about/courses');
        //         setCourses(response.data);
        //         setIsLoading(false)
        //     } catch (error) {
        //         console.error("Error fetching courses:", error);
        //         setIsLoading(false)
        //     }
        // }

        // fetchProducts();

    }, []);


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    //   const filteredList = products.filter((item) =>
    //   item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    // );


    return (
        isLoading ? ('loader') : (<div className="container mx-auto  mt-12 px-4  ">

            <h1 className="text-4xl font-bold mt-8 ml-2 text-center tracking-wide md:text-left md:mr-4"> Available Products</h1>
            <input
                type="text"
                placeholder="Search Products..."
                value={searchQuery}
                onChange={handleSearch}
                className="border  rounded-md p-2 outline-none font-bold mt-4 ml-2"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">

                {products.map(product => (
                    product.image &&
                    (<div key={product.id} className="  p-4 rounded shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2" style={{ backgroundColor: "bisque" }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-t"
                        />
                        <Link to={`/chapters/${product.id}`} className="flex justify-between items-center mt-4">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                                {product.title}
                            </h5>
                            <span className="text-2xl font-bold text-gray-900">
                                {product.price}
                            </span>
                            {/* <h5 className="text-lg font-medium text-gray-600 mt-2">
                                {product.teacher.username}
                            </h5> */}
                        </Link>
                        <div className=" mt-4">
                            <p className="">Biryani is a popular and flavorful rice dish that originated in the Indian subcontinent. It's made with aromatic basmati rice, meat </p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                        <Link
                                to={`/chapters/${product.id}`}
                                className="text-white bg-cyan-700 px-4 py-2 rounded hover:bg-cyan-800 focus:outline-none inline-block"
                            >
                                Purchase 
                            </Link>
                            <Link
                                to={`/chapters/${product.id}`}
                                className="text-white bg-cyan-700 px-4 py-2 rounded  focus:outline-none inline-block"
                                style={{ backgroundColor: '#4caf50' }}
                            >
                                Reviews
                            </Link>
                        </div>
                    </div>)
                ))}

            </div>

        </div>)

    );

}

export default ProductsList;

