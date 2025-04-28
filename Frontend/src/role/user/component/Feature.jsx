const Feature = () =>
{
    return <>
     <section className="features-section spad">
        <div className="features-ads p-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="single-features-ads first">
                            <img src="img/icons/f-delivery.png" alt=""/>
                            <h4>Free shipping</h4>
                            <p>Fusce urna quam, euismod sit amet mollis quis, vestibulum quis velit. Vesti bulum mal
                                esuada aliquet libero viverra cursus. </p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="single-features-ads second">
                            <img src="img/icons/coin.png" alt=""/>
                            <h4>100% Money back </h4>
                            <p>Urna quam, euismod sit amet mollis quis, vestibulum quis velit. Vesti bulum mal esuada
                                aliquet libero viverra cursus. </p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="single-features-ads">
                            <img src="img/icons/chat.png" alt=""/>
                            <h4>Online support 24/7</h4>
                            <p>Urna quam, euismod sit amet mollis quis, vestibulum quis velit. Vesti bulum mal esuada
                                aliquet libero viverra cursus. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <div className="features-box p-5 border-top">
            <div className="">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="single-box-item first-box">
                                    <img src="img/Gold Fancy_Neckles.jpg" alt=""/>
                                    <div className="box-text">
                                        <span className="trend-year">Party</span>
                                        <h2 className="text-white">Jewelry</h2>
                                        <span className="trend-alert">Trend Allert</span>
                                        <a href="#" className="primary-btn">See More</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="single-box-item second-box">
                                    <img src="img/ios_product.jpg" alt=""/>
                                    <div className="box-text">
                                        <span className="trend-year">Trending</span>
                                        <h2 className="text-white">IOS Products</h2>
                                        <span className="trend-alert text-white">Latest Series Products</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="single-box-item large-box">
                            <img src="img/Audi.jpg" alt=""/>
                            <div className="box-text">
                                <span className="trend-year txt-white">Special Items</span>
                                <h2 className="text-white">Best Automobile</h2>
                                <div className="trend-alert text-white">Trending</div>
                            </div>
                        </div>
                        <div className="single-box-item first-box">
                                    <img src="img/Sofa_Set.jpg" alt=""/>
                                    <div className="box-text">
                                        <span className="trend-year text-white">Disentt</span>
                                        <h2 className="text-white">With Quality</h2>
                                        <span className="trend-alert text-white">With good material</span>
                                      
                                    </div>
                                </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    </>
}

export default Feature;