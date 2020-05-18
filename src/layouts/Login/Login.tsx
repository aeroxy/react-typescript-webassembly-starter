import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState
} from 'react';
import {
  useHistory
} from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Paper,
  Grid,
  CircularProgress,
  Typography,
  Snackbar
} from '@material-ui/core';

/* I tried to work with worker-loader + comlink,
but the worker-loader doesn't seem to work with wasm-loader
(would not be able to import WASM into the worker).
I also tried to load the WASM module into the main thread
and then passing it to the Web Worker,
but it breaks the browser. */

import { wrap } from 'comlink';
// eslint-disable-next-line import/no-webpack-loader-syntax
// import qrCodeWorker_Comlink from 'worker-loader!workers/qrCodeWorker_Comlink';
// eslint-disable-next-line import/no-webpack-loader-syntax
import qrCodeWorker_Comlink from 'worker-loader!workers/qrCodeWorker_Comlink2';

/* Workerize version works!
It should be initialized only once
to avoid creating a sea of workers */
// eslint-disable-next-line import/no-webpack-loader-syntax
// import qrCodeWorker_Workerize from 'workerize-loader!workers/qrCodeWorker_Workerize';

import useMountedState from 'hooks/useMountedState';
import CustomSnackbar from 'components/CustomSnackbar/CustomSnackbar';
import css from './Login.module.css';
import logo from 'assets/svg/logo.svg';
import { qrString } from 'config';

interface LoginDefaultState {
  open: boolean;
  status: string;
  message: string;
  loading: boolean;
}

// const qrCodeWorker_Workerize_Instance = qrCodeWorker_Workerize();
const qrCodeWorker_Comlink_Instance = new qrCodeWorker_Comlink();

const Login:FunctionComponent = () => {
  const defaultState: LoginDefaultState = {
    open: false,
    status: 'info',
    message: '',
    loading: false
  };
  const { state, setState } = useMountedState(defaultState);
  const [ qrcode, setQRCode ] = useState({
    __html: ''
  });
  const loadQRCode = async () => {
    /* Comlink method (failed)*/
    const { generate } = await wrap(qrCodeWorker_Comlink_Instance);
    // const { qrcode: generateQRCode } = await import('uranus-qrcode');
    console.log({
      // generateQRCode,
      generate
    });
    const {
      href,
      qr
    } = await generate({
      href: qrString,
      width: 150,
      height: 150,
      // qrcode: generateQRCode
    });
    /* Workerize Method (failed after compiling)*/
    // const {
    //   href,
    //   qr
    // } = await qrCodeWorker_Workerize_Instance.getQRCode({
    //   href: qrString,
    //   width: 150,
    //   height: 150
    // })
    // console.log({
    //   href,
    //   qr
    // });
    /* Mainthread Method */
    // const { qrcode } = await import('uranus-qrcode');
    // const qr = qrcode(qrString, 150, 150);
    // const href = qrString;
    /* Set QRcode if href matches qrString
    (in this case it is always the same
    but not in a real world example) */
    if (href === qrString) {
      setQRCode({
        __html: qr
      });
    }
  };
  useEffect(() => {
    loadQRCode();
  }, []);
  let submitting: boolean = false;
  const history = useHistory();
  const login = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    if (submitting) {
      setState({
        open: true,
        status: 'info',
        message: 'Logging in...'
      });
      return;
    }
    submitting = true;
    setState({
      loading: true
    });
    try {
      const result: any = await fetch(window.location.href);
      console.log({ result });
      setState({
        open: true,
        status: 'success',
        message: 'You\'ve logged in in theory.',
        loading: false
      });
      history.replace(window.location.pathname);
    } catch(e) {
      submitting = false;
      let message: string = e.message || 'Uknown Error';
      if (e instanceof ProgressEvent)
        message = 'NetWork Error';
      setState({
        open: true,
        status: 'error',
        message,
        loading: false
      });
    }
  };

  const handleClose = ():void => {
    setState({
      open: false
    })
  };

  const {
    innerWidth,
    innerHeight
  } = window;
  const {
    open,
    status,
    message,
    loading
  } = state;

  console.log('Login rendering...', {
    open,
    status,
    message,
    loading
  });

  return (
    <>
      <Grid container component="main" className={css.root} style={{
        backgroundImage: `url(https://cn.bing.com/ImageResolution.aspx?w=${innerWidth}&h=${innerHeight})`
      }}>
        <Grid item xs={false} sm={2} md={4} lg={5}/>
        <Grid item xs={12} sm={8} md={4} lg={2} component={Paper} elevation={6} square style={{
          opacity: '0.9'
        }}>
          <div className={css.paper}>
            {
              qrcode.__html
                ? (
                  <>
                    <div dangerouslySetInnerHTML={qrcode} />
                    <Typography component="h1" variant="h5" className={css.center}>
                      The QRcode above is generated via WebAssembly
                    </Typography>
                  </>
                )
                : (
                  <>
                    <Avatar className={css.avatar} src={logo} />
                  </>
                )
            }
            <form className={css.form} onSubmit={login}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={css.submit}
                disabled={loading}
              >
                {loading && <CircularProgress size={24} className={css.buttonProgress} />}Login
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item xs={false} sm={2} md={4} lg={5}/>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <CustomSnackbar
          onClose={handleClose}
          variant={status}
          message={message}
        />
      </Snackbar>
    </>
  );
};

export default Login;
