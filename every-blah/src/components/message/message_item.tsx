import { EMPTY_PROFILE_URL } from '@/src/commons/constants';
import { IInMessage } from '@/src/commons/libraries/firebase/types';
import convertDateToString from '@/src/commons/utils/convert_data_to_string';
import { Avatar, Box, Button, Divider, Flex, Text, Textarea } from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

interface MessageItemProps {
  uid: string;
  displayName: string;
  photoURL: string;
  isOwner: boolean;
  item: IInMessage;
}

const MessageItem = (props: MessageItemProps) => {
  const haveReply = props.item.reply !== undefined;

  return (
    <Box borderRadius={'md'} width={'full'} bg={'white'} boxShadow={'md'}>
      <Box>
        <Flex pl={2} pt={2} alignItems={'center'}>
          <Avatar
            size={'xs'}
            src={props.item.author ? props.item.author.photoURL ?? EMPTY_PROFILE_URL : EMPTY_PROFILE_URL}
          />
          <Text fontSize={'xx-small'} ml={1} color={'black'}>
            {props.item.author ? props.item.author.displayName : 'anonymous'}
          </Text>
          <Text whiteSpace={'pre-line'} fontSize={'xx-small'} color={'gray.500'} ml={1}>
            {convertDateToString(props.item.createAt)}
          </Text>
        </Flex>
      </Box>
      <Box p={2}>
        <Box borderRadius={'md'} borderWidth={1} p={2}>
          <Text whiteSpace={'pre-line'} fontSize={'sm'}>
            {props.item.message}
          </Text>
        </Box>
        {haveReply && (
          <Box pt={2}>
            <Divider />
            <Box display={'flex'} mt={2}>
              <Box pt={2}>
                <Avatar size={'xs'} src={props.photoURL} mr={2} />
              </Box>
              <Box borderRadius={'md'} p={2} width={'full'} bg={'gray.100'}>
                <Flex alignItems={'center'}>
                  <Text fontSize={'xs'}>{props.displayName}</Text>
                  <Text whiteSpace={'pre-line'} fontSize={'xs'} color={'gray'}>
                    {convertDateToString(props.item.replyAt!)}
                  </Text>
                </Flex>
                <Text whiteSpace={'pre-line'} fontSize={'xs'}>
                  {props.item.reply}
                </Text>
              </Box>
            </Box>
          </Box>
        )}
        {haveReply === false && props.isOwner && (
          <Box pt={2}>
            <Divider />
            <Box display={'flex'} mt={2}>
              <Box pt={1}>
                <Avatar size={'xs'} src={props.photoURL} mr={2} />
              </Box>
              <Box borderRadius={'md'} width={'full'} bg={'gray.100'} mr={2}>
                <Textarea
                  as={TextareaAutosize}
                  border={'none'}
                  boxShadow={'none !important'}
                  resize={'none'}
                  minH={'unset'}
                  overflow={'hidden'}
                  fontSize={'xs'}
                  placeholder="댓글을 입력하세요"
                />
              </Box>
              <Button colorScheme="pink" bgColor={'#FF75B5'} variant={'solid'} size={'sm'}>
                등록
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MessageItem;
