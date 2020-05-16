import React, { FunctionComponent } from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import { Close, SvgIconComponent } from '@material-ui/icons';
import variantStyle from './variantStyle';
import variantIcon from './variantIcon';

interface CustomSnackbarParams {
  message: string,
  onClose: any,
  variant: string
}

const CustomSnackbar: FunctionComponent<CustomSnackbarParams> = props => {
  const { message, onClose, variant } = props;
  const Icon: SvgIconComponent = variantIcon.get(variant) || Close;
  const style: object = variantStyle.get(variant) || {};
  return (
    <SnackbarContent
      style={style}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon style={{marginRight: 10}} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <Close />
        </IconButton>
      ]}
    />
  );
}

export default CustomSnackbar;