import React, { FC} from 'react';
import { capitalize } from '@material-ui/core/utils';
import MuiTypography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    markedH2Center: {
        height: 4,
        width: '100%',
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
    },
    markedH3Center: {
        height: 4,
        width: 55,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
    },
    markedH4Center: {
        height: 4,
        width: 55,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
    },
    markedH6Left: {
        height: 2,
        width: 28,
        display: 'block',
        marginTop: theme.spacing(0.5),
        background: 'currentColor',
    },
}));

const variantMapping = {
    h1: 'h1',
    h2: 'h1',
    h3: 'h1',
    h4: 'h1',
    h5: 'h3',
    h6: 'h2',
    subtitle1: 'h3',
};

type TypographyTypes = {
    classes: { [key: string] : any }
    marked: false | 'center' | 'left',
    variant: string,
}
const Typography: FC<TypographyTypes> = (props) => {
    const { children, marked = false, variant, ...other } = props;
    const classes = useStyles();

    return (
        <MuiTypography variantMapping={variantMapping} variant={variant} {...other}>
            {children}
            {marked ? (
                <span className={classes[`marked${capitalize(variant) + capitalize(marked)}`]} />
            ) : null}
        </MuiTypography>
    );
}

export default Typography;
