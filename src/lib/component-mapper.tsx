import ContactFormElement from '@/components/contact-form'
import ContactForm from '@/components/contact-form-block'
import Biography from '@/components/homepage/biography'
import HomepageHero from '@/components/homepage/hero'
import Services from '@/components/homepage/services'
import Testimonial from '@/components/homepage/testimonial'
import type { HomepageBlocks } from '@/types/blocks'

type BlockType = HomepageBlocks['blockType']

type ComponentMapperType = {
  [key in BlockType]: React.FC<any> | any
}

export const ComponentMapper: ComponentMapperType = {
  'homepage-hero': HomepageHero,
  'contact-form': ContactForm,
  'homepage-biography': Biography,
  services: Services,
  testimonial: Testimonial,
}
