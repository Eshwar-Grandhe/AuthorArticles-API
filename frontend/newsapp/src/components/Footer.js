import React, { Component} from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer">
                    <h2 className="text-center" style={{marginBottom: 30}}>The Column</h2>
                    <h5 className="text-center">Developed by <a className="linked-link" href="https://www.linkedin.com/in/bharath-chandra-blotzmann/">Bharath</a> and <a className="linked-link" href="https://www.linkedin.com/in/eshwar-anirudh-782288178/">Eshwar</a></h5>
                    <p className="text-center">&copy; The Column</p>
                </div>
            </footer>
        );
    }
}

export default Footer
