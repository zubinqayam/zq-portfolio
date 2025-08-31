I'll debug the React portfolio application to ensure all links to the Google Developer profile are working correctly and update any placeholder URLs.

```jsx
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Linkedin, Github, Briefcase, Award, Code, Database, Server, ChevronRight, Globe } from 'lucide-react';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const skillRefs = useRef([]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Animate skill bars when in view
      skillRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.8) {
            ref.style.setProperty('--progress', `${index * 10 + 70}%`);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Mock data
  const profile = {
    name: "Zubin Qayam",
    title: "Healthcare Marketing & Operations Leader",
    email: "zubin.qayam@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Results-driven healthcare professional with 10+ years of experience in marketing strategy, operations management, and digital transformation. Passionate about leveraging technology to improve patient outcomes and streamline healthcare delivery.",
    social: {
      linkedin: "https://www.linkedin.com/in/zubinqayam",
      github: "https://github.com/zubinqayam",
      gdev: "https://g.dev/zubinqayam"
    }
  };

  const projects = [
    {
      id: 1,
      title: "Healthcare Analytics Dashboard",
      description: "Developed a comprehensive analytics platform for tracking patient outcomes and operational metrics across 50+ healthcare facilities.",
      tech: ["React", "Node.js", "MongoDB", "D3.js"],
      image: "https://placehold.co/600x400/3b82f6/ffffff?text=Analytics+Dashboard"
    },
    {
      id: 2,
      title: "Telemedicine Platform Integration",
      description: "Led the integration of a telemedicine solution with existing EHR systems, improving patient access and reducing wait times by 35%.",
      tech: ["AWS", "Python", "FHIR", "Vue.js"],
      image: "https://placehold.co/600x400/10b981/ffffff?text=Telemedicine+Platform"
    },
    {
      id: 3,
      title: "Patient Engagement Mobile App",
      description: "Spearheaded the development of a mobile application that increased patient engagement metrics by 42% through personalized health tracking and reminders.",
      tech: ["Flutter", "Firebase", "Google Cloud", "Figma"],
      image: "https://placehold.co/600x400/f59e0b/ffffff?text=Patient+App"
    }
  ];

  const skills = [
    { id: 1, name: "Digital Strategy", level: 90 },
    { id: 2, name: "Healthcare Operations", level: 85 },
    { id: 3, name: "Project Management", level: 80 },
    { id: 4, name: "Data Analytics", level: 75 },
    { id: 5, name: "Stakeholder Engagement", level: 95 },
    { id: 6, name: "Budget Management", level: 85 }
  ];

  const certifications = [
    {
      id: 1,
      name: "Google Cloud Professional Healthcare Data Engineer",
      issuer: "Google Cloud",
      date: "2023",
      icon: "https://placehold.co/60x60/4285F4/ffffff?text=GC"
    },
    {
      id: 2,
      name: "Microsoft Certified: Azure for Healthcare",
      issuer: "Microsoft",
      date: "2022",
      icon: "https://placehold.co/60x60/00A4EF/ffffff?text=MS"
    },
    {
      id: 3,
      name: "Certified Healthcare Marketing Professional",
      issuer: "Healthcare Marketing Association",
      date: "2021",
      icon: "https://placehold.co/60x60/0078D7/ffffff?text=CHMP"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${scrolled ? 'text-blue-600' : 'text-white'}`}>
                Zubin<span className="text-blue-600">.</span>
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="font-medium hover:text-blue-600 transition-colors">About</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="font-medium hover:text-blue-600 transition-colors">Projects</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="font-medium hover:text-blue-600 transition-colors">Skills</a>
              <a href="#certifications" onClick={(e) => { e.preventDefault(); scrollToSection('certifications'); }} className="font-medium hover:text-blue-600 transition-colors">Certifications</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="font-medium hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Projects</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Skills</a>
              <a href="#certifications" onClick={(e) => { e.preventDefault(); scrollToSection('certifications'); }} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Certifications</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20" style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <Award className="text-blue-600" size={28} />
                </div>
                <div>
                  <p className="text-blue-100 font-medium">Google Developer Expert</p>
                  <p className="text-white font-semibold">Healthcare & Cloud</p>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Zubin Qayam
              </h1>
              
              <p className="text-xl text-blue-100">
                Healthcare Marketing & Operations Leader
              </p>
              
              <p className="text-blue-100 max-w-xl">
                Driving digital transformation in healthcare through strategic marketing, operational excellence, and innovative technology solutions.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get in Touch
                </button>
                <a 
                  href={profile.social.gdev}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-blue-500/10 transition-colors flex items-center"
                >
                  <Globe className="mr-2" size={18} />
                  Google Developer Profile
                </a>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-[450px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-4xl font-bold text-blue-600">ZQ</span>
                    </div>
                    <p className="text-gray-600">Professional Headshot</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                  <div className="flex space-x-4">
                    <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <Linkedin size={24} />
                    </a>
                    <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
                      <Github size={24} />
                    </a>
                    <a href={profile.social.gdev} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <Globe size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-white flex flex-col items-center"
            aria-label="Scroll to about section"
          >
            <ChevronDown size={24} />
            <span className="mt-2 text-sm">Scroll Down</span>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              With over a decade of experience at the intersection of healthcare and technology, I've dedicated my career to improving patient outcomes through strategic marketing and operational excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Briefcase className="text-blue-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold">Professional Experience</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-2">Senior Director, Healthcare Strategy</h4>
                  <p className="text-blue-600 font-medium mb-1">HealthTech Innovations Inc. | 2020-Present</p>
                  <p className="text-gray-600">Lead strategic initiatives for digital health products serving 5M+ patients, resulting in 35% growth in user engagement and $12M in new revenue streams.</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-2">Marketing Manager, Healthcare Solutions</h4>
                  <p className="text-blue-600 font-medium mb-1">Global Health Systems | 2016-2020</p>
                  <p className="text-gray-600">Directed marketing campaigns for EHR integration products, achieving 40% market share growth and recognition as "Innovator of the Year" in 2019.</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-2">Operations Analyst</h4>
                  <p className="text-blue-600 font-medium mb-1">Regional Medical Center | 2013-2016</p>
                  <p className="text-gray-600">Optimized patient flow processes that reduced average wait times by 28% and improved patient satisfaction scores by 32 points.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Award className="text-blue-600 mr-2" size={24} />
                  Professional Highlights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <ChevronRight className="text-blue-600" size={16} />
                    </div>
                    <span>Google Developer Expert in Healthcare & Cloud technologies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <ChevronRight className="text-blue-600" size={16} />
                    </div>
                    <span>Microsoft Certified Healthcare Data Professional</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <ChevronRight className="text-blue-600" size={16} />
                    </div>
                    <span>Speaker at 15+ healthcare technology conferences</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <ChevronRight className="text-blue-600" size={16} />
                    </div>
                    <span>Author of "Digital Transformation in Healthcare" blog series</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="text-blue-600 mr-3" size={20} />
                    <a href={`mailto:${profile.email}`} className="hover:text-blue-600 transition-colors">{profile.email}</a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-blue-600 mr-3" size={20} />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-blue-600 mr-3" size={20} />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="text-blue-600 mr-3" size={20} />
                    <a 
                      href={profile.social.gdev} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      g.dev/zubinqayam
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
            <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg">
              Selected projects showcasing my expertise in healthcare technology, marketing strategy, and operational innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Project+Image";
                      }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              View More Projects
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Core Competencies</h2>
            <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg">
              Expertise developed through years of experience at the intersection of healthcare, marketing, and technology.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-2">
                  <Code className="text-blue-600 mr-2" size={20} />
                  <h3 className="text-xl font-bold">Technical Skills</h3>
                </div>
                <div className="space-y-6">
                  {skills.slice(0, 3).map((skill, index) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-blue-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          ref={el => skillRefs.current[index] = el}
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                          style={{ width: '0%', '--progress': '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Database className="text-blue-600 mr-2" size={20} />
                  <h3 className="text-xl font-bold">Strategic Skills</h3>
                </div>
                <div className="space-y-6">
                  {skills.slice(3).map((skill, index) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-blue-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          ref={el => skillRefs.current[index + 3] = el}
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                          style={{ width: '0%', '--progress': '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Certifications & Credentials</h2>
            <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg">
              Professional certifications validating expertise in healthcare technology and operations.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div 
                  key={cert.id}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <img 
                          src={cert.icon} 
                          alt={cert.issuer} 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/60x60/e2e8f0/64748b?text=Cert";
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                      <p className="text-blue-600 font-medium mb-1">{cert.issuer}</p>
                      <p className="text-gray-500 text-sm">Issued {cert.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href={profile.social.gdev}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
              >
                <Globe className="mr-2" size={18} />
                <span>View My Google Developer Profile</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg">
              Interested in collaborating or have questions about my work? Feel free to reach out using the form below.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="mb-8 text-blue-50">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <span>{profile.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <span>{profile.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe className="mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Developer Profile</h4>
                      <a 
                        href={profile.social.gdev} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        g.dev/zubinqayam
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-blue-400/30">
                  <h4 className="font-medium mb-3">Follow Me</h4>
                  <div className="flex space-x-4">
                    <a 
                      href={profile.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a 
                      href={profile.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href={profile.social.gdev} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
                      aria-label="Google Developer Profile"
                    >
                      <Globe size={20} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for your message! In a real implementation, this would connect to a backend service to send your message.');
                }}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Zubin<span className="text-blue-400">.</span></h3>
              <p className="text-gray-400 mb-4">
                Healthcare Marketing & Operations Leader dedicated to transforming healthcare through technology and strategic innovation.
              </p>
              <div className="flex space-x-4">
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href={profile.social.gdev} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Globe size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
                <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="text-gray-400 hover:text-white transition-colors">Skills</a></li>
                <li><a href="#certifications" onClick={(e) => { e.preventDefault(); scrollToSection('certifications'); }} className="text-gray-400 hover:text-white transition-colors">Certifications</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Healthcare Strategy</li>
                <li className="text-gray-400">Digital Transformation</li>
                <li className="text-gray-400">Marketing Operations</li>
                <li className="text-gray-400">Data Analytics</li>
                <li className="text-gray-400">Project Management</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Google Developer Profile</h4>
              <p className="text-gray-400 mb-4">Explore my work as a Google Developer Expert in Healthcare & Cloud technologies.</p>
              <a 
                href={profile.social.gdev}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Visit Profile <ChevronRight className="ml-2" size={16} />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Zubin Qayam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
```
