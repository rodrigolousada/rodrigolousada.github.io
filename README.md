# Rodrigo Lousada - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing Rodrigo Lousada's professional experience, skills, and achievements in software engineering, data science, and AI.

## 🌐 Live Website

Visit the live website at: **[rodrigolousada.me](https://rodrigolousada.me)**

## 📋 About

This is the personal portfolio website of Rodrigo Lousada, a Software Engineer at Klarna based in Berlin, Germany. The website showcases his professional journey, technical skills, and experience in data science, AI, and software engineering.

### Current Role
- **Software Engineer** at Klarna (Berlin, Germany)
- Working on AI-driven Knowledge Management systems
- Tech Stack: Neo4j, FastAPI, TypeScript, React

### Professional Background
- **4+ years** of experience in software engineering and data science
- Former **Consulting Lead** at IBM (Chatbot & GenAI Teams)
- **Data Science Researcher** at Instituto de Telecomunicações
- **MSc. Computer Science & Engineering** from Instituto Superior Técnico, University of Lisbon

## 🚀 Features

### Core Sections
- **Hero Section** - Dynamic typing animation showcasing roles
- **About** - Professional summary and current position details
- **Resume** - Complete professional experience and education
- **Skills/Roles** - Visual representation of expertise levels
- **Services** - Personal strengths and capabilities
- **Organizations** - Interactive carousel of work experience
- **Contact** - Professional contact information and location

### Technical Features
- **Responsive Design** - Optimized for all device sizes
- **Smooth Animations** - AOS (Animate On Scroll) integration
- **Interactive Elements** - Swiper carousels, lightbox galleries
- **Modern UI/UX** - Clean, professional design with Bootstrap 5
- **Performance Optimized** - Fast loading with optimized assets

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with responsive design
- **JavaScript (ES6+)** - Interactive functionality
- **Bootstrap 5.3.1** - Responsive framework
- **Bootstrap Icons** - Icon library

### Libraries & Dependencies
- **AOS (Animate On Scroll)** - Scroll animations
- **Swiper.js** - Touch slider for testimonials/organizations
- **GLightbox** - Lightbox gallery for portfolio
- **Typed.js** - Typing animation effects
- **PureCounter** - Animated counters
- **Isotope** - Portfolio filtering (commented out)

### Assets
- **Google Fonts** - Typography (Open Sans, Raleway, Poppins)
- **Optimized Images** - Professional photos and organization logos
- **PDF Documents** - CV and Clifton Strengths assessment

## 📁 Project Structure

```
rodrigolousada.github.io/
├── index.html                 # Main homepage
├── inner-page.html            # Additional pages (if needed)
├── portfolio-details.html     # Portfolio detail pages
├── CNAME                      # Custom domain configuration
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── js/
│   │   └── main.js           # Main JavaScript functionality
│   ├── img/                  # Images and photos
│   │   ├── organizations/    # Company logos
│   │   ├── portfolio/        # Portfolio images
│   │   └── testimonials/     # Testimonial images
│   ├── vendor/               # Third-party libraries
│   │   ├── aos/             # Animate On Scroll
│   │   ├── bootstrap/       # Bootstrap framework
│   │   ├── bootstrap-icons/ # Icon library
│   │   ├── boxicons/        # Additional icons
│   │   ├── glightbox/       # Lightbox gallery
│   │   ├── isotope-layout/  # Portfolio filtering
│   │   ├── purecounter/     # Animated counters
│   │   ├── swiper/          # Touch slider
│   │   ├── typed.js/        # Typing animation
│   │   └── waypoints/       # Scroll triggers
│   ├── CV_Rodrigo_Lousada.pdf    # Downloadable CV
│   └── CliftonStrengths.pdf      # Strengths assessment
├── forms/                    # Contact form backend (PHP)
└── README.md                 # This file
```

## 🎨 Design & Customization

### Color Scheme
- **Primary Blue**: #149ddd
- **Secondary Blue**: #37b3ed
- **Dark Background**: #040b14
- **Text Color**: #272829

### Typography
- **Headings**: Raleway, sans-serif
- **Body Text**: Open Sans, sans-serif
- **Special Elements**: Poppins, sans-serif

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1199px
- **Desktop**: ≥ 1200px

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/rodrigolousada/rodrigolousada.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd rodrigolousada.github.io
   ```

3. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

4. Visit `http://localhost:8000` in your browser

## 📝 Customization Guide

### Updating Content
- **Personal Information**: Edit the relevant sections in `index.html`
- **Images**: Replace images in `assets/img/` directory
- **Styling**: Modify `assets/css/style.css`
- **Functionality**: Update `assets/js/main.js`

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding CSS styles in `style.css`
3. Add JavaScript functionality if needed in `main.js`

### Portfolio Items
The portfolio section is currently commented out but can be enabled by:
1. Uncomment the portfolio section in `index.html`
2. Add portfolio images to `assets/img/portfolio/`
3. Update portfolio items with your projects

## 🌟 Key Features Explained

### Typing Animation
The hero section features a dynamic typing animation that cycles through different professional roles using Typed.js.

### Skills Visualization
Professional skills are displayed as progress bars with percentage indicators, providing a visual representation of expertise levels.

### Organization Carousel
An interactive Swiper.js carousel showcases work experience with company logos and testimonials.

### Responsive Navigation
A fixed sidebar navigation that collapses to a mobile-friendly hamburger menu on smaller screens.

## 📞 Contact Information

- **Email**: rodrigo.m.lousada@gmail.com
- **Phone**: +351 911 184 298
- **Location**: Berlin, Germany (Klarna Office)
- **LinkedIn**: [Rodrigo Lousada](https://www.linkedin.com/in/rodrigo-lousada-359685117)
- **GitHub**: [rodrigolousada](https://github.com/rodrigolousada)

## 📄 License

This project is based on the **iPortfolio** template by BootstrapMade.com. The template is licensed under their standard license, while the content and customizations are Rodrigo Lousada's personal property.

- **Template**: [iPortfolio Bootstrap Portfolio Template](https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/)
- **License**: [BootstrapMade License](https://bootstrapmade.com/license/)

## 🤝 Contributing

This is a personal portfolio website, but suggestions and feedback are welcome. If you notice any issues or have suggestions for improvements, please feel free to reach out.

## 📈 Performance

The website is optimized for:
- **Fast Loading**: Compressed images and minified assets
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation
- **Mobile First**: Responsive design optimized for mobile devices

---

**Built with ❤️ by Rodrigo Lousada**
