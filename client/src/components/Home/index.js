import React from 'react';
import HomeSlider from './HomeSlider'
import HomePromotion from "./HomePromotion";

class Home extends React.Component {
    render() {
        return (
            <div>
                <HomeSlider/>
                <HomePromotion/>
            </div>
        );
    }
}

export default Home;