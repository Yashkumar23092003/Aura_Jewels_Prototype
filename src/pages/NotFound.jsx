import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-padding mx-auto py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-serif text-6xl text-rose-gold mb-6">404</h1>
          <h2 className="text-2xl font-serif mb-4">Page Not Found</h2>
          <p className="text-charcoal/80 mb-8">
            We couldn't find the page you were looking for. 
            Perhaps you'd like to browse our collection instead?
          </p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;