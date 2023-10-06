import React from "react";

const Footer = () => {
    return (
        <footer className='footer _container'>
            <article className='footer__company-info'>
                <h5 className='footer__company-name'>COMPANY&nbsp;NAME</h5>
                <p className='footer__company-address'>
                    732 Grand Ave, Glenwood Springs Colorado, 81601 United
                    States
                </p>
                <p className='footer__company-phone'>
                    (970)&nbsp;945-&nbsp;6994
                </p>
            </article>
            <article className='footer__links'>
                <a href='services.html' className='footer__services-link'>
                    services
                </a>
                <a href='work.html' className='footer__work-link'>
                    our work
                </a>
                <a href='blog.html' className='footer__blog-link'>
                    blog
                </a>
                <a href='about.html' className='footer__about-link'>
                    about us
                </a>
                <a href='contact.html' className='footer__contact-link'>
                    contact us
                </a>
            </article>
            <p className='footer__copy'>©Copyrights 2023 Company Name</p>
        </footer>
    );
};

export default Footer;
