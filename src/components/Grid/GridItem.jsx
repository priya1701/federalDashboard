import React from "react";
// @material-ui/core components
import withStyles from "../../../node_modules/@material-ui/core/styles/withStyles";
import Grid from "../../../node_modules/@material-ui/core/Grid.jsx";

const style = {
  grid: {
    padding: "0 15px !important"
  }
};

function GridItem({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridItem);
