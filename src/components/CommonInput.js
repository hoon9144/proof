import { Box, Input, Text } from '@chakra-ui/react'

export function CommonInput({ type, label, errorMsg, isInvalid, ...props }) {
  return <Box maxH='92px' w={'100%'}>
    <Text sx={{ fontsize:'14px', fontWeight:'600', pb:'6px' }}>{label}</Text>
    <Input type={type}
            w={'100%'}
           _placeholder={{ color: 'gray' }}
           errorBorderColor='#fcaca8'
           isInvalid={isInvalid}
           sx={{ fontSize: '16px', fontWeight: '400' }}
           {...props} />
    {errorMsg && <Text sx={{ fontSize: '16px', fontWeight: '400', mt:'6px', color: 'red'}}>{errorMsg}</Text>}
  </Box>
}