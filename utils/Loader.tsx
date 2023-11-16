import { forwardRef } from "react";
import cx from "clsx";
import { Box, MantineLoaderComponent } from "@mantine/core";
import classes from "./CssLoader.module.css";

const Loader: MantineLoaderComponent = forwardRef(
  ({ className, ...others }, ref) => (
    <div className={classes.loaderWrapper}>
      <Box
        component="span"
        className={cx(classes.loader, className)}
        {...others}
        ref={ref}
      />
    </div>
  )
);

export default Loader;
