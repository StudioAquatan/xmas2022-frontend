import { Button, Box, useToast } from '@chakra-ui/react';
import React from 'react';
import { mutate } from 'swr';
import { addMonitorTweet } from '..';
import { TweetSelector } from '../../../components/TweetSelector';

export const AddTweetForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [tweetId, setTweetId] = React.useState('');
  const toast = useToast();
  const handleAdd = async () => {
    setLoading(true);
    await addMonitorTweet(tweetId);
    setLoading(false);
    mutate('/api/twitter/monitor/tweet');
    toast({
      title: 'Tweet added',
      status: 'success',
    });
  };
  return (
    <Box>
      <TweetSelector onChange={(tweetId) => setTweetId(tweetId)} />
      <Button
        marginY='4'
        colorScheme='green'
        onClick={handleAdd}
        isLoading={loading}
        isDisabled={!tweetId}
      >
        Add
      </Button>
    </Box>
  );
};
