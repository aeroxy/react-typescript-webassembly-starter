import {
  Done,
  Warning,
  Error,
  Subject,
  SvgIconComponent
} from '@material-ui/icons';


const variantIcon: Map<string, SvgIconComponent> = new Map([
  [ 'success', Done ],
  [ 'warning', Warning ],
  [ 'error', Error ],
  [ 'info', Subject ]
]);

export default variantIcon;