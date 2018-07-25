import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as api from '../api/api';


class Header extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        this._getAllCategories();
    }

    _getAllCategories = () => {
        api.getCategories().then((res) => {
            this.setState({categories:res.categories})      
        });
    }
    
    render(){        
        const categories = this.state.categories;

        const spanStyle = {
            width:  '264.918px',
            height: '264.918px',
            transform: ' translate(-50%, -50%) translate(55px, 41px)'
        }
        

        return(            
            <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
                <div className="mdl-layout--large-screen-only mdl-layout__header-row"/>
                <div className="mdl-layout--large-screen-only mdl-layout__header-row">
                    <h3>Reader</h3>
                </div>

                <div className="mdl-layout--large-screen-only mdl-layout__header-row"/>
                
                <div className="mdl-layout__tab-bar-container">
                    <div className="mdl-layout__tab-bar-button mdl-layout__tab-bar-left-button">
                        <i className="material-icons">chevron_left</i>
                    </div>
                    
                    <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark mdl-js-ripple-effect--ignore-events" data-upgraded=",MaterialRipple">
                        <Link className="mdl-layout__tab is-active" to='/'>All
                            <span className="mdl-layout__tab-ripple-container mdl-js-ripple-effect" data-upgraded=",MaterialRipple">
                                <span className="mdl-ripple" style={spanStyle}></span>
                            </span>
                        </Link>                                        
                        {categories && categories.length > 0 && categories.map(
                            category => 
                                <Link key={category.name} className="mdl-layout__tab" to={`/${category.path}`}>{category.name}
                                    <span className="mdl-layout__tab-ripple-container mdl-js-ripple-effect" data-upgraded=",MaterialRipple">
                                        <span className="mdl-ripple" style={spanStyle}></span>
                                    </span>
                                </Link>)}
                    </div>

                </div>
            </header>
        )
    }

}


export default Header;

