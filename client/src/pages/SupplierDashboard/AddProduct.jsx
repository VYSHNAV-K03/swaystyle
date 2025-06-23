import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState(''); // New field for discount price
  const [stock, setStock] = useState('');
  const [image, setImage] = useState([]); // Updated to allow multiple images
  const [file, setFile] = useState(null);
  const [colorOptions, setColorOptions] = useState(''); // Field for color options as comma-separated values
  const [material, setMaterial] = useState(''); // Field for material
  const [brand, setBrand] = useState(''); // Field for brand
  const [shippingCharges, setShippingCharges] = useState(''); // Field for shipping charges
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(''); // Field for delivery time
  const [size, setSize] = useState('');
  const [sizes, setSizes] = useState([]); // List of available sizes
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    
    setFile(selectedFile);
    
  };

  const handleAddSize = () => {
    if (size && !sizes.includes(size)) {
      setSizes([...sizes, size]);
      setSize('');
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setSizes(sizes.filter((s) => s !== sizeToRemove));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discountPrice', discountPrice); // Add discount price to form data
    formData.append('stock', stock);
    image.forEach((img) => formData.append('image', img)); // Add multiple images
    formData.append("model", file);
    formData.append('colorOptions', colorOptions);
    formData.append('material', material);
    formData.append('brand', brand);
    formData.append('shippingCharges', shippingCharges);
    formData.append('estimatedDeliveryTime', estimatedDeliveryTime);
    formData.append('sizes', JSON.stringify(sizes)); // Send sizes as JSON array


    try {
      await axios.post('/suppliers/products', formData);
      navigate('/supplier/products');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="add-product">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/supplier')}
      >
        Back to Dashboard
      </button>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discountPrice" className="form-label">Discount Price</label>
          <input
            type="number"
            className="form-control"
            id="discountPrice"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Images</label>
          <input
            type="file"
            className="form-control"
            id="image"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="model" className="form-label">Model</label>
          <input type="file" id='model' className="form-control" accept=".glb" onChange={handleFileChange} />
        </div>

        
        <div className="mb-3">
          <label htmlFor="sizes" className="form-label">Available Sizes</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter size (S, M, L, XL, etc.)"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <button type="button" className="btn btn-success" onClick={handleAddSize}>
              Add Size
            </button>
          </div>
          <div className="mt-2">
            {sizes.map((s) => (
              <span key={s} className="badge bg-primary me-2">
                {s} <button type="button" className="btn-close btn-close-white" onClick={() => handleRemoveSize(s)}></button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="colorOptions" className="form-label">Color Options (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="colorOptions"
            value={colorOptions}
            onChange={(e) => setColorOptions(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="material" className="form-label">Material</label>
          <input
            type="text"
            className="form-control"
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </div>
                <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shippingCharges" className="form-label">Shipping Charges</label>
          <input
            type="number"
            className="form-control"
            id="shippingCharges"
            value={shippingCharges}
            onChange={(e) => setShippingCharges(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estimatedDeliveryTime" className="form-label">Estimated Delivery Time</label>
          <input
            type="text"
            className="form-control"
            id="estimatedDeliveryTime"
            value={estimatedDeliveryTime}
            onChange={(e) => setEstimatedDeliveryTime(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

        
