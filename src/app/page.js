'use client'
import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import { Box, Text, Flex, Image, Textarea, Button, Checkbox, Tooltip } from '@chakra-ui/react'
import { CommonInput } from '@/components/CommonInput'
const { useState } = require('react')

export default function Home() {
  const [inputCount, setInputCount] = useState(0)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const handleCheckboxChange = (e) => {
    if(e.target.checked) setIsOpened(false)
    setIsChecked(e.target.checked);
  };

  const onTextareaHandler = (e) => {
    e.target.value.length > 500 ? setIsInvalid(true) : setIsInvalid(false)
    setInputCount(e.target.value.length)
  }
  const form = useRef()

  const onSubmitForm = (event) => {
    event.preventDefault()

    try {
      if(!isChecked) return alert('개인정보 수집 및 이용에 동의해주세요.')
      emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        PUBLIC_KEY
      )
      alert('메일 전송이 완료되었습니다. 담당자 확인후 연락드리겠습니다.')
      form.current.reset()
      setIsChecked(false)
      setInputCount(0)
    } catch (error) {
      alert('메일 전송이 실패하였습니다. 다시 시도해주세요.')
    }
  }

return (
    <Box p={'12px 48px'}>
      <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'}  w={'100%'}>
          <Image src='/logo.png' alt='logo' w='84%' mt={'20px'} mr={'4px'}/>
        <form ref={form} onSubmit={onSubmitForm} id='submit'>
          <Flex w={'100%'} flexDir={'column'}  gap={'16px'} px={'24px'} mt={'16px'}>
          <CommonInput type="text" name="to_name" required defaultValue={'류연석'} hidden/>
          <CommonInput label={'이름'} type="text" name="from_name" required  placeholder='이름을 입력해주세요'/>
          <CommonInput label={'전화번호'} type="text" name="from_phone" required placeholder='연락받으실 전화번호를 입력해주세요!'/>
          <Box pos='relative'>
          <Text sx={{ fontsize:'14px', fontWeight:'600', pb:'6px' }}>견적문의 내용</Text>
          <Textarea
              required
              name="message" 
              minW='352px'
              minH='240px'
              placeholder='매장에 대한 문의사항을 자유롭게 작성해주세요. ex) 매장위치, 면적, 매출액 등등'
              resize='none'
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
          
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Checkbox size='md' colorScheme='pink' name='from_checked' fontWeight={600} sx={{ fontSize:'12px'}} cursor={'pointer'} isChecked={isChecked}
             onChange={handleCheckboxChange}>
              <Tooltip label={agreeText} w={'100%'} p='12px 16px' borderRadius='8px' bg={'#0C111D'} isOpen={isOpened}>
              [필수]개인정보 수집 및 이용 동의
              </Tooltip>
            </Checkbox>
            <Text sx={{ fontSize:'12px', color: 'gray', fontWeight: '600' }} onTouchStart={() => setIsOpened(!isOpened)}>약관보기</Text>
          </Flex>
            <Button bg={'#FFFFFF'} border={'1px solid #EAECF0'} _hover={{ bg: '#195AFF', color: '#FFFFFF'}} type="submit" w='100%' form='submit'>견적신청 하기</Button>
          </Flex>
        </form>
        </Flex>
    </Box>
    )
}

const agreeText = "주류어때 서비스 이용을 위해 아래의 개인정보 수집 및 이용에 동의해 주세요. \
수집 항목: 이름, 연락처 \
이용 목적: 서비스 제공 및 고객 문의 응대 \
보유 기간: 서비스 이용 종료 후 1년까지 (관련 법령에 따라 필요한 경우, 해당 기간 동안 보관) \
보관 방법: 이메일로만 수집, 별도의 데이터베이스에 저장되지 않음 \
동의를 거부하실 경우, 서비스 이용이 제한될 수 있습니다."


const SERVICE_ID = 'service_ipv23p9'
const TEMPLATE_ID = 'template_fspvrml'
const PUBLIC_KEY = 'Nm8AzPTjns2kLwG9X'