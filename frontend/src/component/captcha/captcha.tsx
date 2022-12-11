import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  IconButton,
  List,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { DiCaptchaLogo } from '../logo/dicaptcha';
import { Tag } from '../tag/tag';

export interface Captcha {
  image: { url: string; width: number; height: number };
  hash: string;
  tags: string[];
}

interface CaptchaProps {
  open: boolean;
  close: () => void;
  handleChange: (value: string | null) => void;
  refresh: () => void;
  quiz: Captcha;
}
const BASE_SEZE_XS = 360;
const BASE_SIZE_MD = 400;
export function Captcha({
  open = true,
  close,
  refresh,
  handleChange,
  quiz,
}: CaptchaProps) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  // custom select tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
      handleChange(token);
    } catch (error) {
      console.log(`error`, error);
      // @ts-ignore
      setError(error.message);
      handleChange(null);
    } finally {
      setLoading(false);
      close();
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
