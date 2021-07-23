import Link from "next/link";
import { AppBar, Toolbar } from '@material-ui/core';
import Logo from './Logo';

const MainNavbar = (props: any) => (
    <AppBar
        elevation={0}
        {...props}
    >
        <Toolbar sx={{ height: 64 }}>
            <Link href="/">
                <Logo />
            </Link>
        </Toolbar>
    </AppBar>
);

export default MainNavbar;
