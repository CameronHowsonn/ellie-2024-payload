import styled from 'styled-components'
import Stack from './stack'
import React, { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import Text from '@/components/text'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  isTextArea?: boolean
}

const TextInput: React.ForwardRefRenderFunction<HTMLInputElement, any> = (
  { label, placeholder, isTextArea, ...props },
  ref,
) => {
  return (
    <InputStack gap={1}>
      <Label>
        <Text
          variant="medium"
          color="#1A1A1A"
          style={{
            textTransform: 'uppercase',
          }}
        >
          {label}
        </Text>
      </Label>
      {isTextArea ? (
        <Textarea ref={ref} {...props} placeholder={placeholder} />
      ) : (
        <Input type="text" ref={ref} {...props} placeholder={placeholder} />
      )}
    </InputStack>
  )
}

export default forwardRef(TextInput)

const InputStack = styled(Stack)`
  width: 100%;
`

const Input = styled.input`
  display: block;
  appearance: none;
  outline: none;
  border: none;
  box-shadow: 0 0.25px 0 0 rgba(255, 255, 255, 0.8);
  background-color: transparent;
  font-family: var(--font-open-sans);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 1.0625rem;
  padding: 0.5rem 0;
  color: var(--slate);
  width: 100%;
`

const Label = styled.label``

const Textarea = styled.textarea`
  display: block;
  appearance: none;
  outline: none;
  border: none;
  box-shadow: 0 0.25px 0 0 rgba(255, 255, 255, 0.8);
  background-color: transparent;
  font-family: var(--font-open-sans);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 1.0625rem;
  padding: 0.5rem 0;
  color: var(--white);
  width: 100%;
  resize: none;
`
