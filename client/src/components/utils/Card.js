import React from 'react';
import MyButton from "./MyButton";

class Card extends React.Component {

    renderCardImage = (images) => {
        if (images.length) {
            return images[0].url
        } else {
            return '/images/image_not_available.jpg';
        }
    };


    render() {
        const props = this.props;

        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div className="image"
                     style={{bacground: `url(${this.renderCardImage(props.images)}) no-repeat`}}
                >
                </div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">
                            {props.brand.name}
                        </div>
                        <div className="name">
                            {props.name}
                        </div>
                        <div className="name">
                            ${props.price}
                        </div>

                    </div>
                    {props.grid ?
                        <div className="description">Here goes the description from the database</div>
                        : null
                    }

                    {/*This button is a link*/}
                    <div className="actions">
                        <div className="button_wrapp">
                            <MyButton
                                type="default"
                                altClass="card_link"
                                title="View product"
                                linkTo={`/product_detail/${props.id}`}
                                addStyles={{
                                    margin: '10px 0 0 0'
                                }}

                            />
                        </div>

                        {/*this button is not a link - it's a function that dispatches an action to add element id to the card of the user*/}
                        <div className="button_wrapp">
                            <MyButton
                                type="bag_link"
                                runAction={()=>{console.log("Item added to cart")}}
                            />
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default Card;

