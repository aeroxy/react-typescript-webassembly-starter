import primary from '@material-ui/core/colors/lightBlue';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary,
    secondary: primary,
    type: 'light',
  }
});

export default theme;