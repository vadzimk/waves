import React from 'react';
import FontAwsomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    Brand
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwsomeIcon icon={faCompass} className="icon"/>
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>000 Sunrise Blvd</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwsomeIcon icon={faPhone} className="icon"/>
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>000 000 0000</div>
                                </div>
                            </div>

                            <div className="tag">
                                <FontAwsomeIcon icon={faClock} className="icon"/>
                                <div className="nfo">
                                    <div>Business hours</div>
                                    <div>Mon-Sun/ 9am-11pm</div>
                                </div>
                            </div>

                            <div className="tag">
                                <FontAwsomeIcon icon={faEnvelope} className="icon"/>
                                <div className="nfo">
                                    <div>E-mail</div>
                                    <div>info@brand.com</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="left">
                        <h2>Subscribe to the mail list. </h2>
                        <div>
                            <p>Get the latest news on sales offers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;