import React from 'react';

class Header extends React.Component {

    render() {
        console.log(this.props);
        return <div>{this.props.text}</div>
    }
}

export default Header;