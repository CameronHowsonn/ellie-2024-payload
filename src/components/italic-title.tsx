import React from 'react'
import Heading from './heading'
import styled from 'styled-components'
interface ItalicizeTextProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  text: string
  italicIndex: number[]
  id?: string
  className?: string
  color?: string
}

const ItalicTitle: React.FC<ItalicizeTextProps> = ({
  as,
  text,
  italicIndex,
  id,
  className,
  color,
}) => {
  const shouldItalicize = (index: number) => {
    return italicIndex.includes(index)
  }

  const renderText = () => {
    const words = text.split(' ')
    let result: Array<JSX.Element | string> = []
    words.forEach((word, index) => {
      if (shouldItalicize(index)) {
        result.push(<I key={index}>{word}</I>)
      } else {
        result.push(<Span key={index}>{word}</Span>)
      }
      if (index !== words.length - 1) {
        result.push(' ')
      }
    })
    return result
  }

  return (
    <Heading as={as} id={id} className={`${className} animate`} color={color}>
      {renderText()}
    </Heading>
  )
}

export default ItalicTitle

const Span = styled.span`
  display: inline-block;
`

const I = styled.i`
  display: inline-block;
`
