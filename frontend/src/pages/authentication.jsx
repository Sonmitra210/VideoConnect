import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from './shared-theme/AppTheme';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import SignInCard from './components/SignInCard';
import SignUp from './components/SignUp.jsx';
import Content from './components/Content';
import { useEffect, useState , } from 'react';
import { useLocation } from 'react-router-dom';

export default function Authentication(props) {


    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.form !== undefined) {
            setFormState(location.state.form);
        }
    }, [location.state]);
    const [formState , setFormState]=useState(0);
    
    
    const [error , setError]=useState();
    const [messages , setMessages]=useState();
    const [open , setOpen]=useState(false);


  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            {formState === 0 ? <SignInCard onSwitch={() => setFormState(1)} /> : <SignUp onSwitch={() => setFormState(0)} />}
            
          </Stack>
        </Stack>
      </Stack>
    </AppTheme>
  );
}