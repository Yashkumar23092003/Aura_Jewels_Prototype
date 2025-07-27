import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import placeholderImages from '../../public/assets/images/placeholder';

function ProductsPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    materials: [],
    gemstones: [],
    priceRange: null,
    sortBy: 'featured'
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // Fetch products data
    const fetchData = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        
        setProducts(data.products);
        setCategories(data.categories);
        setFilters(data.filters);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter products based on category and active filters
  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];
      
      // Filter by category if provided
      if (category) {
        result = result.filter(product => product.category === category);
      }
      
      // Apply active filters
      if (activeFilters.materials.length > 0) {
        result = result.filter(product => 
          product.materials && 
          activeFilters.materials.some(material => product.materials.includes(material))
        );
      }
      
      if (activeFilters.gemstones.length > 0) {
        result = result.filter(product => 
          product.materials && 
          activeFilters.gemstones.some(gemstone => product.materials.includes(gemstone))
        );
      }
      
      if (activeFilters.priceRange) {
        const range = activeFilters.priceRange;
        result = result.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
      
      // Apply sorting
      if (activeFilters.sortBy === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (activeFilters.sortBy === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (activeFilters.sortBy === 'newest') {
        result = result.filter(product => product.new).concat(
          result.filter(product => !product.new)
        );
      }
      // Default is 'featured' which is already handled by the products data
      
      setFilteredProducts(result);
    }
  }, [products, category, activeFilters]);

  // Function to toggle a filter value
  const toggleFilter = (filterType, value) => {
    setActiveFilters(prev => {
      if (filterType === 'priceRange') {
        return { ...prev, priceRange: value };
      }
      
      if (filterType === 'sortBy') {
        return { ...prev, sortBy: value };
      }
      
      const updatedFilter = [...prev[filterType]];
      if (updatedFilter.includes(value)) {
        return {
          ...prev,
          [filterType]: updatedFilter.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...updatedFilter, value]
        };
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      materials: [],
      gemstones: [],
      priceRange: null,
      sortBy: 'featured'
    });
  };

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

  // Get current category info
  const currentCategory = category ? 
    categories.find(cat => cat.id === category) : 
    { name: 'All Collections', description: 'Explore our entire range of exquisite jewelry pieces.' };

  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-charcoal text-ivory py-12">
        <div className="container-padding mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{currentCategory?.name}</h1>
          <p className="max-w-2xl text-ivory/80">{currentCategory?.description}</p>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="container-padding mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-xl">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-rose-gold hover:text-rose-gold/80 transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              {/* Material Filter */}
              {filters.materials && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Material</h3>
                  <div className="space-y-2">
                    {filters.materials.map(material => (
                      <label key={material} className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={activeFilters.materials.includes(material)}
                          onChange={() => toggleFilter('materials', material)}
                          className="sr-only peer"
                        />
                        <div className="w-4 h-4 border border-charcoal/30 mr-3 flex items-center justify-center peer-checked:bg-rose-gold peer-checked:border-rose-gold">
                          {activeFilters.materials.includes(material) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-charcoal/80 peer-checked:text-charcoal">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Gemstone Filter */}
              {filters.gemstones && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Gemstone</h3>
                  <div className="space-y-2">
                    {filters.gemstones.map(gemstone => (
                      <label key={gemstone} className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={activeFilters.gemstones.includes(gemstone)}
                          onChange={() => toggleFilter('gemstones', gemstone)}
                          className="sr-only peer"
                        />
                        <div className="w-4 h-4 border border-charcoal/30 mr-3 flex items-center justify-center peer-checked:bg-rose-gold peer-checked:border-rose-gold">
                          {activeFilters.gemstones.includes(gemstone) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-charcoal/80 peer-checked:text-charcoal">{gemstone}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Price Range Filter */}
              {filters.priceRanges && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {filters.priceRanges.map(range => (
                      <label key={range.id} className="flex items-center cursor-pointer">
                        <input 
                          type="radio"
                          name="price-range"
                          checked={activeFilters.priceRange?.id === range.id}
                          onChange={() => toggleFilter('priceRange', range)}
                          className="sr-only peer"
                        />
                        <div className="w-4 h-4 rounded-full border border-charcoal/30 mr-3 flex items-center justify-center peer-checked:border-rose-gold">
                          {activeFilters.priceRange?.id === range.id && (
                            <div className="w-2 h-2 rounded-full bg-rose-gold"></div>
                          )}
                        </div>
                        <span className="text-sm text-charcoal/80 peer-checked:text-charcoal">{range.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Filters Button & Sort */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <button 
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center gap-2 bg-charcoal text-ivory px-4 py-2 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </button>
            
            <select 
              value={activeFilters.sortBy}
              onChange={(e) => toggleFilter('sortBy', e.target.value)}
              className="border border-charcoal/30 px-3 py-2 rounded bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
          
          {/* Mobile Filters Drawer */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-50 bg-charcoal/50 lg:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-md bg-ivory overflow-y-auto animate-slide-in">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-xl">Filters</h2>
                    <button onClick={() => setIsMobileFiltersOpen(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Material Filter */}
                  {filters.materials && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Material</h3>
                      <div className="space-y-3">
                        {filters.materials.map(material => (
                          <label key={material} className="flex items-center cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={activeFilters.materials.includes(material)}
                              onChange={() => toggleFilter('materials', material)}
                              className="sr-only peer"
                            />
                            <div className="w-5 h-5 border border-charcoal/30 mr-3 flex items-center justify-center peer-checked:bg-rose-gold peer-checked:border-rose-gold">
                              {activeFilters.materials.includes(material) && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-charcoal/80 peer-checked:text-charcoal">{material}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Gemstone Filter */}
                  {filters.gemstones && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Gemstone</h3>
                      <div className="space-y-3">
                        {filters.gemstones.map(gemstone => (
                          <label key={gemstone} className="flex items-center cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={activeFilters.gemstones.includes(gemstone)}
                              onChange={() => toggleFilter('gemstones', gemstone)}
                              className="sr-only peer"
                            />
                            <div className="w-5 h-5 border border-charcoal/30 mr-3 flex items-center justify-center peer-checked:bg-rose-gold peer-checked:border-rose-gold">
                              {activeFilters.gemstones.includes(gemstone) && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-charcoal/80 peer-checked:text-charcoal">{gemstone}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Price Range Filter */}
                  {filters.priceRanges && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="space-y-3">
                        {filters.priceRanges.map(range => (
                          <label key={range.id} className="flex items-center cursor-pointer">
                            <input 
                              type="radio"
                              name="price-range-mobile"
                              checked={activeFilters.priceRange?.id === range.id}
                              onChange={() => toggleFilter('priceRange', range)}
                              className="sr-only peer"
                            />
                            <div className="w-5 h-5 rounded-full border border-charcoal/30 mr-3 flex items-center justify-center peer-checked:border-rose-gold">
                              {activeFilters.priceRange?.id === range.id && (
                                <div className="w-3 h-3 rounded-full bg-rose-gold"></div>
                              )}
                            </div>
                            <span className="text-charcoal/80 peer-checked:text-charcoal">{range.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={clearFilters}
                      className="flex-1 border border-charcoal py-2 text-center"
                    >
                      Clear All
                    </button>
                    <button 
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="flex-1 bg-rose-gold text-ivory py-2 text-center"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort Options - Desktop */}
            <div className="hidden lg:flex justify-end mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-charcoal/70">Sort by:</span>
                <select 
                  value={activeFilters.sortBy}
                  onChange={(e) => toggleFilter('sortBy', e.target.value)}
                  className="border border-charcoal/30 px-3 py-1 text-sm rounded bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
            
            {/* Products Count */}
            <p className="text-sm text-charcoal/70 mb-6">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            
            {isLoading ? (
              // Loading placeholders for products
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="rounded-lg overflow-hidden bg-charcoal/5 animate-pulse h-80"></div>
                ))}
              </div>
            ) : (
              filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
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
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg mb-4">No products match your selected filters.</p>
                  <button 
                    onClick={clearFilters}
                    className="btn-secondary"
                  >
                    Clear Filters
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;