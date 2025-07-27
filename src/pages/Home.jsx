import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import placeholderImages from '../assets/images/placeholder.js';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch products data
    const fetchData = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        
        // Get featured products
        const featured = data.products.filter(product => product.featured);
        setFeaturedProducts(featured);
        
        // Get categories
        setCategories(data.categories);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Function to get appropriate image
  const getImageUrl = (product, index = 0) => {
    if (!product || !product.images || !product.images[index]) {
      // Return placeholder based on category
      return product?.category ? 
        placeholderImages[product.category][index % placeholderImages[product.category].length] : 
        placeholderImages.rings[0];
    }
    return product.images[index];
  };

  // Function to get category image
  const getCategoryImageUrl = (category) => {
    if (!category || !category.image) {
      return placeholderImages.categories[category.id] || placeholderImages.categories.rings;
    }
    return category.image;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-charcoal to-charcoal/90 text-ivory py-28 md:py-40 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-32 h-32 rounded-full bg-rose-gold/20 absolute top-10 left-10"></div>
            <div className="w-48 h-48 rounded-full bg-rose-gold/10 absolute bottom-20 right-20"></div>
            <div className="w-24 h-24 rounded-full bg-rose-gold/15 absolute top-40 right-40"></div>
          </div>
        </div>
        
        <div className="container-padding mx-auto relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-in">
             <span className='text-white'>Timeless Elegance,</span> <span className="text-rose-gold">Exquisite Craftsmanship</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in delay-[300ms]">
              Discover our handcrafted luxury jewelry collection, where tradition meets contemporary design.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-[600ms]">
              <Link to="/products" className="btn-primary rounded-full px-8 py-3">
                Explore Collection
              </Link>
              <Link to="#featured" className="text-white btn-secondary bg-slate-900 rounded-full px-8 py-3 hover:bg-slate-800 transition-colors">
                Featured Pieces
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-ivory">
        <div className="container-padding mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl mb-4">Our Collections</h2>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Explore our carefully curated jewelry collections, each piece telling a unique story of beauty and craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading placeholders for categories
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden bg-charcoal/5 animate-pulse h-80"></div>
              ))
            ) : (
              categories.map(category => (
                <Link 
                  to={`/products/${category.id}`} 
                  key={category.id}
                  className="group overflow-hidden relative rounded-lg transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl block h-80"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent z-10"></div>
                  <img 
                    src={getCategoryImageUrl(category)} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-ivory">
                    <h3 className="font-serif text-2xl mb-1">{category.name}</h3>
                    <p className="opacity-80 text-sm mb-3">{category.productCount} Products</p>
                    <span className="inline-block text-rose-gold font-medium">
                      Starting at ${category.startingPrice.toFixed(2)} <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section id="featured" className="py-20 bg-gradient-to-b from-ivory to-rose-gold/5">
        <div className="container-padding mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl mb-4">Featured Pieces</h2>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Discover our most coveted pieces, each one a testament to exceptional design and masterful craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading placeholders for featured products
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden bg-charcoal/5 animate-pulse h-96"></div>
              ))
            ) : (
              featuredProducts.slice(0, 6).map(product => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
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
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl mb-2 group-hover:text-rose-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-charcoal/70 mb-4 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                      <span className="text-rose-gold font-medium">
                        View Details <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary text-white btn-secondary  rounded-full px-8 py-3 hover:bg-rose-800 transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* About/Story Section */}
      <section className="py-20 bg-charcoal text-ivory">
        <div className="container-padding mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl mb-6">Our Craftsmanship</h2>
              <p className="text-ivory/80 mb-4">
                At Aura Jewels, we believe that every piece of jewelry tells a story. Our master craftsmen combine time-honored techniques with innovative design to create pieces that transcend trends and become heirlooms.
              </p>
              <p className="text-ivory/80 mb-6">
                Each creation begins with the careful selection of ethically sourced gemstones and precious metals. From the initial sketch to the final polish, our artisans pour their passion into every detail, ensuring that each piece reflects our commitment to excellence.
              </p>
              <Link to="#" className="btn-secondary inline-flex items-center">
                Learn More About Our Process
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden h-48 bg-rose-gold/20 flex items-center justify-center">
                  <span className="font-serif text-lg">Crafting</span>
                </div>
                <div className="rounded-lg overflow-hidden h-64 bg-rose-gold/30 flex items-center justify-center">
                  <span className="font-serif text-lg">Design</span>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-lg overflow-hidden h-64 bg-rose-gold/25 flex items-center justify-center">
                  <span className="font-serif text-lg">Materials</span>
                </div>
                <div className="rounded-lg overflow-hidden h-48 bg-rose-gold/15 flex items-center justify-center">
                  <span className="font-serif text-lg">Finishing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-ivory">
        <div className="container-padding mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl mb-4">Client Stories</h2>
            <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
              Read about the experiences of those who have chosen Aura Jewels to mark their special moments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Engagement Ring Customer",
                quote: "My fiancé proposed with the Moonlight Diamond Ring, and I couldn't have dreamed of anything more beautiful. The craftsmanship is extraordinary, and it catches light in the most magical way.",
                image: null
              },
              {
                name: "Michael Chen",
                role: "Anniversary Gift",
                quote: "I surprised my wife with the Sapphire Tennis Bracelet for our 10th anniversary. The quality exceeded my expectations, and the packaging made the presentation even more special.",
                image: null
              },
              {
                name: "Emma Williams",
                role: "Wedding Jewelry",
                quote: "Aura Jewels created custom pieces for my entire bridal party. The attention to detail and personalized service made our special day even more memorable.",
                image: null
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-rose-gold/20 flex items-center justify-center text-rose-gold font-serif text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-serif text-lg">{testimonial.name}</h4>
                    <p className="text-charcoal/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-charcoal/80 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter/CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-gold to-rose-gold/80 text-ivory">
        <div className="container-padding mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Join Our Exclusive Collection Previews</h2>
            <p className="text-ivory/90 mb-8">
              Be the first to see our new collections and receive special offers by joining our newsletter.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 bg-ivory/10 border border-ivory/30 text-ivory placeholder:text-ivory/70 focus:outline-none focus:bg-ivory/20"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-ivory text-rose-gold font-medium hover:bg-ivory/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;