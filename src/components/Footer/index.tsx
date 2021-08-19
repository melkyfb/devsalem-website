import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import './index.scss';

interface ImgLinkProps {
    src: string,
    title: string,
    href?: string,
    target?: string
};

const ImgLink = ({ src, title, href, target = '_blank' }: ImgLinkProps) => {

    const Img = () => (
        <img src={src} title={title} />
    );

    return (
            href 
                ? <a href={href} target={target}>{Img()}</a>
                : Img()

    );
}

const Footer = () => {
    return (
        <Navbar fixed="bottom" expand="sm">
            <Container>
                <Navbar.Brand>
                    Built with
                    <ImgLink src={require('../../images/reactjs.png?width=32')} title='ReactJS' href='https://reactjs.org/'/>{' '}
                    <ImgLink src={require('../../images/babel.png?width=32')} title='Babel' href='https://babeljs.io/'/>{' '}
                    <ImgLink src={require('../../images/webpack.png?width=32')} title='Webpack' href='https://webpack.js.org/'/>{' '}
                    <ImgLink src={require('../../images/typescript.png?width=32')} title='Typescript' href='https://www.typescriptlang.org/'/>{' '}
                    <ImgLink src={require('../../images/bootstrap.png?width=32')} title='Bootstrap' href='https://getbootstrap.com/'/>{' '}
                </Navbar.Brand>
                <Navbar.Text>
                    Developed by <a href="https://twitter.com/dev_salem" target='_blank'>Dev Salem®</a>
                </Navbar.Text>
            </Container>
        </Navbar>
    );
}

export default Footer;