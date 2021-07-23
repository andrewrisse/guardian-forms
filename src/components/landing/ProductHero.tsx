import React, {FC} from 'react';
import { withStyles } from '@material-ui/styles';
import theme from "../../theme/theme";
import ProductHeroLayout from "./ProductHeroLayout";

import {Button} from "@material-ui/core";
import Typography from "../Typography";

const backgroundImage =
    'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1970&q=80';

const styles = () => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
    markedH2Center: {
        height: 4,
        width: 73,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
    },
});

type ProductHeroTypes = {
    classes: {[key: string] : any}
}

const ProductHero: FC<ProductHeroTypes> = (props) => {
    const { classes } = props;

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <Typography color="inherit" align="center" variant="h2" marked="center">
                A Survey Tool
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                Create, Share, Analyze
            </Typography>
            <Button
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
                component="a"
                href="/dashboard"
            >
                Dashboard
            </Button>

        </ProductHeroLayout>
    );
}


export default withStyles(styles)(ProductHero);
