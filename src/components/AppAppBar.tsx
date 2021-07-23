import React, {FC} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import AppBar from "./AppBar";
import theme from "../theme/theme";

const styles = () => ({
    title: {
        fontSize: 24,
        color: theme.palette.common.white,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
    },
    leftLinkActive: {
        color: theme.palette.text.primary,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(3),
    },
    linkSecondary: {
        color: theme.palette.secondary.main,
    },
});

type AppAppBarProps = {
    classes: {[key: string] : any}
}

const AppAppBar: FC<AppAppBarProps> = (props) => {
    const { classes } = props;

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        className={classes.title}
                        href="/dashboard"
                    >
                        {'GUARDIANFORMS'}
                    </Link>
                    <div className={classes.right}>
                        <Link
                            variant="h6"
                            underline="none"
                            className={clsx(classes.rightLink, classes.linkSecondary)}
                            href="/dashboard"
                        >
                            {'Dashboard'}
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    );
}

AppAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
