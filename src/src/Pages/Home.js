/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable import/order */
/* eslint-disable prefer-template */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IMG from '../Assets/frontend/assets/img/saaf_0.png';
import IMG1 from '../Assets/frontend/assets/img/b_0.png';
import IMG2 from '../Assets/frontend/assets/img/a.png';
import IMG3 from '../Assets/frontend/assets/img/c.png';
import IMG4 from '../Assets/frontend/assets/img/d.png';
import { useDispatch, useSelector } from 'react-redux';
import PaymentService from '../../Redux/API/PaymentService';
import { getHomeAbout } from '../../Redux/Slice/home';

const Home = () => {
  const home = useSelector((s) => s.home?.data);
  const params = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const paymentId = params.get('id');
  const navigate = useNavigate();
  useEffect(() => {
    if (paymentId !== null && paymentId !== undefined) {
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      navigate('/paymentConfirmation', { state: { paymentId } });
    }
  }, []);

  const homeFeatures = async () => {
    try {
      const res = await dispatch(getHomeAbout());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    homeFeatures();
  }, [dispatch]);

  // const paymentData = async (id) => {
  //   try {
  //     await PaymentService.sharePaymentId(id)
  //       .then(() => {
  //         const newUrl = window.location.origin + window.location.pathname;
  //         window.history.replaceState({}, '', newUrl);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <>
      <section
        id="hero"
        style={{
          height: '80vh',
          background:
            'linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)), url(' +
            require('../Assets/frontend/assets/img/skyline1.png') +
            ') center / cover no-repeat',
        }}
      >
        <div className="hero-container" style={{ top: '120px!important', padding: 40 }} data-aos="fade-in">
          <h1
            className="h1_class"
            style={{
              fontSize: '3.1rem',
              lineHeight: '1.25',
              fontWeight: 'bold',
            }}
          >
            Be a Green leader in Saudi{' '}
          </h1>
          <div className="col-md-8 mx-auto ">
            <p
              className="text-center mx-auto"
              style={{
                width: '80.5%',
                fontSize: 20,
                fontFamily: '"droid-serif"',
                letterSpacing: '0.012em',
              }}
            >
              <Link to={localStorage.getItem('sgbf_token') ? 'dashboard' : '/register'} style={{ color: '#DF5A49' }}>
                <u style={{ textDecoration: 'none!important' }}>
                  {localStorage.getItem('sgbf_token') ? 'Go To Dashboard' : 'Create a free account'}
                </u>
              </Link>
              to get the latest news, register for an event, document your project/ products, and begin the process of
              becoming a member.
            </p>
            <Link
              to={localStorage.getItem('sgbf_token') ? 'dashboard' : '/sign_in'}
              className="btn-get-started btn-primary"
              style={{
                borderRadius: 'unset!important',
                backgroundColor: '#00882a',
                border: '#0088',
                color: 'white',
              }}
            >
              get Started
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="padd-section text-center">
        <div className="container-fluid" data-aos="fade-up">
          <div className="row mx-auto" data-aos="fade-up" data-aos-delay={100}>
            <div className="col-sm-12 col-md-6 col-lg-3 group ">
              <div className="feature-block">
                <img src={IMG3} alt="img" height={100} width={100} />
                <h2 className="custom-font" style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
                  {home?.count?.events}
                </h2>
                <p className="text-center" style={{ fontSize: '1.2rem' }}>
                  Events
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="feature-block">
                <img src={IMG2} alt="img" height={100} width={100} />
                <h2 className="custom-font" style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
                  {home?.count?.project}
                </h2>
                <p className="text-center" style={{ fontSize: '1.2rem' }}>
                  Green Projects
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="feature-block">
                <img src={IMG1} alt="img" height={100} width={100} />
                <h2 className="custom-font" style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
                  {home?.count?.user}
                </h2>
                <p className="text-center" style={{ fontSize: '1.2rem' }}>
                  Green Professionals
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3" style={{ padding: 'unset!important' }}>
              <div className="feature-block " style={{ padding: 'unset!important' }}>
                <img src={IMG4} alt="img" height={100} width={100} />
                <h2 className="custom-font" style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
                  {home?.count?.article}
                </h2>
                <p className="text-center" style={{ fontSize: '1.2rem' }}>
                  Green Articles
                </p>
              </div>
            </div>
            <div className="section-title text-center" style={{ width: '60%', margin: 'auto' }}>
              <h1 className="custom-font" style={{ fontSize: 51 }}>
                The leading voice for Green in the Arab world.
              </h1>
              <p className="separator text-center" style={{ fontSize: 19, fontFamily: '"droid-serif"' }}>
                Our Mission Is To Inspire People And Honor Places That Are The Blessings Of Our Nation’s Legacy .
              </p>
              <Link
                to="/about"
                className="btn-get-started btn btn-primary"
                style={{
                  marginTop: 30,
                  borderRadius: 'unset!important',
                  backgroundColor: '#00882a',
                  border: '#0088',
                  color: 'white',
                }}
              >
                learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="featuress" className=" text-center">
        <div className="container-fluid" data-aos="fade-up">
          <div className="row" data-aos="fade-up" data-aos-delay={100}>
            <div className="col-md-6 col-lg-3 col-sm-12" style={{ padding: 'unset' }}>
              <div
                className=""
                style={{
                  backgroundImage: `radial-gradient(rgba(245, 211, 40, 0.2), rgba(245, 211, 40, 0.4), rgba(245, 211, 40, 0.5), rgba(245, 211, 40, 0.1)), url(${require('../Assets/frontend/assets/img/conferences.png')})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%',
                  padding: '23% 1%',
                  textAlign: 'center',
                  height:'350px'
                }}
              >
                <div className="feature-block">
                  <h4>
                    <strong>CONFERENCE</strong>
                  </h4>
                  <p className="text-center">
                    Join us, at all events worldwide that identify the emerging investment, business, and employment
                    opportunities in Saudi Arabia.
                  </p>
                  <Link to="/events">
                    <button className="btn btn-get-started customButn">JOIN EVENT</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-sm-12" style={{ padding: 'unset' }}>
              <div
                className=""
                style={{
                  backgroundImage: `radial-gradient(rgba(79, 168, 251, 0.5), rgba(79, 168, 251, 0.5), rgba(79, 168, 251, 0.5), rgba(79, 168, 251, 0.3)), url(${require('../Assets/frontend/assets/img/education.png')})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%',
                  padding: '23% 1%',
                  textAlign: 'center',
                  height:'350px'
                }}
              >
                <div className="feature-block">
                  <h4>
                    <strong>EDUCATION</strong>
                  </h4>
                  <p className="text-center">
                    Learn cutting edge techniques from fellow professionals in the field of architecture, engineering
                    and construction.
                  </p>
                  {/* <Link to="/events"> */}
                    <button className="btn btn-get-started customButn1">FIND COURSE</button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" style={{ padding: 'unset' }}>
              <div
                className=""
                style={{
                  backgroundImage: `radial-gradient(rgba(243, 142, 27, 0.5), rgba(243, 142, 27, 0.5), rgba(243, 142, 27, 0.5), rgba(243, 142, 27, 0.5)), url(${require('../Assets/frontend/assets/img/projects.png')})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%',
                  padding: '23% 1%',
                  textAlign: 'center',
                  height:'350px'
                }}
              >
                <div className="feature-block">
                  <h4>
                    <strong>PROJECTS</strong>
                  </h4>
                  <p className="text-center">
                    Check out Green projects in your region and beyond that are seeking or achieved all levels of Green
                    certification.
                  </p>
                  <Link to="/projects">
                    <button className="btn btn-get-started customButn2">EXPLORE PROJECTS</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" style={{ padding: 'unset' }}>
              <div
                className=""
                style={{
                  backgroundImage: `radial-gradient(rgba(112, 191, 65, 0.5), rgba(112, 191, 65, 0.5), rgba(112, 191, 65, 0.5), rgba(112, 191, 65, 0.3)), url(${require('../Assets/frontend/assets/img/marketplace.png')})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%',
                  padding: '23% 1%',
                  textAlign: 'center',
                  height:'350px'
                }}
              >
                <div className="feature-block">
                  <h4>
                    <strong>MARKETPLACE</strong>
                  </h4>
                  <p className="text-center">
                    View a network of like minded professionals and organizations who specialize in Green and
                    high-performance services and products.
                  </p>
                  <Link to="/market-place">
                    <button className="btn btn-get-started customButn3">BROWS PRODUCTS</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="padd-section">
        <div className="container-fluid" data-aos="fade-up">
          <div className="row " data-aos="fade-up" data-aos-delay={100}>
            <div className="col-md-6" >
              <img src={IMG} alt="" width={'50%'} style={{float:'right'}}/>
            </div>
            <div className="col-md-5 ">
              <h1 className="custom-h2" style={{ fontSize: '2.6rem', fontWeight: 'bold' }}>
                The saaf® Certification Program
              </h1>
              <p style={{ width: '73%' }}>
                A global trademark namly saaf® and labeling system for people, projects and products measuers energy,
                water, infrastracture, material waste and human experience.
              </p>
              {/* <div className="form">
                <div className="text-left">
                  <a
                    href="{{route('introducing')}}"
                    className="px-3 py-2 btn btn-get-started "
                    style={{
                      padding: 7,
                      backgroundColor: '#00882a',
                      color: '#fff',
                      border: '#0088',
                    }}
                  >
                    LEARN MORE
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
