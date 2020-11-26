import React from 'react';
import { HeaderWrapper, HeaderContent } from './headewr.style';
import { Link} from 'react-router-dom';

export const Header = () => {
    return <HeaderWrapper>
        <HeaderContent>
            <div aria-label="Welcome User">Welcome User</div>
            {/*<div aria-label="Log Out and Redirect to Login Page">*/}
            {/*    <Link to='/login'>LogOut</Link>*/}
            {/*</div>*/}
        </HeaderContent>
    </HeaderWrapper>
}

export default Header;
