import React from "react";
// @material-ui/core components
import withStyles from "../../../node_modules/@material-ui/core/styles/withStyles";
import Grid from "../../../node_modules/@material-ui/core/Grid";

const style = {
  grid: {
    margin: "0 -15px !important",
    width: "unset"
  }
};

function GridContainer(props) {
  const { classes, children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridContainer);
