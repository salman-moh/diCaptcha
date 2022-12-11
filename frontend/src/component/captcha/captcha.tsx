import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  IconButton,
  List,
  ListItem,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useState } from 'react';
import { Tag } from '../tag/tag';
import { DiCaptchaLogo } from '../logo/dicaptcha';
import axios from 'axios';

export interface Captcha {
  image: { url: string; width: number; height: number };
  hash: string;
  tags: string[];
}

interface CaptchaProps {
  open: boolean;
  size: number;
  close: () => void;
  refresh: () => void;
  quiz: Captcha;
}
const BASE_SEZE_XS = 360;
const BASE_SIZE_MD = 400;
export function Captcha({
  open = true,
  close,
  refresh,
  quiz = {
    hash: 'asklfhasklgh',
    image: {
      url: '/static/images/squirrel.webp',
      width: 629,
      height: 629,
    },
    tags: ['a', 'v', 'c'],
  },
}: Partial<CaptchaProps>) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  // custom select tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const fallbackSize = isMobile ? BASE_SEZE_XS : BASE_SIZE_MD;

  const submit = async () => {
    try {
      setLoading(true);
      const res = await axios.post<{ token: string }>('/api/validate', {
        hash: quiz.hash,
        selecteds: selectedTags,
      });
      const { token } = res.data;
      setToken(token);
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onClose={close} open={open}>
      <Card
        sx={{
          width: '100%',
          maxWidth: { xs: BASE_SEZE_XS, md: BASE_SIZE_MD },
        }}
      >
        <Stack
          sx={{
            width: '100%',
            maxHeight: { xs: BASE_SEZE_XS, md: BASE_SIZE_MD },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            alt={'cptcha quiz image background'}
            fill
            src={quiz.image.url}
            draggable={false}
            style={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              WebkitBackdropFilter: 'blur(20px)',
              backdropFilter: 'blur(20px)',
              position: 'absolute',
              inset: 0,
            }}
          />
          <Image
            alt={'cptcha quiz image'}
            width={quiz.image.width || fallbackSize}
            height={quiz.image.height || fallbackSize}
            src={quiz.image.url}
            draggable={false}
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: fallbackSize,
              position: 'relative',
            }}
          />
        </Stack>

        <CardContent sx={{ pb: { xs: 0.5, md: 2 } }}>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}
            gutterBottom
            variant="h5"
            component="div"
          >
            Choose tags that best describe the image:
          </Typography>

          <List sx={{ flexDirection: 'row', flexWrap: 'wrap' }} disablePadding>
            {quiz.tags.map(tag => (
              <Tag
                key={tag}
                label={tag}
                onSelect={() => setSelectedTags([...selectedTags, tag])}
                onDelete={() =>
                  setSelectedTags(selectedTags.filter(t => t !== tag))
                }
                selected={selectedTags.includes(tag)}
              />
            ))}
          </List>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <IconButton size="small" onClick={refresh}>
            <RefreshRoundedIcon />
          </IconButton>
          <DiCaptchaLogo width={30} height={30} />
          <Button
            size="small"
            variant="contained"
            disabled={loading}
            sx={{ boxShadow: 'none' }}
            onClick={submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}
