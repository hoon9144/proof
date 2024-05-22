'use client'
import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import { Box, Text, Flex, Image, Textarea, Button } from '@chakra-ui/react'
import { CommonInput } from '@/components/CommonInput'
const { useState } = require('react')

export default function Home() {
  const [inputCount, setInputCount] = useState(0)
  const [isInvalid, setIsInvalid] = useState(false)
  const onTextareaHandler = (e) => {
    e.target.value.length > 500 ? setIsInvalid(true) : setIsInvalid(false)
    setInputCount(e.target.value.length)
  }
  const form = useRef()

  const onSubmitForm = (event) => {
    event.preventDefault()

    console.log(form.current);

    try {
      emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        PUBLIC_KEY
      )
      alert('메일 전송이 완료되었습니다. 담당자 확인후 연락드리겠습니다.')
    } catch (error) {
      alert('메일 전송이 실패하였습니다. 다시 시도해주세요.')
    }
  }

return (
    <Box p={'12px 48px'}>
      <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'}  w={'100%'} >
          <Image src='/logo.png' alt='logo' w='75%' mt={'-70px'}/>
        <form ref={form} onSubmit={onSubmitForm} id='submit'>
          <Flex w={'100%'} flexDir={'column'}  gap={'8px'} px={'24px'}>
          <CommonInput type="text" name="to_name" required defaultValue={'류연석'} hidden/>
          <CommonInput label={'이름'} type="text" name="from_name" required defaultValue={'test_name'}/>
          <CommonInput label={'전화번호'} type="text" name="from_phone" required defaultValue={'01033039144'}/>
            <Box pos='relative'>
            <Text sx={{ fontsize:'14px', fontWeight:'600', pb:'6px' }}>메모</Text>
            <Textarea
                name="message" 
                minW='352px'
                minH='240px'
                placeholder='메모를 입력해주세요.'
                resize='none'
                defaultValue={'강화읍 관청리 1-2번지 2층 매장은 24평이고 테이블은 8개쯤 되고 매출은 한달에 4000천정도 됩니다. 소주 맥주 그리고 지원이라던지 단가 궁금해서 문의드립니다.'}
                onChange={onTextareaHandler}
                _focus={{ boxShadow: '0px 0px 0px 4px #195AFF3D' }}
                maxLength={501}
                isInvalid={isInvalid}
                _invalid={{ boxShadow: '0px 0px 0px 1px #FDA29B' }}
                py='12px'
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    display: 'none',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'gray',
                    borderRadius: '6px',
                  },
            
                }} />
              <Box pos='absolute' right='14px' bottom='12px' sx={{ fontSize:'12px', color: 'gray' }}>
                {inputCount}/500
              </Box>
            </Box>

          <Button bg={'#FFFFFF'} border={'1px solid #EAECF0'} _hover={{ bg: '#195AFF'}} type="submit" w='100%' form='submit'>견적신청 하기</Button>
          </Flex>
        </form>
        </Flex>
    </Box>
    )
}

const SERVICE_ID = 'service_ipv23p9'
const TEMPLATE_ID = 'template_fspvrml'
const PUBLIC_KEY = 'Nm8AzPTjns2kLwG9X'