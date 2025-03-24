import React from "react";

interface LandingPageProps {
  onExploreFeatures: () => void; // Callback function for "Explore Features" button
}

const LandingPage: React.FC<LandingPageProps> = ({ onExploreFeatures }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full bg-card py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <a href="/" className="text-2xl font-bold text-primary">
            EnhanceAI
          </a>
          <div className="flex space-x-4">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#gallery" className="text-foreground hover:text-primary transition-colors">
              Gallery
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-grow flex items-center justify-center bg-gradient-to-r from-custom-primary to-custom-secondary text-white">
        <div className="container text-center">
          <h1 className="text-5xl font-bold animate-fade-in-down">
            Enhance Your Images & Videos with AI
          </h1>
          <p className="mt-4 text-xl animate-fade-in-up">
            AI-powered image restoration & video upscaling from 440p to 1080p.
          </p>
          <div className="mt-8 animate-fade-in">
            <button
              onClick={onExploreFeatures} // Use the passed callback
              className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-white/90 transition-colors animate-glow"
            >
              Explore Features
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-background">
    <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {[
            {
            icon: 'https://cdn-icons-png.flaticon.com/128/1998/1998665.png', // AI Icon
            title: 'AI Image Restoration',
            description: 'Restore old or blurry images with deep learning technology.',
            },
            {
            icon: 'https://cdn-icons-png.flaticon.com/128/2997/2997896.png', // Video Icon
            title: 'Video Upscaling',
            description: 'Convert low-resolution videos (440p) to HD (1080p) with AI.',
            },
            {
            icon: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png', // Editor Icon
            title: 'AI-Powered Editor',
            description: 'Edit and enhance your media with our intuitive AI-powered editor.',
            },
        ].map((feature, index) => (
            <div
            key={index}
            className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up w-full max-w-sm"
            >
            <div className="flex justify-center">
                <img
                src={feature.icon}
                alt={feature.title}
                width={80}
                height={80}
                className="mx-auto"
                />
            </div>
            <h3 className="text-xl font-bold mt-4 text-center">{feature.title}</h3>
            <p className="mt-2 text-muted-foreground text-center">{feature.description}</p>
            </div>
        ))}
        </div>
    </div>
    </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                icon: 'fas fa-upload',
                title: 'Upload',
                description: 'Simply upload your images or videos to our secure platform from any device.',
              },
              {
                number: 2,
                icon: 'fas fa-cogs',
                title: 'Process',
                description: 'Our AI analyzes and enhances your media using advanced neural networks.',
              },
              {
                number: 3,
                icon: 'fas fa-download',
                title: 'Download',
                description: 'Download your enhanced media in seconds and enjoy the stunning results.',
              },
            ].map((step, index) => (
              <div className="col-md-4 mb-5" key={index}>
                <div className="process-item bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up">
                  <div className="process-number text-2xl font-bold text-primary">{step.number}</div>
                  <div className="process-icon mt-4">
                    <i className={`${step.icon} text-4xl text-primary`}></i>
                  </div>
                  <h4 className="text-xl font-bold mt-4">{step.title}</h4>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="process-arrow text-center mt-8">
                    <i className="fas fa-long-arrow-alt-right fa-2x text-primary"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">See The Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: '/img2.png', caption: 'Original Image' },
              { src: '/genf1.png', caption: 'Original Image' },
              { src: '/recol2.png', caption: 'Original Image' },
              { src: '/img1.png', caption: 'Enhanced Pic' },
              { src: '/genf2.png', caption: 'Recolour' },
              { src: '/recol1.png', caption: 'Gen_Fill' },
            ].map((image, index) => (
              <div className="col-md-4" key={index}>
                <div className="gallery-item bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up">
                  <img
                    src={image.src}
                    alt={`Before and After ${index + 1}`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-48"
                  />
                  <div className="gallery-overlay mt-4 text-center">
                    <div className="gallery-caption text-muted-foreground">{image.caption}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-card py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="mb-4">
              <h5 className="text-xl font-bold mb-4">About EnhanceAI</h5>
              <p className="text-muted-foreground">
                We're on a mission to make professional-quality image and video enhancement accessible to everyone through
                the power of artificial intelligence.
              </p>
              <ul className="social-links flex space-x-4 mt-4">
                <li>
                  <a href="#" className="text-primary hover:text-primary/80">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-primary/80">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-primary/80">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-primary/80">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h5 className="text-xl font-bold mb-4">Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-muted-foreground hover:text-primary">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-muted-foreground hover:text-primary">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h5 className="text-xl font-bold mb-4">Support</h5>
              <ul className="footer-links">
                <li>
                  <a href="#faq" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#support" className="text-muted-foreground hover:text-primary">
                    Support Center
                  </a>
                </li>
                <li>
                  <a href="#tutorials" className="text-muted-foreground hover:text-primary">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-primary">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h5 className="text-xl font-bold mb-4">Contact</h5>
              <ul className="contact-info">
                <li className="text-muted-foreground">
                  <i className="fas fa-envelope me-2"></i> support@enhanceai.com
                </li>
                <li className="text-muted-foreground">
                  <i className="fas fa-phone me-2"></i> (555) 123-4567
                </li>
                <li className="text-muted-foreground">
                  <i className="fas fa-map-marker-alt me-2"></i> 123 Innovation Way, Tech City, TC 12345
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom text-center mt-8">
            <p className="text-muted-foreground">&copy; 2025 EnhanceAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;