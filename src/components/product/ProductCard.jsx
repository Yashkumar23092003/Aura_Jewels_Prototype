import { Link } from 'react-router-dom';
import placeholderImages from '../../assets/images/placeholder.js';

function ProductCard({ product }) {
  // Get appropriate image or placeholder
  const getImageUrl = (product, index = 0) => {
    if (!product || !product.images || !product.images[index]) {
      // Return placeholder based on category
      return product?.category ? 
        placeholderImages[product.category][index % placeholderImages[product.category].length] : 
        placeholderImages.rings[0];
    }
    return product.images[index];
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={getImageUrl(product)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.new && (
          <span className="absolute top-4 left-4 bg-rose-gold text-ivory text-xs font-medium px-2 py-1 rounded">
            New
          </span>
        )}
        {product.discountPercentage > 0 && (
          <span className="absolute top-4 right-4 bg-charcoal text-ivory text-xs font-medium px-2 py-1 rounded">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl mb-2 group-hover:text-rose-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-charcoal/70 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <div>
            {product.originalPrice && product.originalPrice > product.price ? (
              <div className="flex items-center gap-2">
                <span className="font-medium">${product.price.toFixed(2)}</span>
                <span className="text-charcoal/60 text-sm line-through">${product.originalPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <span className="text-rose-gold font-medium">
            View Details <span className="ml-1 group-hover:ml-2 transition-all">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;