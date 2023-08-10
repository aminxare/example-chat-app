import contained from "./contained";
import outlined from "./outlined";
import root from "./root";

const button = {
  styleOverrides: {
    root: { ...root },
    contained: { ...contained },
    outlined: { ...outlined },
  },
};

export default button;
