const Logo = () =>
{
    return <>
     <section className="lookbok-section">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4 offset-lg-1">
                    <div className="lookbok-left">
                        <div className="section-title">
                            <h2>2019 <br />#lookbook</h2>
                        </div>
                        <p>Fusce urna quam, euismod sit amet mollis quis, vestibulum quis velit. Vestibulum malesuada
                            aliquet libero viverra cursus. Aliquam erat volutpat. Morbi id dictum quam, ut commodo
                            lorem. In at nisi nec arcu porttitor aliquet vitae at dui. Sed sollicitudin nulla non leo
                            viverra scelerisque. Phasellus facilisis lobortis metus, sit amet viverra lectus finibus ac.
                            Aenean non felis dapibus, placerat libero auctor, ornare ante. Morbi quis ex eleifend,
                            sodales nulla vitae, scelerisque ante. Nunc id vulputate dui. Suspendisse consectetur rutrum
                            metus nec scelerisque. s</p>
                        <a href="#" className="primary-btn look-btn">See More</a>
                    </div>
                </div>
                <div className="col-lg-5 offset-lg-1">
                    <div className="lookbok-pic">
                        <img src="img/lookbok.jpg" alt=""/>
                        <div className="pic-text">fashion</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
   

   
    <div className="logo-section spad">
        <div className="logo-items owl-carousel">
            <div className="logo-item">
                <img src="img/logos/logo-1.png" alt=""/>
            </div>
            <div className="logo-item">
                <img src="img/logos/logo-2.png" alt=""/>
            </div>
            <div className="logo-item">
                <img src="img/logos/logo-3.png" alt=""/>
            </div>
            <div className="logo-item">
                <img src="img/logos/logo-4.png" alt=""/>
            </div>
            <div className="logo-item">
                <img src="img/logos/logo-5.png" alt=""/>
            </div>
        </div>
    </div>

    </>
}

export default Logo;