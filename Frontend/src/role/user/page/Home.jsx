import Feature from '../component/Feature'
import Latest from "../component/Latest"
import Ltes_bids from "../component/Ltes_bids"
import Slider from "../component/Slider"
import New_slider from "../component/New_slider"


const Home = () =>
{
    return (
      <>
        <New_slider/>
        <Latest />
        <Ltes_bids />
        <Feature />
      </>
    )
}

export default Home;