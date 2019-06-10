import React from 'react';
import Slider from 'react-slick';
import MyButton from '../utils/MyButton';

const HomeSlider = (props) => {
    //gives an array of slides (later will be fetched from the server database.
    const slides = [
        {
            img: '/images/featured/placeholder-images-glasses.png',
            lineOne: 'Sun Glasses',
            lineTwo: 'Custom shop',
            linkTitle: 'Shop now',
            linkTo: '/shop?categ=glasses',
        },
        // {
        //     img: '/images/featured/placeholder-images-watches.png',
        //     lineOne: 'Watches',
        //     lineTwo: 'Custom shop',
        //     linkTitle: 'Shop now',
        //     linkTo: '/shop?categ=watches',
        // },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const generateSlides = () => (
        slides ?
            slides.map((item, i)=>(
                <div key={i}>
                    <div className="featured_image"
                    style={{
                        background: `url(${item.img})`,
                        height: `${window.innerHeight-85}px`
                    }}>
                        <div className="featured_action">
                            <div className="tag title">{item.lineOne}</div>
                            <div className="tag low_title">{item.lineTwo}</div>
                            <div>
                                <MyButton
                                type="default"
                                title={item.linkTitle}
                                linkTo={item.linkTo}
                                addStyles={{margin: '10px 0 0 0'}}/></div>
                        </div>

                    </div>
                </div>
            ))
            : null
    );

    return (
        <div className="featured_container">
            {/*<Slider {...settings}>*/}
                {generateSlides()}
            {/*</Slider>*/}

        </div>
    );
};

export default HomeSlider;