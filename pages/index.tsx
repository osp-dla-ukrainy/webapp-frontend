import { useEffect } from 'react';
import type { NextPage } from 'next'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { fetchConfig, selectConfigs } from '../app/core/store/reducers/config';

const loginByFacebook = (clientId: number) => {
  const params = {
    client_id: clientId,
    redirect_uri: 'http://osp-ua-dev.xyz/api/identity/auth/facebook/callback',
    scope: ['email'].join(','),
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
  }

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, v]) => {
    queryParams.append(key, String(v));
  });
  window.location.href = `https://www.facebook.com/v4.0/dialog/oauth?${queryParams.toString()}`;
}

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConfig());
  }, []);

  const configs = useSelector(selectConfigs);
  
  const {
    facebook: {
      clientId,
    }
  } = configs;
     
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box mb={4}>
            <Button
              size="large"
              variant="contained"
              disabled={!clientId}
              onClick={() => loginByFacebook(clientId!)}
            >
              Zaloguj/zarejestruj przez Facebook
            </Button>
          </Box>
          <Box mb={4}>
            <Box>
              <Button
                endIcon={<NavigateNext />}
                size="large"
                variant="contained"
              >
                organizacja
              </Button>
            </Box>
            <Typography
              component="p"
              variant="caption"
            >
              (OSP/punkt zbiórek/pojedyncza zbiorka)
            </Typography>
          </Box>
          <Box mb={2}>
            <Link
              href="/signup/person"
              passHref
            >
              <Button
                endIcon={<NavigateNext />}
                size="large"
                variant="contained"
              >
                pojedynczy ochotnik
              </Button>
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Home
